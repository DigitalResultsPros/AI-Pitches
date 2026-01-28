import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { dbPromise, initializeDatabase } from './index';
import { forumCategories } from './schema';
import fs from 'fs/promises';
import path from 'path';

// Mock environment variables
process.env.DATABASE_URL = '/tmp/test.db';

describe('Database Initialization', () => {
    let testDbPath: string;

    beforeEach(async () => {
        // Clean up any existing test database
        testDbPath = process.env.DATABASE_URL!;
        try {
            await fs.unlink(testDbPath);
        } catch (error) {
            // File doesn't exist, which is fine
        }
    });

    afterEach(async () => {
        // Clean up test database
        try {
            await fs.unlink(testDbPath);
        } catch (error) {
            // File doesn't exist, which is fine
        }
    });

    it('should create database directory if it does not exist', async () => {
        const dbDir = path.dirname(testDbPath);
        
        // Ensure directory doesn't exist
        try {
            await fs.rmdir(dbDir);
        } catch (error) {
            // Directory doesn't exist, which is fine
        }

        await initializeDatabase();
        
        // Directory should now exist
        await expect(fs.access(dbDir)).resolves.not.toThrow();
    });

    it('should initialize database successfully', async () => {
        const db = await initializeDatabase();
        
        // Database should be initialized
        expect(db).toBeDefined();
        
        // Test basic database operation
        const result = await db.select().from(forumCategories).limit(1);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should handle database initialization errors gracefully', async () => {
        // Test with invalid database path
        process.env.DATABASE_URL = '/invalid/path/db.sqlite';
        
        await expect(initializeDatabase()).rejects.toThrow();
    });

    it('should reject client-side access', async () => {
        // This test would need to be run in a browser environment
        // For now, we'll just test that the function throws when window is defined
        const originalWindow = (global as any).window;
        (global as any).window = {};
        
        await expect(initializeDatabase()).rejects.toThrow('Database can only be accessed on the server side');
        
        // Restore original window
        (global as any).window = originalWindow;
    });

    it('should return the same database instance on subsequent calls', async () => {
        const db1 = await initializeDatabase();
        const db2 = await initializeDatabase();
        
        expect(db1).toBe(db2);
    });
});