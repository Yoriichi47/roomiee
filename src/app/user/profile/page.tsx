"use client";
import UpdateProfile from "@/components/UpdateProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } 
  }, [status, router]);
  
  if (status === "loading") {
   return (
     <div className="flex justify-center items-center h-screen">
       <MoonLoader size={50} />
     </div>
   );
 }

  return (
    <>
      <UpdateProfile />
    </>
  );
};

export default page;

