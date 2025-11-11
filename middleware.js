import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

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

    return NextResponse.next();
  }

  // Protect user API routes - ONLY for normal users (NOT admins)
  if (path.startsWith("/api/user")) {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    if (token.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - User access only" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login-param", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (!token.isAdmin) {
      const userUrl = new URL("/user/dashboard", request.url);
      return NextResponse.redirect(userUrl);
    }

    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // Protect user routes
  if (path.startsWith("/user")) {
    if (!token) {
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl);
    }

    if (token.isAdmin) {
      const adminUrl = new URL("/admin/dashboard", request.url);
      return NextResponse.redirect(adminUrl);
    }

    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  // Protect login-param page
  if (path.startsWith("/login-param")) {
    if (token) {
      const dashboardUrl = token.isAdmin
        ? new URL("/admin/dashboard", request.url)
        : new URL("/user/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/user/:path*",
    "/admin/:path*",
    "/user/:path*",
    "/login-param",
  ],
};
