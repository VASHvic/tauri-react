import { writeTextFile } from '@tauri-apps/api/fs'
import { desktopDir } from '@tauri-apps/api/path'
import { useState } from 'react';

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await writeTextFile(`${await desktopDir()}/taurifiles/${snippetName}.txt`, "");
      setSnippetName("");
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