import { allRooms, getRoomByLocation } from '@/app/controllers/roomControllers'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext{
    params: Promise<{city?: string; state?: string; country?: string}>
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.get(allRooms)
// router.get(getRoomByLocation)

export async function GET(request:NextRequest, ctx: RequestContext) {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const country = searchParams.get("country")
    console.log({city, state, country})
    
    ctx.params = Promise.resolve({
        city: city ?? undefined,
        state: state ?? undefined,
        country: country ?? undefined
    })

    return router.run(request, ctx)
}