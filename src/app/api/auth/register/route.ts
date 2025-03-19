import { registerUser } from "@/app/controllers/authController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.post(registerUser);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
