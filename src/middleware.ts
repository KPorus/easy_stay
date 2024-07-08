import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const cookies = request.cookies.get('accessToken');
   // console.log(cookies);
    if (!cookies) {
        const rootUrl = new URL('/', request.url);
        return NextResponse.redirect(rootUrl);
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/home','/products','/reviews','/settings'],
  }