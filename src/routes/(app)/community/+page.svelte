<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let { categories } = $derived(data);
</script>

<svelte:head>
	<title>Community | AI-Pitches</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8" in:fade>
	<div class="mb-12">
		<h1
			class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent"
		>
			Community Hub
		</h1>
		<p class="mt-2 text-lg text-slate-400">Connect, Pitch, and Innovate together.</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
		{#each categories as category}
			<a
				href="/community/{category.slug}"
				class="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-900/60"
			>
				<!-- Decorative glow -->
				<div
					class="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all group-hover:bg-cyan-500/20"
				></div>

				<h3 class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
					{category.name}
				</h3>
				<p class="leading-relaxed text-slate-400">
					{category.description}
				</p>

				<div class="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-500/80">
					<span>Enter Channel</span>
					<svg
						class="h-4 w-4 transition-transform group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/></svg
					>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	/* Add subtle glass effect */
	:global(.backdrop-blur-xl) {
		-webkit-backdrop-filter: blur(24px);
	}
</style>
