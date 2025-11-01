import {
  pgTable,
  varchar,
  text,
  boolean,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const rooms = pgTable("rooms", {
  roomId: varchar("roomId", { length: 36 })
    .primaryKey()
    .$defaultFn(() => sql`gen_random_uuid()`), 
  name: text("name"),
  description: text("description").notNull(),
  price: doublePrecision("price").default(0).notNull(),
  Street: text("Street").notNull(),
  City: text("City").notNull(),
  State: text("State").notNull(),
  Country: text("Country").notNull(),
  ZipCode: text("ZipCode").notNull(),
  guestCapacity: integer("guestCapacity").notNull(),
  Beds: integer("Beds").notNull(),
  isAirConditioned: boolean("isAirConditioned").default(false).notNull(),
  isWifiAvailable: boolean("isWifiAvailable").default(false).notNull(),
  isBreakfastAvailable: boolean("isBreakfastAvailable")
    .default(false)
    .notNull(),
  images: text("images").array().notNull(), 
});

