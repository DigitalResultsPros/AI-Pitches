<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let { messages, contacts, user, adminId } = $derived(data);

	// Grouping messages into conversations
	let conversations = $derived(() => {
		if (!user) return [];
		const map = new Map();
		messages.forEach((m) => {
			const partnerId = m.senderId === user.id ? m.receiverId : m.senderId;
			if (!map.has(partnerId)) {
				const partner = contacts.find((c) => c.id === partnerId);
				map.set(partnerId, {
					partner: partner || { fullName: 'Unknown User', username: 'unknown' },
					lastMessage: m,
					unreadCount: m.receiverId === user.id && !m.readAt ? 1 : 0
				});
			}
		});
		return Array.from(map.values());
	});
</script>

<svelte:head>
	<title>Messages | AI-Pitches</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-20" in:fade>
	<div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<div class="mb-4 flex items-center gap-3">
				<div class="h-[1px] w-8 bg-cyan-500/50"></div>
				<span class="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase"
					>Sub-space Comms: Active</span
				>
			</div>
			<h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">Comms Deck</h1>
			<p class="mt-2 text-lg font-light text-slate-500 italic">
				Encrypted peer-to-peer transmission logs.
			</p>
		</div>

		<a
			href="/messages/new"
			class="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-xs font-black tracking-[0.2em] text-cyan-400 uppercase backdrop-blur-md transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
		>
			Initialize Uplink
		</a>
	</div>

	<div class="space-y-4">
		<!-- Admin System Uplink -->
		{#if adminId && user && adminId !== user.id}
			<a
				href="/messages/{adminId}"
				class="glass-panel group block rounded-2xl border-cyan-500/30 bg-cyan-950/10 p-6 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
			>
				<div class="flex items-center gap-6">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/></svg
						>
					</div>
					<div class="flex-1">
						<div class="mb-1 flex items-center justify-between">
							<h4 class="text-xs font-bold tracking-widest text-cyan-400 uppercase">
								Primary System Admin
							</h4>
							<span class="text-[8px] font-black tracking-[0.3em] text-cyan-500/50 uppercase italic"
								>Uplink Code: ROOT</span
							>
						</div>
						<p class="text-sm font-light text-slate-300">
							Direct p2p channel to the system administrator for technical support.
						</p>
					</div>
					<div class="animate-pulse text-cyan-500">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/></svg
						>
					</div>
				</div>
			</a>

			<!-- Divider -->
			<div class="flex items-center gap-4 py-4">
				<div class="h-[1px] flex-1 bg-slate-800"></div>
				<span class="text-[8px] font-black tracking-[0.4em] text-slate-700 uppercase"
					>Peer Transmissions</span
				>
				<div class="h-[1px] flex-1 bg-slate-800"></div>
			</div>
		{/if}

		{#if conversations().length === 0}
			<div class="glass-panel corner-frame rounded-2xl p-20 text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-white/5 text-slate-700"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
						/></svg
					>
				</div>
				<h3 class="text-technical text-slate-500">No active transmissions</h3>
				<p class="mt-4 text-sm font-light text-slate-600">
					Secure a connection with a node to start synchronization.
				</p>
			</div>
		{:else}
			{#each conversations() as convo}
				<a
					href="/messages/{convo.partner.id}"
					class="glass-panel group relative block rounded-2xl p-6 transition-all hover:border-cyan-500/30 active:scale-[0.99]"
				>
					<div class="flex items-center gap-6">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-slate-900 font-bold text-slate-500 transition-all group-hover:border-cyan-500/20 group-hover:text-cyan-400"
						>
							{convo.partner.fullName?.[0] || 'U'}
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center justify-between">
								<h4 class="mr-4 truncate font-bold tracking-tight text-white uppercase italic">
									{convo.partner.fullName || 'Unknown Node'}
								</h4>
								<span class="text-technical text-slate-600">
									{new Date(convo.lastMessage.createdAt).toLocaleDateString()}
								</span>
							</div>
							<p
								class="line-clamp-1 text-sm font-light text-slate-500 transition-colors group-hover:text-slate-300"
							>
								<span class="text-technical mr-1 text-cyan-500/50"
									>{user && convo.lastMessage.senderId === user.id ? 'TX:' : 'RX:'}</span
								>
								{convo.lastMessage.content}
							</p>
						</div>
						{#if convo.unreadCount > 0}
							<div
								class="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
							></div>
						{/if}
						<div class="text-slate-700 transition-colors group-hover:text-cyan-500/50">
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/></svg
							>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>
