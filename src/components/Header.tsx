// "use client";
import React from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import SignOutButton from "./SignOutButton";

const Header = async () => {

  const session = await auth()

  return (
    <nav className="flex justify-between items-center py-2 lg:py-4 px-8 border-b-4 border-slate-400">
      <div className="Logo px-2 md:text-2xl lg:text-4xl font-bold text-blue-600"> <Link href="/"> Roomiee </Link> </div>
        <div className="flex bg-gray-200 rounded-md p-1 gap-1 border-2 border-slate-400">
          <div>
            <button className="hover:bg-gray-300 transition-all rounded-sm px-1">Dashboard</button>
          </div>
          <div>
            <button className="hover:bg-gray-300 transition-all rounded-sm px-1">Bookings</button>
          </div>
          {/* Add the session logic here */}
          <div>

            {session ? <div className="hover:bg-gray-300 transition-all rounded-sm px-1"><SignOutButton /></div> : <button className="hover:bg-gray-300 transition-all rounded-sm px-1"><Link href="/signin">Login</Link></button>}

          </div>

          {session ? <div> <button className="hover:bg-gray-300 transition-all"><Link href="/signin">Profile</Link></button></div> : ""}

          {/* Finish the session logic here */}
        </div>
      
    </nav>
  );
};

export default Header;
