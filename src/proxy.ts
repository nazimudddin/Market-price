
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // User is not logged in
  if (!session) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  // User is logged in
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/detailspage/:path*","/profile/:path*"],
};

