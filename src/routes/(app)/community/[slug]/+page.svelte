<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let { category, posts, user } = $derived(data);

	let showModal = $state(false);
	let isSubmitting = $state(false);

	$effect(() => {
		if (form?.success) {
			showModal = false;
		}
	});
</script>

<svelte:head>
	<title>{category?.name || 'Category'} | Community</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8" in:fade>
	<!-- Breadcrumbs -->
	<nav class="mb-6 flex items-center gap-2 text-sm text-slate-500">
		<a href="/community" class="transition-colors hover:text-cyan-400">Community</a>
		<span>/</span>
		<span class="text-slate-300">{category?.name}</span>
	</nav>

	<div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<h1 class="mb-2 text-4xl font-bold text-white">
				{category?.name}
			</h1>
			<p class="text-lg text-slate-400">{category?.description}</p>
		</div>

		{#if user && (!category?.isAdminOnly || user.user_metadata?.role === 'admin')}
			<button
				onclick={() => (showModal = true)}
				class="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-bold text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
			>
				New Post
			</button>
		{/if}
	</div>

	{#if showModal}
		<div class="fixed inset-0 z-[100] flex items-center justify-center p-4" transition:fade>
			<!-- Overlay -->
			<button
				onclick={() => (showModal = false)}
				class="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
				aria-label="Close modal"
			></button>

			<!-- Modal Content -->
			<div
				class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
				transition:fly={{ y: 20 }}
			>
				<h3 class="mb-6 text-2xl font-bold text-white">Create New Post</h3>

				<form
					method="POST"
					action="?/createPost"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update();
							isSubmitting = false;
						};
					}}
					class="space-y-4"
				>
					{#if form?.error}
						<p class="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
							{form.error}
						</p>
					{/if}

					<div>
						<label for="title" class="mb-1 block text-sm font-medium text-slate-400">Title</label>
						<input
							name="title"
							id="title"
							type="text"
							required
							placeholder="What's on your mind?"
							class="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
						/>
					</div>

					<div>
						<label for="content" class="mb-1 block text-sm font-medium text-slate-400"
							>Message</label
						>
						<textarea
							name="content"
							id="content"
							required
							rows="5"
							placeholder="Describe your pitch or innovation..."
							class="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
						></textarea>
					</div>

					<div class="flex gap-4 pt-4">
						<button
							type="button"
							onclick={() => (showModal = false)}
							class="flex-1 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							class="flex-1 rounded-full bg-cyan-500 px-6 py-3 font-bold text-black transition-all hover:bg-cyan-400 disabled:opacity-50"
						>
							{isSubmitting ? 'Posting...' : 'Post (-1 Credit)'}
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<div class="space-y-6">
		{#if posts.length === 0}
			<div class="rounded-3xl border border-white/5 bg-white/5 p-16 text-center backdrop-blur-md">
				<p class="text-lg text-slate-500 italic">
					No posts here yet. Be the first to start the conversation!
				</p>
			</div>
		{:else}
			{#each posts as post, i}
				<div
					class="group rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition-all hover:border-white/20"
					in:fly={{ y: 20, delay: i * 50 }}
				>
					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-slate-800 font-bold text-slate-400"
						>
							{post.authorName?.[0] || 'U'}
						</div>
						<div>
							<p class="text-sm font-bold text-slate-200">{post.authorName || 'Anonymous'}</p>
							<p class="text-xs text-slate-500 capitalize">
								{post.authorRole || 'member'} • {new Date(post.createdAt).toLocaleDateString()}
							</p>
						</div>
					</div>

					<h3 class="mb-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
						{post.title}
					</h3>
					<p class="line-clamp-3 leading-relaxed text-slate-400">
						{post.content}
					</p>

					<div class="mt-6 flex items-center gap-6 text-sm text-slate-500">
						<button class="flex items-center gap-2 transition-colors hover:text-cyan-400">
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/></svg
							>
							<span>Reply</span>
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
