import { db } from './index';
import { forumCategories } from './schema';

export async function seedCategories() {
    try {
        const existing = await db.select().from(forumCategories).all();
        if (existing.length > 0) return;

        console.log('[Seed] Adding forum categories...');
        await db.insert(forumCategories).values([
            {
                id: crypto.randomUUID(),
                name: 'General Discussion',
                slug: 'general',
                description: 'Chat about anything AI or startup related.'
            },
            {
                id: crypto.randomUUID(),
                name: 'Founder Pitches',
                slug: 'pitches',
                description: 'Showcase what you are building.'
            },
            {
                id: crypto.randomUUID(),
                name: 'Funder Requests',
                slug: 'requests',
                description: 'Venture capitalists and angels looking for specific innovations.'
            },
            {
                id: crypto.randomUUID(),
                name: 'Announcements',
                slug: 'announcements',
                description: 'Official platform news from the admin.',
                isAdminOnly: true
            }
        ]);
        console.log('[Seed] Categories created successfully.');
    } catch (e) {
        console.error('[Seed] Error seeding categories:', e);
    }
}
