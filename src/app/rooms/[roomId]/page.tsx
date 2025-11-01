import getRoomDetails from "@/app/data/getRoomDetails";
import React from "react";
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageCarousel from "@/app/components/ImageCarousel";
import { Button } from "@/components/ui/button";

const page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params;

  const data = await getRoomDetails({ roomId });

  return (
    <>
      <div className="min-h-screen p-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-zinc-400" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <Card className="mt-4 p-6 border-zinc-800 bg-zinc-800 text-zinc-100">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-semibold">{data.name}</h1>
              <p className="text-zinc-400">
                {data.Street}, {data.City}, {data.State}, {data.Country},{" "}
                {data.ZipCode}
              </p>
            </div>
            <div className="flex min-w-full justify-evenly gap-6">
              <div className="flex flex-col md:flex-row gap-6 max-w-[80%]">
                <div className="w-full md:w-[60%]">
                  <ImageCarousel images={data.images} />
                </div>
                <div className="w-full md:w-[40%]">
                  <p className="text-zinc-200 leading-relaxed text-base">
                    {data.description}
                  </p>
                </div>
              </div>
               <div className="w-[2px] bg-zinc-500"></div>
              <div className="bg-zinc-600 rounded-xl max-w-[20%] p-6 shadow-lg space-y-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-semibold">${data.price}</h2>
                  <span className="text-zinc-400 text-sm">/night</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>

                <div className="mt-4 space-y-2">
                  <p>👥 Guests: {data.guestCapacity}</p>
                  <p>🛏 Beds: {data.Beds}</p>
                  <p>
                    ❄ Air Conditioning: {data.isAirConditioned ? "Yes" : "No"}
                  </p>
                  <p>📶 Wi-Fi: {data.isWifiAvailable ? "Yes" : "No"}</p>
                  <p>
                    🥐 Breakfast: {data.isBreakfastAvailable ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default page;
