import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Ensure the local database file exists or is created
const sqlite = new Database(process.env.DATABASE_URL || 'local.db');

export const db = drizzle(sqlite, { schema });
