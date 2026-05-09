import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// allow campaign routes
	if (pathname.startsWith("/campaign")) {
		return NextResponse.next();
	}

	// allow static/internal files
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// redirect everything else
	return NextResponse.redirect(
		new URL("/campaign", request.url)
	);
}

export const config = {
	matcher: "/:path*",
};