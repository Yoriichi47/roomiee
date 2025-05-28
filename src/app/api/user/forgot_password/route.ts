import { createEdgeRouter } from 'next-connect'
import { NextRequest } from 'next/server'
import { AuthenticationChecker } from '@/middleware/auth';
import { forgotPassword } from '@/app/controllers/authController';

interface RequestContext{
    params: Promise<{password?: string, email?: string}>
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.put(forgotPassword)

export async function PUT(request: NextRequest, ctx: RequestContext){
    return router.run(request, ctx)
}