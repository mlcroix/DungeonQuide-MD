import { getContentDirectory } from '@/lib/file-system';
import { ContentNavigatorClient } from './content-navigator.client';
import { getDirectory } from './actions';

export default async function ContentNavigator() {
  // Get the root directory
  const rootDirectory = await getContentDirectory(null);
  
  return (
    <ContentNavigatorClient 
      directory={rootDirectory}
      onNavigate={getDirectory}  // Pass server action as callback
    />
  );
}
