import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
	"/login",
	"/campaign",
	"/links",
	"/leaderboard",
];

const protectedRoutes = [
	"/committee-links",
	"/points",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow Next.js internals & static assets
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// Redirect home
	if (pathname === "/") {
		return NextResponse.redirect(
			new URL("/leaderboard", request.url)
		);
	}

	// Handle misspelled committee route
	if (pathname === "/commitee-links") {
		const access = request.cookies.get("colorless_access")?.value;

		if (access !== "granted") {
			return NextResponse.redirect(
				new URL("/login", request.url)
			);
		}

		return NextResponse.redirect(
			new URL("/committee-links", request.url)
		);
	}

	// Allow campaign subroutes
	if (pathname.startsWith("/campaign/")) {
		return NextResponse.next();
	}

	// Protect committee pages
	if (protectedRoutes.includes(pathname)) {
		const access = request.cookies.get("colorless_access")?.value;

		if (access !== "granted") {
			return NextResponse.redirect(
				new URL("/login", request.url)
			);
		}

		return NextResponse.next();
	}

	// Allow public routes
	if (publicRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	// Redirect unknown routes
	return NextResponse.redirect(
		new URL("/leaderboard", request.url)
	);
}

export const config = {
	matcher: "/:path*",
};