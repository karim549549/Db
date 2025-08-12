import { create } from "zustand";

interface SchemaContext {
  context: string;
  setContext: (context: string) => void;
}

export const useSchemaContextStore = create<SchemaContext>((set) => ({
  context: "",
  setContext: (context) => set(() => ({ context })),
}));
