import { getDirectoryContent } from '@/lib/markdown';
import { ContentNavigatorClient } from './content-navigator.client';

export default async function ContentNavigator() {
  const contentDirectories = await getDirectoryContent(null);
  return <ContentNavigatorClient initialDirectories={contentDirectories} />;
}
