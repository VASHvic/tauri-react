import { create } from 'zustand'

interface SnippetState {
  snippetsNames: string[];
  addSnippetName: (name: string) => void;
  setSnippetNames: (names: string[]) => void;
};

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsNames: [],
  addSnippetName: (name) => set((state) => ({
    snippetsNames: [...state.snippetsNames, name]
  })),
  setSnippetNames: (names) => set(state => ({
    snippetsNames: names
  }))

}));