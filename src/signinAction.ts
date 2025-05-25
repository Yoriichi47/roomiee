// "use server"
// import bcrypt from "bcrypt";
// import { prisma } from "./prisma";

// const signinAction = async (email:string, password: string) => {
   
//     const userPassword = await prisma.user.findFirst({
//         where: {
//             email: email,
//         },
//         select: {
//             password: true,
//         },
//     })

//     if(!userPassword) {
//         return { success: false, message: "User not found" };
//     }

//     const isMatched = await bcrypt.compare(password, userPassword?.password || "");

//     if (!isMatched) {
//         return { success: false, message: "Invalid password" };
//     }

//     return { success: true, message: "Password matches", dbPassword: userPassword?.password };
// }

// export {signinAction}