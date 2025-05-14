"use client"
import { useSession } from "next-auth/react";
import { signUp } from "@/signupAction"
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AlertCircleIcon } from "lucide-react";


const page = () => {

  const { data: session } = useSession();

  const [OriginalPassword, setOriginalPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [email, setEmail] = useState("");

  console.log("original Password: ", OriginalPassword);
  console.log("Re-enter: ", matchPassword);

const handleSubmit = async (event: React.FormEvent) => {

  event.preventDefault();

  if (OriginalPassword !== matchPassword) {
    alert("Passwords do not match");
    return;
  }

  const res = await signUp( email, OriginalPassword)

  if (res.success) {
    alert(res.message);
    redirect("/signin");
  } else if (res.message === "User already exists") {
    alert(res.message);
    redirect("/signin");
  } else {
    alert(res.message);
  }

}

  if (session) {
    redirect("/");
  }

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
          <div className="text-center ">
            <h1 className="text-3xl font-bold">Create an Account</h1>
          </div>
          <form
          onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-4">
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  type="password"
                  value={OriginalPassword}
                  onChange={(e) => setOriginalPassword(e.target.value)}
                  placeholder="Enter your Password"
                  name="password"
                />
              </div>
              <div className="">
                <input
                  className="p-2 border-2 focus:shadow-lg w-full rounded-md"
                  required
                  type="password"
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  placeholder="Re-enter your Password"
                  name="matchPassword"
                />
              </div>
              <button
                className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
                type="submit">
                {" "}
                Sign Up{" "}
              </button>
            </div>
          </form>
          <div className="flex justify-around items-center">
            <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
            <p className="text-sm font-semibold mx-2">OR</p>
            <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
          </div>
          <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
            <Link href={"/signin"}>Sign in</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;

// export default page;
// import { auth, signIn } from "@/auth";
// import { signUp } from "@/signupAction";
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
//             <h1 className="text-3xl font-bold">Create an Account</h1>
//           </div>
//           <form
//             className="flex w-full gap-4"
//             action={async (formData: FormData) => {
//               "use server";
//               const res = await signUp(formData);
//               console.log(res);
//               if (res.success) {
//                 redirect("/signin");
//               }
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
//                   placeholder="Enter your Password"
//                   name="password"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="p-2 border-2 focus:shadow-lg w-full rounded-md"
//                   required
//                   type="password"
//                   placeholder="Re-enter your Password"
//                   name="matchPassword"
//                 />
//               </div>
//               <button
//                 className="p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
//                 type="submit">
//                 {" "}
//                 Sign Up{" "}
//               </button>
//             </div>
//           </form>
//           <div className="flex justify-around items-center">
//             <div className="LeftLine h-[2px] bg-gray-400 w-full"> </div>
//             <p className="text-sm font-semibold mx-2">OR</p>
//             <div className="RightLine h-[2px] bg-gray-400 w-full"> </div>
//           </div>
//           <button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 border-2 border-black transition-colors">
//             <Link href={"/signin"}>Sign in</Link>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

