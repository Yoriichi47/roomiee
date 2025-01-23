import HomePage from "@/components/HomePage";

const fetchRoomDetail = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/rooms");
    const data = await res.json();

    if (data?.success && Array.isArray(data.rooms)) {
      return data.rooms;
    }

    return [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("error:", error.stack);
    }
  }
};

export default async function page() {
  const rooms = await fetchRoomDetail();

  return (
    <>
      <HomePage rooms={rooms} />
    </>
  );
}
