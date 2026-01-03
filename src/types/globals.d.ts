export {}

export type Roles = 'adminrole' | 'userrole'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}import { auth } from "@clerk/nextjs/server";

export type Roles = 'adminrole' | 'userrole'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  
  return sessionClaims?.metadata?.role === role;
}
