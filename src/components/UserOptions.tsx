"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaRegUser, FaRegImages } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const UserOptions = () => {
  const pathName = usePathname();

  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === "unauthenticated"){
      router.push("/signin")
    }
  }, [status, router])
  

  const menuOptions = [
    {
      name: "Update Profile",
      link: "/user/profile",
      icon: <FaRegUser />,
    },
    {
      name: "Update Picture",
      link: "/user/picture",
      icon: <FaRegImages />,
    },
    {
      name: "Update Password",
      link: "/user/password",
      icon: <RiLockPasswordLine />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-2">
      {menuOptions.map((item, index) => {
        const isActive = pathName === item.link;

        return (
          <Link
            key={index}
            href={item.link}
            className={`flex items-center justify-center gap-2 p-2 rounded-lg border-2 font-semibold transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl ${
              isActive ? "bg-black text-white" : "bg-white hover:bg-gray-50 text-black"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default UserOptions;
