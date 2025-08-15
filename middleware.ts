import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {auth} from './auth';

export async function middleware(request: NextRequest) {
    const session = await auth();

    const protectedPaths = ['/', '/movies', '/tv-series', '/bookmarks'];
    const publicPaths = ['/login', '/signup'];

    const pathname = request.nextUrl.pathname;

    // Skip public routes
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const isProtected = protectedPaths.some(
        (path) => pathname === path || pathname.startsWith(path + '/')
    );

    if (isProtected && !session?.user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Apply the middleware to specific paths (like protected routes)
export const config = {
    matcher: ['/', '/movies', '/tv-series', '/bookmarks'],
};
