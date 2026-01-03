import React from "react";
import Header from "../components/Header";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const page = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-start ">
        <Card className="mt-10 w-full max-w-4xl bg-zinc-800 border-zinc-800 text-zinc-100">
          <CardHeader className="text-center text-4xl underline underline-offset-2 font-bold">
            Become an Admin
          </CardHeader>
          <CardContent>
            <Card className="bg-zinc-700 w-4/5 m-auto border-zinc-700">
              <CardContent className="text-center p-6">
                <p>
                  To become an admin, please contact the current administrator
                  at{" "}
                  <a
                    href="mailto:misctask3@gmail.com"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    misctask3@gmail.com
                  </a>
                  .
                </p>
                <p>
                  You will need to provide your email and full name for
                  verification purposes.
                </p>
                <p>You&apos;ll hear back within 48 hours.</p>
              </CardContent>
            </Card>
            <Link href={"/"}>
              <p className="text-zinc-500 text-center pt-2 text-sm underline underline-offset-1">
                Back to Home
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
