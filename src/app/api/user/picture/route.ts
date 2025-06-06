import { updateUser, updateUserPicture } from '@/app/controllers/authController';
import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { AuthenticationChecker } from '@/middleware/auth';

interface RequestContext{
    params: Promise<{picture?: string, email?: string}>
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.use(AuthenticationChecker).put(updateUserPicture)

export async function PUT(request: NextRequest, ctx: RequestContext){
    return router.run(request, ctx)
}