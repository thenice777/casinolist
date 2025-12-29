import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getGeoInfo } from "@/lib/geo";

export function middleware(request: NextRequest) {
  // Get geo information from Vercel headers (available on Vercel deployments)
  const country = request.headers.get("x-vercel-ip-country") || null;
  const region = request.headers.get("x-vercel-ip-country-region") || null;
  const city = request.headers.get("x-vercel-ip-city") || null;

  const geoInfo = getGeoInfo(country, region, city);

  // Create response
  const response = NextResponse.next();

  // Set geo info as cookies for client-side access
  response.cookies.set("geo_country", country || "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600, // 1 hour
  });

  response.cookies.set("geo_region", region || "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600,
  });

  response.cookies.set("geo_restricted", geoInfo.isRestricted ? "1" : "0", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600,
  });

  response.cookies.set("geo_min_age", String(geoInfo.minAge), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600,
  });

  // Check if this is an online casino page and user is from restricted region
  const pathname = request.nextUrl.pathname;
  const isOnlineCasinoPage =
    pathname.startsWith("/online-casinos") ||
    pathname.startsWith("/online/") ||
    pathname.startsWith("/bonuses");

  // For restricted regions accessing online casino content, redirect to info page
  if (isOnlineCasinoPage && geoInfo.isRestricted) {
    const restrictedUrl = new URL("/restricted", request.url);
    restrictedUrl.searchParams.set("reason", geoInfo.restrictionReason || "restricted");
    restrictedUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(restrictedUrl);
  }

  return response;
}

// Only run middleware on specific paths (not static files, API routes, etc.)
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - image optimization
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
