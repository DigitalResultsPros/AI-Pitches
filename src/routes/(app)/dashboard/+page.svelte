<script lang="ts">
	import { fade } from 'svelte/transition';

	// Props from the load function
	let { data } = $props();
	// Use derived to ensure reactivity updates when data changes
	let session = $derived(data.session);
	let supabase = $derived(data.supabase);
	// @ts-ignore
	let localCredits = $derived(data.credits ?? 0);

	let profile: any = $state(null);
	let loading = $state(true);

	// Fetch profile on mount
	$effect(() => {
		async function getProfile() {
			try {
				loading = true;
				const { user } = session;

				const { data, error, status } = await supabase
					.from('profiles')
					.select(`username, full_name, role, avatar_url`)
					.eq('id', user.id)
					.single();

				if (error && status !== 406) throw error;

				if (data) {
					profile = data;
				}

				// Fetch Subscription / Credits logic moved to local SQLite provider
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error loading user data!', error.message);
				}
			} finally {
				loading = false;
			}
		}

		getProfile();
	});
</script>

<svelte:head>
	<title>Dashboard | AI-Pitches</title>
</svelte:head>

<div class="container mx-auto px-4 py-20" in:fade>
	<div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<div class="mb-4 flex items-center gap-3">
				<div class="h-[1px] w-8 bg-cyan-500/50"></div>
				<span class="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase"
					>Node Connectivity: High</span
				>
			</div>
			<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">The Core</h1>
			<p class="mt-2 text-lg font-light text-slate-500 italic">
				Centralized intelligence & asset management.
			</p>
		</div>

		<div class="flex items-center gap-4">
			<div
				class="text-technical rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-6 py-3 text-cyan-400 backdrop-blur-md"
			>
				Assets: <span class="ml-2 text-white">{localCredits}</span> CR
			</div>

			{#if profile}
				<div
					class="text-technical rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-slate-400"
				>
					Auth: <span class="ml-2 text-cyan-400">{profile.role ?? 'Member'}</span>
				</div>

				{#if session.user.email === 'dsilverman10@gmail.com'}
					<a
						href="/admin/credits"
						class="text-technical rounded-xl border border-purple-500/30 bg-purple-900/20 px-6 py-3 text-purple-400 transition-all hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
					>
						System Access
					</a>
				{/if}
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Profile Card -->
		<div
			class="glass-panel group corner-frame relative overflow-hidden rounded-2xl p-8 transition-all hover:border-cyan-500/30"
		>
			<h3 class="text-technical mb-8 text-slate-500">Identity Registry</h3>
			{#if loading}
				<div class="animate-pulse space-y-4">
					<div class="h-4 w-3/4 rounded bg-white/5"></div>
					<div class="h-4 w-1/2 rounded bg-white/5"></div>
				</div>
			{:else if profile}
				<div class="space-y-6">
					<div class="border-l-2 border-cyan-500/20 pl-4">
						<p class="text-technical mb-1 text-slate-600">Node Descriptor</p>
						<p class="font-bold tracking-tight text-white uppercase italic">{profile.full_name}</p>
					</div>
					<div class="border-l-2 border-cyan-500/20 pl-4">
						<p class="text-technical mb-1 text-slate-600">Sector Link</p>
						<p class="font-medium text-white">@{profile.username ?? 'unresolved'}</p>
					</div>
					<div class="border-l-2 border-cyan-500/20 pl-4">
						<p class="text-technical mb-1 text-slate-600">Uplink Address</p>
						<p class="truncate text-xs font-light text-slate-400">{session.user.email}</p>
					</div>
				</div>
				<a
					href="/profile"
					class="text-technical mt-10 block w-full rounded-lg border border-white/5 bg-white/5 py-4 text-center text-white transition-all hover:bg-cyan-500 hover:text-black"
				>
					Modify Registry
				</a>
			{:else}
				<p class="text-[10px] font-black tracking-widest text-slate-500 uppercase italic">
					No record found.
				</p>
			{/if}
		</div>

		<!-- Match Readout -->
		<div
			class="glass-panel group relative overflow-hidden rounded-2xl p-8 opacity-75 grayscale transition-all hover:border-purple-500/30 hover:grayscale-0"
		>
			<div
				class="absolute top-0 right-0 h-10 w-10 opacity-20 transition-opacity group-hover:opacity-100"
			>
				<svg viewBox="0 0 40 40" class="h-full w-full fill-none stroke-purple-500 stroke-1">
					<path d="M40 10V0H30" />
				</svg>
			</div>

			<h3 class="mb-6 text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">
				Neural Sync
			</h3>
			<div class="flex h-40 flex-col items-center justify-center text-center">
				<svg
					class="mb-4 h-12 w-12 animate-pulse text-slate-700"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
					/></svg
				>
				<p class="text-[10px] leading-relaxed font-bold tracking-widest text-slate-500 uppercase">
					Insufficient telemetry. <br /> Initialize matches with <br />
					<span class="text-purple-400"
						>{profile?.role === 'founder' ? 'Capital nodes' : 'Startup nodes'}</span
					>.
				</p>
			</div>
		</div>
	</div>
</div>
