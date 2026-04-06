"use server";
import { ContentDirectory } from "@/types/LoreContent";
import { getContentDirectory } from "@/lib/file-system";

export async function getDirectory(path: string): Promise<ContentDirectory> {
  const directory = await getContentDirectory(path);
  return directory;
}
