import { deleteRoom, newRoom, updateRoom } from "@/app/controllers/roomControllers"
import { createEdgeRouter } from "next-connect"
import { NextRequest } from "next/server"

interface RequestContext{
    params: {
        roomId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.put(updateRoom)
router.delete(deleteRoom)

export async function PUT(request:NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}

export async function DELETE(request:NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}