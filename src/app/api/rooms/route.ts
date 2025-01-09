import { allRooms } from '@/app/controllers/roomControllers'
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'

interface RequestContext{
    params: Promise<{city?: string; state?: string; country?: string; guestcapacity?: number; beds?: number; isbreakfastavailable?: boolean, isairconditioned?: boolean; iswifiavailable?: boolean}>
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
    const breakfast = searchParams.get("isbreakfastavailable") 
    const airconditioner = searchParams.get("isairconditioned") 
    const wifi = searchParams.get("iswifiavailable") 
    
    console.log({city, state, country, capacity, beds, breakfast})
    
    ctx.params = Promise.resolve({
        city: city ?? undefined,
        state: state ?? undefined,
        country: country ?? undefined,
        beds: beds ? parseInt(beds) : 0,
        guestcapacity: capacity ? parseInt(capacity) :  0,
        isbreakfastavailable: breakfast ? JSON.parse(breakfast) : undefined,
        isairconditioned: airconditioner ? JSON.parse(airconditioner) : undefined,
        iswifiavailable: wifi ? JSON.parse(wifi) : undefined
    })

    return router.run(request, ctx)
}