import 'dotenv/config';
import { db } from "../db/index";
import { rooms } from "../db/schema";
import { roomSeeder } from "./data";

async function seedRooms() {
  try {
    console.log('🌱 Seeding database...');
    console.log('📍 DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Missing');

    const roomsData = roomSeeder.map((room) => ({
      name: room.name,
      price: room.price,
      description: room.description,
      Street: room.Street,
      City: room.City,
      State: room.State,
      Country: room.Country,
      ZipCode: room.ZipCode,
      guestCapacity: room.guestCapacity,
      Beds: room.Beds,
      isWifiAvailable: room.isWifiAvailable,
      isBreakfastAvailable: room.isBreakfastAvailable,
      isAirConditioned: room.isAirConditioned,
      images: room.images,
      createdBy: room.createdBy,
    }));

    console.log(`📝 Prepared ${roomsData.length} rooms for seeding...`);

    // Insert rooms
    const result = await db.insert(rooms).values(roomsData);

    console.log(`✅ Successfully seeded ${roomsData.length} rooms`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedRooms();