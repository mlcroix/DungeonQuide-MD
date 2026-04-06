export type ContentDirectory = {
    name: string;
    path: string;
    parentPath: string|null;
    subDirectories: ContentDirectory[];
    files: ContentFile[];
};

export type ContentFile = {
    name: string;
    type: string;
    path: string;
    parentPath: string;
};