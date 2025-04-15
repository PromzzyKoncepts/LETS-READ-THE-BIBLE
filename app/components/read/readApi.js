import kjvBibleJson from "../../../public/kjv.json";
import ampcBibleJson from "../../../public/ampc.json";
import nkjvBibleJson from "../../../public/nkjv.json";
import { useBibleStore } from "./store";

// Store all available translations
const translations = {
  KJV: kjvBibleJson,
  AMPC: ampcBibleJson,
  NKJV: nkjvBibleJson,
};

let currentTranslation = kjvBibleJson; // Default translation


export const setTranslation = (translation) => {
  const { setCurrentTranslation } = useBibleStore.getState();
  if (translations[translation]) {
    currentTranslation = translations[translation];
    setCurrentTranslation(translation); // Update the store
  } else {
    console.warn(`Translation '${translation}' not found, defaulting to KJV.`);
    currentTranslation = translations["KJV"];
    setCurrentTranslation("KJV"); // Default to KJV
  }
};

export const data =  currentTranslation;
// console.log(data, "dataaaaaaaa")

export const getBooks = () => {
  const set = new Set();
  data?.map((book) => {
    const obj = {
      book_name: book.book_name,
      book_id: book.book_id,
    };
    set.add(JSON.stringify(obj, Object.keys(obj).sort()));
  });
  return [...set].map((item) => JSON.parse(item));
};

export const getChapters = (thebook) => {
  return [
    ...new Set(
      data
        .filter((book) => book.book_name === thebook)
        .map((book) => book.chapter)
    ),
  ];
};

export const getNewTestamentBooks = () => {
  // List of New Testament books
  const newTestamentBooks = [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
    "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
  ];

  const set = new Set();
  data
    .filter((book) => newTestamentBooks.includes(book.book_name)) // Filter by New Testament book names
    .map((book) => {
      const obj = {
        book_name: book.book_name,
        book_id: book.book_id,
      };
      set.add(JSON.stringify(obj, Object.keys(obj).sort()));
    });
  return [...set].map((item) => JSON.parse(item));
};

export const getChapter = (thebook, thechapter) => {
  return data
    .filter(
      (book) => book.book_name === thebook && book.chapter === thechapter
    )
    .map((book) => ({
      verse: book.verse,
      text: book.text
    }));
};

export const getChaptersInRange = (thebook, startChapter, endChapter) => {
  const chaptersInRange = data
    .filter(
      (book) =>
        book.book_name === thebook &&
        book.chapter >= startChapter &&
        book.chapter <= endChapter
    )
    .reduce((acc, book) => {
      if (!acc.some(chapter => chapter.chapter === book.chapter)) {
        acc.push({
          book_name: book.book_name,
          chapter: book.chapter,
        });
      }
      return acc;
    }, []);

  return chaptersInRange;
};

export const getVerses = (thebook, thechapter) => {
  return data
    .filter(
      (book) => book.book_name === thebook && book.chapter === thechapter
    )
    .map((book) => book.verse);
};

export const getVersesInChapter = (thebook, thechapter) => {
  return data
    .filter(
      (book) => book.book_name === thebook && book.chapter === thechapter
    )
    .map((book) => ({ verse: book.verse, text: book.text }));
};

export const getPassage = () => {
  const set = new Set();
  data.map((book) => {
    const obj = {
      book_name: book.book_name,
      book_id: book.book_id,
      chapter: book.chapter,
    };
    set.add(JSON.stringify(obj, Object.keys(obj).sort()));
  });
  return [...set].map((item) => JSON.parse(item));
};
