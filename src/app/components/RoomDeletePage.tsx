"use client";
import Image from "next/image";
import { deleteRoomById } from "@/app/data/RoomDataFunctions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  description: string;
  price: number;
  images: string[];
  Street: string;
  State: string;
  City: string;
  Country: string;
  ZipCode: string;
  guestCapacity: number;
  Beds: number;
  isAirConditioned: boolean;
  isWifiAvailable: boolean;
  isBreakfastAvailable: boolean;
};

type roomDataType = {
  roomId: string;
  name: string;
  description: string;
  price: number;
  Street: string;
  State: string;
  City: string;
  Country: string;
  ZipCode: string;
  guestCapacity: number;
  Beds: number;
  isAirConditioned: boolean;
  isWifiAvailable: boolean;
  isBreakfastAvailable: boolean;
  images: string[];
};

export default function RoomDeletePage({
  roomData,
}: {
  roomData: roomDataType;
}) {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: roomData?.name,
      description: roomData?.description,
      price: roomData?.price,
      images: roomData?.images || [],
      Street: roomData?.Street,
      State: roomData?.State,
      City: roomData?.City,
      Country: roomData?.Country,
      ZipCode: roomData?.ZipCode,
      guestCapacity: roomData?.guestCapacity,
      Beds: roomData?.Beds,
      isAirConditioned: roomData?.isAirConditioned || false,
      isWifiAvailable: roomData?.isWifiAvailable || false,
      isBreakfastAvailable: roomData?.isBreakfastAvailable || false,
    },
  });

  const onSubmit = async () => {
    try {
      const result = await deleteRoomById(roomData.roomId);

      if (result.success) {
        alert(result.message || "Room deleting successfully");
        form.reset();
        router.push(`/admin/rooms`);
      } else {
        alert(result.message || "Failed to deleting room");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error deleting room:", errorMessage);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Card className="w-full bg-zinc-700 border-zinc-700">
        <CardHeader className="text-center text-2xl underline underline-offset-2 font-semibold">
          Delete Room
        </CardHeader>
        <CardContent>
          <Card className="bg-zinc-600 border-zinc-600">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                  disabled={form.formState.isSubmitting}
                  className="grid-cols-2 gap-8 grid p-4"
                >
                  <FormField
                    disabled
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Name</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-zinc-500"
                            type="text"
                            placeholder="Enter room name"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Description</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-zinc-500"
                            type="text"
                            placeholder="Enter room description"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Price per night</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border border-zinc-500"
                            placeholder="Enter room price per night"
                            min={0}
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Room Images</FormLabel>
                        <FormControl>
                          <div className="flex flex-wrap gap-4">
                            {roomData.images.map((image, index) => (
                              <Image
                                key={index}
                                width={150}
                                height={150}
                                className="rounded-xl"
                                alt={`Room Image ${index + 1}`}
                                src={image}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="Street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="border border-zinc-500"
                            placeholder="Enter street"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="State"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="border border-zinc-500"
                            placeholder="Enter state"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="City"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="border border-zinc-500"
                            placeholder="Enter city"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="Country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="border border-zinc-500"
                            placeholder="Enter country"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="ZipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="border border-zinc-500"
                            placeholder="Enter zip code"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="guestCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Capacity</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-zinc-500"
                            type="number"
                            placeholder="Enter guest capacity"
                            min={1}
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="Beds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beds</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border border-zinc-500"
                            placeholder="Enter beds"
                            min={1}
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="isAirConditioned"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Conditioning</FormLabel>
                        <FormControl>
                          <RadioGroup disabled value={field.value ? "Yes" : "No"}>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="Yes" id="ac-yes" />
                              <Label
                                htmlFor="ac-yes"
                                className="cursor-pointer"
                              >
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="No" id="ac-no" />
                              <Label htmlFor="ac-no" className="cursor-pointer">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="isWifiAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WiFi Available</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value ? "Yes" : "No"}
                            disabled
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="Yes" id="wf-yes" />
                              <Label
                                htmlFor="wf-yes"
                                className="cursor-pointer"
                              >
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="No" id="wf-no" />
                              <Label htmlFor="wf-no" className="cursor-pointer">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled
                    control={form.control}
                    name="isBreakfastAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breakfast Available</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value ? "Yes" : "No"}
                            disabled
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="Yes" id="bf-yes" />
                              <Label
                                htmlFor="bf-yes"
                                className="cursor-pointer"
                              >
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="No" id="bf-no" />
                              <Label htmlFor="bf-no" className="cursor-pointer">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2">
                    <Button
                      type="submit"
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Deleting Room..."
                        : "Delete Room"}
                    </Button>
                  </div>
                </fieldset>
              </form>
            </Form>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}