"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MoonLoader from "react-spinners/MoonLoader";

const Header = () => {
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
  
      if(status === "loading"){
        <MoonLoader size={10} />
      }
    }, [status, router]);

  return (
    <nav className="flex justify-between items-center py-2 lg:py-4 px-8 border-b-4 border-slate-400">
      <div className="Logo px-2 md:text-2xl lg:text-4xl font-bold text-blue-600">
        {" "}
        <Link href="/"> Roomiee </Link>{" "}
      </div>
      <div className="flex bg-gray-200 rounded-md p-1 gap-1 border-2 border-slate-400">
        <div>
          <button className="hover:bg-gray-300 transition-all rounded-sm px-1">
            Dashboard
          </button>
        </div>
        <div>
          <button className="hover:bg-gray-300 transition-all rounded-sm px-1">
            Bookings
          </button>
        </div>
        {/* Add the session logic here */}
        {session ? (
          <div>
            {" "}
            <button className="hover:bg-gray-300 transition-all rounded-sm px-1">
              <Link href="/user/profile">Profile</Link>
            </button>
          </div>
        ) : (
          ""
        )}

        {session ? (
          <div className="hover:bg-gray-300 transition-all rounded-sm px-1">
            <SignOutButton />
          </div>
        ) : (
          <button className="hover:bg-gray-300 transition-all rounded-sm px-1">
            <Link href="/signin">Login</Link>
          </button>
        )}

        {/* Finish the session logic here */}
      </div>
    </nav>
  );
};

export default Header;
