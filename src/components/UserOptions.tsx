import Link from "next/link";
import React from "react";
import { FaRegUser, FaRegImages } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const UserOptions = () => {
  
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
        {menuOptions.map((item, index) => (
            <button className="border-2 hover:bg-gray-50 font-semibold bg-white transition-all drop-shadow-lg hover:drop-shadow-xl duration-300 border-black rounded-lg" key={index}>
                <Link href={item.link}>
                <div className="flex items-center justify-center gap-2 p-2">
                {item.icon}
                {item.name}
                </div>
                </Link>
            </button>
        ))}
      </div>
    );
};

export default UserOptions;
