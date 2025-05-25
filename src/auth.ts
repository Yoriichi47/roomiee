import NextAuth, { CredentialsSignin } from "next-auth";
import { encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from "./zod";
import { isValid } from "zod";
import { error } from "console";

const adapter = PrismaAdapter(prisma as any);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          const validatedCredentials = schema.parse(credentials);

          const userPassword = await prisma.user.findFirst({
            where: {
              email: validatedCredentials.email,
            },
          })

          if(!userPassword) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(
            validatedCredentials.password,
            userPassword?.password || ""
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: validatedCredentials.email,
              password: userPassword?.password || "",
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          return user;

        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in authorize: ", error.message);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  // session:{
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in Token");
        }

        const createSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createSession) {
          throw new Error("Failed to create a session");
        }
        return sessionToken;
      }
      return encode(params);
    },
  },
});
