"use client";

import { useEffect, useState } from "react";
import { getBooks, getChapters, getVerses, getVersesInChapter } from "./readApi";
import { useBibleStore } from "./store";

const Navbar = ({ setOpened }) => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  
  const activeBook = useBibleStore((state) => state.activeBook);
  const activeChapter = useBibleStore((state) => state.activeChapter);
  const setActiveBook = useBibleStore((state) => state.setActiveBook);
  const setActiveChapter = useBibleStore((state) => state.setActiveChapter);
  const setActiveVerse = useBibleStore((state) => state.setActiveVerse);
  const activeVerse = useBibleStore((state) => state.activeVerse);

//   console.log()
  useEffect(() => {
    setBooks(getBooks());
  }, []);

  useEffect(() => {
    if (activeBook) {
      setChapters(getChapters(activeBook));
    }
    // alert(chapters)
  }, [activeBook]);

  useEffect(() => {
    if (activeBook && activeChapter) {
      setVerses(getVerses(activeBook, activeChapter));
    }
  }, [activeChapter, activeBook]);

  return (
    <div className="w-fit font-sniglet flex cursor-pointer bg-slate-200">
      <div className="max-h-screen overflow-y-auto w-full pt-5">
        {books.map((book) => (
          <div
            key={book.book_id}
            onClick={() => setActiveBook(book.book_name)}
            style={{
              padding: "8px",
              cursor: "pointer",
              backgroundColor: activeBook === book.book_name ? "#661361" : "transparent",
            }}
            className={`  ${activeBook === book.book_name  ? "bg-darkbg text-white font-bold" : "bg-transparent"}`}
          >
            {book.book_name}
          </div>
        ))}
      </div>

      <div className=" max-h-screen overflow-y-auto w-24 mx-auto pt-5 bg-[#C2F4C2] flex flex-col gap-2">
        {chapters.map((chapter) => (
          <div
            key={chapter}
            onClick={() => setActiveChapter(chapter)}
            className={` px-5 inset-shadow-sm inset-shadow-indigo-500 ${activeChapter === chapter ? "bg-slate-500 text-white font-bold" : "bg-transparent"}`}
          >
            {chapter}
          </div>
        ))}
      </div>

      <div  className="max-h-screen overflow-y-auto w-24 mx-auto pt-5 bg-[#C2C2F4]  flex flex-col gap-2">
        {verses.map((verse) => (
          <div
            key={verse}
            onClick={() => {
              setActiveVerse(verse);
              setOpened(false);
            }}
            className={`flex flex-col gap-2 hover:bg-slate-600 hover:text-white px-5 inset-shadow-sm inset-shadow-indigo-500 ${activeVerse === verse ? "bg-darkbg text-white font-bold" : "bg-transparent"}`}
          >
            {verse}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
