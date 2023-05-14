import { Editor } from '@monaco-editor/react';
import { useSnippetStore } from '../store/snippetsStore';
import { useEffect, useState } from 'react';
import { writeTextFile } from '@tauri-apps/api/fs';
import { desktopDir } from '@tauri-apps/api/path';
import { TfiPencil } from 'react-icons/tfi';

function SnippetEditor() {

  const selectedSnippet = useSnippetStore(state => state.selectedSnippet);
  const [text, setText] = useState<string | undefined | null>("");


  useEffect(() => {
    if (!selectedSnippet) return;
    const saveText = setTimeout(async () => {
      const desktopPath = await desktopDir();
      await writeTextFile(`${desktopPath}/taurifiles/${selectedSnippet.name}`, text!);
      console.log("guarda sobre el archiu");
    }, 1000);
    return () => {
      console.log("saving");
      clearTimeout(saveText);
    }
  }, [text])

  return (
    <>
      {selectedSnippet ?
        (<Editor
          theme='vs-dark'
          defaultLanguage='javascript'
          value={selectedSnippet?.code ?? ""}
          options={
            {
              fontSize: 20
            }
          }

          onChange={(value) => setText(value)}
        />) :
        <TfiPencil className='text-9xl text-neutral-500' />
      }
    </>




  )
}

export default SnippetEditor