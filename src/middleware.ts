import { NextRequest, NextResponse } from 'next/server';

import { defaultPage } from './core/constants/pages';

export default function middleware(request: NextRequest) {

    if (request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL("/dashboard/" + defaultPage, request.url));
    }

    return NextResponse.next();
}