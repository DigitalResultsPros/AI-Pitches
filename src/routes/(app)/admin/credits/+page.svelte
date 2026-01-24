<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let { userBalances } = $derived(data);
	let isProcessing = $state(false);

	let searchQuery = $state('');
	let filteredNodes = $derived(
		userBalances.filter(
			(n) =>
				n.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				n.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<svelte:head>
	<title>Internal: Asset Control | AI-Pitches</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-20" in:fade>
	<div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<div class="mb-4 flex items-center gap-3">
				<div class="h-[1px] w-8 bg-purple-500/50"></div>
				<span class="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase"
					>Restricted Access: L7 Admin</span
				>
			</div>
			<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">
				Asset Control
			</h1>
			<p class="mt-2 text-lg font-light text-slate-500 italic">
				Authorized node credit adjustment and resource allocation.
			</p>
		</div>
	</div>

	<!-- Search / Filter HUD -->
	<div class="relative mb-8">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search node identifiers..."
			class="glass-panel w-full rounded-xl p-5 pl-14 font-light text-white transition-all outline-none focus:border-purple-500/50"
		/>
		<svg
			class="absolute top-5 left-5 h-6 w-6 text-slate-700"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>
	</div>

	<div class="grid grid-cols-1 gap-4">
		{#each filteredNodes as node, i}
			<div
				class="glass-panel group corner-frame flex flex-col justify-between gap-6 rounded-2xl p-8 transition-all hover:border-purple-500/30 md:flex-row md:items-center"
				in:fly={{ y: 10, delay: i * 50 }}
			>
				<div class="flex items-center gap-6">
					<div
						class="flex h-14 w-14 items-center justify-center rounded-xl border border-white/5 bg-slate-900 font-bold text-slate-500 transition-all group-hover:border-purple-500/20 group-hover:text-purple-400"
					>
						{node.fullName?.[0] || 'N'}
					</div>
					<div class="min-w-0">
						<h4 class="truncate font-bold tracking-tight text-white uppercase italic">
							{node.fullName || 'Unresolved Node'}
						</h4>
						<p class="text-technical mt-1 text-slate-600">
							{node.email} • Sector: {node.role}
						</p>
					</div>
				</div>

				<div class="flex items-center gap-8">
					<!-- Credit Status Readout -->
					<div class="text-right">
						<p class="text-technical mb-1 text-slate-700">Resource Balance</p>
						<p class="text-3xl font-black tracking-tighter text-white italic">
							{node.balance ?? 0} <span class="ml-1 text-xs text-purple-500/50 not-italic">CR</span>
						</p>
					</div>

					<!-- Action Controls -->
					<div class="flex gap-3">
						<form
							method="POST"
							action="?/adjust"
							use:enhance={() => {
								isProcessing = true;
								return async ({ update }) => {
									await update();
									isProcessing = false;
								};
							}}
						>
							<input type="hidden" name="userId" value={node.id} />
							<input type="hidden" name="amount" value="10" />
							<button
								class="text-technical rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black active:scale-95 disabled:opacity-50"
								disabled={isProcessing}
							>
								+10 CR
							</button>
						</form>

						<form
							method="POST"
							action="?/adjust"
							use:enhance={() => {
								isProcessing = true;
								return async ({ update }) => {
									await update();
									isProcessing = false;
								};
							}}
						>
							<input type="hidden" name="userId" value={node.id} />
							<input type="hidden" name="amount" value="-10" />
							<button
								class="text-technical rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-3 text-red-500 transition-all hover:bg-red-500 hover:text-black active:scale-95 disabled:opacity-50"
								disabled={isProcessing}
							>
								-10 CR
							</button>
						</form>
					</div>
				</div>
			</div>
		{:else}
			<div class="glass-panel p-20 rounded-2xl text-center">
				<p class="text-[10px] font-black tracking-[0.4em] uppercase text-slate-700 italic">
					No node telemetry found for query.
				</p>
			</div>
		{/each}
	</div>
</div>
