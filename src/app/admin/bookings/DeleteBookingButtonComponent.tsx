"use client"
import { deleteAdminBooking } from "@/app/data/deleteAdminBooking";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteBookingButtonComponent = ({ bookingId }: {bookingId: string}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    setIsDeleting(true);
    const res = await deleteAdminBooking(bookingId);

    if(res.success){
      alert("Booking deleted successfully");
      router.push('/admin/bookings');
    } else {
      alert("An error occurred while deleting the booking");
    }
    setIsDeleting(false);
  }

  return (
    <Button
      onClick={() => handleDeleteBooking(bookingId)}
      className="bg-zinc-600 hover:bg-zinc-700 transition-all"
      disabled={isDeleting}
    >
      <span className="flex gap-2 items-center">
        <TrashIcon /> {isDeleting ? "Deleting..." : "Delete"}
      </span>
    </Button>
  );
};

export default DeleteBookingButtonComponent;