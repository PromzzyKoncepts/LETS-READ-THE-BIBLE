"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FloatingAnimation from "./utils/FloatingAnimation";
// import Swiper from "./components/Swiper";
import Tab from "./components/Tab";
import AnimatedCounter from "./utils/CountingAnimation";
import InteractiveFigures from "./components/InteractiveFigures";
import Footer from "./components/Footer";
import BottomBar from "./components/MobileNav";
import Swiper from "./components/Swiper";
import SalvationSection from "./components/SalvationSection";

const baseUrl = "https://lets-read-the-bible.vercel.app";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/videos/video-approved`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }

        const { data } = response;
        const limitedVideos = data.slice(0, 12); // Limit to 20 videos
        setVideos(limitedVideos);
      } catch (error) {
        console.error(error.message);
      } finally {
        console.log("Videos loaded successfully");
      }
    };

    fetchVideos();
  }, []);

  const card = [
    {
      title: "Year of Manifestationn",
      src: "https://lovetoons.org/img/Lovetoons_Affirmation_Extravaganza_web.jpg",
      link: "https://lovetoons.org/lae",
    },
    {
      title: "Year of Manifestationn",
      src: "https://lovetoons.org/img/YEAR_OF_MANIFESTATION_web2.png",
      // link: "/lbrf",
    },
    {
      title: "Throne room",
      src: "https://lovetoons.org/img/Monthofthethroneroomslider.jpg.jpeg",
      // link: "/lbrf",
    },
    {
      title: "Throne room",
      src: "https://lovetoons.org/img/mack_most.png",
      // link: "/lbrf",
    },
    {
      title: "Tick Talk",
      src: "/images/ticktalk.png",
      // link: "/lbrf",
    },
    // {
    //   title: "Praise Night",
    //   src: "https://lovetoons.org/img/PRAISE-NIGHT-27.png",
    // },
    {
      title: "Comics 3",
      src: "/images/comics2.png",
    },
  ];

  return (
    <div className="">
      {/* <FloatingAnimation /> */}
      {/* <video
        src="/pinkbg.mp4"
        autoPlay
        muted
        loop
        className=" w-full saturate-100 object-cover  min-h-[14rem] md:h-full absolute top-0"
      /> */}

      <img
        src="images/letsreadthebible.jpg" // or .png / .webp
        alt="Background"
        className="w-full saturate-100 object-cover min-h-[14rem] md:h-full absolute top-0"
      />

      {/* Kids Background Image */}
      <div className="relative md:h-screen pt-5 md:pt-0 max-w-7xl mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-6">
          {/* Column 1 */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl mx-auto">
              <div className="relative rounded-[32px] bg-[#5a1056f4] px-6 py-8 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
                <img
                  src="images/kidsbible.png" // your image path
                  alt="lets read the bible"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover rounded-[32px] opacity-20"
                />
                {/* HEADER */}
                <div className="text-center mb-8">
                  <h1 className="text-6xl font-extrabold tracking-wide flex justify-center gap-1">
                    <span className="text-green-500 drop-shadow-[0_6px_0_rgba(0,0,0,0.15)]">
                      R
                    </span>
                    <span className="text-purple-500 drop-shadow-[0_6px_0_rgba(0,0,0,0.15)]">
                      A
                    </span>
                    <span className="text-orange-500 drop-shadow-[0_6px_0_rgba(0,0,0,0.15)]">
                      C
                    </span>
                    <span className="text-blue-500 drop-shadow-[0_6px_0_rgba(0,0,0,0.15)]">
                      E
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <div className="relative inline-block mt-4">
                    <div className="absolute inset-0 rounded-full bg-orange-700 translate-y-1"></div>
                    <div className="relative rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-8 py-2 text-white font-bold shadow-lg">
                      Read A Chapter Everyday
                    </div>
                  </div>
                </div>

                {/* R */}
                <div className="relative flex items-center mb-5">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-[0_8px_0_rgba(0,0,0,0.25)]">
                    R
                  </div>
                  <div className="-ml-3 flex-1 rounded-full bg-gradient-to-b from-green-400 to-green-600 px-6 py-4 text-white font-semibold shadow-[0_10px_0_rgba(0,0,0,0.25)]">
                    Read a verse everyday
                  </div>
                </div>

                {/* A */}
                <div className="relative flex items-center mb-5">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-[0_8px_0_rgba(0,0,0,0.25)]">
                    A
                  </div>
                  <div className="-ml-3 flex-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 px-6 py-4 text-white font-semibold shadow-[0_10px_0_rgba(0,0,0,0.25)]">
                    Apply the Word
                  </div>
                </div>

                {/* C */}
                <div className="relative flex items-center mb-5">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-[0_8px_0_rgba(0,0,0,0.25)]">
                    C
                  </div>
                  <div className="-ml-3 flex-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-6 py-4 text-white font-semibold shadow-[0_10px_0_rgba(0,0,0,0.25)]">
                    Confess the Word
                  </div>
                </div>

                {/* E */}
                <div className="relative flex items-center">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-[0_8px_0_rgba(0,0,0,0.25)]">
                    E
                  </div>
                  <div className="-ml-3 flex-1 rounded-full bg-gradient-to-b from-purple-400 to-purple-600 px-6 py-4 text-white font-semibold shadow-[0_10px_0_rgba(0,0,0,0.25)]">
                    Excel &amp; Manifest Truth
                  </div>
                </div>

                <div className="relative -mb-16 mt-10">
                  <img
                    src="https://letsreadthebible.club/_next/image?url=%2Fimages%2Freadbible.png&w=1080&q=75"
                    alt="lets read the bible"
                    aria-hidden="true"
                    className="w-full max-w-sm mx-auto object-contain drop-shadow-2xl animate-slowBounce"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl">
              <h2 className="text-xl font-bold text-center text-blue-700 p-4">
                Kids Memory Verse
              </h2>
              <img
                src="images/memory-verse-day-1.jpg"
                alt="Daily Memory Verse"
                aria-hidden="true"
                className="w-full  mx-auto object-contain drop-shadow-2xl "
              />
            </div>
          </div>
        </div>
      </div>

      <Tab />

      <div className="bg-gradient-to-b from-[#EBD7D2] to-white">
        {/* <Link  href="/lbrf">
        <Image src="/images/banner3.png" alt="sponsor LBR" className="mx-auto md:py-10 md:w-[85%]" width={1000} height={1000} />
        </Link> */}
        <Swiper carousels={card} />
      </div>
      <div className=" bg-[#F4C2C2] md:pt-10">
        {/* <div className="flex hidden flex-col md:flex-row gap-8 md:gap-16 colors font-sniglet  items-center justify-center bg-slate-100 md:w-fit md:py-20 py-8 rounded-b-[10%] md:rounded-xl  md:px-16 shadow-lg shadow-gray-700 m-auto">
          <div className="flex flex-col gap-2 text-xl items-center">
            <AnimatedCounter targetNumber={104} fontSize={"5"} />
            Participating Countries & Cities
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">
            <AnimatedCounter targetNumber={20000000} fontSize={"8"} />
            Kids Read the Bible
          </div>
          <div className="flex flex-col gap-2 text-xl items-center">
            <AnimatedCounter targetNumber={1000} fontSize={"5"} />
            Videos Uploaded
          </div>
        </div> */}
        {videos && (
          <div>
            <h1 className="text-4xl md:text-6xl text-center mt-10 text-slate-900 font-sniglet">
              Explore Our Videos
            </h1>

            <section className="py-10 px-4 md:px-20 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="bg-[#228fa5] text-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full">
                    <Link href="/bible-videos" className="block">
                      <div className="flex flex-col items-center">
                        <Image
                          src="/images/fiesta.png"
                          alt="Bible Reading Fiesta"
                          width={1000}
                          height={1000}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">LBRF</h3>
                    <p className="text-gray-100 mb-4">
                      Watch our bible reading videos for kids!
                    </p>

                    <Link
                      href="/bible-videos"
                      className="text-gray-600 bg-[#e2faff] px-2 py-1 hover:bg-[#186473] hover:text-white rounded  font-medium"
                    >
                      Watch Now
                    </Link>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="bg-[#e87917] text-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full ">
                    <Link href="/daily-bible" className="block">
                      <div className="flex flex-col items-center">
                        <Image
                          src="/images/bible-daily.png"
                          alt="Bible Reading Fiesta"
                          width={1000}
                          height={1000}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Daily Bible Reading
                    </h3>
                    <p className="text-gray-100 mb-4">
                      Complete the reading of the Bible by following our daily
                      Bible reading.
                    </p>
                    <Link
                      href="/daily-bible"
                      className="text-[#564110] hover:bg-[#564110] hover:text-white font-medium bg-[#ffe7d1]  px-2 py-1 rounded-lg tex"
                    >
                      Watch todays reading
                    </Link>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full">
                    <Link href="/bible-videos" className="block">
                      <div className="flex flex-col items-center">
                        <Image
                          src="/images/campaign.png"
                          alt="Bible Reading Fiesta"
                          width={1000}
                          height={1000}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Let&apos;s the bible campaign
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This is a description for item three.
                    </p>
                    <Link
                      href="/item-three"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-4 gap-3 pt-4 px-5 md:px-28">
              {videos.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/videos/${item.id}`}
                  className="relative hover:group hover: cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600"
                >
                  <div
                    className="w-full h-[20rem] hover:group"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.play();
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget.querySelector("video");
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
                        {item.book} {item.chapter_start}{" "}
                        {item.chapter_end &&
                          item.chapter_end !== item.chapter_start &&
                          ` - ${item.chapter_end}`}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="py-10">
          <Link
            href="/videos"
            className="font-lucky text-lg px-6 py-2 text-white bg-darkbg rounded-full mx-auto flex items-center justify-center flex-col w-fit "
          >
            View all Videos
          </Link>
        </div>
      </div>

      <div className="hidden bg-[#8E8EB1] px-5 md:px-28 md:pt-16 py-7 min-h-screen">
        <h1 className="text-4xl md:text-6xl text-center  text-slate-900 font-lucky">
          Testimonies and feedbacks
        </h1>
        <p className="text-lg font-sniglet text-center py-2">
          Share your life-transforming testimonies and any feedbacks with us
        </p>

        <div className="col-span-2 mt-10 mx-auto md:w-[70%] flex flex-col gap-4 bg-[#fff] rounded-2xl shadow-lg p-10">
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

      {/* <SalvationSection /> */}

      <Footer />
    </div>
  );
}
