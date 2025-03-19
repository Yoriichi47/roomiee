import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const enteredEmail = credentials.email as string;
        const enteredPassword = credentials.password as string

        if (
          credentials.email ===
          prisma.user.findUnique({ where: { email: enteredEmail } })
        ) {
            redirect("/")
            // return { email: enteredEmail, password: enteredPassword };
        } else {
          const user = await prisma.user.create({ data: {
            name: enteredEmail.split("@")[0],
            email: enteredEmail,
            password: enteredPassword,
          } });
          return { email: user.email, password: user.password };
        }
      },
    }),
  ],
});
