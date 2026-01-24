import { createServerClient } from '@supabase/ssr'
import { type Handle } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })

    /**
     * Unlike `supabase.auth.getSession()`, which allows the user to have a
     * valid session even if they are not logged in (guest session),
     * `safeGetSession` will return null if the user is not logged in.
     */
    event.locals.safeGetSession = async () => {
        // Check Supabase Session via Server Client
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()

        if (!session) {
            console.log('[PHASE 3] No server session found in cookies.');
            return { session: null, user: null }
        }

        console.log('[PHASE 3] Server Session Validated for User:', session.user.id);
        return { session, user: session.user }
    }

    // --- SYNC TO LOCAL SQLITE ---
    // Moved to specific routes (e.g. Dashboard) to avoid blocking global hooks.

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}
