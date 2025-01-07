import { allRooms } from '@/app/controllers/roomControllers'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext{
    params: Promise<{city?: string; state?: string; country?: string; guestcapacity?: number; beds?: number}>
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.get(allRooms)

export async function GET(request:NextRequest, ctx: RequestContext) {
    const searchParams = request.nextUrl.searchParams

    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const country = searchParams.get("country")
    const capacity = searchParams.get("guestcapacity")
    const beds = searchParams.get("beds")   
    
    console.log({city, state, country, capacity, beds})
    
    ctx.params = Promise.resolve({
        city: city ?? undefined,
        state: state ?? undefined,
        country: country ?? undefined,
        beds: beds ? parseInt(beds) : 0,
        guestcapacity: capacity ? parseInt(capacity) :  0
    })

    return router.run(request, ctx)
}