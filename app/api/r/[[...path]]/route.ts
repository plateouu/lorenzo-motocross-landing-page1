import { NextRequest, NextResponse } from "next/server"

const BASE = "https://portal.reemo.io"
const BLOCKED_HEADERS = new Set([
  "content-security-policy",
  "content-security-policy-report-only",
  "x-frame-options",
  "cross-origin-opener-policy",
  "cross-origin-embedder-policy",
  "cross-origin-resource-policy",
])

async function proxy(request: NextRequest, path: string) {
  const target = path ? `${BASE}/${path}` : `${BASE}/`
  const proxyBase = "/api/r"

  const reqHeaders: Record<string, string> = {
    "User-Agent": request.headers.get("user-agent") || "",
    Accept: request.headers.get("accept") || "*/*",
    "Accept-Language": request.headers.get("accept-language") || "en-US,en;q=0.9",
    Referer: BASE + "/",
    Origin: BASE,
  }

  const cookie = request.headers.get("cookie")
  if (cookie) reqHeaders["Cookie"] = cookie

  const res = await fetch(target, { method: request.method, headers: reqHeaders, redirect: "follow" })

  const headers = new Headers()
  for (const [key, value] of res.headers) {
    if (BLOCKED_HEADERS.has(key.toLowerCase())) continue
    if (key.toLowerCase() === "location") {
      headers.set(key, value.replace(BASE, proxyBase))
      continue
    }
    headers.set(key, value)
  }
  headers.set("Access-Control-Allow-Origin", "*")
  headers.set("Cross-Origin-Resource-Policy", "cross-origin")

  const ct = res.headers.get("content-type") || ""

  if (ct.includes("text/html")) {
    let html = await res.text()
    html = html.replaceAll(`https://portal.reemo.io/`, `${proxyBase}/`)
    html = html.replaceAll(`https://portal.reemo.io`, proxyBase)
    html = html.replaceAll(`//portal.reemo.io/`, `//${request.headers.get("host") || ""}${proxyBase}/`)
    html = html.replaceAll(`//portal.reemo.io`, `//${request.headers.get("host") || ""}${proxyBase}`)
    
    // Aggressively rewrite absolute paths to go through our proxy
    html = html.replaceAll(`src="/`, `src="${proxyBase}/`)
    html = html.replaceAll(`href="/`, `href="${proxyBase}/`)
    html = html.replaceAll(`action="/`, `action="${proxyBase}/`)
    
    if (!html.includes("<base")) {
      html = html.replace("<head>", `<head><base href="${proxyBase}/">`)
    }
    headers.delete("content-encoding")
    headers.delete("content-length")
    return new NextResponse(html, { status: res.status, headers })
  }

  if (ct.includes("text/css") || ct.includes("javascript")) {
    let text = await res.text()
    text = text.replaceAll(`https://portal.reemo.io/`, `${proxyBase}/`)
    text = text.replaceAll(`https://portal.reemo.io`, proxyBase)
    
    // Aggressively rewrite root paths in JS/CSS
    const folders = ["dist", "api", "fonts", "pwa", "images"]
    for (const folder of folders) {
      text = text.replaceAll(`"/${folder}/`, `"${proxyBase}/${folder}/`)
      text = text.replaceAll(`'/${folder}/`, `'${proxyBase}/${folder}/`)
      text = text.replaceAll(`\`/${folder}/`, `\`${proxyBase}/${folder}/`)
    }
    
    headers.delete("content-encoding")
    headers.delete("content-length")
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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  })
}
