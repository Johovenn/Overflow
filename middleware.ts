import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedRoutes = [
	"/",
	"/login",
	"/points",
	"/campaign",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// allow Next.js internals & static files
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// allow exact routes
	if (allowedRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	// allow campaign subroutes
	if (pathname.startsWith("/campaign/")) {
		return NextResponse.next();
	}

	// redirect everything else to /
	return NextResponse.redirect(
		new URL("/", request.url)
	);
}

export const config = {
	matcher: "/:path*",
};