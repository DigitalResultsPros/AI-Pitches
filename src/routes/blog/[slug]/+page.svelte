<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();
	// Derived state
	let post = $derived(data.post);
	let contentHtml = $derived(data.contentHtml);
</script>

<svelte:head>
	<title>{post.title} | AI-Pitches</title>
</svelte:head>

<article class="container mx-auto max-w-3xl px-4 py-16" in:fade>
	<header class="mb-12 text-center">
		<div class="mb-6 flex items-center justify-center gap-2">
			<span
				class="rounded-full border border-cyan-500/30 px-2 py-1 font-mono text-xs text-cyan-400"
			>
				{new Date(post.created_at).toLocaleDateString()}
			</span>
		</div>

		<h1 class="mb-8 text-4xl font-extrabold tracking-tight md:text-6xl">
			{post.title}
		</h1>

		<div class="flex items-center justify-center gap-4">
			<div class="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[1px]">
				<div
					class="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-sm font-bold"
				>
					{post.profiles?.full_name?.charAt(0) || '?'}
				</div>
			</div>
			<div class="text-left">
				<p class="font-bold text-white">{post.profiles?.full_name || 'Unknown Author'}</p>
				<p class="text-xs tracking-widest text-slate-400 uppercase">
					{post.profiles?.role || 'Contributor'}
				</p>
			</div>
		</div>
	</header>

	<!-- Markdown Content -->
	<div
		class="mx-auto prose prose-lg prose-invert prose-headings:font-bold prose-headings:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300"
	>
		{@html contentHtml}
	</div>

	<div class="mt-16 border-t border-white/10 pt-8 text-center">
		<a href="/blog" class="text-slate-400 transition hover:text-white">← Back to Blog</a>
	</div>
</article>
