import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// This function runs BEFORE any page loads
export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Get the authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect admin API routes - return 403 if not admin
  if (path.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    if (!token.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // User is admin, allow access
    return NextResponse.next();
  }

  // Protect admin dashboard - redirect to login if NOT authenticated
  if (path.startsWith("/admin-dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login-param", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access but prevent caching
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // Protect login page - redirect to dashboard if ALREADY authenticated
  if (path.startsWith("/login-param")) {
    if (token) {
      const dashboardUrl = new URL("/admin-dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // User is not authenticated, allow access to login page but prevent caching
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // For all other pages, just continue normally
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    "/api/admin/:path*", // Protects admin API routes
    "/admin-dashboard/:path*", // Protects admin dashboard
    "/login-param", // Protects login page
  ],
};
