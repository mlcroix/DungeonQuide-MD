import 'server-only';
import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { ContentDirectory, ContentFiles } from '@/types/LoreContent';

const contentDirectory = path.join(process.cwd(), 'content');


/**
 * Receive the directory structure and convert it into an ContentDirectory object.
 * @param path - the path of the directory
 * @returns Promise<ContentDirectory[]> - the directory created by this function.
 */
async function getDirectoryStructure(path: string): Promise<ContentDirectory[]> {
  const directories = await readdir(path, { withFileTypes: true });
    const contentDirectories = directories
      .filter(entry => entry.isDirectory())
      .map(entry => ({
          name: entry.name,
          path: entry.parentPath.replace(process.cwd(), '') + "\\" + entry.name
        } as ContentDirectory));
  
  return contentDirectories;
}

/**
 * Receive the directory structure of the content directory.
 * @returns Promise<ContentDirectory[] - the whole directory structure of the content folder.
 */
export async function getAllFolders(): Promise<ContentDirectory[]> {
  try {
    const contentRootDirectories: ContentDirectory[] = await getDirectoryStructure(contentDirectory);
    const stack: ContentDirectory[] = [];

    // loop over contentRootDirectories to receive subdirectories and add them to the stack. 
    // Note: I do use for here, because foreach does not wait on await.
    for (const directory of contentRootDirectories) {
      const directoryPath = path.join(process.cwd(), directory.path);
      directory.subDirectories = await getDirectoryStructure(directoryPath);

      // push subdirectories to stack, so we can process them futher.
      for (const subdirectory of directory.subDirectories) {
        stack.push(subdirectory);
      }
    };

    // Loop over the stack subdirectories to process them and complete the directoy structure. 
    // I use a simple queue system here to keep track of all subdirectories. 
    while (stack.length != 0) {
      const stackDirectory = stack.pop() as ContentDirectory;
      const directoryPath = path.join(process.cwd(), stackDirectory.path)
      stackDirectory.subDirectories = await getDirectoryStructure(directoryPath);

      // push new subdirectories to stack to keep the going.
      stackDirectory.subDirectories.forEach((directory) => {
        stack.push(directory);
      });
    }
    
    console.log("== content directory ==");
    console.log(contentRootDirectories);
    return contentRootDirectories;
  } catch (error) {
    console.error('Error reading directories:', error);
    return [];
  }
}
