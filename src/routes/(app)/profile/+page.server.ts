import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();
    const { supabase } = locals;

    if (!session || !user) {
        throw redirect(303, '/login');
    }

    // 1. Fetch from Supabase
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error('[Profile] supabase fetch error:', profileError);
    }

    return {
        profile,
        user
    };
};

export const actions: Actions = {
    update: async ({ request, locals }) => {
        const { session } = await locals.safeGetSession();
        const { supabase } = locals;
        if (!session) return fail(401, { error: 'Unauthorized' });

        const formData = await request.formData();
        const fullName = formData.get('fullName') as string;
        const username = formData.get('username') as string;
        const role = formData.get('role') as string;
        const avatarUrl = formData.get('avatarUrl') as string;

        if (!fullName || !username) {
            return fail(400, { error: 'Incomplete parameters' });
        }

        // Update Supabase
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                username,
                role,
                avatar_url: avatarUrl,
                updated_at: new Date()
            })
            .eq('id', session.user.id);

        if (error) {
            console.error('[Profile] Update Error:', error);
            return fail(500, { error: 'Failed to update remote registry' });
        }

        // Update Local SQLite Registry immediately for UI consistency
        try {
            await db.update(users)
                .set({
                    fullName,
                    username,
                    role,
                    avatarUrl
                })
                .where(eq(users.id, session.user.id))
                .run();
        } catch (e) {
            console.error('[Profile] Local Sync Error:', e);
        }

        return { success: true };
    }
};
