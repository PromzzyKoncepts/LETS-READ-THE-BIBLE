"use client";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import TextAnimation from "@/app/utils/TextAnimation";


const DailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [reference, setReference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch("/api/getVerse"); // Ensure this matches the API route
        if (!response.ok) throw new Error("Failed to fetch verse");
        const data = await response.json();
        console.log(data)
        setReference(data?.verseData?.data?.passages[0]?.reference);
        const content = data?.verseData?.data?.passages[0]?.content
        const sanitizedContent = DOMPurify.sanitize(content);
        // const content = parse(sanitizedContent);
        setVerse(parse(sanitizedContent));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  if (loading) return (
  <div className="flex flex-col  items-end gap-2 w-full">
    <div className="w-1/3  rounded-md h-10 bg-white bg-opacity-20 animate-pulse"></div>
    <div className="rounded-md h-10 w-full bg-white bg-opacity-20 animate-pulse"></div>
    <div className="rounded-md h-10 w-full bg-white bg-opacity-20 animate-pulse"></div>
    <div className="w-2/3  rounded-md h-10 bg-white bg-opacity-20 animate-pulse"></div>
  </div>
  )
  if (error) return null;

  // console.log(verse)

  return (
    <div>
    {verse && (<div className="font-sniglet text-white flex flex-col justify-end items-end">
      <h2 className="text-2xl font-semibold font-sniglet">Today`s Scripture</h2>
      <div className="font-bubblegum text-xl max-w-[35rem] mt-3 flex items-end justify-items-end text-justify">
        <TextAnimation>

        {verse || "No content available."}
        </TextAnimation>
      </div>
        <TextAnimation>

        {reference}
        </TextAnimation>
    </div>
  )}
  </div>
  )
};

export default DailyVerse;
