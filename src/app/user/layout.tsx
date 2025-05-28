"use client"
import UserOptions from "@/components/UserOptions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

interface props {
  children: React.ReactNode;
}

const userLayout =  ({ children }: props) => {

  const { data: session, status } = useSession({required: true});
  const router = useRouter()

    if(status === "loading") {
      return (
      <div className=" flex justify-center items-center h-screen">
      <MoonLoader size={50} />
      </div>)
    }


  return (
    <>
      <div className="flex justify-center my-2">
        <h1 className="font-bold m-2 text-4xl">User Settings</h1>
      </div>
      <div className="flex">
        <div className="w-1/5 pt-20">
          {" "}
          <UserOptions />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </>
  );
};

export default userLayout;
