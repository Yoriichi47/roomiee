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


export const updateUser = async (req: NextRequest) => {

    const body = await req.json()

    const userData = {
        name: body.name,
        email: body.email,
        exisitingEmail: body.exisitingEmail
        // id: body.id
    }

    try {

        if(userData.email !== "" && userData.name === ""){
            
            const updateUser = await prisma.user.update({
                where: {
                    email: userData.exisitingEmail
                } ,
                data: {
                    email: userData.email
                }
            })

            return NextResponse.json({success: true, Details: updateUser, message: 'Email updated successfully'})

        } else if(userData.name !== "" && userData.email === ""){
            
            const updateUser = await prisma.user.update({
                where: {
                    email: userData.exisitingEmail
                } ,
                data: {
                    name: userData.name,
                }
            })
            
            return NextResponse.json({success: true, Details: updateUser, message: 'Name updated successfully'})

        } else {
            
            const updateUser = await prisma.user.update({
                where: {
                    email: userData.exisitingEmail
                } ,
                data: {
                    name: userData.name,
                    email: userData.email
                }
            })
            
            return NextResponse.json({success: true, Details: updateUser, message: "User updated successfully"})

        }
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({success: false, message: error.message})   
        }
    }
}

