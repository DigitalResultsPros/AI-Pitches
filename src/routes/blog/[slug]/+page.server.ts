import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const { slug } = params;

    const { data: post, error: dbError } = await supabase
        .from('posts')
        .select('*, profiles(full_name, avatar_url, role)')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (dbError || !post) {
        throw error(404, 'Post not found');
    }

    // Parse Markdown to HTML server-side
    const contentHtml = await marked.parse(post.content || '');

    return {
        post,
        contentHtml
    };
};
