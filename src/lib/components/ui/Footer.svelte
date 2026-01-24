<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer
	class="relative overflow-hidden border-t border-white/5 bg-slate-950/50 py-20 backdrop-blur-md"
>
	<!-- Subtle Background HUD -->
	<div class="bg-scanlines pointer-events-none absolute inset-0 opacity-5"></div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			<!-- Brand -->
			<div class="col-span-1 md:col-span-2">
				<h2
					class="text-technical mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-xl font-black text-transparent italic"
				>
					AI-PITCHES
				</h2>
				<p class="mb-8 max-w-sm text-sm leading-relaxed font-light text-slate-500">
					Unified network for visionary founders and resource providers.
					<br />Establishing the future of decentralized capital.
				</p>
				<p class="text-technical text-slate-700">
					&copy; {currentYear} PROT-COL: AI-PITCHES // ALL RIGHTS RESERVED.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h3 class="text-technical mb-6 text-slate-400">Registry</h3>
				<ul class="space-y-3 font-light text-slate-500">
					<li><a href="/" class="transition hover:text-cyan-400">Portal</a></li>
					<li><a href="/blog" class="transition hover:text-cyan-400">Archive</a></li>
					<li><a href="/dashboard" class="transition hover:text-cyan-400">Core Ops</a></li>
				</ul>
			</div>

			<!-- Socials / Contact -->
			<div>
				<h3 class="text-technical mb-6 text-slate-400">Uplink</h3>
				<ul class="space-y-3 font-light text-slate-500">
					<li>
						<a href="https://twitter.com" class="transition hover:text-purple-400">X-FEED</a>
					</li>
					<li>
						<a href="https://linkedin.com" class="transition hover:text-purple-400">LNK-NET</a>
					</li>
					<li>
						<a href="mailto:hello@ai-pitches.com" class="transition hover:text-purple-400"
							>SEND PACKET</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
