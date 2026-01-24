import { db } from '$lib/server/db';
import { messages, users } from '$lib/server/db/schema';
import { eq, and, or, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) throw redirect(303, '/login');

    const partnerId = params.userId;

    try {
        // 1. Get Partner info
        const partner = await db.select().from(users).where(eq(users.id, partnerId)).get();
        if (!partner) throw error(404, 'User not found');

        // 2. Get Thread
        const thread = await db.select()
            .from(messages)
            .where(or(
                and(eq(messages.senderId, user.id), eq(messages.receiverId, partnerId)),
                and(eq(messages.senderId, partnerId), eq(messages.receiverId, user.id))
            ))
            .orderBy(asc(messages.createdAt))
            .all();

        return {
            partner,
            messages: thread,
            user
        };
    } catch (e) {
        console.error('Failed to load thread:', e);
        if ((e as any).status === 404) throw e;
        return {
            partner: null,
            messages: [],
            user
        };
    }
};

export const actions = {
    send: async ({ request, params, locals }) => {
        const { session, user } = await locals.safeGetSession();
        if (!session || !user) throw error(401, 'Unauthorized');

        const formData = await request.formData();
        const content = formData.get('content') as string;
        const receiverId = params.userId;

        if (!content) return { success: false, error: 'Cannot send empty message' };

        try {
            await db.insert(messages).values({
                senderId: user.id,
                receiverId,
                content
            });

            return { success: true };
        } catch (e) {
            console.error('Failed to send message:', e);
            return { success: false, error: 'Internal error' };
        }
    }
};
