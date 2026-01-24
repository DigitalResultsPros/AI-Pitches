import { db } from '$lib/server/db';
import { forumCategories, forumPosts, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { slug } = params;
    const { session, user } = await locals.safeGetSession();

    try {
        // 1. Get Category
        const category = await db.select()
            .from(forumCategories)
            .where(eq(forumCategories.slug, slug))
            .get();

        if (!category) {
            throw error(404, 'Category not found');
        }

        // 2. Get Posts with Author info
        const posts = await db.select({
            id: forumPosts.id,
            title: forumPosts.title,
            content: forumPosts.content,
            createdAt: forumPosts.createdAt,
            authorName: users.fullName,
            authorRole: users.role,
        })
            .from(forumPosts)
            .where(eq(forumPosts.categoryId, category.id))
            .leftJoin(users, eq(forumPosts.authorId, users.id))
            .orderBy(desc(forumPosts.createdAt))
            .all();

        return {
            category,
            posts,
            user
        };
    } catch (e) {
        console.error('Failed to load category posts:', e);
        if ((e as any).status === 404) throw e;
        return {
            category: null,
            posts: [],
            user: null
        };
    }
};

export const actions = {
    createPost: async ({ request, params, locals }) => {
        const { session, user } = await locals.safeGetSession();
        if (!session || !user) throw error(401, 'Unauthorized');

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const { slug } = params;

        if (!title || !content) return { success: false, error: 'Title and content required' };

        try {
            const { forumCategories, forumPosts, userCredits } = await import('$lib/server/db/schema');
            const { eq, sql } = await import('drizzle-orm');

            // 1. Get category ID
            const category = await db.select().from(forumCategories).where(eq(forumCategories.slug, slug)).get();
            if (!category) return { success: false, error: 'Category not found' };

            // 2. Check & Deduct Credits
            const creditsRecord = await db.select().from(userCredits).where(eq(userCredits.userId, user.id)).get();
            if (!creditsRecord || creditsRecord.balance < 1) {
                return { success: false, error: 'Insufficient credits' };
            }

            // 3. Create post & deduct credit in a simple way (can use transaction later)
            await db.insert(forumPosts).values({
                categoryId: category.id,
                authorId: user.id,
                title,
                content
            });

            await db.update(userCredits)
                .set({ balance: sql`${userCredits.balance} - 1` })
                .where(eq(userCredits.userId, user.id));

            return { success: true };
        } catch (e) {
            console.error('Action failed:', e);
            return { success: false, error: 'Internal error' };
        }
    }
};
