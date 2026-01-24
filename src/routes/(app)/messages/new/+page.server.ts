import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { ne } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) throw redirect(303, '/login');

    try {
        // Fetch all other users (except me) to start a chat
        // In a large app, we'd add search/pagination
        const allOtherUsers = await db.select({
            id: users.id,
            fullName: users.fullName,
            username: users.username,
            avatarUrl: users.avatarUrl,
            role: users.role
        })
            .from(users)
            .where(ne(users.id, user.id))
            .all();

        return {
            users: allOtherUsers
        };
    } catch (e) {
        console.error('Failed to load potential recipients:', e);
        return {
            users: []
        };
    }
};

export const actions = {
    startChat: async ({ request, locals }) => {
        const { session, user } = await locals.safeGetSession();
        if (!session || !user) return { success: false, error: 'Unauthorized' };

        const formData = await request.formData();
        const receiverId = formData.get('receiverId') as string;
        const firstMessage = formData.get('message') as string;

        if (!receiverId || !firstMessage) return { success: false, error: 'Recipient and message required' };

        try {
            const { messages } = await import('$lib/server/db/schema');

            await db.insert(messages).values({
                senderId: user.id,
                receiverId,
                content: firstMessage
            });

            return { success: true, partnerId: receiverId };
        } catch (e) {
            console.error('Failed to start chat:', e);
            return { success: false, error: 'Failed to send message' };
        }
    }
};
