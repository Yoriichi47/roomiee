import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-zinc-100">
      <ShieldAlert className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
      <p className="text-zinc-400 mb-6">
        You don't have permission to access this page.
      </p>
      <Link href="/">
        <Button className="bg-zinc-800 hover:bg-zinc-700">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}