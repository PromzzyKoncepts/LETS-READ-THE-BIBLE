"use client"
import { Box, Text, Title } from "@mantine/core";
import { useBibleStore } from "./store";
import { useRef } from "react";
import { createStyles } from "@mantine/emotion";


const useStyles = createStyles((theme) => ({
  link: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const Verse = ({ verse, text }) => {
  const ref = useRef(null);
  const { classes, cx } = useStyles();
  const activeBook = useBibleStore((state) => state.activeBook);
  const activeChapter = useBibleStore((state) => state.activeChapter);
  const activeVerse = useBibleStore((state) => state.activeVerse);
  const setActiveVerse = useBibleStore((state) => state.setActiveVerse);
  setTimeout(() => {
    ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, 1000);
  return (
    <Box
      component="div"
      display="flex"
      className={cx(classes.link, {
        [classes.linkActive]: activeVerse === verse,   })}
      py={7}
      px={20}
      onClick={() => setActiveVerse(verse)}
      id={"verse-" + verse}
      ref={activeVerse === verse ? ref : null}
    >
      <Text className="!font-sniglet !text-sm !pr-1.5 !text-slate-700 !font-medium" fw="bold" mr={3}>
        {verse}
      </Text>
      <Title order={3} className="!font-sniglet" fw="light"  title={activeBook+ " chapter " + activeChapter +":" + verse}>
        {text}
      </Title>
    </Box>
  );
};

export default Verse;
