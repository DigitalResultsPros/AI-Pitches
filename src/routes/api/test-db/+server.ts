import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Test database connection
        const { dbPromise } = await import('$lib/server/db');
        const db = await dbPromise;
        
        // Test basic query
        const result = await db.select().from('forumCategories').limit(1);
        
        return json({ 
            status: 'success', 
            message: 'Database connection successful',
            data: result.length
        });
    } catch (error) {
        return json({ 
            status: 'error', 
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}