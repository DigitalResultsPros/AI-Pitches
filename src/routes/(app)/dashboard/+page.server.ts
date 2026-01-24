import { db } from '$lib/server/db';
import { userCredits } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();

    if (!session || !user) {
        return {
            credits: 0
        };
    }

    try {
        // Lazily ensure user exists
        const { syncUserToLocalDb } = await import('$lib/server/authSync');
        syncUserToLocalDb(user).catch(err => console.error('[Dashboard] UI Sync Error:', err));

        // One-time seed for categories
        const { seedCategories } = await import('$lib/server/db/seed');
        seedCategories().catch(e => console.error('Seed error:', e));

        // Fetch credits from local SQLite
        const creditRecord = await db.select().from(userCredits).where(eq(userCredits.userId, user.id)).get();

        return {
            credits: creditRecord?.balance ?? 0
        };
    } catch (e) {
        console.error('[Dashboard] DB Fetch Error:', e);
        return {
            credits: 0
        };
    }
};
