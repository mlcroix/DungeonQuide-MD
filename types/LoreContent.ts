export type ContentDirectory = {
    name: string;
    path: string;
    subDirectories: ContentDirectory[];
    files: ContentFiles[];
};

export type ContentFiles = {
    name: string;
    type: string;
};