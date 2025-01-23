# TipModal Component

The `TipModal` component is a Svelte-based modal designed for displaying various payment options and allowing users to trigger it with customizable buttons. This component is lightweight, easy to use, and allows customization via props and slots.

![Screenshot 2025-01-23 at 9 34 26 AM](https://github.com/user-attachments/assets/a50c1fdf-e279-4588-99df-d862dde792a5)

---

## Installation

To use the `TipModal` component in your project, install it like so:

```bash
npm install git+https://github.com/clams-tech/tip-modal.git
```

Then, import it into your project:

```svelte
import TipModal from 'tip-modal';
```

---

## Props

### `showModal`

- **Type:** `boolean`
- **Description:** Controls the visibility of the modal.
- **Example:**
  ```svelte
  let showModal = false;
  ```

### `openModal`

- **Type:** `Function`
- **Description:** Function to set `showModal` to `true` and open the modal.
- **Example:**
  ```svelte
  function openModal() {
    showModal = true;
  }
  ```

### `closeModal`

- **Type:** `Function`
- **Description:** Function to set `showModal` to `false` and close the modal.
- **Example:**
  ```svelte
  function closeModal() {
    showModal = false;
  }
  ```

### `paymentOptions`

- **Type:** `Array`
- **Description:** An array of payment options to display in the modal.
- **Example:**
  ```svelte
  const paymentOptions = [
    { label: 'BOLT12', value: 'lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0qt2rt2xr6uuj7cfce48c5cr8sa2dqp2nkumkuztlq840mpjj95anvqsrh809gs052xe9reyna6v2djjv4p7k0leqy9uhthm8tpvvppphlmfsqvcdy9947hanvmq9mssn970apemvm7hjhg54qfdahgq2t5rwzca27ksjcz7lwn8xyl9qet4lmd4zjq8ucy4gq0cjem6q47gcl8a4f9lcr0qajukk809lnu7az9wupm0vz6ljh3ajgqqspdlvl6crzaxz9ueuu5h9as269y' },
    { label: 'LNURL', value: 'https://clams.tech/.well-known/lnurlp/tips' },
    { label: 'LN Address', value: 'tips@clams.tech' },
    { label: 'Onchain', value: 'bitcoin:32KAVNNDqjvw9SgProPnffVgdg4YEhgVKy' }
  ];
  ```

### `buttonText`

- **Type:** `string`
- **Default:** `'Donate'`
- **Description:** Text displayed on the default trigger button.
- **Example:**
  ```svelte
  <TipModal buttonText="DONATE" />
  ```

---

## Slots

The `TipModal` component supports a named slot (`button`) to fully customize the trigger button or element.

### Default Button

If no custom content is provided, the modal uses a default button:

```svelte
<TipModal />
```

### Custom Button

You can pass custom elements or buttons using the `slot="button"` syntax:

#### Example 1: Custom Button

```svelte
<TipModal>
	<button on:click={openModal} slot="button" class="custom-button"> Custom Donate </button>
</TipModal>
```

#### Example 2: Custom Text Element

```svelte
<TipModal>
	<p on:click={openModal} slot="button" class="custom-text">Donate Here</p>
</TipModal>
```

---

## Usage Examples

### Basic Modal with Default Button

```svelte
<script>
	import TipModal from './lib/components/TipModal.svelte';

	let showModal = false;
	const paymentOptions = [
		{ label: 'BOLT12', value: 'lno1zrxq...' },
		{ label: 'LNURL', value: 'https://clams.tech/.well-known/lnurlp/tips' },
		{ label: 'LN Address', value: 'tips@clams.tech' },
		{ label: 'Onchain', value: 'bitcoin:32KAVNNDqjvw9SgProPnffVgdg4YEhgVKy' }
	];

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<TipModal {showModal} {openModal} {closeModal} {paymentOptions} />
```

### Modal with Custom Button

```svelte
<TipModal {showModal} {openModal} {closeModal} {paymentOptions}>
	<button on:click={openModal} slot="button" class="custom-button"> Custom Donate </button>
</TipModal>
```

### Modal with Custom Text Element

```svelte
<TipModal {showModal} {openModal} {closeModal} {paymentOptions}>
	<p on:click={openModal} slot="button" class="custom-text">Donate Here</p>
</TipModal>
```

---

## Local Development

To run this component locally for development, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/clams-tech/tip-modal.git
   cd tip-modal
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

   This will start a local server (powered by Vite) for live preview and development.

4. Build the project:

   ```bash
   yarn build
   ```

   This command compiles the component for production.

---
