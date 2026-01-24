import { db } from '$lib/server/db';
import { messages, users } from '$lib/server/db/schema';
import { eq, or, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) {
        throw redirect(303, '/login');
    }

    try {
        // Fetch all messages involving this user
        // In a real app we'd group these by conversation partner
        const allUserMessages = await db.select()
            .from(messages)
            .where(or(
                eq(messages.senderId, user.id),
                eq(messages.receiverId, user.id)
            ))
            .orderBy(desc(messages.createdAt))
            .all();

        // Get unique user IDs we've talked to
        const contactIds = Array.from(new Set(allUserMessages.map(m =>
            m.senderId === user.id ? m.receiverId : m.senderId
        )));

        // Fetch contact details
        const contacts = contactIds.length > 0
            ? await db.select().from(users).all()
            : [];

        // Identify System Admin by Email
        const systemAdmin = await db.select().from(users).where(eq(users.email, 'dsilverman10@gmail.com')).get();

        console.log('[Comms Debug] Current Session User:', user.email);
        console.log('[Comms Debug] System Admin Found:', systemAdmin ? 'YES' : 'NO');
        if (systemAdmin) console.log('[Comms Debug] Admin ID:', systemAdmin.id);

        return {
            messages: allUserMessages,
            contacts: contacts.filter(c => contactIds.includes(c.id)),
            adminId: systemAdmin?.id || null,
            isAdminRegistered: !!systemAdmin,
            adminEmail: 'dsilverman10@gmail.com',
            user
        };
    } catch (e) {
        console.error('Failed to load messages:', e);
        return {
            messages: [],
            contacts: [],
            adminId: null,
            user: null
        };
    }
};
