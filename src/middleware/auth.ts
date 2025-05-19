import { auth } from "@/auth";
import next from "next";
import { NextRequest, NextResponse } from "next/server";


export const AuthenticationChecker = async (req: NextRequest, event: any, next: any) => {

const session = await auth()

if(!session){
    
    return NextResponse.json({
        message: "User not Logged In"
    }), {status: 401}
}
return next();
}