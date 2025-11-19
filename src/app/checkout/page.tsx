// "use client";
import { GuestInfo } from "@/app/components/GuestInfo";
import getRoomDetails from "@/app/data/getRoomDetails";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Header from "../components/Header";

const page = async ({ searchParams }: { searchParams: Promise<{ roomId: string }> }) => {
  const roomId = (await searchParams).roomId;
  
  if (!roomId) {
    return <div className="min-h-screen flex items-center justify-center">An error occurred while getting id{roomId}.</div>;
  }

  const data = await getRoomDetails({ roomId });

  return (
    <>
    <Header />
      <div className="w-full p-10 gap-10 flex flex-col">
        <h1 className="text-4xl text-center font-bold">Summary</h1>
        <Card className="p-6 flex flex-col rounded-2xl bg-zinc-800 m-auto gap-6 border-zinc-800">
          <div className="flex gap-6 ">
            <div className="RoomDetails w-1/2 text-zinc-200">
              <Card className="flex flex-col p-4 gap-4 min-h-full bg-zinc-700 border-zinc-700">
                <CardTitle className="text-center text-2xl underline underline-offset-2">
                  Room Details
                </CardTitle>
                <span>
                  <p className="font-semibold">{data.name}</p>
                  <p>
                    {data.Street}, {data.City}, {data.State}, {data.ZipCode}
                  </p>
                </span>
                <span className="w-full">
                  <Image
                    className="rounded-lg m-auto"
                    src={data.images[0]}
                    alt="Room Image"
                    width={300}
                    height={200}
                  />
                </span>
                <span>
                  <span className="font-semibold">${data.price}</span>/night
                </span>
              </Card>
            </div>
            <div className="CenterSection">
              <Card className="flex flex-col p-4 gap-4 min-h-full bg-zinc-700 border-zinc-700 w-full">
                <CardTitle className="text-center text-2xl underline underline-offset-2">
                  Guest Details
                </CardTitle>
                <CardContent>
                  <GuestInfo
                  roomId={data.roomId}
                    totalPrice={data.price}
                    maxGuests={data.guestCapacity}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div className="CheckoutSection">
              <Card className="flex flex-col p-4 gap-4 bg-zinc-700 border-zinc-700 w-full">
                <CardTitle className="text-center text-2xl underline underline-offset-2">
                  Checkout
                </CardTitle>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default page;
