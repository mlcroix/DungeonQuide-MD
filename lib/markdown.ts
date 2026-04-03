import 'server-only';
import fs from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getAllFolders(): Promise<string[]> {
  try {
    const entries = await readdir(contentDirectory, { withFileTypes: true });
    
    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    return folders;
  } catch (error) {
    console.error('Error reading directories:', error);
    return [];
  }
}