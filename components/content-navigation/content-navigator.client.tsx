"use client";
import { ContentDirectory } from "@/types/LoreContent";
import { useState } from "react";
import "./content-navigation.scss";

type ContentNavigatorClientProps = {
  initialDirectories: ContentDirectory[];
};

export function ContentNavigatorClient({
  initialDirectories,
}: ContentNavigatorClientProps) {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [directories, setDirectories] = useState(initialDirectories);

  return (
    <div className='content-navigator'>
      <h1>Content</h1>
      <ul>
        {directories.map((dir) => (
          <li key={dir.path}>
            <button onClick={() => setSelectedDirectory(dir)}>
              {dir.name}
            </button>
          </li>
        ))}
        {selectedDirectory && <div>Selected: {selectedDirectory.name}</div>}
      </ul>
    </div>
  );
}
