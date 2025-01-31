interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const TipModal: $$__sveltets_2_IsomorphicComponent<{
    showModal?: boolean;
    openModal?: () => void;
    closeModal?: () => void;
    paymentTag?: string;
    paymentOptions?: {
        label: string;
        value: string;
    }[];
    modalTitle?: string;
    modalDescription?: string;
    buttonText?: string;
    buttonTheme?: "light" | "dark";
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    button: {};
}, {}, string>;
type TipModal = InstanceType<typeof TipModal>;
export default TipModal;
