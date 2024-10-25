import { NextRequest, NextResponse } from 'next/server';

import { defaultPage } from './core/constants/pages';
import { headers } from 'next/headers';

export default function middleware(request: NextRequest) {
    
    let token = request.cookies.get('token');

    if (!token) {
        if (request.nextUrl.pathname == '/auth') 
            return NextResponse.next(); 

        return NextResponse.redirect(new URL("/auth", request.url));
    } else {

        if (request.nextUrl.pathname == '/')
            return NextResponse.redirect(new URL('/dashboard/' + defaultPage, request.url));

        if (request.nextUrl.pathname == '/auth') 
            return NextResponse.redirect(new URL("/dashboard/weeks", request.url));

        return NextResponse.next();
    }

    return request;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};