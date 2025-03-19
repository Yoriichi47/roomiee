import { prisma } from "@/prisma";
import bcrypt from "bcrypt";  //Use @types/bcrypt if you are using typescript
import { NextRequest, NextResponse } from "next/server";

export const registerUser = async (req: NextRequest) => {

    const body = await req.json()

    const {name, email, password} = body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }  // USe hashed password as the type of password that will be go to the database
    })

    return NextResponse.json({success: true, Details: user})
}

