"use server"
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { signIn } from "./auth";

const signinAction = async (email:string, password: string) => {
   console.log("Email: ", email, "and Password: ", password)
    const userPassword = await prisma.user.findFirst({
        where: {
            email: email,
        },
        select: {
            password: true,
        },
    })

    console.log("User Password: ", userPassword?.password)

    const isMatched = await bcrypt.compare(password, userPassword?.password || "");

    console.log("Is Matched: ", isMatched)

    if (!isMatched) {
        return { success: false, message: "Invalid email or password" };
    }

    // await signIn("credentials",{
    //     email: email,
    //     password: userPassword?.password,
    //     redirect: false,
    // }
    // )
}

export {signinAction}