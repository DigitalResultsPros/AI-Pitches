<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<!-- Hero Section -->
<section class="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
	<div in:fly={{ y: 50, duration: 1000 }} class="mx-auto max-w-4xl space-y-8">
		<h1 class="text-6xl font-extrabold tracking-tight md:text-8xl">
			<span
				class="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
			>
				Build the Future
			</span>
			<br />
			<span class="text-white">of AI</span>
		</h1>

		<p class="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400 md:text-2xl">
			The exclusive community connecting visionary
			<span class="font-semibold text-cyan-400">Founders</span> with forward-thinking
			<span class="font-semibold text-purple-400">Funders</span>.
		</p>

		<div class="mt-12 flex flex-col justify-center gap-6 sm:flex-row">
			<a
				href="/register?role=founder"
				class="rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:scale-105 hover:bg-cyan-400"
			>
				I'm a Founder
			</a>
			<a
				href="/register?role=funder"
				class="rounded-full border-2 border-purple-500 bg-transparent px-8 py-4 text-lg font-bold text-purple-400 transition-all hover:scale-105 hover:bg-purple-500/10"
			>
				I'm a Funder
			</a>
		</div>
	</div>
</section>

<!-- Features / Value Prop -->
<section class="border-t border-white/5 bg-slate-900/50 px-4 py-24 backdrop-blur-sm">
	<div class="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
		<!-- Feature 1 -->
		<div
			class="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-cyan-500/50"
		>
			<div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20">
				<svg class="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/></svg
				>
			</div>
			<h3 class="mb-4 text-2xl font-bold">Fast-Track Funding</h3>
			<p class="text-slate-400">
				Direct access to investors looking specifically for the next generation of AI startups.
			</p>
		</div>

		<!-- Feature 2 -->
		<div
			class="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-purple-500/50"
		>
			<div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
				<svg class="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
					/></svg
				>
			</div>
			<h3 class="mb-4 text-2xl font-bold">Curated Community</h3>
			<p class="text-slate-400">
				Join a network of verified builders and backers. Quality over quantity.
			</p>
		</div>

		<!-- Feature 3 -->
		<div
			class="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-pink-500/50"
		>
			<div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/20">
				<svg class="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
					/></svg
				>
			</div>
			<h3 class="mb-4 text-2xl font-bold">Deep Tech Focus</h3>
			<p class="text-slate-400">
				Platform built specifically for the unique needs and metrics of AI companies.
			</p>
		</div>
	</div>
</section>
