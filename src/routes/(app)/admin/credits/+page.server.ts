import { db } from '$lib/server/db';
import { users, userCredits } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const ADMIN_EMAIL = 'dsilverman10@gmail.com';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();
    if (!session || !user || user.email !== ADMIN_EMAIL) {
        throw error(403, 'Restricted Access: System Administrator credentials required.');
    }

    try {
        // Advanced Join: Fetch all users and their current credit balances
        const userBalances = await db.select({
            id: users.id,
            email: users.email,
            fullName: users.fullName,
            role: users.role,
            balance: userCredits.balance
        })
            .from(users)
            .leftJoin(userCredits, eq(users.id, userCredits.userId))
            .all();

        return {
            userBalances
        };
    } catch (e) {
        console.error('[Admin Credits] Load Error:', e);
        return { userBalances: [] };
    }
};

export const actions: Actions = {
    adjust: async ({ request, locals }) => {
        const { session, user } = await locals.safeGetSession();
        if (!session || !user || user.email !== ADMIN_EMAIL) return { success: false, error: 'Unauthorized' };

        const formData = await request.formData();
        const targetUserId = formData.get('userId') as string;
        const amount = parseInt(formData.get('amount') as string); // e.g. 5 or -5

        if (!targetUserId || isNaN(amount)) return { success: false, error: 'Invalid parameters' };

        try {
            // Atomic Update
            await db.update(userCredits)
                .set({ balance: sql`${userCredits.balance} + ${amount}` })
                .where(eq(userCredits.userId, targetUserId))
                .run();

            return { success: true };
        } catch (e) {
            console.error('[Admin Credits] Update Error:', e);
            return { success: false, error: 'Failed to adjust node credits' };
        }
    }
};
