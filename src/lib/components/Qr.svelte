<script lang="ts">
	import { slide } from 'svelte/transition';
	import copy from '../icons/copy.js';
	import photo from '../icons/photo.js';
	import { onDestroy } from 'svelte';
	import { truncateValue } from '../utils.js';
	import info from '../icons/info.js';
	import save from '../icons/save.js';
	import { clipboard, file } from '../services.js';
	import { QrCode, Ecc } from '../qrcodegen.js';
	import { BROWSER } from 'esm-env';

	export let values: { label: string; value: string }[];

	let selectedValueIndex = 0;
	$: selectedValue = values[selectedValueIndex];

	let canvas: HTMLCanvasElement;

	type Message = {
		value: string;
		timeout: NodeJS.Timeout | null;
	};

	let message: Message | null = null;

	let containerWidth = 380; // Default width for SSR

	if (BROWSER) {
		containerWidth = Math.min(window.innerWidth - 32, 380);
	}

	$: if (selectedValue && canvas) {
		const qr: QrCode = QrCode.encodeText(selectedValue.value, Ecc.LOW);
		const border = 4;
		const scale = Math.round(containerWidth / (qr.size + border * 2));
		const lightColor = '#FFFFFF';
		const darkColor = '#000000';

		const width = (qr.size + border * 2) * scale;
		canvas.width = width;
		canvas.height = width;
		let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		for (let y = -border; y < qr.size + border; y++) {
			for (let x = -border; x < qr.size + border; x++) {
				ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
				ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
			}
		}
	}

	function setMessage(value: string) {
		// clear current timeout
		message?.timeout && clearTimeout(message.timeout);

		message = {
			value,
			timeout: setTimeout(() => (message = null), 4000)
		};
	}

	async function copyImage() {
		try {
			await clipboard.writeImage(getBlob());
			setMessage('image copied');
		} catch (error) {
			const { message } = error as Error;
			setMessage(message);
		}
	}

	function getBlob(): Promise<Blob> {
		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) {
					resolve(blob);
				}

				reject(new Error('Could not get image data'));
			});
		});
	}

	async function saveImage() {
		try {
			const rawData = await getBlob();

			await file.save(
				rawData,
				`${selectedValue.label}-${truncateValue(selectedValue.value, 6)}.png`
			);

			setMessage('image saved');
		} catch (error) {
			const { message } = error as Error;
			setMessage(message);
		}
	}

	async function copyText() {
		try {
			await clipboard.write(selectedValue.value);
			setMessage('value copied');
		} catch (error) {
			const { message } = error as Error;
			setMessage(message);
		}
	}

	onDestroy(() => {
		message?.timeout && clearTimeout(message.timeout);
	});
</script>

<div class="container">
	<div class="inner-container">
		<div class="tabs">
			<div class="tab-grid" style="grid-template-columns: repeat({values.length}, 1fr);">
				{#each values as { label }, index}
					<button
						on:click={() => (selectedValueIndex = index)}
						class:selected-tab={index === selectedValueIndex}
					>
						{label}
					</button>
				{/each}
			</div>
		</div>

		<div class="qr-code-container">
			<!-- QR Code -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button on:click={copyText} class="qr-button">
				<canvas bind:this={canvas} class="qr-canvas"></canvas>
			</button>

			<!-- Controls -->
			<div class="controls">
				<div class="message-container">
					{#if message}
						<div transition:slide={{ axis: 'x' }} class="message">
							<div class="info-icon">{@html info}</div>
							<div class="message-text">{message.value}</div>
						</div>
					{/if}
				</div>

				<div class="actions">
					<button on:click={copyText} class="action-button">{@html copy}</button>
					<button on:click={copyImage} class="action-button">{@html photo}</button>
					<button on:click={saveImage} class="action-button">{@html save}</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.inner-container {
		width: 100%;
		max-width: 350px;
	}

	@media (min-width: 768px) {
		.inner-container {
			max-width: 500px;
		}
	}

	.tabs {
		display: flex;
		justify-content: start;
	}

	.tab-grid {
		display: grid;
		width: 100%;
		overflow: hidden;
		border: 1px solid;
		border-bottom: 0;
		border-radius: 8px 8px 0 0;
		font-size: 14px;
		font-weight: 600;
		border: 1px solid white;
		border-bottom: none;
	}

	.tab-grid button {
		cursor: pointer;
		background: none;
		padding: 1em 0.1em;
		color: white;
		transition: all 0.2s;
		text-align: center;
	}

	.tab-grid button:hover {
		color: #d1d5db;
	}

	.tab-grid button.selected-tab {
		background: white;
		color: black;
	}

	.qr-code-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.qr-button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: none;
	}

	.qr-canvas {
		height: 380px;
		width: 380px;
	}

	.controls {
		margin-top: 1em;
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.message-container {
		display: flex;
		max-width: 12em;
		flex-grow: 1;
		align-items: center;
	}

	.message {
		display: flex;
		align-items: center;
		color: white;
	}

	.info-icon {
		margin-right: 0.25em;
		height: 0.875em;
		width: 0.875em;
		border-radius: 50%;
		border: 1px solid currentColor;
	}

	.message-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	.action-button {
		display: flex;
		width: 3em;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border: none;
		background: none;
		color: white;
	}
</style>
