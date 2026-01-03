import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE) {
  throw new Error('DATABASE environment variable is not set');
}

const db = drizzle(neon(process.env.DATABASE as string));

export { db };
