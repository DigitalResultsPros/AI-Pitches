import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('title, slug, excerpt, created_at, profiles(full_name, avatar_url)')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return { posts: [] };
    }

    return { posts: posts ?? [] };
};
