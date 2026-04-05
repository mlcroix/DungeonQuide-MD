"use client";
import { ContentDirectory } from "@/types/LoreContent";
import { useState } from "react";
import "./content-navigation.scss";

type ContentNavigatorClientProps = {
  directory: ContentDirectory;
  onNavigate: (path: string) => Promise<ContentDirectory>; // Callback to server
};

export function ContentNavigatorClient({
  directory,
  onNavigate,
}: ContentNavigatorClientProps) {
  const [currentDirectory, setCurrentDirectory] =
    useState<ContentDirectory>(directory);
  const [isLoading, setIsLoading] = useState(false);

  const handleDirectoryClick = async (subDirectory: ContentDirectory) => {
    setIsLoading(true);
    try {
      // Call the server action to get the next directory
      const nextDirectory = await onNavigate(subDirectory.path);
      setCurrentDirectory(nextDirectory);
    } catch (error) {
      console.error("Failed to load directory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-navigator">
      <div className="nav-header">
        <h1>Content</h1>
      </div>
      <div className="directories-list">
        <ul>
          {currentDirectory.subDirectories.map((subDirectory) => (
            <li key={subDirectory.path}>
              <button
                onClick={() => handleDirectoryClick(subDirectory)}
                className="directory-button"
              >
                📁 {subDirectory.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
