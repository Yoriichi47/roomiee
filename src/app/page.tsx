import { Metadata } from "next";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Homepage - Roomiee",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; state?: string; country?: string }>;
}) {

  const {city, state, country} = await searchParams

  return (
    <>
      <Header />
      <HomePage city={city} state={state} country={country} />
      <Footer />
    </>
  );
}
