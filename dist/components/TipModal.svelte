<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import close from '../icons/close.js';
	import Qr from '../components/Qr.svelte';
	import bitcoinIcon from '../icons/bitcoin.js';

	export let showModal = false;

	export let openModal: () => void = () => {};
	export let closeModal: () => void = () => {};

	let innerWidth: number;

	export let paymentOptions = [
		{
			label: 'BOLT12',
			value:
				'lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qt2rt2xr6uuj7cfce48c5cr8sa2dqp2nkumkuztlq840mpjj95anvqsrh809gs052xe9reyna6v2djjv4p7k0leqy9uhthm8tpvvppphlmfsqvcdy9947hanvmq9mssn970apemvm7hjhg54qfdahgq2t5rwzca27ksjcz7lwn8xyl9qet4lmd4zjq8ucy4gq0cjem6q47gcl8a4f9lcr0qajukk809lnu7az9wupm0vz6ljh3ajgqqspdlvl6crzaxz9ueuu5h9as269y'
		},
		{
			label: 'LNURL',
			value: 'https://clams.tech/.well-known/lnurlp/tips'
		},
		{
			label: 'LN Address',
			value: 'tips@clams.tech'
		},
		{
			label: 'Onchain',
			value: 'bitcoin:32KAVNNDqjvw9SgProPnffVgdg4YEhgVKy'
		}
	];

	export let buttonText = 'Donate';
</script>

<svelte:window bind:innerWidth on:keyup={({ key }) => key === 'Escape' && closeModal()} />

{#if showModal}
	<!-- Tip Modal -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		in:fade|global={{ easing: quintInOut }}
		on:click|stopPropagation={closeModal}
		class="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm"
	>
		<div
			on:click|stopPropagation
			class="relative max-h-[95%] w-full max-w-sm overflow-auto rounded-3xl bg-black p-4 pt-14 text-center shadow-lg"
		>
			<button
				on:click={closeModal}
				class="absolute right-1 top-1 flex h-12 w-12 items-center justify-center text-white hover:text-gray-300"
			>
				{@html close}
			</button>
			<Qr values={paymentOptions} />
		</div>
	</div>
{:else}
	<slot name="button">
		<!-- Default button -->
		<button
			class="flex items-center rounded bg-black px-4 py-2 font-bold text-white hover:text-gray-300"
			on:click={openModal}
		>
			<div class="w-5">{@html bitcoinIcon}</div>
			<span>{buttonText}</span>
		</button>
	</slot>
{/if}
