import { create } from 'zustand'
interface Snippet {
  name: string;
  code: string | null;
}
interface SnippetState {
  snippetsNames: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  setSnippetNames: (names: string[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void
  removeSnippetName: (snippetName: string) => void
};

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsNames: [],
  selectedSnippet: null,
  addSnippetName: (name) => set((state) => ({
    snippetsNames: [...state.snippetsNames, name]
  })),
  setSnippetNames: (names) => set(({
    snippetsNames: names
  })),
  setSelectedSnippet: (snippet) => set(({
    selectedSnippet: snippet
  })),
  removeSnippetName: (name) => set((state) => ({
    snippetsNames: state.snippetsNames.filter(snippetName => snippetName !== name)
  })),

}));