"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getYearData } from "../data/getYearData";
import { useRouter } from "next/navigation";

export function YearSelector() {
  const [years, setYears] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const defaultYear = new Date().getFullYear();

const router = useRouter()

  React.useEffect(() => {
    const fetchYears = async () => {
      try {
        const yearArray = await getYearData();
        setYears(yearArray);
      } catch (error) {
        console.error("Error fetching years:", error);
        setYears([defaultYear]);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, [defaultYear]);

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className="bg-zinc-500 border-zinc-500 w-[120px]">
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }


  return (
     <Select 
      defaultValue={defaultYear.toString()}
      onValueChange={(value) => {
        router.push(`/admin/dashboard?year=${value}`); 
      }}
    >
      <SelectTrigger className="bg-zinc-500 mt-2 border-zinc-500 w-[120px]">
        <SelectValue placeholder={`${defaultYear}`} />
      </SelectTrigger>
      <SelectContent className="border-zinc-500 bg-zinc-500">
        <SelectGroup>
          {years.length > 0 ? (
            years.map((year) => (
              <SelectItem
                key={year}
                className="hover:bg-zinc-700 transition-all rounded-md"
                value={year.toString()}
              >
                {year}
              </SelectItem>
            ))
          ) : (
            <SelectItem
              className="hover:bg-zinc-700 transition-all rounded-md"
              value={defaultYear.toString()}
            >
              {defaultYear}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}