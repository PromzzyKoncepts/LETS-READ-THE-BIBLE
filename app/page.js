"use client";
import Image from "next/image";
import DailyVerse from "./components/Dailyverse";
import { useEffect } from "react";
import FloatingAnimation from "./utils/FloatingAnimation";

export default function Home() {


  return (
    <div className="">
      <FloatingAnimation />
      <video src="/pinkbg.mp4" autoPlay muted loop className="brightness-90 w-full saturate-100 object-cover h-screen absolute top-0"/>
      {/* <Image
        src="/images/home.jpg"
        alt="bg image"
        className="brightness-90 w-full h-screen absolute top-0"
        // layout="fill"
        width={1000}
        height={1000}
      /> */}
      <main className="">
        {/* Kids Background Image */}
        <div className="relative -top-10 h-max w-fit mx-auto inset-0 flex items-center justify-center">
          <Image
            src="/images/kidsbg.png"
            alt="bg image"
            width={1000}
            height={1000}
            className="w-full  md:w-[67vw] object-contain"
          />
          <div className="absolute top-16 right-16 flex flex-col justify-between items-end gap-5 z-[19]">
            <Image
              src="/images/readthebible.png"
              alt="bg image"
              width={500}
              height={500}
              className="w-[25rem] animate-shake animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-normal  duration-200"
            />

            <DailyVerse />
          </div>
        </div>

        {/* Read the Bible Image */}
      </main>
    </div>
  );
}
