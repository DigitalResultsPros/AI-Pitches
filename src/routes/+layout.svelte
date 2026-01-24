<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import BackgroundManager from '$lib/components/3d/BackgroundManager.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children, data } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			console.log(`[PHASE 2] Auth Event: ${event}`);
			if (_session?.expires_at !== session?.expires_at) {
				console.log('[PHASE 2] Token Mismatch - Invalidating session...');
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="pointer-events-none fixed top-0 left-0 -z-50 h-full w-full">
	<BackgroundManager />
</div>

<div class="relative z-50 flex min-h-screen flex-col">
	<Navbar />

	<main class="mt-24 flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
