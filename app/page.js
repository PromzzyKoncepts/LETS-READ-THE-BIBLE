"use client";
import Image from "next/image";
import DailyVerse from "./components/Dailyverse";
import { useEffect } from "react";
import FloatingAnimation from "./utils/FloatingAnimation";
import Swiper from "./components/Swiper";
import TabSwitcher from "./components/AutoSwitchTab";
import AnimatedCounter from "./utils/CountingAnimation";

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


            <div className="col-start-1 col-end-5 mt-[110px]"><DailyVerse /></div>

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
      <div className="relative flex items-center justify-center">


        <div className="flex absolute z-[49] -top-24 gap-16 colors font-sniglet  items-center justify-center bg-slate-100 w-fit py-20  rounded-xl  px-16 shadow-lg shadow-gray-700 m-auto">
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={130} fontSize={5} />
            Participating Countries & Cities
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={930000000} fontSize={8} />
            Kids Read the Bible
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={10000} fontSize={5} />
            Videos Uploaded
          </div>

        </div>
      </div>


        <div className="h-screen bg-[#F4C2C2]">
          <h1 className="text-6xl text-center pt-60 text-slate-900 font-lucky">Explore Our Videos</h1>

        </div>
    </div>
  );
}
