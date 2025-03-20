// "use client";
import React from "react";
import Link from "next/link";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { auth, signOut } from "@/auth";
import SignOutButton from "./SignOutButton";

const Header = async () => {
  // const [dropDown, setDropDown] = useState(false);

  // const handleDropDown = () => {
  //   setDropDown(!dropDown);
  // };

  const session = await auth()

  return (
    <nav className="flex justify-between items-center py-2 lg:py-4 px-8 border-b-4 border-slate-400">
      <div className="Logo px-2 md:text-2xl lg:text-4xl font-bold text-purple-600"> <Link href="/"> Roomiee </Link> </div>
      <div className="hidden md:block">
      <Menubar className="bg-gray-100 border-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 transition-all">Dashboard</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
      <MenubarTrigger className="hover:bg-gray-200 transition-all">Bookings</MenubarTrigger>
      </MenubarMenu>
      {/* Add the session logic here */}
      <MenubarMenu>

      { session ? <MenubarTrigger className="hover:bg-gray-200 transition-all"><SignOutButton /></MenubarTrigger> : <MenubarTrigger className="hover:bg-gray-200 transition-all"><Link href="/signin">Login</Link></MenubarTrigger>}
      
      </MenubarMenu>
      
      {session ? <MenubarMenu> <MenubarTrigger className="hover:bg-gray-200 transition-all"><Link href="/signin">Dashboard</Link></MenubarTrigger></MenubarMenu>: ""}

      {/* Finish the session logic here */}
    </Menubar>
    </div>
    </nav>
  );
};

export default Header;
