import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, EMAIL_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(EMAIL_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
