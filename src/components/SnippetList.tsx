import { readDir } from '@tauri-apps/api/fs'
import { desktopDir } from '@tauri-apps/api/path';
import React, { useEffect } from 'react'
import { useSnippetStore } from '../store/snippetsStore';

function SnippetList() {
  const setSnippetsNames = useSnippetStore(state => state.setSnippetNames);
  const snippetNames = useSnippetStore(state => state.snippetsNames);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const dirFiles = await readDir(`${desktopPath}/taurifiles`);
      setSnippetsNames(dirFiles.map(file => file.name!));
    }
    loadFiles();

  }, []);
  return (
    <div>
      {snippetNames.map(snippetName => (
        <div>
          <h1>
            {snippetName}
          </h1>
        </div>
      ))}
    </div>
  )
}

export default SnippetList