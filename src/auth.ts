import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const enteredEmail ="test@test.com"
        const enteredPassword = "PasswordTest"

        if (
          credentials.email ===
          enteredEmail && credentials.password === enteredPassword
        ) {
            return { email: enteredEmail, password: enteredPassword };
        } else {
         throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
