<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { data, form } = $props();
	let { users } = $derived(data);

	let searchQuery = $state('');
	let selectedUser: any = $state(null);
	let isSending = $state(false);

	let filteredUsers = $derived(
		users.filter(
			(u: any) =>
				u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.username?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	$effect(() => {
		if (form?.success) {
			goto(`/messages/${form.partnerId}`);
		}
	});
</script>

<svelte:head>
	<title>New Message | AI-Pitches</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-20" in:fade>
	<div class="mb-12">
		<div class="mb-4 flex items-center gap-3">
			<div class="h-[1px] w-8 bg-cyan-500/50"></div>
			<span class="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase"
				>Protocol: P2P Initialization</span
			>
		</div>
		<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">New Uplink</h1>
		<p class="mt-2 text-lg font-light text-slate-500 italic">
			Select a network node to begin transmission.
		</p>
	</div>

	{#if !selectedUser}
		<!-- User Search -->
		<div class="space-y-6" in:fly={{ y: 20 }}>
			<div class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search nodes by alias..."
					class="glass-panel w-full rounded-2xl p-6 pl-14 text-white outline-none focus:border-cyan-500/50"
				/>
				<svg
					class="absolute top-6 left-5 h-6 w-6 text-slate-600"
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

			<div class="custom-scrollbar max-h-[50vh] space-y-3 overflow-y-auto pr-2">
				{#each filteredUsers as user}
					<button
						onclick={() => (selectedUser = user)}
						class="glass-panel group flex w-full items-center gap-6 rounded-2xl p-6 transition-all hover:border-cyan-500/40 active:scale-[0.98]"
					>
						<div
							class="flex h-14 w-14 items-center justify-center rounded-xl border border-white/5 bg-slate-900 font-bold text-slate-500 group-hover:border-cyan-500/20 group-hover:text-cyan-400"
						>
							{user.fullName?.[0] || 'U'}
						</div>
						<div class="flex-1 text-left">
							<p class="font-bold tracking-tight text-white uppercase">{user.fullName}</p>
							<p class="mt-1 text-[10px] font-black tracking-widest text-slate-600 uppercase">
								@{user.username} • Sector: {user.role}
							</p>
						</div>
						<div class="text-slate-800 transition-colors group-hover:text-cyan-500">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4v16m8-8H4"
								/></svg
							>
						</div>
					</button>
				{:else}
					<p
						class="py-20 text-center text-[10px] font-black tracking-[0.4em] uppercase text-slate-700 italic"
					>
						No node telemetry detected.
					</p>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Compose Message -->
		<div class="space-y-8" in:fly={{ x: 20 }}>
			<div
				class="glass-panel flex items-center gap-6 rounded-2xl border-cyan-500/20 bg-cyan-950/10 p-6"
			>
				<div
					class="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-900/30 font-bold text-cyan-400"
				>
					{selectedUser.fullName?.[0] || 'U'}
				</div>
				<div class="flex-1">
					<p class="text-sm font-bold tracking-tight text-white uppercase">
						{selectedUser.fullName}
					</p>
					<p class="text-[10px] font-black tracking-widest text-cyan-500/60 uppercase">
						Node ID: {selectedUser.id.split('-')[0]}
					</p>
				</div>
				<button
					onclick={() => (selectedUser = null)}
					class="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase transition-colors hover:text-white"
					>Reset Uplink</button
				>
			</div>

			<form
				method="POST"
				action="?/startChat"
				use:enhance={() => {
					isSending = true;
					return async ({ update }) => {
						await update();
						isSending = false;
					};
				}}
				class="space-y-6"
			>
				<input type="hidden" name="receiverId" value={selectedUser.id} />

				{#if form?.error}
					<p
						class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold tracking-widest text-red-500 uppercase"
					>
						Critical: {form.error}
					</p>
				{/if}

				<div>
					<label
						for="message"
						class="mb-3 block text-[10px] font-black tracking-[0.4em] text-slate-600 uppercase"
						>Transmission Content</label
					>
					<textarea
						name="message"
						id="message"
						required
						rows="8"
						placeholder="Entering data format: Encrypted text..."
						class="glass-panel w-full resize-none rounded-2xl p-6 text-white outline-none focus:border-cyan-500/50"
					></textarea>
				</div>

				<div class="flex gap-6">
					<button
						type="button"
						onclick={() => (selectedUser = null)}
						class="flex-1 rounded-xl border border-white/5 bg-white/5 py-5 text-[10px] font-black tracking-[0.3em] text-white uppercase transition-all hover:bg-white/10"
					>
						Retract
					</button>
					<button
						type="submit"
						disabled={isSending}
						class="flex-[2] rounded-xl bg-cyan-500 py-5 text-[10px] font-black tracking-[0.3em] text-black uppercase transition-all hover:scale-[1.02] hover:bg-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50"
					>
						{isSending ? 'Transmitting...' : 'Initialize Data Sync'}
					</button>
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
</style>
