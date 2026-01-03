"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Cross, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton, useAuth, useUser } from "@clerk/nextjs";

const Header = () => {

  const [searchBox, setSearchBox] = React.useState(false);
  const [city, setCity] = React.useState(""); 
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("");
  const { user } = useUser();

    const userRole = user?.publicMetadata?.role as string | undefined;
  const isAdmin = userRole === "adminrole";

  const router = useRouter()

  const submitSearch = () => {
  if (!city && !state && !country) return;

  const params = new URLSearchParams();

  if (city) params.set("city", city.trim());
  if (state) params.set("state", state.trim());
  if (country) params.set("country", country.trim());
  setSearchBox(false);

  router.push(`/?${params.toString()}`);
};

  return (
    <nav className="flex justify-between bg-zinc-700 p-4 items-center">
      <div className="logo text-4xl font-bold"><Link href="/">
      <Image 
      src="/Logo_DarkMode.png" 
      height={200}
      width={200}
      alt="Roomie Logo"
      className="h-10 w-auto"
      />
      </Link></div>
      <div className="right flex items-center gap-4">
           <div
          className={`flex gap-2 items-center transition-all duration-300 ease-in-out transform ${
            searchBox
              ? "opacity-100 scale-100 translate-x-0 visible"
              : "opacity-0 scale-95 -translate-x-2 invisible"
          }`}
        >
          <Input
            className="bg-zinc-800 hover:bg-zinc-900"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="City"
          />
          <Input
            className="bg-zinc-800 hover:bg-zinc-900"
            type="text"
            onChange={(e) => setState(e.target.value)}
            name="state"
            placeholder="State"
          />
          <Input
            className="bg-zinc-800 hover:bg-zinc-900"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            placeholder="Country"
          />
          <Button onClick={submitSearch} className="bg-zinc-800 hover:bg-zinc-900">
            <Search />
          </Button>
        </div>
        <Button onClick={() => {setSearchBox(!searchBox)}} className="bg-zinc-800 hover:bg-zinc-900">{searchBox ? <span className="rotate-45"><Cross strokeWidth={0.7} /></span> : <Search />}</Button>
        

        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-zinc-800">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 border-none bg-zinc-500">
        <DropdownMenuLabel className="bg-zinc-500 text-zinc-200 ">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignedIn>
        {isAdmin && (
          <DropdownMenuItem className="hover:bg-zinc-600"><Link href="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
        )}
        <DropdownMenuItem className="hover:bg-zinc-600"><Link href="/bookings">Bookings</Link></DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-zinc-600"><Link href="/profile">Profile</Link></DropdownMenuItem>
        {!isAdmin && (<DropdownMenuItem className="hover:bg-zinc-600"><Link href="/adminrequest">Become Admin</Link></DropdownMenuItem>)}
        <DropdownMenuSeparator />
        <DropdownMenuItem><SignOutButton redirectUrl="/"><Button className="text-center mx-auto bg-red-600 hover:bg-red-700 w-full">Sign Out</Button></SignOutButton></DropdownMenuItem>
        </SignedIn>
        <SignedOut>
        <DropdownMenuItem><Link className="w-full" href="/sign-in"><Button className="text-center mx-auto bg-green-600 hover:bg-green-700 w-full"> Sign in </Button></Link></DropdownMenuItem>
        </SignedOut> 
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
