import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import getSalesAndBookingData from '../data/getSalesAndBookingData'

const SaleAndBookingCard = async ({year}: {year?: number}) => {

    const salesAndBookingData = await getSalesAndBookingData(year)
    const { totalSales, totalBookings } = salesAndBookingData.data || { totalSales: 0, totalBookings: 0 };

  return (
    <div className='flex gap-4 p-4 w-full'>
        <Card className="bg-zinc-600 border-zinc-600 w-1/2">
          <CardHeader className='text-lg font-semibold'>
            Total Sales
          </CardHeader>
          <CardContent>
            ${totalSales}
          </CardContent>
        </Card>
        <Card className="bg-zinc-600 border-zinc-600 w-1/2">
          <CardHeader className='text-lg font-semibold'>
           Total Bookings
          </CardHeader>
          <CardContent>
            { totalBookings}
          </CardContent>
        </Card>
      </div>
  )
}

export default SaleAndBookingCard