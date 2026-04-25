import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_IMAGES = ['/aritra-profile-picture.png']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PROTECTED_IMAGES.includes(pathname)) {
    const referer = request.headers.get('referer') ?? ''
    const host    = request.headers.get('host')    ?? ''

    // Allow if the request is coming FROM our own site
    const isFromSite =
      referer.includes(host) ||
      referer.includes('localhost') ||
      referer.includes('vercel.app') ||
      referer.includes('portfolio')    // adjust to your domain

    if (!isFromSite) {
      return NextResponse.redirect(new URL('/no-stalking', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/aritra-profile-picture.png'],
}
