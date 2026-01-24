<script lang="ts">
	import LandingClassic from '$lib/components/landing/LandingClassic.svelte';
	import LandingFuturistic from '$lib/components/landing/LandingFuturistic.svelte';
	import { uiVersion } from '$lib/stores/uiState';

	// Simple toggle for demo purposes
	function toggleVersion() {
		uiVersion.update((v) => (v === 'classic' ? 'futuristic' : 'classic'));
	}
</script>

<svelte:head>
	<title>AI-Pitches | Connect, Fund, Build</title>
	<meta name="description" content="The premier community for AI founders and funders." />
</svelte:head>

{#if $uiVersion === 'classic'}
	<LandingClassic />
{:else}
	<LandingFuturistic />
{/if}

<!-- Version Toggler (Fixed Bottom Right) -->
<button
	onclick={toggleVersion}
	class="fixed right-4 bottom-4 z-50 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs tracking-widest text-white/50 uppercase backdrop-blur-md transition hover:bg-black/80 hover:text-white"
>
	Switch to {$uiVersion === 'classic' ? 'V2' : 'V1'}
</button>
