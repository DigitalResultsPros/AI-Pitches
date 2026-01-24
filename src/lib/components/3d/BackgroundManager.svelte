<script lang="ts">
	import { uiVersion } from '$lib/stores/uiState';
	import BackgroundStars from './BackgroundStars.svelte';
	import BackgroundGeometric from './BackgroundGeometric.svelte';
	import { page } from '$app/stores';

	// Logic:
	// If not on home page, maybe default to simple stars?
	// For now, let's respect the store everywhere for consistency.
</script>

{#if $uiVersion === 'futuristic'}
	<BackgroundGeometric />
{:else}
	<BackgroundStars />
{/if}
