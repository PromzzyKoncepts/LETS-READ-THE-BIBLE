import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useBibleStore = create()(
  persist(
    (set) => ({
      activeBook: "Genesis",
      activeBookShort: "Gen",
      activeChapter: 1,
      activeVerse: 1,
      setActiveBook: (activeBook) => set({ activeBook, activeChapter: 1 }),
      setActiveBookOnly: (activeBook) => set({ activeBook }),
      setActiveBookShort: (activeBookShort) => set({ activeBookShort }),
      setActiveChapter: (activeChapter) => set({ activeChapter }),
      setActiveVerse: (activeVerse) => {
        set({ activeVerse });
        document
          .getElementById("verse-" + activeVerse)
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      },
    }),
    {
      name: "bible-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
