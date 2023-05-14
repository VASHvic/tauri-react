import { writeTextFile } from '@tauri-apps/api/fs'
import { desktopDir } from '@tauri-apps/api/path'
import { useState } from 'react';
import { useSnippetStore } from '../store/snippetsStore';

import { toast } from 'react-hot-toast'
function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetStore(state => state.addSnippetName)
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await writeTextFile(`${await desktopDir()}/taurifiles/${snippetName}`, "");
      setSnippetName("");
      addSnippetName(snippetName);
      toast.success("Snippet guardado", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#202020",
          color: "#ffffff"
        }
      });
    }}>
      <input type="text"
        onChange={(e) => setSnippetName(e.target.value)}
        className="bg-zinc-900 w-full border-none outline-none p-4"
        placeholder="Write a Snippet"
        value={snippetName} />
      <button className="hidden">Save</button>
    </form >
  )
}

export default SnippetForm