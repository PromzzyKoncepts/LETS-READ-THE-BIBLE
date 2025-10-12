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
import { RiMenuFold2Line } from "react-icons/ri";
import Navbar from "./Navbar";
import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-2 md:top-5 z-10 px-3 md:px-0 md:right-5 flex items-center md:gap-3 gap-3">
      <div className="flex items-end font-jua justify-end bg-orange-200 px-4 rounded-full bg-opacity-80 backdrop-blur-sm py-2">
        <div className="flex items-center md:gap-4 gap-2">
          <div onClick={prevHandler} disabled={checkPrev() === null} title="prev passage" className="bg-darkbg md:p-3 p-2 rounded-full text-white cursor-pointer">
            <IoChevronBackSharp size={25} />
          </div>
          <h1 className="font-bold text-darkbg text-lg">{activeBook} {activeChapter}</h1>
          <div onClick={nextHandler} disabled={checkNext() === null} title="next passage" className="bg-darkbg md:p-3 p-2 rounded-full text-white cursor-pointer">
            <IoChevronForwardSharp size={25} />
          </div>
        </div>
      </div>
      <div className="bg-darkbg md:p-3 p-2 rounded-full text-white cursor-pointer">
        <Audio />
      </div>
      <div onClick={() => setIsOpen(!isOpen)} className="bg-darkbg md:p-3 p-2 rounded-full text-white block md:hidden cursor-pointer">
        <RiMenuFold2Line size={20} />
      </div>



      {isOpen && (
        <div className="md:hidden block fixed inset-0 bg-darkbg bg-opacity-50 z-20" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <Navbar setOpened={setIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubHeader;