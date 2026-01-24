<script lang="ts">
	import { fade } from 'svelte/transition';

	// Svelte 5 Props
	let { data } = $props();
	// Derived state for reactivity
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Blog | AI-Pitches</title>
</svelte:head>

<div class="container mx-auto px-4 py-16" in:fade>
	<div class="mb-12 text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
		>
			Latest Insights
		</h1>
		<p class="mx-auto max-w-2xl text-slate-400">
			Thoughts on AI, funding, and the future of technology.
		</p>
	</div>

	{#if posts.length === 0}
		<div class="rounded-2xl border border-white/10 bg-white/5 py-12 text-center">
			<p class="mb-4 text-slate-500">No posts found yet.</p>
			<!-- Optional: Seed button for demo purposes if needed, or just manual instructions -->
			<p class="text-sm text-slate-600">
				Admin: Add a post in Supabase 'posts' table with published=true.
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<a href="/blog/{post.slug}" class="group block">
					<div
						class="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-500/50"
					>
						<div class="mb-4">
							<span
								class="rounded-full border border-cyan-500/30 px-2 py-1 font-mono text-xs text-cyan-400"
							>
								{new Date(post.created_at).toLocaleDateString()}
							</span>
						</div>

						<h2 class="mb-3 text-2xl font-bold transition group-hover:text-cyan-400">
							{post.title}
						</h2>

						{#if post.excerpt}
							<p class="mb-6 flex-grow text-sm text-slate-400">
								{post.excerpt}
							</p>
						{/if}

						<div class="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
							<!-- Avatar placeholder -->
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300"
							>
								{post.profiles?.full_name?.charAt(0) || '?'}
							</div>
							<span class="text-sm text-slate-500">
								{post.profiles?.full_name || 'Unknown Author'}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
