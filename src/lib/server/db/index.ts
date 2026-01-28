import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { seedCategories } from './seed';

// Ensure the database directory exists
const dbPath = process.env.DATABASE_URL || '/app/data/local.db';
const dbDir = dbPath.substring(0, dbPath.lastIndexOf('/'));

// Initialize database connection
let dbInstance: ReturnType<typeof drizzle> | null = null;

// Function to initialize database
async function initializeDatabase() {
    if (typeof window !== 'undefined') {
        throw new Error('Database can only be accessed on the server side');
    }

    if (dbInstance) {
        return dbInstance;
    }

    try {
        // Import fs to ensure directory exists
        const fs = await import('fs');
        
        // Ensure data directory exists
        if (!fs.existsSync(dbDir)) {
            try {
                fs.mkdirSync(dbDir, { recursive: true });
            } catch (mkdirError) {
                console.warn('Could not create database directory, using fallback:', mkdirError);
                // Use a fallback directory that we know exists
                const fallbackDir = '/tmp';
                const fallbackPath = `${fallbackDir}/local.db`;
                process.env.DATABASE_URL = fallbackPath;
                return initializeDatabase(); // Retry with fallback
            }
        }
        
        // Initialize database connection
        const sqlite = new Database(dbPath);
        
        // Initialize database with seed data
        await seedCategories();
        
        dbInstance = drizzle(sqlite, { schema });
        
        // Close the database connection gracefully on shutdown
        process.on('SIGINT', () => {
            sqlite.close();
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            sqlite.close();
            process.exit(0);
        });
        
        return dbInstance;
        
    } catch (error) {
        console.error('Failed to initialize database:', error);
        // Don't exit in test environment
        if (process.env.NODE_ENV === 'test') {
            throw error;
        }
        process.exit(1);
    }
}

// Export the initialization function and promise
export const dbPromise = initializeDatabase();
export { initializeDatabase };
