<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let { supabase } = $derived(data);

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	const handleLogin = async (event: Event) => {
		event.preventDefault();
		console.log('[PHASE 1] Starting Login Request...');
		try {
			loading = true;
			error = '';
			const { data: authData, error: err } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (err) {
				console.error('[PHASE 1] Auth Error:', err.message);
				throw err;
			}

			console.log('[PHASE 1] Auth Success! User ID:', authData.user?.id);
			console.log('[PHASE 1] Redirecting to /dashboard...');
			await goto('/dashboard');
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Login | AI-Pitches</title>
</svelte:head>

<div class="flex min-h-[80vh] items-center justify-center px-4" in:fade>
	<div class="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
		<h2
			class="mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-center text-3xl font-bold text-transparent"
		>
			Welcome Back
		</h2>

		{#if error}
			<div class="mb-4 rounded-lg border border-red-500/50 bg-red-500/20 p-3 text-sm text-red-200">
				{error}
			</div>
		{/if}

		<form class="space-y-4" onsubmit={handleLogin}>
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-slate-300">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full rounded-lg border border-white/10 bg-slate-900/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
					placeholder="you@example.com"
					required
				/>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-slate-300">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full rounded-lg border border-white/10 bg-slate-900/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
					placeholder="••••••••"
					required
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="mt-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-bold text-black transition-all duration-200 hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Logging in...' : 'Sign In'}
			</button>

			<div class="mt-6 text-center text-sm text-slate-400">
				Don't have an account? <a href="/register" class="text-cyan-400 hover:underline">Join now</a
				>
			</div>
		</form>
	</div>
</div>
