export declare const clipboard: {
    permission: (name: PermissionName) => Promise<boolean>;
    read: () => Promise<string>;
    write: (text: string) => Promise<void>;
    writeImage: (image: Blob | Promise<Blob>) => Promise<void>;
};
export declare const file: {
    save: (blob: Blob, fileName: string) => Promise<void>;
};
