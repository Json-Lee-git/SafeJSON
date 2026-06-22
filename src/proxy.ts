import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "www.safejson.dev";
const defaultRedirectHosts = ["safejson.dev", "safejson.vercel.app"];
const configuredRedirectHosts = (process.env.SAFEJSON_LEGACY_REDIRECT_HOSTS || "")
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);
const redirectHosts = new Set(
  [...defaultRedirectHosts, ...configuredRedirectHosts].filter(
    (host) => host !== canonicalHost,
  ),
);

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
