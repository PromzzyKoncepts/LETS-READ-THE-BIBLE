"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { getBooks } from '../components/read/readApi';
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const baseUrl = "https://letsreadthebible.club/";
const VIDEOS_PER_PAGE = 12; // Adjust based on your grid layout

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
  const [externalVideos, setExternalVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  // Fetch initial videos from our API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos/video-approved`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }

        const { data } = response;
        setVideos(data);

        fetchExternalVideos(1);

      } catch (error) {
        setError("Failed to load initial videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Fetch videos from external API
  const fetchExternalVideos = async (pageNum,) => {
    try {
      const response = await axios.get(
        `https://lovetoons.org/api/datafile/allbiblevideos.php?page=${pageNum}`
      );
      console.log(response.data, "responseeeeee")

      if (response.data) {
        // Transform external API data to match our structure
        const formattedVideos = response?.data?.data?.map(video => ({
          id: `ext-${video.id}`,
          url: video.link,
          book: video.biblechapter,
          // chapter_start: video.chapter,
          // chapter_end: video.chapter,
          thumbnail: video.image || '/images/default-video-thumb.jpg'
        }));



        setExternalVideos(prev => [...prev, ...formattedVideos]);
        setTotalPages(Math.ceil((videos.length + formattedVideos.length) / VIDEOS_PER_PAGE));
      }
    } catch (err) {
      console.error("Error fetching external videos:", err);
      setError("Couldn't load additional videos. Showing available content.");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchExternalVideos(newPage);

    // If we're reaching near the end of loaded videos, fetch more

  };

  // Combine and paginate videos
  const getPaginatedVideos = () => {
    const allVideos = [...videos, ...externalVideos];
    // console.log(externalVideos)
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return allVideos.slice(startIndex, endIndex);
  };

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

            <h3 className="font-lucky text-2xl md:text-5xl text-darkbg">Loading Videos</h3>
            <p className="text-center mx-auto text-xl text-pinkbg font-bold">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && videos.length === 0 && externalVideos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Videos</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-darkbg text-white px-6 py-2 rounded-full hover:bg-opacity-90"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const paginatedVideos = getPaginatedVideos();

  return (
    <div
      style={{ backgroundImage: `url(/images/pngbg.png)`, backgroundSize: 'cover' }}
      className="md:px-24 px-5 py-20 bg-[#b4c6c6] font-sniglet min-h-screen"
    >
      <h1 className="text-2xl md:text-7xl text-darkbg text-center font-lucky py-5">Bible Reading Videos</h1>

      {/* Book List with Random Background Colors */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={scrollLeft}
          className="bg-darkbg bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
        >
          <MdArrowLeft />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center cursor-pointer gap-3 md:w-[55rem] py-5 px-10 mx-auto overflow-x-auto backdrop-blur-md bg-darkbg bg-opacity-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)]"
        >
          {getBooks().map((item) => (
            <div
              key={item.book_id}
              style={{ backgroundColor: getRandomColor() }}
              className="text-white px-4 text-nowrap py-2 rounded-full text-center"
            >
              {item.book_name}
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="bg-darkbg bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
        >
          <MdArrowRight />
        </button>
      </div>

      {/* Error message (if any videos exist) */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid md:grid-cols-4 gap-3 pt-4">
        {paginatedVideos.map((item) => (
          <Link
            key={item.id}
            href={`/videos/${item.id}`}
            // target={item.id.startsWith('ext-') ? "_blank" : "_self"}
            className="relative hover:group hover:cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600"
          >
            <div className="w-full h-[20rem]" onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.play();
                }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                if (video) {
                  video.pause();
                  video.currentTime = 0; 
                }
              }}>

              <video
                src={item.url}
                poster={item.thumbnail ? item.thumbnail : null}
                width={300}
                height={300}
                className="w-full object-cover h-full rounded-2xl"
                muted={false}
                controls={false} // Hide controls
                loop={true}
                playsInline
                preload="metadata" 
              />
              <div className="absolute bottom-4 right-4 backdrop-blur-sm rounded-full text-lg px-5 py-3 text-white bg-darkbg bg-opacity-50 hover:bg-opacity-100">
                <h3>
                  {item.book} {item.chapter_start && item.chapter_start}
                  {item.chapter_end && item.chapter_end !== item.chapter_start && ` - ${item.chapter_end}`}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-darkbg text-white px-4 py-2 rounded-full disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-4 py-2 rounded-full ${currentPage === pageNum ? 'bg-darkbg text-white' : 'bg-gray-200'}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-darkbg text-white px-4 py-2 rounded-full disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;