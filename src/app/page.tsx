
import HomePage from "@/components/HomePage";
import { Metadata } from "next";


interface PageProps {
  searchParams: {
    city?: string;
    state?: string;
    country?: string;
    [key: string]: string | string[] | undefined;
  };
}

const fetchRoomDetail = async (searchParams: PageProps['searchParams']) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Handle text inputs
    if (searchParams.city) queryParams.append('city', searchParams.city);
    if (searchParams.state) queryParams.append('state', searchParams.state);
    if (searchParams.country) queryParams.append('country', searchParams.country);
    
    // Handle any other parameters
    const otherKeys = Object.keys(searchParams).filter(
      key => !['city', 'state', 'country'].includes(key)
    );
    
    for (const key of otherKeys) {
      const value = searchParams[key];
      if (typeof value === 'string') {
        queryParams.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(val => queryParams.append(key, val));
      }
    }
    
    const queryString = queryParams.toString();
    const url = `http://localhost:3000/api/rooms${queryString ? `?${queryString}` : ""}`;
    
    const res = await fetch(url);
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
  const rooms = await fetchRoomDetail(searchParams);

  // Prepare initial filters for the search bar
  const initialFilters = {
    city: searchParams.city || "",
    state: searchParams.state || "",
    country: searchParams.country || "",
  };

  return (
    <>
      <HomePage rooms={rooms} initialFilters={initialFilters} />
    </>
  );
}