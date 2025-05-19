"use client";
import Header from "@/components/Header";
import UpdateProfile from "@/components/UpdateProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  return (
    <>
      <UpdateProfile />
    </>
  );
};

export default page;

