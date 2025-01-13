"use client";
import React, { useState } from "react";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"

import { Button } from "./ui/button";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b-4">
      <div className="Logo px-2"> Roomiee </div>
      <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Dashboard</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Bookings</MenubarTrigger>
      </MenubarMenu>
      {/* Add the session logic here */}
      <MenubarMenu>
        <MenubarTrigger>Login</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>User</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>Profile</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* Finish the session logic here */}
    </Menubar>
    </nav>
  );
};

export default Header;
