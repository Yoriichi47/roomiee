import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/rooms(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/stripe',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  if (isAdminRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL('/sign-in', req.url))
    }

    const role = (sessionClaims?.publicMetadata as { role?: string })?.role
    
    if (role !== 'admin') {
      return Response.redirect(new URL('/unauthorized', req.url))
    }
  }
})

export const config = {
  matcher: [    
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}