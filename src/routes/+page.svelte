<script>
	import TipModal from '$lib/components/TipModal.svelte';

	let showModal = false;

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	const paymentOptions = [
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
</script>

<main class="flex h-screen items-center justify-center gap-4 bg-[#F5EEDC]">
	<TipModal {showModal} {openModal} {closeModal} {paymentOptions}></TipModal>

	<!-- <TipModal {showModal} {openModal} {closeModal} {paymentOptions} buttonText="DONATE"></TipModal>

	<TipModal {showModal} {openModal} {closeModal} {paymentOptions}
		><button on:click={openModal} slot="button" class="color-white border bg-white p-2">
			Custom Donate
		</button></TipModal
	> -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- <TipModal {showModal} {openModal} {closeModal} {paymentOptions}
		><p on:click={openModal} slot="button" class="underline">donate here</p></TipModal
	> -->
</main>
