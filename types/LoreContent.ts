export type ContentDirectory = {
    name: string;
    path: string;
    parentPath: string|null;
    subDirectories: ContentDirectory[];
    files: ContentFiles[];
};

export type ContentFiles = {
    name: string;
    type: string;
    parentPath: string;
};