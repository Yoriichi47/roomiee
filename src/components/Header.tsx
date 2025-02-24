"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"

const Header = () => {
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className="flex justify-between bg-black items-center py-4 px-8 border-b-4 border-slate-400">
      <div className="Logo px-2 md:text-lg lg:text-4xl border-b-4 border-red-500 font-bold text-purple-600"> <Link href="/"> Roomiee </Link> </div>
      <div className="hidden lg:block">
      <Menubar className="bg-gray-100 border-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-gray-200 transition-all">Dashboard</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
      <MenubarTrigger className="hover:bg-gray-200 transition-all">Bookings</MenubarTrigger>
      </MenubarMenu>
      {/* Add the session logic here */}
      <MenubarMenu>
      <MenubarTrigger className="hover:bg-gray-200 transition-all">Login</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
      <MenubarTrigger className="hover:bg-gray-200 transition-all">User</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>Profile</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* Finish the session logic here */}
    </Menubar>
    </div>
    </nav>
  );
};

export default Header;
