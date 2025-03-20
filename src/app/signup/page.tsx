import { auth, signIn } from "@/auth";
import { signUp } from "@/signupAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <div className="text-center ">
            <h1 className="text-3xl font-bold">Create an Account</h1>
          </div>
          <form
            className="flex w-full gap-4"
            action={async (formData: FormData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) {
                redirect("/signin");
              }
            }}
          >
            <div className="flex w-full flex-col gap-4">
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  type="password"
                  placeholder="Enter you Password"
                  name="password"
                />
              </div>
              <button
                className="p-2 bg-black text-white rounded-md hover:bg-gray-950 transition-colors"
                type="submit"
              >
                {" "}
                Sign In{" "}
              </button>
              <Link href="/signin">Signin</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
