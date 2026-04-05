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

  const handleDirectoryClick = async (directoryPath: string) => {
    setIsLoading(true);
    try {
      // Call the server action to get the next directory
      const nextDirectory = await onNavigate(directoryPath);
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
          {currentDirectory.parentPath && (
            <li key={currentDirectory.parentPath}>
              <button
                onClick={() =>
                  handleDirectoryClick(currentDirectory.parentPath!)
                }
                className="directory-button back-button"
              >
                📁 ..
              </button>
            </li>
          )}
          {currentDirectory.subDirectories.map((subDirectory) => (
            <li key={subDirectory.path}>
              <button
                onClick={() => handleDirectoryClick(subDirectory.path)}
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
