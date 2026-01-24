<script lang="ts">
	import { page } from '$app/stores';
</script>

<!-- Floating Navbar Container -->
<header class="fixed top-6 right-0 left-0 z-50 mx-auto max-w-7xl px-4">
	<nav
		class="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-2 pl-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/30"
	>
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-3">
			<div class="relative">
				<div
					class="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 transition-transform group-hover:rotate-45"
				></div>
				<div class="absolute inset-0 h-8 w-8 animate-pulse rounded-lg bg-cyan-400/50 blur-md"></div>
			</div>
			<span
				class="bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-xl font-black tracking-tighter text-transparent uppercase"
			>
				AI-Pitches
			</span>
		</a>

		<!-- Links -->
		<div class="flex items-center gap-1 md:gap-4">
			<a
				href="/"
				class="text-technical rounded-xl px-4 py-2 transition-all hover:text-cyan-400 {$page.url
					.pathname === '/'
					? 'border border-cyan-500/20 bg-white/5 text-cyan-400'
					: 'text-slate-400'}"
			>
				Portal
			</a>
			<a
				href="/community"
				class="text-technical rounded-xl px-4 py-2 transition-all hover:text-cyan-400 {$page.url.pathname.startsWith(
					'/community'
				)
					? 'border border-cyan-500/20 bg-white/5 text-cyan-400'
					: 'text-slate-400'}"
			>
				Nexus
			</a>
			<a
				href="/blog"
				class="text-technical rounded-xl px-4 py-2 transition-all hover:text-cyan-400 {$page.url.pathname.startsWith(
					'/blog'
				)
					? 'border border-cyan-500/20 bg-white/5 text-cyan-400'
					: 'text-slate-400'}"
			>
				Archive
			</a>
			<a
				href="/messages"
				class="text-technical rounded-xl px-4 py-2 transition-all hover:text-cyan-400 {$page.url.pathname.startsWith(
					'/messages'
				)
					? 'border border-cyan-500/20 bg-white/5 text-cyan-400'
					: 'text-slate-400'}"
			>
				Comms
			</a>
			<a
				href="/dashboard"
				class="text-technical hidden rounded-xl px-4 py-2 transition-all hover:text-cyan-400 md:block {$page.url.pathname.startsWith(
					'/dashboard'
				)
					? 'border border-cyan-500/20 bg-white/5 text-cyan-400'
					: 'text-slate-400'}"
			>
				Core
			</a>
		</div>

		<!-- CTA -->
		<div class="pl-2">
			<a
				href="/login"
				class="text-technical hidden items-center justify-center rounded-xl bg-cyan-500 px-6 py-2 text-black transition-all hover:scale-105 hover:bg-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] sm:inline-flex"
			>
				Initialize
			</a>
			<!-- Mobile Menu Icon -->
			<a
				href="/login"
				class="rounded-xl border border-white/10 bg-white/5 p-2 text-white sm:hidden"
				aria-label="Login to Portal"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
					/></svg
				>
			</a>
		</div>
	</nav>
</header>
