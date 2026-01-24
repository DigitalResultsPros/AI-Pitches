<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let { profile, user } = $derived(data);
	let isSaving = $state(false);

	// Reactive form state
	let fullName = $state('');
	let username = $state('');
	let role = $state('member');

	$effect(() => {
		if (profile) {
			fullName = profile.full_name || '';
			username = profile.username || '';
			role = profile.role || 'member';
		}
	});
</script>

<svelte:head>
	<title>Modify Registry | AI-Pitches</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-20" in:fade>
	<div class="mb-12">
		<div class="mb-4 flex items-center gap-3">
			<div class="h-[1px] w-8 bg-cyan-500/50"></div>
			<span class="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase"
				>Mission Protocols: Identity</span
			>
		</div>
		<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">
			Modify Registry
		</h1>
		<p class="mt-2 text-lg font-light text-slate-500 italic">
			Authorized recalibration of network node metadata.
		</p>
	</div>

	<form
		method="POST"
		action="?/update"
		use:enhance={() => {
			isSaving = true;
			return async ({ update }) => {
				await update();
				isSaving = false;
			};
		}}
		class="space-y-8"
	>
		{#if form?.success}
			<div
				class="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-[10px] font-black tracking-widest text-cyan-400 uppercase italic shadow-[0_0_20px_rgba(6,182,212,0.1)]"
				in:fly={{ y: -10 }}
			>
				Success: Remote and local registries synchronized.
			</div>
		{/if}

		{#if form?.error}
			<div
				class="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-[10px] font-black tracking-widest text-red-500 uppercase italic"
				in:fly={{ y: -10 }}
			>
				Critical Error: {form.error}
			</div>
		{/if}

		<div class="glass-panel corner-frame space-y-8 rounded-2xl p-10">
			<!-- Field: Full Name -->
			<div>
				<label for="fullName" class="text-technical mb-3 block text-slate-500"
					>Node Descriptor (Full Name)</label
				>
				<input
					type="text"
					name="fullName"
					id="fullName"
					bind:value={fullName}
					required
					class="w-full rounded-xl border border-white/5 bg-slate-950 p-5 text-white transition-all outline-none focus:border-cyan-500/30"
				/>
			</div>

			<!-- Field: Username -->
			<div>
				<label for="username" class="text-technical mb-3 block text-slate-500"
					>Network Alias (Username)</label
				>
				<div class="relative">
					<span class="absolute top-5 left-5 text-slate-600">@</span>
					<input
						type="text"
						name="username"
						id="username"
						bind:value={username}
						required
						class="w-full rounded-xl border border-white/5 bg-slate-950 p-5 pl-10 text-white transition-all outline-none focus:border-cyan-500/30"
					/>
				</div>
			</div>

			<!-- Field: Role -->
			<div>
				<label for="role" class="text-technical mb-3 block text-slate-500"
					>Operational Sector (Role)</label
				>
				<div class="relative">
					<select
						name="role"
						id="role"
						bind:value={role}
						class="w-full appearance-none rounded-xl border border-white/5 bg-slate-950 p-5 text-white transition-all outline-none focus:border-cyan-500/30"
					>
						<option value="founder">FOUNDER - Node Creator</option>
						<option value="funder">FUNDER - Resource Provider</option>
						<option value="member">MEMBER - General Node</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-500"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</div>
				</div>
			</div>
		</div>

		<div class="flex gap-6">
			<a
				href="/dashboard"
				class="flex-1 rounded-xl border border-white/5 bg-white/5 py-5 text-center text-[10px] font-black tracking-[0.3em] text-white uppercase transition-all hover:bg-white/10"
			>
				Abort Update
			</a>
			<button
				type="submit"
				disabled={isSaving}
				class="flex-[2] rounded-xl bg-cyan-500 py-5 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-all hover:scale-[1.02] hover:bg-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50"
			>
				{isSaving ? 'Synchronizing...' : 'Initialize Registry Sync'}
			</button>
		</div>
	</form>
</div>
