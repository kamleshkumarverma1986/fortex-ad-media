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

  // Protect admin routes - redirect to login-param if NOT authenticated or NOT admin
  if (path.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login-param", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (!token.isAdmin) {
      // Redirect non-admin users to user dashboard
      const userUrl = new URL("/user/dashboard", request.url);
      return NextResponse.redirect(userUrl);
    }

    // User is admin, allow access but prevent caching
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // Protect user routes - redirect to HOME if NOT authenticated (NOT login-param!)
  if (path.startsWith("/user")) {
    if (!token) {
      // CRITICAL: Normal users should NEVER see login-param page
      // Redirect to home page instead
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl);
    }

    if (token.isAdmin) {
      // Redirect admin users to admin dashboard
      const adminUrl = new URL("/admin/dashboard", request.url);
      return NextResponse.redirect(adminUrl);
    }

    // User is authenticated and not admin, allow access but prevent caching
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // Protect login-param page - ONLY admins can access when not authenticated
  if (path.startsWith("/login-param")) {
    if (token) {
      // Already authenticated - redirect based on user type
      const dashboardUrl = token.isAdmin
        ? new URL("/admin/dashboard", request.url)
        : new URL("/user/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Not authenticated - allow access to login page but prevent caching
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
    "/admin/:path*", // Protects all admin routes
    "/user/:path*", // Protects all user routes
    "/login-param", // Protects login page
  ],
};
