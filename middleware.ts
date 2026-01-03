import { NextRequest, NextResponse } from 'next/server';

// Reserved subdomains that should not be treated as fixer profiles
const RESERVED_SUBDOMAINS = new Set([
  'www',
  'admin',
  'api',
  'mail',
  'ftp',
  'staging',
  'dev',
  'development',
  'test',
  'app',
  'blog',
  'support',
  'help',
  'docs',
  'cdn',
  'static',
  'assets',
  'localhost',
]);

/**
 * Detects if a request is for a fixer profile subdomain
 * Examples:
 *   - myshop.fixamigo.com → /fixer/myshop
 *   - www.fixamigo.com → / (main site)
 *   - api.fixamigo.com → /api/* (reserved, skip)
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  
  // Extract the host without port
  const host = hostname.split(':')[0];
  
  // Split hostname into parts (e.g., "myshop.fixamigo.com" → ["myshop", "fixamigo", "com"])
  const parts = host.split('.');
  
  // Only process if we have at least 3 parts (subdomain.domain.tld)
  if (parts.length >= 3) {
    const potentialSlug = parts[0];
    
    // Skip if it's a reserved subdomain or localhost
    if (RESERVED_SUBDOMAINS.has(potentialSlug)) {
      return NextResponse.next();
    }
    
    // Skip if path is already under /fixer/ (prevent double routing)
    if (url.pathname.startsWith('/fixer/')) {
      return NextResponse.next();
    }
    
    // Skip if path starts with /api or other special paths
    if (url.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
    
    // If we have a valid slug and we're at the root or main paths, rewrite to fixer route
    if (potentialSlug && /^[a-z0-9-]+$/.test(potentialSlug) && potentialSlug.length >= 3) {
      // Rewrite the request to the fixer profile route
      // This keeps the URL clean in the browser while routing internally
      const rewriteUrl = new URL(`/fixer/${potentialSlug}${url.pathname === '/' ? '' : url.pathname}${url.search}`, request.url);
      return NextResponse.rewrite(rewriteUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
