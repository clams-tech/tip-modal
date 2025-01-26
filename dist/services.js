export const clipboard = {
    permission: async (name) => {
        try {
            const { state } = await navigator.permissions.query({ name });
            return state === "granted";
        }
        catch (error) {
            return false;
        }
    },
    read: async () => {
        const clipboardText = await navigator.clipboard.readText();
        return clipboardText;
    },
    write: async (text) => {
        await navigator.clipboard.writeText(text);
    },
    writeImage: async (image) => {
        await navigator.clipboard.write([
            new ClipboardItem({
                "image/png": image,
            }),
        ]);
    },
};
export const file = {
    save: async (blob, fileName) => {
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
};
