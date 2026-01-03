import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react'
import SaleAndBookingCard from '../../components/SaleAndBookingCard';
import { DashboardChart } from '../../components/DashboardChart';

const page = async ({searchParams}: {searchParams: Promise<{year?: string}>}) => {
  const year = (await searchParams).year
  let parsedYear = year ? Number(year) : new Date().getFullYear();

  if(!parsedYear || isNaN(parsedYear)) {
    parsedYear = new Date().getFullYear();
  }

  return (
    <Card className="bg-zinc-700 rounded-l-none w-full border-zinc-700">
      <CardHeader className="text-center text-2xl underline underline-offset-1 font-semibold">Dashboard</CardHeader>
      <DashboardChart year={parsedYear} /> 
      <SaleAndBookingCard  year={parsedYear} />
    </Card>
  );
};
export default page