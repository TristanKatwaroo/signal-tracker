import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const unfinishedPages = [
    '/global-stats',
    '/privacy',
    '/settings',
    '/planner',
    '/reminders',
    '/tier-list',
    '/timeline',
  ];

  const url = request.nextUrl;

  // Check if the path matches one of the unfinished pages
  if (unfinishedPages.includes(url.pathname)) {
    // Redirect to the 404 page if the page is unfinished
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  // Continue to the existing session update logic
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
