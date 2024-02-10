// 302リダイレクト

import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middlewareに到達");

  // リクエストpathを取得
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/")
  ) {
    console.log("Throw");
    return NextResponse.next();
  }

  // Cookieの取得
  const cookies = request.cookies;
  const keyList = ["G_ENABLED_IDPS", "BBB"];

  /** リクエスト時のCookieにkeyListのキーが入っているかチェック */
  const checkCookie = (cookies: RequestCookies): boolean => {
    return keyList.every((key) => cookies.has(key));
  };

  // ログイン用Cookieを持っているか
  const isExistLoginCookie = checkCookie(cookies);

  if (!isExistLoginCookie) {
    // 認証情報がなかったらログイン画面へリダイレクト
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  return NextResponse.next();
}
