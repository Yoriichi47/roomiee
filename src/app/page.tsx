import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{
    city?: string;
    state?: string;
    country?: string;
    [key: string]: string | string[] | undefined;
  }>;
}

const fetchRoomDetail = async (searchParams: Awaited<PageProps['searchParams']>) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Handle text inputs
    if (searchParams.city) queryParams.append('city', searchParams.city);
    if (searchParams.state) queryParams.append('state', searchParams.state);
    if (searchParams.country) queryParams.append('country', searchParams.country);
    
    // Handle any other parameters
    const entries = Object.entries(searchParams);
    const otherEntries = entries.filter(
      ([key]) => !['city', 'state', 'country'].includes(key)
    );
    
    for (const [key, value] of otherEntries) {
      if (typeof value === 'string') {
        queryParams.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(val => queryParams.append(key, val));
      }
    }
    
    const queryString = queryParams.toString();
    const url = `http://localhost:3000/api/rooms${queryString ? `?${queryString}` : ""}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    if (data?.success && Array.isArray(data.rooms)) {
      return data.rooms;
    }

    return [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("error:", error.stack);
    }
    return [];
  }
};

export const metadata: Metadata = {
  title: "Homepage - Roomiee"
};

export default async function Page({ searchParams }: PageProps) {
  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;
  
  const rooms = await fetchRoomDetail(resolvedSearchParams);

  // Create initialFilters using resolved searchParams
  const initialFilters = {
    city: resolvedSearchParams.city || "",
    state: resolvedSearchParams.state || "",
    country: resolvedSearchParams.country || "",
  };

  const session = await auth()

  return (
    <>
      <Header />
      <HomePage rooms={rooms} initialFilters={initialFilters} />
      <Footer />
    </>
  );
}