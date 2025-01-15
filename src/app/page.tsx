// "use client";
import RoomCard from "@/components/RoomCard";
// import { useEffect } from "react";
// import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home(){
  // useEffect(() => {
  //   toast.success("This is a trial success message!!!");
  //   toast.error("This is a trial error message!!!");
  // }, []);

  return (
    <>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      /> */}
      <RoomCard />
    </>
  );
};
