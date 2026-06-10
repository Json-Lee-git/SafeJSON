import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "safejson.dev";
const redirectHosts = new Set(["safejson.vercel.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (!host || !redirectHosts.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = canonicalHost;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
