import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/mentee-dashboard',
    '/mentee',
    '/mentee/onboarding',
    '/mentee/booking',
    '/mentee/transfer',
    '/mentor',
    '/mentor/onboarding',
    '/role-selection'
  ]

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth',
    '/auth/reset-password',
    '/auth/callback',
    '/test-navigation'
  ]

  const { pathname } = req.nextUrl

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  // If accessing a protected route without authentication
  if (isProtectedRoute && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If authenticated user tries to access auth pages, redirect to role selection
  // Special case for auth callback which handles its own redirection
  if ((pathname === '/auth' || pathname.startsWith('/auth/')) && session && pathname !== '/auth/callback') {
    const redirectTo = req.nextUrl.searchParams.get('redirectTo')

    if (redirectTo && protectedRoutes.includes(redirectTo)) {
      return NextResponse.redirect(new URL(redirectTo, req.url))
    }

    // Check if user has a user_type assigned
    const { data: userProfile } = await supabase
      .from('users')
      .select('user_type')
      .eq('clerk_id', session.user.id)
      .single();

    if (userProfile?.user_type === 'mentor') {
      return NextResponse.redirect(new URL('/mentor/dashboard', req.url))
    } else if (userProfile?.user_type === 'student') {
      return NextResponse.redirect(new URL('/mentee/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/role-selection', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
