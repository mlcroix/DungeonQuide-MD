"use server";
import { ContentDirectory } from "@/types/LoreContent";
import { getContentDirectory } from "@/lib/markdown";

export async function getDirectory(path: string): Promise<ContentDirectory> {
  const directory = await getContentDirectory(path);
  return directory;
}
