import { db } from '$lib/server/db';
import { forumCategories } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // Session optional for viewing categories, but usually we check if authenticated
    const { session } = await locals.safeGetSession();

    try {
        const categories = await db.select().from(forumCategories).all();

        return {
            categories
        };
    } catch (e) {
        console.error('Failed to load community categories:', e);
        return {
            categories: []
        };
    }
};
