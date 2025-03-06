"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import DailyVerse from "./components/Dailyverse";
import { useEffect, useState } from "react";
import FloatingAnimation from "./utils/FloatingAnimation";
import Swiper from "./components/Swiper";
import Tab from "./components/Tab";
import AnimatedCounter from "./utils/CountingAnimation";
import InteractiveFigures from "./components/InteractiveFigures";
import Footer from "@/app/components/Footer";

const baseUrl = "https://lets-read-the-bible.vercel.app"

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/videos`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }

        console.log(response)
        const { data } = response;
        setVideos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        console.log("video loaded successfully")
      }
    };

    fetchVideos();
  }, []);


  return (
    <div className="">
      <FloatingAnimation />
      <video src="/pinkbg.mp4" autoPlay muted loop className=" w-full saturate-100 object-cover h-full absolute top-0" />
      {/* Kids Background Image */}
      <div className="relative  h-screen w-fit mx-auto inset-0 flex items-center justify-center">
        <Image
          src="/images/kidsbg.png"
          alt="bg image"
          width={1000}
          height={1000}
          className="w-full  md:w-[67vw] object-contain"
        />
        <div className="absolute top-36 px-10 grid grid-cols-7 gap-x-8 grid-rows-3 justify-between items-  z-[19]">
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
            className="w-[57rem] col-start-5 col-end-8"
          />
        </div>
      </div>

      {/* Read the Bible Image */}
      {/* <div className=" ">
        <TabSwitcher />
      </div> */}

      <Tab />

      {/* <Swiper /> */}
      <div className="relative flex items-center justify-center">


      </div>


      <div className=" bg-[#F4C2C2] pt-10">
        <div className="flex  gap-16 colors font-sniglet  items-center justify-center bg-slate-100 w-fit py-20  rounded-xl  px-16 shadow-lg shadow-gray-700 m-auto">
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={130} fontSize={"5"} />
            Participating Countries & Cities
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={930000000} fontSize={"8"} />
            Kids Read the Bible
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">

            <AnimatedCounter targetNumber={10000} fontSize={"5"} />
            Videos Uploaded
          </div>

        </div>
        <h1 className="text-6xl text-center mt-10 text-slate-900 font-lucky">Explore Our Videos</h1>
        <div className="grid md:grid-cols-3 gap-3 pt-4 px-5 md:px-28">
          {videos.map((item, index) => (
            <Link
              key={item.id}
              href={`/videos/${item.id}`}
              className="relative hover:group hover: cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600">
              <div
                className="w-full h-[20rem] hover:group"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.play();
                  }
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0; // Reset video to the beginning
                  }
                }}
              >
                <video
                  src={item.url}
                  width={300}
                  height={300}
                  className="w-full object-cover h-full rounded-2xl"
                  muted={false} // Ensure audio is enabled
                  controls={false} // Hide controls
                  loop={true}
                />
                <div className="absolute bottom-4 group-bg-opacity-100 right-4 backdrop-blur-sm rounded-full text-lg px-5 py-3 text-white hover:bg-opacity-100 bg-opacity-50 bg-darkbg">
                  <h3 className="">
                    {item.book} {item.chapter_start} {item.chapter_end && item.chapter_end !== item.chapter_start && ` - ${item.chapter_end}`}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <div className=" bg-[#8E8EB1] px-28 pt-16 min-h-screen">
        <h1 className="text-6xl text-center  text-slate-900 font-lucky">testimonies and feedbacks</h1>
        <p className="text-lg font-sniglet text-center py-2">Share your life-transforming testimonies and any feedbacks with us</p>


        <div className="col-span-2 mt-10 mx-auto w-[70%] flex flex-col gap-4 bg-[#fff] rounded-2xl shadow-lg p-10">
          <h3 className="text-3xl text-primary font-lucky">
            We are just one chat away!
          </h3>
          <div className="flex flex-col ">
            <label>Full name</label>
            <input
              placeholder="eg: John Doe"
              className="border-b border-black focus:border-primary py-2 bg-transparent outline-0 placeholder:text-slate-600"
            />
          </div>
          <div className="flex flex-col ">
            <label>Email address</label>
            <input
              placeholder="eg: johndoe@gmail.com"
              className="border-b border-black focus:border-primary py-2 bg-transparent outline-0 placeholder:text-slate-600"
            />
          </div>
          <div className="flex flex-col ">
            <label>Message</label>
            <textarea
              rows="10"
              cols={30}
              placeholder="write a short and descriptive message to us..."
              className=" w-full border-0 resize-none  focus:border-primary focus:border p-3 bg-[#f4f4f4] rounded-2xl outline-0 placeholder:text-slate-600"
            />
          </div>

          <div>
            <button className="w-fit px-5 py-2 bg-primary mx-auto rounded-full  hover:shadow-md text-white">
              Send message
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
