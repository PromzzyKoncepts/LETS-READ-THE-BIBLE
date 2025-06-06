"use client"
import { useBibleStore } from "./store";
import { getVersesInChapter } from "./readApi";
import { Box, ScrollArea } from "@mantine/core";
import { useRef } from "react";
import SubHeader from "./SubHeader";
import Verse from "./Verse";
import '@mantine/core/styles.css';
const Passage = ({ open }) => {
  const viewport = useRef(null);
  const activeBook = useBibleStore((state) => state.activeBook);
  const activeChapter = useBibleStore((state) => state.activeChapter);
  const { currentTranslation } = useBibleStore()
  return (
    <Box style={{ flex: "1 0 100%" }}>
      <SubHeader open={open} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4C2C2"
        }}
        h="100vh"
      >
        <ScrollArea h="100vh" viewportRef={viewport}>
          <div className="py-20">
          {getVersesInChapter(activeBook, activeChapter, currentTranslation).map(
            ({ verse, text }) => (
              <Verse verse={verse} key={verse} text={text} />
            )
          )}
          </div>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Passage;
