import "server-only";
import { readdir } from "fs/promises";
import path from "path";
import { ContentDirectory, ContentFile } from "@/types/LoreContent";

const contentRootDirectory = path.join(process.cwd(), "content");

/**
 * Receive the directory structure and convert it into ContentDirectory objects.
 * @param directoryPath - the path of the directory
 * @returns Promise<ContentDirectory[]> - array of subdirectories
 */
async function getSubDirectories(directoryPath: string): Promise<ContentDirectory[]> {
  const directories = await readdir(directoryPath, { withFileTypes: true });
  
  const contentDirectories = directories
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      // Use the imported 'path' module so it will work both on windows and Linux
      const fullPath = path.join(entry.parentPath, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);
      const normalizedPath = relativePath.replace(/\\/g, '/');
      
      return {
        name: entry.name,
        path: normalizedPath,
      } as ContentDirectory;
    });

  return contentDirectories;
}

/**
 * Receive the files of the given directory
 * @param directoryPath - the path of the directory
 * @returns Promise<ContentFile[]> - array of files
 */
async function getDirectoryFiles(directoryPath: string): Promise<ContentFile[]> {
     const directories = await readdir(directoryPath, { withFileTypes: true });
  
  const contentFiles = directories
    .filter((entry) => entry.isFile())
    .map((entry) => {
      // Use the imported 'path' module so it will work both on windows and Linux
      const fullPath = path.join(entry.parentPath, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);
      const normalizedPath = relativePath.replace(/\\/g, '/');
      
      return {
        name: entry.name,
        type: "file",
        path: normalizedPath,
        parentPath: directoryPath,
      } as ContentFile;
    });
    
    return contentFiles;
}


/**
 * Receive the contentdirectory of the given path. When path is null, it will receive the Content folder root.
 * @param directoryPath - the path of the directory (relative to project root, or null for root)
 * @returns Promise<ContentDirectory> - the contentdirectory based on the given path.
 */
export async function getContentDirectory(directoryPath: string | null): Promise<ContentDirectory> {
  const absolutePath = !directoryPath 
    ? contentRootDirectory 
    : path.join(process.cwd(), directoryPath);
  
  // Get subdirectories and files
  const subDirectories: ContentDirectory[] = await getSubDirectories(absolutePath);
  const subFiles: ContentFile[] = await getDirectoryFiles(absolutePath);
  
  // Calculate web-friendly paths
  const webPath = path.relative(process.cwd(), absolutePath).replace(/\\/g, '/');
  
  // Calculate parent path (null if this is the root)
  const isRoot = absolutePath === contentRootDirectory;
  const parentPath = isRoot 
    ? null 
    : path.relative(process.cwd(), path.dirname(absolutePath)).replace(/\\/g, '/');
  
  const contentDirectory = {
    name: path.basename(absolutePath),
    path: webPath,
    parentPath: parentPath,
    subDirectories: subDirectories,
    files: subFiles
  };
  
  return contentDirectory;
}
