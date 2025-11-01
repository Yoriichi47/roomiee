import { db } from "@/db";
import { rooms } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import "server-only";

export const getAllRooms = async ({
  city,
  state,
  country,
}: {
  city?: string;
  state?: string;
  country?: string;
}) => {
  const searchFilters = [
    city ? eq(rooms.City, city) : undefined,
    state ? eq(rooms.State, state) : undefined,
    country ? eq(rooms.Country, country) : undefined,
  ].filter(Boolean);

  const data = await db
    .select()
    .from(rooms)
    .where(
      and(
        searchFilters.length ? and(...searchFilters) : undefined
      )
    );
  return data;
};
