import { auth, signOut } from "@/auth";
// import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session) {
    await signOut();
    // redirect("/");
  }
  return <div>Signing Out</div>;
};

export default page;
