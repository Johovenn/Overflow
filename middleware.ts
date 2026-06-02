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

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon.ico") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	if (pathname === "/") {
		return NextResponse.redirect(
			new URL("/leaderboard", request.url)
		);
	}

	if (pathname.startsWith("/campaign/")) {
		return NextResponse.next();
	}

	if (protectedRoutes.includes(pathname)) {
		const access = request.cookies.get("colorless_access")?.value;

		if (access !== "granted") {
			return NextResponse.redirect(
				new URL("/login", request.url)
			);
		}

		return NextResponse.next();
	}

	if (publicRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(
		new URL("/leaderboard", request.url)
	);
}

export const config = {
	matcher: "/:path*",
};