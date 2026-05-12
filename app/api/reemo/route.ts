import { NextResponse } from "next/server"

export async function GET() {
  const target = "https://portal.reemo.io/"

  const res = await fetch(target, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  })

  let html = await res.text()

  if (!html.includes("<base")) {
    html = html.replace("<head>", `<head><base href="${target}">`)
  }

  const headers = new Headers()
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Access-Control-Allow-Origin", "*")

  return new NextResponse(html, { status: 200, headers })
}
