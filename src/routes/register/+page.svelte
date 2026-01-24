<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	// Get role from Query param (default to 'founder')
	let role = $derived($page.url.searchParams.get('role') || 'founder');

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let error = $state('');

	const handleRegister = async (event: Event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		try {
			loading = true;
			error = ''; // Clear previous errors
			const { data, error: err } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						role: role // Save the selected role in metadata
					}
				}
			});
			if (err) throw err;

			// If success
			alert('Check your email for the confirmation link!');
			window.location.href = '/login';
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Join AI-Pitches | Register</title>
</svelte:head>

<div class="flex min-h-[80vh] items-center justify-center px-4" in:fade>
	<div class="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
		<div class="mb-8 text-center">
			<h2
				class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-3xl font-bold text-transparent"
			>
				Join as a {role.charAt(0).toUpperCase() + role.slice(1)}
			</h2>
			<p class="mt-2 text-sm text-slate-400">Start building the future of AI.</p>
		</div>

		{#if error}
			<div class="mb-4 rounded-lg border border-red-500/50 bg-red-500/20 p-3 text-sm text-red-200">
				{error}
			</div>
		{/if}

		<form class="space-y-4" onsubmit={handleRegister}>
			<!-- Role Toggle (Optional Override) -->
			<div class="mb-6 flex rounded-lg bg-slate-900 p-1">
				<a
					href="?role=founder"
					class="flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors {role ===
					'founder'
						? 'bg-cyan-900/50 text-cyan-400'
						: 'text-slate-500 hover:text-white'}">Founder</a
				>
				<a
					href="?role=funder"
					class="flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors {role ===
					'funder'
						? 'bg-purple-900/50 text-purple-400'
						: 'text-slate-500 hover:text-white'}">Funder</a
				>
			</div>

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

			<div>
				<label for="confirm" class="mb-1 block text-sm font-medium text-slate-300"
					>Confirm Password</label
				>
				<input
					type="password"
					id="confirm"
					bind:value={confirmPassword}
					class="w-full rounded-lg border border-white/10 bg-slate-900/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
					placeholder="••••••••"
					required
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="mt-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 font-bold text-black transition-all duration-200 hover:from-cyan-400 hover:to-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Creating Account...' : 'Get Started'}
			</button>

			<div class="mt-6 text-center text-sm text-slate-400">
				Already have an account? <a href="/login" class="text-cyan-400 hover:underline">Log in</a>
			</div>
		</form>
	</div>
</div>
