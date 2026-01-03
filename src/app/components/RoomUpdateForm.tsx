"use client";
import CloudinaryImageComponent from "@/app/components/CloudinaryImageComponent";
import { updateRoom } from "@/app/data/RoomDataFunctions";
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
}

export default function RoomUpdateForm({roomData}: {roomData: roomDataType}) {

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

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted with data:", data);

    // Validation
    if (!data.name) {
      alert("Room name is required");
      return;
    }

    if (!data.description) {
      alert("Description is required");
      return;
    }

    if (!data.price || data.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (!data.images || data.images.length === 0) {
      alert("At least one image is required");
      return;
    }

    if (
      !data.Street ||
      !data.City ||
      !data.State ||
      !data.Country ||
      !data.ZipCode
    ) {
      alert("All address fields are required");
      return;
    }

    if (!data.guestCapacity || data.guestCapacity < 1) {
      alert("Guest capacity must be at least 1");
      return;
    }

    if (!data.Beds || data.Beds < 1) {
      alert("Number of beds must be at least 1");
      return;
    }

    try {
      console.log("Sending to updateRoom:", data);

      const result = await updateRoom(roomData.roomId, data);

      console.log("Result from updateRoom:", result);

      if (result.success) {
        alert(result.message || "Room updated successfully");
        form.reset();
        router.push(`/admin/rooms/${roomData.roomId}`);
      } else {
        alert(result.message || "Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Card className="w-full bg-zinc-700 border-zinc-700">
        <CardHeader className="text-center text-2xl underline underline-offset-2 font-semibold">
          Update Room
        </CardHeader>
        <CardContent>
          <Card className="bg-zinc-600 border-zinc-600">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                  disabled={form.formState.isSubmitting}
                  className="grid-cols-2 gap-8 grid p-4"
                >
                  {/* All your FormFields remain the same */}
                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Room Images</FormLabel>
                        <FormControl>
                          <CloudinaryImageComponent
                            images={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
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
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isAirConditioned"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Air Conditioning</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value ? "Yes" : "No"}
                            onValueChange={(value) =>
                              field.onChange(value === "Yes")
                            }
                          >
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
                    control={form.control}
                    name="isWifiAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WiFi Available</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value ? "Yes" : "No"}
                            onValueChange={(value) =>
                              field.onChange(value === "Yes")
                            }
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
                    control={form.control}
                    name="isBreakfastAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breakfast Available</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value ? "Yes" : "No"}
                            onValueChange={(value) =>
                              field.onChange(value === "Yes")
                            }
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
                        ? "Updating Room..."
                        : "Update Room"}
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
