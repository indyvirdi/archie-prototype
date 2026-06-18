import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "archie2025";
const COOKIE = "proto-auth";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get(COOKIE)?.value;
  if (auth === PASSWORD) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/login") return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|fonts).*)"],
};
