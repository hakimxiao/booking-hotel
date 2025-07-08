import { NextRequest, NextResponse } from "next/server";
import {auth} from "@/auth";

const ProtectedRoutes = ["/myreservation", "checkout", "/admin"];

export async function middleware(request: NextRequest) {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const role = session?.user.role;
    const {pathname} = request.nextUrl;

    // jika user belum login dan mengakses route yang dilindungi
    // maka redirect ke halaman login
    if(!isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // jika user sudah login dan bukan admin kemudian dia mengakses halaman admin
    // maka redirect ke halaman home
    if(isLoggedIn && role != "admin" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // jika user sudah login dan mengakses halaman signin
    // maka redirect ke halaman home
    if(isLoggedIn && pathname.startsWith("/signin")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// regular expression
// middleware ini tidak akan di inbox di api, _next/static, _next/image, favicon.ico
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
