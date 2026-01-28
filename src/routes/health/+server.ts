import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Check if database is accessible
        const { dbPromise } = await import('$lib/server/db');
        await dbPromise;
        
        return json({ 
            status: 'ok', 
            timestamp: new Date().toISOString(),
            message: 'Application is healthy'
        });
    } catch (error) {
        return json({ 
            status: 'error', 
            timestamp: new Date().toISOString(),
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}