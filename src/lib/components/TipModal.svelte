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
		class="modal-overlay"
		on:click|stopPropagation={closeModal}
	>
		<div class="modal-content" on:click|stopPropagation>
			<button class="close-button" on:click={closeModal}>
				{@html close}
			</button>
			<Qr values={paymentOptions} />
		</div>
	</div>
{:else}
	<slot name="button">
		<!-- Default button -->
		<button class="default-button" on:click={openModal}>
			<div class="icon">{@html bitcoinIcon}</div>
			<span>{buttonText}</span>
		</button>
	</slot>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(10px);
	}

	.modal-content {
		position: relative;
		max-height: 95%;
		width: 100%;
		max-width: 24rem; /* 384px */
		overflow: auto;
		border-radius: 1.5rem; /* 24px */
		background: black;
		padding: 1rem;
		padding-top: 3.5rem; /* 56px */
		text-align: center;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.1),
			0 1px 3px rgba(0, 0, 0, 0.06);
	}

	.close-button {
		position: absolute;
		top: 0.25rem; /* 4px */
		right: 0.25rem; /* 4px */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem; /* 48px */
		height: 3rem; /* 48px */
		color: white;
		transition: color 0.2s;
	}

	.close-button:hover {
		color: #d1d5db; /* gray-300 */
	}

	.default-button {
		display: flex;
		align-items: center;
		border-radius: 0.375rem; /* 6px */
		background: black;
		padding: 0.5rem 1rem; /* 8px 16px */
		font-weight: 700;
		color: white;
		transition: color 0.2s;
	}

	.default-button:hover {
		color: #d1d5db; /* gray-300 */
	}

	.icon {
		width: 1.25rem; /* 20px */
		margin-right: 0.5rem; /* 8px */
	}
</style>
