"use client";
import Image from "next/image";
import DailyVerse from "./components/Dailyverse";
import { useEffect } from "react";
import FloatingAnimation from "./utils/FloatingAnimation";
import Swiper from "./components/Swiper";
import TabSwitcher from "./components/AutoSwitchTab";

export default function Home() {


  return (
    <div className="">
      <FloatingAnimation />
      <video src="/pinkbg.mp4" autoPlay muted loop className="brightness-90 w-full saturate-100 object-cover h-screen absolute top-0" />
      <main className="">
        {/* Kids Background Image */}
        <div className="relative -top-14 h-max w-fit mx-auto inset-0 flex items-center justify-center">
          <Image
            src="/images/kidsbg.png"
            alt="bg image"
            width={1000}
            height={1000}
            className="w-full  md:w-[67vw] object-contain"
          />
          <div className="absolute top-16 px-10 grid grid-cols-7 gap-x-8 grid-rows-3 justify-between items-  z-[19]">
            <Image
              src="/images/readthebible.png"
              alt="bg image"
              width={500}
              height={500}
              className="w-[25rem] col-start-5 col-end-8 animate-shake animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-normal  duration-200"
            />


            <div className="col-start-1 col-end-5 "><DailyVerse /></div>

            <Image src="/images/readbible.png"
              alt="bg image"
              width={1000}
              height={1000}
              className="w-[57rem] col-start-5 col-end-8  animate-pulse  -mt-0 animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-normal  duration-200"
            />
          </div>
        </div>

        {/* Read the Bible Image */}
      </main>
      <div className=" ">
        <TabSwitcher />
      </div>

      {/* <Swiper /> */}
    </div>
  );
}
