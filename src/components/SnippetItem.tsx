import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from 'tailwind-merge'
import { desktopDir, join } from "@tauri-apps/api/path";
import { toast } from 'react-hot-toast'
import { FiTrash, FiX } from 'react-icons/fi'
interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(state => state.setSelectedSnippet);
  const selectedSnippet = useSnippetStore(state => state.selectedSnippet);
  const removeSnippetName = useSnippetStore(state => state.removeSnippetName);
  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm("Seguro que quiere borrar el archivo?");
    if (accept) {
      removeSnippetName(snippetName);
      const desktopPath = await desktopDir();
      const filePath = await join(desktopPath, "taurifiles", snippetName);
      await removeFile(filePath);

      toast.success("Snippet eliminado", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#202020",
          color: "#ffffff"
        }
      });
    }
  }
  return (

    <div
      className={twMerge("px-2 px4 bg-neutral-900 hover:cursor-pointer flex justify-between", selectedSnippet?.name === snippetName ? "bg-sky-500" : "")}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(desktopPath, "taurifiles", snippetName);
        const fileContent = await readTextFile(filePath);
        setSelectedSnippet({ name: snippetName, code: fileContent });
      }}
    >
      <h1>{snippetName}</h1>

      {selectedSnippet?.name == snippetName &&

        <div className="flex gap-2 text-center justify-center">
          <FiTrash className="text-neutral-500" onClick={async (e) => {
            await handleDelete(snippetName);
          }
          } />
          <FiX className="text-neutral-500" onClick={(e) => {
            e.stopPropagation();
            setSelectedSnippet(null);
          }} />
        </div>
      }
    </div>


  )
}

export default SnippetItem
