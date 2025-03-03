"use client";
import { AppShell, Box, ScrollArea, rem } from "@mantine/core";
import { getBooks, getChapters, getVerses } from "./readApi";
import { useBibleStore } from "./store";
import Link from "next/link";
import { useEffect } from "react";
import { createStyles } from "@mantine/emotion";

const useStyles = createStyles((theme) => ({
  border: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
  },
  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.xs}`,
    fontSize: theme.fontSizes.sm,
    margin: `0 ${theme.spacing.xs}`,
    fontWeight: 500,
    height: rem(30),
    lineHeight: rem(30),
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const MyNavbar = ({ opened, setOpened }) => {
  const { classes, cx } = useStyles();
  const activeBook = useBibleStore((state) => state.activeBook);
  const activeChapter = useBibleStore((state) => state.activeChapter);
  const activeVerse = useBibleStore((state) => state.activeVerse);
  const setActiveBook = useBibleStore((state) => state.setActiveBook);
  const setActiveBookShort = useBibleStore((state) => state.setActiveBookShort);
  const setActiveChapter = useBibleStore((state) => state.setActiveChapter);
  const setActiveVerse = useBibleStore((state) => state.setActiveVerse);

  useEffect(() => {
    console.log("Books loaded");
  }, []);

  return (
    <AppShell.Navbar
      p="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 320, lg: 320 }}
      style={{
        transition: "width 0.5s ease",
        overflow: "hidden",
        backgroundColor: "inherit",
      }}
    >
      <AppShell.Section grow component={ScrollArea}>
        <Box className={classes.border}>
          {getBooks().map((book) => (
            <Link
              key={book.book_id}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveBook(book.book_name);
                setActiveBookShort(book.book_id);
              }}
              className={cx(classes.link, {
                [classes.linkActive]: activeBook === book.book_name,
              })}
              title={`nav-book-${book.book_id}`}
            >
              {book.book_name}
            </Link>
          ))}
        </Box>

        <Box className={classes.border}>
          {getChapters(activeBook).map((chapter) => (
            <Link
              key={chapter}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveChapter(chapter);
              }}
              className={cx(classes.link, {
                [classes.linkActive]: activeChapter === chapter,
              })}
              title={`nav-chapter-${chapter}`}
            >
              {chapter}
            </Link>
          ))}
        </Box>

        <Box>
          {getVerses(activeBook, activeChapter).map((verse) => (
            <Link
              key={verse}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveVerse(verse);
                setOpened(false);
              }}
              className={cx(classes.link, {
                [classes.linkActive]: activeVerse === verse,
              })}
              title={`nav-verse-${verse}`}
            >
              {verse}
            </Link>
          ))}
        </Box>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default MyNavbar;
