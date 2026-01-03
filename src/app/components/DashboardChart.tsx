"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { YearSelector } from "./YearSelector";
import { getSalesDataByMonth } from "../data/getSalesDataByMonth";

type ChartData = {
  month: string;
  sales: number;
};

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#2FB5EB",
  },
} satisfies ChartConfig;

export function DashboardChart({year}: {year: number; }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getSalesDataByMonth(year);
        if (result.success && result.data) {
          setChartData(result.data);
        }
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]); 

  return (
    <div className="p-4 pt-0">
      <Card className="bg-zinc-600 border-zinc-600">
        <CardHeader className="flex flex-row justify-between items-center w-full">
          <CardTitle className="text-lg font-semibold text-zinc-100">
            Sales stats for {year}
          </CardTitle>
          <YearSelector  />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-zinc-400">Loading chart data...</div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-zinc-400">No data available for {year}</div>
            </div>
          ) : (
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} stroke="#52525B" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: '#E4E4E7', fontSize: 12 }}
                  tickFormatter={(value) => value.slice(0, 3)} // Jan, Feb, etc.
                />
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent 
                    hideLabel 
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                  />} 
                />
                <Line
                  dataKey="sales"
                  type="linear"
                  stroke="#2FB5EB"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}