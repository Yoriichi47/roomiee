// import { auth, signIn } from "@/auth";
// import { executeAction } from "@/executeAction";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import React from "react";
// import { IoHomeOutline } from "react-icons/io5";

// const page = async () => {
//   const session = await auth();

//   if (session) {
//     redirect("/");
//   }
//   return (
//     <>
//     <div className="HomeButton sticky top-1 mx-1">
//           <button className="flex items-center gap-2 bg-gray-200 rounded-md border-2 border-slate-400  hover:bg-gray-300 transition-all p-1">
//             <IoHomeOutline />
//             <Link href="/">Home</Link>
//             </button>
//         </div>
//       <div className="bg-gray-100 flex justify-center items-center min-h-screen">
//         <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
//           <div className="text-center ">
//             <h1 className="text-3xl font-bold">Sign In</h1>
//           </div>
//           <form
//             className="flex w-full gap-4"
//             action={async (formData: FormData) => {
//               "use server";
//               await executeAction({
//                 actionFn: async () => {
//                   await signIn("credentials", formData);
//                 },
//               });
//             }}
//           >
//             <div className="flex w-full flex-col gap-4">
//               <div className="">
//                 <input
//                   className="p-2 border-2 focus:shadow-lg w-full rounded-md"
//                   required
//                   name="email"
//                   placeholder="Enter your email"
//                   type="email"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="p-2 border-2 focus:shadow-lg w-full rounded-md"
//                   required
//                   type="password"
//                   placeholder="Enter you Password"
//                   name="password"
//                 />
//               </div>
//               <button
//                 className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
//                 type="submit"
//               >
//                 {" "}
//                 Sign In{" "}
//               </button>
//             </div>
//           </form>
//           <div className="flex justify-around items-center">
//                 <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
//                 <p className="text-sm font-semibold mx-2">OR</p>
//                 <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
//               </div>
//               <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
//                 <Link href={"/signup"}>Sign Up</Link>
//               </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="HomeButton sticky top-1 mx-1">
        <button className="flex items-center gap-2 bg-gray-200 rounded-md border-2 border-slate-400  hover:bg-gray-300 transition-all p-1">
          <IoHomeOutline />
          <Link href="/">Home</Link>
        </button>
      </div>
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="bg-white flex flex-col transform transition-all shadow-2xl border-2 p-6 w-[30vw] gap-4 rounded-2xl border-black">
          <h1 className="text-3xl font-bold text-center">Sign In</h1>

          {error && (
            <p className="text-red-600 text-center text-sm flex items-center justify-center gap-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              required
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 border-2 focus:shadow-lg w-full rounded-md"
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-around items-center">
            <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
            <p className="text-sm font-semibold mx-2">OR</p>
            <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
          </div>
          <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
            <Link href={"/signup"}>Sign Up</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
