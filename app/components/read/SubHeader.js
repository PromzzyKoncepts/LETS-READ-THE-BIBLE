"use client"
import { ActionIcon, Box, Title, rem } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconSearch,
} from "@tabler/icons-react";
import '@mantine/core/styles.css';
import { useBibleStore } from "./store";
import { getPassage } from "./readApi";
import Audio from "./Audio";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";

const SubHeader = ({ open }) => {
  const activeChapter = useBibleStore((state) => state.activeChapter);
  const activeBookShort = useBibleStore((state) => state.activeBookShort);
  const activeBook = useBibleStore((state) => state.activeBook);
  const setActiveBookOnly = useBibleStore((state) => state.setActiveBookOnly);
  const setActiveBookShort = useBibleStore((state) => state.setActiveBookShort);
  const setActiveChapter = useBibleStore((state) => state.setActiveChapter);
  const getPassageResult = getPassage();
  const checkNext = () => {
    const index = getPassageResult.findIndex(
      (book) => book.book_name === activeBook && book.chapter === activeChapter
    );
    return index === -1 || index === getPassageResult.length - 1 ? null : index;
  };
  const checkPrev = () => {
    const index = getPassageResult.findIndex(
      (book) => book.book_name === activeBook && book.chapter === activeChapter
    );
    return index === -1 || index === 0 ? null : index;
  };
  const nextHandler = () => {
    const index = checkNext();
    if (index === null) return null;
    if (getPassageResult) {
      const next = getPassageResult[index + 1];
      if (next !== null) {
        setActiveBookOnly(next.book_name);
        setActiveBookShort(next.book_id);
        setActiveChapter(next.chapter);
      }
    }
  };
  const prevHandler = () => {
    const index = checkPrev();
    if (index === null) return null;
    if (getPassageResult) {
      const prev = getPassageResult[index - 1];
      if (prev !== null) {
        setActiveBookOnly(prev.book_name);
        setActiveBookShort(prev.book_id);
        setActiveChapter(prev.chapter);
      }
    }
  };

  return (
    <div className="absolute  top-5 z-10 right-5 flex items-center gap-3 ">
    <div className="flex items-end font-lucky justify-end  bg-orange-200 px-4 rounded-full bg-opacity-80 backdrop-blur-sm py-2">
    <div className="flex items-center gap-4 ">
      <div onClick={prevHandler} disabled={checkPrev() === null} title="prev passage" className="bg-darkbg p-3 rounded-full text-white  cursor-pointer"><IoChevronBackSharp size={25} /></div>
      <h1 className="font-bold text-darkbg text-lg">{activeBook} {activeChapter}</h1>
      <div  onClick={nextHandler}  disabled={checkNext() === null} title="next passage" className="bg-darkbg p-3 rounded-full text-white cursor-pointer"><IoChevronForwardSharp size={25} /></div>
    </div>

    </div>
    <div  className="bg-darkbg p-3 rounded-full text-white cursor-pointer">
    <Audio />
    </div>
    </div>
  );
};

export default SubHeader;

    // <Box
    //   sx={{
    //     height: rem(15),
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //   }}
    //   mb={20}
    // >
    //   <ActionIcon
    //     variant="transparent"
    //     onClick={prevHandler}
    //     disabled={checkPrev() === null}
    //     title="prev-passage-button"
    //   >
    //     <IconArrowLeft size={rem(20)} />
    //   </ActionIcon>
    //   <ActionIcon variant="transparent" onClick={open}>
    //     <IconSearch size={rem(20)} />
    //   </ActionIcon>
    //   <Title order={4}>
    //     {activeBookShort} {activeChapter}
    //   </Title>
    //   <Audio />
    //   <ActionIcon
    //     variant="transparent"
    //     onClick={nextHandler}
    //     disabled={checkNext() === null}
    //     title="next-passage-button"
    //   >
    //     <IconArrowRight size={rem(20)} />
    //   </ActionIcon>
    // </Box>