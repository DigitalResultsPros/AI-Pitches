<script lang="ts">
	import { fade, fly } from 'svelte/transition';
</script>

<!-- Mega Hero Section -->
<section
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center"
>
	<!-- Advanced Background Atmosphere -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/5 blur-[120px]"
		></div>
		<!-- Grid Floor Effect -->
		<div
			class="absolute bottom-0 left-0 h-[300px] w-full bg-[linear-gradient(to_bottom,transparent,rgba(6,182,212,0.1))] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
		></div>
	</div>

	<div in:fly={{ y: 30, duration: 1500 }} class="relative z-10 mx-auto max-w-6xl space-y-12">
		<!-- Tech Tag -->
		<div class="flex items-center justify-center gap-4">
			<div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
			<div
				class="inline-block rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase backdrop-blur-md"
			>
				Protocol: Next-Gen Capital
			</div>
			<div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
		</div>

		<h1 class="relative font-sans text-7xl font-black tracking-tighter italic md:text-9xl">
			<!-- Glitch Glow layers -->
			<span class="absolute inset-0 translate-x-1 translate-y-1 text-cyan-500/10 blur-sm"
				>BUILD</span
			>
			<span class="relative block text-white">BUILD</span>
			<span
				class="bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
			>
				THE IMPOSSIBLE
			</span>
		</h1>

		<p
			class="mx-auto max-w-3xl font-sans text-xl leading-relaxed font-light tracking-tight text-slate-400 md:text-2xl"
		>
			Access the neural network of visionary
			<span class="border-b border-cyan-500/40 pb-1 text-sm font-bold tracking-widest text-white"
				>LIQUIDITY</span
			>
		</p>

		<div class="mt-20 flex flex-col items-center justify-center gap-8 sm:flex-row">
			<a href="/register?role=founder" class="group relative">
				<!-- Cyber Button -->
				<div
					class="absolute -inset-1 rounded-xl bg-cyan-500/20 opacity-70 blur-md transition-all group-hover:bg-cyan-500/40 group-hover:blur-xl"
				></div>
				<div
					class="relative flex items-center justify-center rounded-xl bg-white px-12 py-5 text-xs font-black tracking-[0.2em] text-black uppercase transition-transform group-active:scale-95"
				>
					Initialize Founder
				</div>
			</a>
			<a href="/register?role=funder" class="group relative">
				<div
					class="relative flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 px-12 py-5 text-xs font-black tracking-[0.2em] text-white uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:bg-slate-800"
				>
					Sync Funder Node
				</div>
			</a>
		</div>
	</div>
</section>

<!-- System Stats / Technical Details -->
<section class="relative z-10 px-4 py-8">
	<div
		class="mx-auto flex max-w-7xl items-center justify-center gap-12 text-[10px] font-black tracking-widest text-slate-600 uppercase"
	>
		<div class="flex items-center gap-2 italic">
			<span class="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]"></span> Live
			Network
		</div>
		<div class="hidden sm:block">Uplink: ESTABLISHED</div>
		<div class="hidden sm:block">Sector: 0xC23</div>
		<div class="flex items-center gap-2">Latency: <span class="text-cyan-400">0.002ms</span></div>
	</div>
</section>

<!-- Glass Features -->
<section class="relative z-10 px-4 py-32">
	<div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
		<!-- Card 1 -->
		<div
			class="glass-panel group relative overflow-hidden rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/50"
		>
			<!-- Corner Accents -->
			<div class="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-cyan-500/30"></div>
			<div class="absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2 border-cyan-500/30"></div>

			<div
				class="mb-10 text-4xl font-black text-cyan-500/30 transition-colors group-hover:text-cyan-400"
			>
				01
			</div>
			<h3 class="mb-4 text-xs font-black tracking-[0.3em] text-white uppercase">Hyper-Velocity</h3>
			<p class="text-sm leading-relaxed font-light text-slate-400">
				Propel your roadmap through instant capital alignment. Optimized matching engines bypass
				legacy VC friction.
			</p>
		</div>

		<!-- Card 2 -->
		<div
			class="glass-panel group relative overflow-hidden rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50"
		>
			<div class="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-purple-500/30"></div>
			<div
				class="absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2 border-purple-500/30"
			></div>

			<div
				class="mb-10 text-4xl font-black text-purple-500/30 transition-colors group-hover:text-purple-400"
			>
				02
			</div>
			<h3 class="mb-4 text-xs font-black tracking-[0.3em] text-white uppercase">Neural Synergy</h3>
			<p class="text-sm leading-relaxed font-light text-slate-400">
				The network is alive. Access distributed compute, algorithmic advisors, and elite-tier
				engineering sub-nets.
			</p>
		</div>

		<!-- Card 3 -->
		<div
			class="glass-panel group relative overflow-hidden rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/50"
		>
			<div class="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-fuchsia-500/30"></div>
			<div
				class="absolute right-4 bottom-4 h-4 w-4 border-r-2 border-b-2 border-fuchsia-500/30"
			></div>

			<div
				class="mb-10 text-4xl font-black text-fuchsia-500/30 transition-colors group-hover:text-fuchsia-400"
			>
				03
			</div>
			<h3 class="mb-4 text-xs font-black tracking-[0.3em] text-white uppercase">Apex Prestige</h3>
			<p class="text-sm leading-relaxed font-light text-slate-400">
				Curation at the protocol level. We filter for only high-signal entities to maintain total
				ecosystem integrity.
			</p>
		</div>
	</div>
</section>
