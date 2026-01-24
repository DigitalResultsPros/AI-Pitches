import { db } from '$lib/server/db';
import { users, userCredits } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function syncUserToLocalDb(user: any) {
    if (!user || !user.id) return;

    try {
        // Optimization: Check if user exists first to avoid unnecessary write ops
        // SQLite writes can lock, so we read first.
        const existingUser = await db.select({ id: users.id }).from(users).where(eq(users.id, user.id)).get();

        if (!existingUser) {
            console.log(`[Sync] Creating new local user: ${user.id}`);
            await db.insert(users).values({
                id: user.id,
                email: user.email!,
                username: user.user_metadata.full_name?.split(' ')[0] || 'User',
                fullName: user.user_metadata.full_name,
                role: user.user_metadata.role || 'member'
            });

            // Add credits
            await db.insert(userCredits).values({
                userId: user.id,
                balance: 10
            }).onConflictDoNothing();
        } else {
            // Optional: Update metadata if changed (could throttle this)
            // For now, we skip updates on every request to be safe and fast.
        }
    } catch (e) {
        // Log but do not throw - we don't want to break the auth flow
        console.error('[Sync] Failed to sync user to local DB:', e);
    }
}
