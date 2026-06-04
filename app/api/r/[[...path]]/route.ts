import { NextRequest, NextResponse } from "next/server"

const BASE = "https://portal.reemo.io"
const BASE_HOST = "portal.reemo.io"
const PROXY_BASE = "/api/r"
const BLOCKED_HEADERS = new Set([
  "content-security-policy",
  "content-security-policy-report-only",
  "x-frame-options",
  "cross-origin-opener-policy",
  "cross-origin-embedder-policy",
  "cross-origin-resource-policy",
])

function looksLikeHost(value: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?$/i.test(value)
}

function resolveTarget(path: string) {
  while (path === "api/r" || path.startsWith("api/r/")) {
    path = path.slice("api/r".length).replace(/^\/+/, "")
  }
  if (path === "reemo.webmanifest") {
    path = "pwa/reemo.webmanifest"
  }
  if (path === "vendor/gtm.js") {
    const url = new URL("https://www.googletagmanager.com/gtm.js")
    return { target: url.toString(), origin: url.origin, host: url.host }
  }
  if (/^out-[\w.-]+\.js$/i.test(path)) {
    const url = new URL(`https://m.stripe.network/${path}`)
    return { target: url.toString(), origin: url.origin, host: url.host }
  }

  if (path.startsWith("http:/") || path.startsWith("https:/")) {
    const normalized = path.replace(/^https:\//, "https://").replace(/^http:\//, "http://")
    const url = new URL(normalized)
    return { target: url.toString(), origin: url.origin, host: url.host }
  }

  const [firstSegment, ...rest] = path.split("/")
  if (looksLikeHost(firstSegment)) {
    const url = new URL(`https://${firstSegment}/${rest.join("/")}`)
    return { target: url.toString(), origin: url.origin, host: url.host }
  }

  const url = new URL(path ? `/${path}` : "/", BASE)
  return { target: url.toString(), origin: url.origin, host: url.host }
}

function proxiedUrl(url: string, request: NextRequest) {
  if (url.startsWith(PROXY_BASE) || url.startsWith("data:") || url.startsWith("blob:") || url.startsWith("#")) {
    return url
  }

  if (url.startsWith("//")) {
    return proxiedUrl(`https:${url}`, request)
  }

  try {
    const parsed = new URL(url, BASE)
    if (parsed.host === BASE_HOST) {
      return `${PROXY_BASE}${parsed.pathname}${parsed.search}${parsed.hash}`
    }

    return `${PROXY_BASE}/${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return url
  }
}

function shouldRewriteBody(host: string) {
  return host === BASE_HOST
}

function patchKnownRuntimeIssues(text: string) {
  return text.replace(
    "function Zte(e,t,i){const n=e.style",
    "function Zte(e,t,i){if(!e||!e.style)return;const n=e.style"
  ).replace(
    /\/api\/r\/www\.googletagmanager\.com\/gtm\.js/g,
    "/api/r/vendor/gtm.js"
  )
}

function rewriteText(text: string, request: NextRequest) {
  const host = request.headers.get("host") || ""

  text = text.replaceAll(`https://${BASE_HOST}/`, `${PROXY_BASE}/`)
  text = text.replaceAll(`https://${BASE_HOST}`, PROXY_BASE)
  text = text.replaceAll(`//${BASE_HOST}/`, `//${host}${PROXY_BASE}/`)
  text = text.replaceAll(`//${BASE_HOST}`, `//${host}${PROXY_BASE}`)

  text = text.replace(/(["'`])((?:https?:)?\/\/[^"'`\s<>)]+)\1/g, (match, quote, url) => {
    return `${quote}${proxiedUrl(url, request)}${quote}`
  })

  text = text.replace(/(["'`])\/api\/(?!r(?:\/|$))/g, `$1${PROXY_BASE}/api/`)
  text = text.replace(/url\(\/api\/(?!r(?:\/|$))/g, `url(${PROXY_BASE}/api/`)

  const rootPaths = ["dist", "fonts", "pwa", "images", "app"]
  for (const folder of rootPaths) {
    text = text.replaceAll(`"/${folder}/`, `"${PROXY_BASE}/${folder}/`)
    text = text.replaceAll(`'/${folder}/`, `'${PROXY_BASE}/${folder}/`)
    text = text.replaceAll(`\`/${folder}/`, `\`${PROXY_BASE}/${folder}/`)
    text = text.replaceAll(`url(/${folder}/`, `url(${PROXY_BASE}/${folder}/`)
  }

  return text
}

async function proxy(request: NextRequest, path: string) {
  const { target, origin, host } = resolveTarget(path)
  const targetUrl = new URL(target)
  if (!targetUrl.search && request.nextUrl.search) {
    targetUrl.search = request.nextUrl.search
  }

  const reqHeaders: Record<string, string> = {}
  if (host === BASE_HOST) {
    reqHeaders.Host = host
    reqHeaders.Origin = BASE
    reqHeaders.Referer = BASE + "/"
  }

  request.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase()
    if (!["host", "origin", "referer", "accept-encoding", "content-length", "connection"].includes(lowerKey)) {
      reqHeaders[lowerKey] = value
    }
  })

  const fetchOpts: RequestInit = {
    method: request.method,
    headers: reqHeaders,
    redirect: "follow",
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    fetchOpts.body = await request.arrayBuffer()
  }

  const res = await fetch(targetUrl, fetchOpts)

  const headers = new Headers()
  for (const [key, value] of res.headers) {
    if (BLOCKED_HEADERS.has(key.toLowerCase())) continue
    if (key.toLowerCase() === "location") {
      headers.set(key, proxiedUrl(value, request))
      continue
    }
    headers.set(key, value)
  }
  headers.set("Access-Control-Allow-Origin", "*")
  headers.set("Cross-Origin-Resource-Policy", "cross-origin")
  headers.delete("content-encoding")
  headers.delete("content-length")

  const ct = res.headers.get("content-type") || ""
  const rewriteBody = shouldRewriteBody(host)

  if (rewriteBody && ct.includes("text/html")) {
    let html = rewriteText(await res.text(), request)
    
    // Aggressively rewrite absolute paths to go through our proxy
    html = html.replace(/src="\/(?!api\/r(?:\/|"))/g, `src="${PROXY_BASE}/`)
    html = html.replace(/href="\/(?!api\/r(?:\/|"))/g, `href="${PROXY_BASE}/`)
    html = html.replace(/action="\/(?!api\/r(?:\/|"))/g, `action="${PROXY_BASE}/`)
    
    if (!html.includes("<base")) {
      html = html.replace("<head>", `<head><base href="${PROXY_BASE}/">`)
    }
    return new NextResponse(html, { status: res.status, headers })
  }

  if (rewriteBody && (ct.includes("text/css") || ct.includes("javascript"))) {
    const text = patchKnownRuntimeIssues(rewriteText(await res.text(), request))
    
    return new NextResponse(text, { status: res.status, headers })
  }

  return new NextResponse(res.body, { status: res.status, headers })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params
  return proxy(request, path?.join("/") || "")
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params
  return proxy(request, path?.join("/") || "")
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params
  return proxy(request, path?.join("/") || "")
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params
  return proxy(request, path?.join("/") || "")
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params
  return proxy(request, path?.join("/") || "")
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  })
}
