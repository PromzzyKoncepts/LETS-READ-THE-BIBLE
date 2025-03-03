import kjvBibleJson from "../../../public/kjv.json";
import ampcBibleJson from "../../../public/ampc.json";
// import esvBibleJson from "../../../public/esv.json";
import nkjvBibleJson from "../../../public/nkjv.json";

// Store all available translations
const translations = {
  KJV: kjvBibleJson,
  AMPC: ampcBibleJson,
  NKJV: nkjvBibleJson,
};

let currentTranslation = kjvBibleJson; // Default translation

export const setTranslation = (translation) => {
  if (translations[translation]) {
    currentTranslation = translations[translation];
  } else {
    console.warn(`Translation '${translation}' not found, defaulting to KJV.`);
    currentTranslation = translations["KJV"];
  }
};

export const data =  currentTranslation;
// console.log(data, "dataaaaaaaa")

export const getBooks = () => {
  console.log(data)
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
