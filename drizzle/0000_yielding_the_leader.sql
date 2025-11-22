CREATE TABLE "bookings" (
	"bookingId" varchar(36) PRIMARY KEY NOT NULL,
	"roomId" varchar NOT NULL,
	"userId" varchar(36) NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"amountPaid" double precision NOT NULL,
	"daysOfStay" integer NOT NULL,
	"paymentInfo" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"paidAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"roomId" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL,
	"Street" text NOT NULL,
	"City" text NOT NULL,
	"State" text NOT NULL,
	"Country" text NOT NULL,
	"ZipCode" text NOT NULL,
	"guestCapacity" integer NOT NULL,
	"Beds" integer NOT NULL,
	"isAirConditioned" boolean DEFAULT false NOT NULL,
	"isWifiAvailable" boolean DEFAULT false NOT NULL,
	"isBreakfastAvailable" boolean DEFAULT false NOT NULL,
	"images" text[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_roomId_rooms_roomId_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("roomId") ON DELETE no action ON UPDATE no action;