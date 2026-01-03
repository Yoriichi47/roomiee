import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { isAdmin } from './lib/auth-utils'

const isPublicRoute = createRouteMatcher([
  '/',
  '/rooms(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/stripe',
])



export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [    
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}