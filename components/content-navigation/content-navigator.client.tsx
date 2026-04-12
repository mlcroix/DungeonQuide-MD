"use client";
import { ContentDirectory } from "@/types/LoreContent";
import { useState } from "react";
import NavigatorButton from "../navigation-button";
import fileIcon from '@/public/file.svg';
import folderIcon from '@/public/folder.svg';
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
        <ul className="button-list">
          {currentDirectory.parentPath && (
            <li key={currentDirectory.parentPath} className="button-list-item">
              <NavigatorButton
                label="..."
                icon="/folder.svg"
                onClickFunction = {() => handleDirectoryClick(currentDirectory.parentPath!)}
              />
            </li>
          )}
          {currentDirectory.subDirectories.map((subDirectory) => (
            <li key={subDirectory.path} className="button-list-item">
              <NavigatorButton
                label={subDirectory.name}
                icon="/folder.svg"
                onClickFunction = {() => handleDirectoryClick(subDirectory.path)}
              />
            </li>
          ))}
          {currentDirectory.files.map((file) => (
            <li key={file.path} className="button-list-item">
              <NavigatorButton
                label={file.name}
                icon="/file.svg"
                onClickFunction = {() => handleDirectoryClick(currentDirectory.parentPath!)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
