"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState, useRef} from 'react';
import { getBooks } from '../components/read/readApi';
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const baseUrl = "https://letsreadthebible.club/"

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Page = () => {
  


  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/videos/video-approved`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }

        console.log(response)
        const {data } = response;
        setVideos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
    <div style={{ backgroundImage: `url(/images/pngbg.png)`, backgroundSize: 'cover', backgroundPosition: "bottom" }}
     className="font-sniglet bg-[#CDE1E1] h-screen w-full items-center">
       <div className="bg-darkbg bg-opacity-30 backdrop-blur-md w-full h-screen absolute  justify-center flex flex-col items-center">
       <div className="bg-gray-100 animate-pulse bg-opacity-50 rounded-2xl w-fit mx-auto shadow-lg px-16 py-8">
          <Image
            src="/images/readthebible.png"
            alt="bg image"
            width={1000}
            height={1000}
            className="w-[22rem] mx-auto col-start-5 col-end-8 animate-shake animate-infinite animate-duration-[5000ms] animate-ease-in-out animate-normal  duration-200"
          />

          <h3 className="font-lucky text-2xl md:text-5xl text-darkbg">Loading engaging Videos</h3>
          <p className="text-center mx-auto text-xl text-pinkbg font-bold">Please wait a sec...</p>
      </div>;
      </div>;
    </div>)
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ backgroundImage: `url(/images/pngbg.png)`, backgroundSize: 'cover' }}
      className="md:px-24 px-5 py-20 bg-[#b4c6c6] font-sniglet min-h-screen"
    >
      
      <h1 className="text-2xl md:text-7xl text-darkbg text-center font-lucky py-5">Bible reading Videos</h1>
      {/* Book List with Random Background Colors */}
      <div className="relative flex items-center justify-center ">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className=" bg-darkbg bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
      >
        <MdArrowLeft />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center example cursor-pointer gap-3 md:w-[55rem] py-5 px-10 mx-auto overflow-x-auto backdrop-blur-md bg-darkbg bg-opacity-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)]"
      >
        {getBooks().map((item) => {
          const randomColor = getRandomColor(); 
          return (
            <div
              key={item.book_id}
              style={{ backgroundColor: randomColor }} 
              className="text-white px-4 text-nowrap py-2 rounded-full text-center"
            >
              {item.book_name}
            </div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className=" bg-darkbg bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
      >
        <MdArrowRight />
      </button>
    </div>

    {videos.length == 0 && !loading && (<div className="flex items-center h-[40vh] justify-center"><div className="bg-white rounded-2xl py-10 px-10 ">No approved Videos Yet</div></div>)}

      {/* Image Grid */}
      <div className="grid md:grid-cols-4 gap-3 pt-4">
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
  );
};

export default Page;