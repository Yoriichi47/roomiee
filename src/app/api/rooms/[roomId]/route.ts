import { getRoomDetails, updateRoom } from "@/app/controllers/roomControllers"
import { createEdgeRouter } from "next-connect"
import { NextRequest } from "next/server"

interface RequestContext{
    params: {
        roomId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.get(getRoomDetails)

export async function GET(request:NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
