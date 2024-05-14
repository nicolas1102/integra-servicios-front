import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {

    if (request.nextUrl.pathname.startsWith("/admin")
      && request.nextauth.token?.rol !== "admin"
    ) {
      console.log(request.nextauth.token?.rol);

      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }

    if (request.nextUrl.pathname.startsWith("/recursos")
      && request.nextauth.token?.rol !== "user"
    ) {
      console.log(request.nextauth.token?.rol);
      return NextResponse.rewrite(
        new URL("/auth/unauthorized", request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    // '/admin/:path*',
    // '/recursos/:path*'
  ]
};