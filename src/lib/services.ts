export const clipboard = {
  permission: async (name: PermissionName): Promise<boolean> => {
    try {
      const { state } = await navigator.permissions.query({ name });

      return state === "granted";
    } catch (error) {
      return false;
    }
  },
  read: async (): Promise<string> => {
    const clipboardText = await navigator.clipboard.readText();
    return clipboardText;
  },
  write: async (text: string): Promise<void> => {
    await navigator.clipboard.writeText(text);
  },
  writeImage: async (image: Blob | Promise<Blob>): Promise<void> => {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": image,
      }),
    ]);
  },
};

export const file = {
  save: async (blob: Blob, fileName: string) => {
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
