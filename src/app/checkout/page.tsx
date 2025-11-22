import getRoomDetails from "@/app/data/getRoomDetails";
import Header from "../components/Header";
import { CheckoutWrapper } from "../components/CheckoutWrapper";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string }>;
}) => {
  const roomId = (await searchParams).roomId;

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        An error occurred while getting id {roomId}.
      </div>
    );
  }

  const data = await getRoomDetails({ roomId });

  return (
    <>
      <Header />
      <div className="w-full p-10 gap-10 flex flex-col">
        <h1 className="text-4xl text-center font-bold">Summary</h1>
        <CheckoutWrapper room={data} />
      </div>
    </>
  );
};

export default Page;