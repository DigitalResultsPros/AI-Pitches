<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let { data, form } = $props();
	let { partner, messages, user } = $derived(data);

	let isSending = $state(false);
	let scrollContainer: HTMLDivElement;

	function scrollToBottom() {
		if (scrollContainer) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
	}

	onMount(() => {
		scrollToBottom();
	});

	$effect(() => {
		if (messages) {
			// Scroll when new messages arrived
			setTimeout(scrollToBottom, 50);
		}
	});

	$effect(() => {
		if (form?.success) {
			// Clear message input can be handled by enhance
		}
	});
</script>

<svelte:head>
	<title>{partner?.fullName || 'Chat'} | Messages</title>
</svelte:head>

<div class="mx-auto flex h-[calc(100vh-140px)] max-w-4xl flex-col px-4 pt-4" in:fade>
	<!-- Session Header -->
	<div class="glass-panel mb-6 flex items-center gap-6 rounded-2xl border-cyan-500/10 p-6">
		<a
			href="/messages"
			class="rounded-xl border border-white/5 bg-white/5 p-3 text-slate-500 transition-all hover:bg-white/10 hover:text-cyan-400"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 19l-7-7 7-7"
				/></svg
			>
		</a>
		<div
			class="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-slate-900 font-bold text-cyan-500"
		>
			{partner?.fullName?.[0] || 'U'}
		</div>
		<div class="flex-1">
			<h2 class="font-bold tracking-tight text-white uppercase">{partner?.fullName}</h2>
			<p class="mt-1 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
				Uplink: Synchronized • Sector: {partner?.role}
			</p>
		</div>
		<div
			class="hidden items-center gap-3 text-[10px] font-black tracking-widest text-cyan-500/40 uppercase italic md:flex"
		>
			<span>Session: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500"></span>
		</div>
	</div>

	<!-- Message Feed -->
	<div
		bind:this={scrollContainer}
		class="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-2 pb-10"
	>
		{#each messages as msg}
			{#if msg.senderId === user.id}
				<!-- Me (TX) -->
				<div class="flex justify-end" in:fly={{ x: 20, duration: 300 }}>
					<div class="max-w-[85%]">
						<div
							class="mb-1.5 flex items-center justify-end gap-2 text-[8px] font-black tracking-widest text-cyan-500/50 uppercase"
						>
							<span>TX-CHANNEL</span>
							<span
								>{new Date(msg.createdAt).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								})}</span
							>
						</div>
						<div
							class="rounded-2xl rounded-tr-none bg-white p-4 text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]"
						>
							<p class="text-sm leading-relaxed font-medium">{msg.content}</p>
						</div>
					</div>
				</div>
			{:else}
				<!-- Partner (RX) -->
				<div class="flex justify-start" in:fly={{ x: -20, duration: 300 }}>
					<div class="max-w-[85%]">
						<div
							class="mb-1.5 flex items-center gap-2 text-[8px] font-black tracking-widest text-slate-600 uppercase"
						>
							<span class="text-purple-500/60">RX-BUFFER</span>
							<span
								>{new Date(msg.createdAt).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								})}</span
							>
						</div>
						<div class="glass-panel rounded-2xl rounded-tl-none border-white/10 p-4 text-slate-100">
							<p class="text-sm leading-relaxed font-light">{msg.content}</p>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			<div class="flex h-full items-center justify-center">
				<div class="text-center">
					<div class="mb-4 flex justify-center">
						<div
							class="h-12 w-12 rounded-xl border border-white/5 animate-spin-slow flex items-center justify-center"
						>
							<div class="h-6 w-6 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full"></div>
						</div>
					</div>
					<p class="text-[10px] font-black tracking-[0.4em] uppercase text-slate-700 italic">
						Awaiting first data packet...
					</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- System Input Console -->
	<div class="py-6">
		<form
			method="POST"
			action="?/send"
			use:enhance={() => {
				isSending = true;
				return async ({ update }) => {
					await update();
					isSending = false;
				};
			}}
			class="glass-panel flex items-center gap-4 rounded-2xl border-cyan-500/20 bg-slate-900/60 p-3 transition-all focus-within:border-cyan-500/50"
		>
			<input
				name="content"
				type="text"
				placeholder="Enter string transmission command..."
				required
				autocomplete="off"
				class="flex-1 bg-transparent px-5 py-3 font-light text-white outline-none placeholder:text-slate-700"
			/>
			<button
				type="submit"
				disabled={isSending}
				class="flex h-12 w-16 items-center justify-center rounded-xl bg-cyan-500 text-black transition-all hover:scale-105 hover:bg-white active:scale-95 disabled:opacity-50"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 5l7 7-7 7M5 5l7 7-7 7"
					/></svg
				>
			</button>
		</form>
	</div>
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
