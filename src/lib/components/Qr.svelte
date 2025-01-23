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
	import { browser } from '$app/environment';

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

	if (browser) {
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

<div class="flex w-full flex-col items-center justify-center overflow-hidden">
	<div class="w-full max-w-[350px] md:max-w-[500px]">
		<div class="flex w-full justify-start">
			<div
				class="grid w-full overflow-hidden rounded-t-lg border border-b-0 text-sm font-semibold"
				style="grid-template-columns: repeat({values.length}, 1fr);"
			>
				{#each values as { label }, index}
					<button
						on:click={() => (selectedValueIndex = index)}
						class="cursor-pointer bg-none px-1 py-2 text-white transition-all hover:text-gray-300 [&.selected-tab]:bg-white [&.selected-tab]:text-black"
						class:selected-tab={index === selectedValueIndex}
					>
						{label}
					</button>
				{/each}
			</div>
		</div>
		<div class="flex w-full flex-col items-center justify-center overflow-hidden">
			<!-- QR Code -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button on:click={copyText} class="flex items-center justify-center border-none">
				<canvas bind:this={canvas} class="h-[380px] w-[380px]"></canvas>
			</button>
			<!-- Controls -->
			<div class="mt-4 flex w-full justify-between">
				<div class="flex max-w-[12rem] grow items-center">
					{#if message}
						<div transition:slide={{ axis: 'x' }} class="flex items-center text-white">
							<div class="mr-1 h-3.5 w-3.5 rounded-full border border-current">{@html info}</div>
							<div class="overflow-hidden text-ellipsis whitespace-nowrap">
								{message.value}
							</div>
						</div>
					{/if}
				</div>

				<div class="flex items-center justify-center gap-4">
					<button
						on:click={copyText}
						class="flex w-12 cursor-pointer items-center justify-center border-none bg-none text-white"
					>
						{@html copy}
					</button>
					<button
						on:click={copyImage}
						class="flex w-12 cursor-pointer items-center justify-center border-none bg-none text-white"
					>
						{@html photo}
					</button>
					<button
						on:click={saveImage}
						class="flex w-12 cursor-pointer items-center justify-center border-none bg-none text-white"
					>
						{@html save}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
