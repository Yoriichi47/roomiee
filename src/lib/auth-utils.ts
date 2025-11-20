import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export async function isAdmin() {
  const { userId, sessionClaims } = await auth();

  if (!userId) return false;

  const role = (sessionClaims?.publicMetadata as { role?: string })?.role;

  if (role === "adminrole") {
    return true;
  }

  return false;
}

export async function getUserRole(){
    const user = await currentUser()

    const role = user?.publicMetadata?.role as string || "userrole"

    return role
}

export async function elevateToAdmin(userId: string) {
    try {
        const adminCheck = await isAdmin()

        if(!adminCheck){
            return { success: false, error: "Unauthorized - Admin access required." }
        }

        const client = await clerkClient()

        await client.users.updateUser(userId, {
            publicMetadata: {
                role: "adminrole"
            }
        })

        return { success: true, message: "User elevated to admin" }
    } catch (error) {
        console.error("Error elevating user to admin:", error);
        return { success: false, error: "An error occurred while elevating user to admin." }
    }
    
}