import { useEffect, useState } from 'react';
import { getAllFolders } from '@/lib/markdown';

export default async function Home() {
  const initialFolders = await getAllFolders();

  return (
    <div>
      {initialFolders}
    </div>
  );
}
