import "server-only";
import fs from "fs";
import { readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { ContentDirectory, ContentFiles } from "@/types/LoreContent";

const contentRootDirectory = path.join(process.cwd(), "content");

/**
 * Receive the directory structure and convert it into an ContentDirectory object.
 * @param path - the path of the directory
 * @returns Promise<ContentDirectory[]> - the directory created by this function.
 */
async function getSubDirectories(path: string): Promise<ContentDirectory[]> {
  const directories = await readdir(path, { withFileTypes: true });
  const contentDirectories = directories
    .filter((entry) => entry.isDirectory())
    .map(
      (entry) =>
        ({
          name: entry.name,
          path: entry.parentPath.replace(process.cwd(), "") + "\\" + entry.name,
        }) as ContentDirectory,
    );

  return contentDirectories;
}


/**
 * Receive the contentdirectory of the given path. When path is null, it will receive the Content folder root.
 * @param string|null directoryPath - the path of the directory.
 * @returns Promise<ContentDirectory> - the contentdirectory based on the given path.
 */
export async function getContentDirectory(directoryPath: string | null): Promise<ContentDirectory> {
  // when we don't give a directoryPath, assume we want to get the Content folder root.
  if (!directoryPath) {
    directoryPath = contentRootDirectory;
  }

  const subDirectories: ContentDirectory[] = await getSubDirectories(directoryPath);

  const contentDirectory = {
    name: path.basename(directoryPath),
    path: path.relative(process.cwd(), directoryPath).replace(/\\/g, '/'),
    parentPath: contentRootDirectory == directoryPath ? null :  "meep",
    subDirectories: subDirectories,
    files: []
  };

  console.log(contentDirectory);
  
  return contentDirectory;
}
