import { useEffect, useState } from 'react';
import { getContentDirectoryStructure } from '@/lib/markdown';
import { ContentDirectory } from '@/types/LoreContent';
import './content-navigation.scss';

function DirectoryTree({ directories }: { directories: ContentDirectory[] }) {
  return (
    <ul>
      {directories.map((directory) => (
        <li key={directory.path}>
          {directory.name}
          {/* If this directory has subdirectories, render them recursively */}
          {directory.subDirectories && directory.subDirectories.length > 0 && (
            <DirectoryTree directories={directory.subDirectories} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function ContentNavigator() {
   const contentDirectories = await getContentDirectoryStructure();

  return (
    <div className='content-navigator'>
      <DirectoryTree directories={contentDirectories} />
    </div>
  );
}