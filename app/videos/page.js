"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getBooks } from "../components/read/readApi";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const baseUrl = "https://letsreadthebible.club/";
const VIDEOS_PER_PAGE = 12;

const getRandomColor = () => {
  if (typeof window === "undefined") return "#ffffff"; // Server-side fallback
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [allExternalVideos, setAllExternalVideos] = useState([]); // Store ALL external videos
  const [filteredExternalVideos, setFilteredExternalVideos] = useState([]); // Store filtered external videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [hasFetchedAllExternal, setHasFetchedAllExternal] = useState(false);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos/video-approved`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch videos");
        }
        setVideos(response.data);
        fetchAllExternalVideos();
      } catch (error) {
        setError("Failed to load initial videos. Please try again later.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Fetch ALL external videos (not paginated)
  const fetchAllExternalVideos = async () => {
    try {
      let allVideos = [];
      let page = 1;
      let hasMore = true;

      // Keep fetching until we have all pages
      while (hasMore) {
        const response = await axios.get(
          `https://lovetoons.org/api/datafile/allbiblevideos.php?page=${page}`
        );

        if (response.data?.data?.length > 0) {
          const formattedVideos = response.data.data.map((video) => ({
            id: `ext-${video.id}`,
            url: video.link,
            book: video.biblechapter,
            thumbnail: video.image || "/images/default-video-thumb.jpg",
          }));

          allVideos = [...allVideos, ...formattedVideos];
          page++;
        } else {
          hasMore = false;
        }
      }

      setAllExternalVideos(allVideos);
      setFilteredExternalVideos(allVideos);
      setHasFetchedAllExternal(true);
      updateTotalPages(videos, allVideos);
    } catch (err) {
      console.error("Error fetching external videos:", err);
      setError("Couldn't load external videos. Showing available content.");
    } finally {
      setLoading(false);
    }
  };

  // Update total pages based on current videos
  const updateTotalPages = (localVids, externalVids) => {
    const allVideos = [...localVids, ...externalVids];
    setTotalPages(Math.ceil(allVideos.length / VIDEOS_PER_PAGE));
  };

  // Filter videos by book name (client-side)
  const filterVideosByBook = async (bookName) => {
    try {
      setLoading(true);
      setSelectedBook(bookName);
      setIsFiltering(true);

      // Filter local videos
      const localResponse = await axios.get(
        `/api/videos/filter?book=${encodeURIComponent(bookName)}`
      );
      const localFilteredVideos = localResponse.data;

      // Filter external videos client-side
      const filteredExtVideos = allExternalVideos.filter((video) =>
        video.book.toLowerCase().includes(bookName.toLowerCase())
      );

      setVideos(localFilteredVideos);
      setFilteredExternalVideos(filteredExtVideos);
      setCurrentPage(1);
      updateTotalPages(localFilteredVideos, filteredExtVideos);
    } catch (err) {
      console.error("Error filtering videos:", err);
      setError("Failed to filter videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear filters and show all videos
  const clearFilters = () => {
    setSelectedBook(null);
    setIsFiltering(false);
    setCurrentPage(1);
    setFilteredExternalVideos(allExternalVideos);

    // Re-fetch initial local videos
    axios
      .get(`/api/videos/video-approved`)
      .then((response) => {
        setVideos(response.data);
        updateTotalPages(response.data, allExternalVideos);
      })
      .catch((err) => {
        console.error("Error resetting filters:", err);
        setError("Failed to reset filters. Please refresh the page.");
      });
  };
  console.log(videos, "videos");

  // Combine and paginate videos
  const getPaginatedVideos = () => {
    const allVideos = [...videos, ...filteredExternalVideos];
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return allVideos.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedBook) {
      fetchAllExternalVideos(newPage, selectedBook);
    } else {
      fetchAllExternalVideos(newPage);
    }
  };

  const paginatedVideos = getPaginatedVideos();

  return (
    <div
      style={{
        backgroundImage: `url(/images/pngbg.png)`,
        backgroundSize: "cover",
      }}
      className="md:px-24 px-5 py-5 md:py-20 bg-[#b4c6c6] font-sniglet min-h-screen"
    >
      <h1 className="text-3xl md:text-7xl text-darkbg text-center  py-5">
        Bible Reading Videos
      </h1>

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
          className="flex items-center cursor-pointer gap-3 md:w-[55rem] py-1 px-10 mx-auto overflow-x-auto backdrop-blur-md bg-darkbg bg-opacity-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)]"
        >
          {getBooks().map((item) => (
            <div
              key={item.book_id}
              onClick={() => filterVideosByBook(item.book_name)}
              className="text-gray-700 px-4 text-nowrap py-2 rounded-full text-center hover:opacity-90"
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

      {/* Filter status and clear button */}
      {selectedBook && (
        <div className="flex justify-center items-center mt-4 gap-4">
          <p className="text-darkbg font-bold">
            Showing videos for:{" "}
            <span className="text-pinkbg">{selectedBook}</span>
          </p>
          <button
            onClick={clearFilters}
            className="bg-darkbg text-white px-4 py-1 rounded-full text-sm hover:bg-opacity-90"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Error message (if any videos exist) */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <small>{error}</small>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-3 items-center place-content-center justify-center mx-auto md:grid-cols-5 gap-3 pt-10">
          <div className="bg-slate-500 h-72 animate-pulse w-64 rounded-3xl relative">
            <div className="rounded-xl w-28 h-8 absolute right-4 bottom-4 bg-slate-400"></div>
          </div>
          <div className="bg-slate-500 h-72 animate-pulse w-64 rounded-3xl relative">
            <div className="rounded-xl w-28 h-8 absolute right-4 bottom-4 bg-slate-400"></div>
          </div>
          <div className="bg-slate-500 h-72 animate-pulse w-64 rounded-3xl relative">
            <div className="rounded-xl w-28 h-8 absolute right-4 bottom-4 bg-slate-400"></div>
          </div>
          <div className="bg-slate-500 h-72 animate-pulse w-64 rounded-3xl relative">
            <div className="rounded-xl w-28 h-8 absolute right-4 bottom-4 bg-slate-400"></div>
          </div>
          <div className="bg-slate-500 h-72 animate-pulse w-64 rounded-3xl relative">
            <div className="rounded-xl w-28 h-8 absolute right-4 bottom-4 bg-slate-400"></div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-4 gap-3 pt-4">
            {paginatedVideos.length > 0 ? (
              paginatedVideos.map((item) => (
                <Link
                  key={item.id}
                  href={`/videos/${item.id || item._id}`}
                  className="relative hover:group hover:cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600"
                >
                  <div
                    className="w-full h-[20rem]"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) video.play();
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }}
                  >
                    <video
                      src={item.url || item?.video_url}
                      poster={item.thumbnail ? item.thumbnail : null}
                      width={300}
                      height={300}
                      className="w-full object-cover h-full rounded-2xl"
                      muted={false}
                      controls={false}
                      loop={true}
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute bottom-4 right-4 backdrop-blur-sm rounded-full text-lg px-5 py-3 text-white bg-darkbg bg-opacity-50 hover:bg-opacity-100">
                      <h3>
                        {item.book} {item.chapter_start && item.chapter_start}
                        {item.chapter_end &&
                          item.chapter_end !== item.chapter_start &&
                          ` - ${item.chapter_end}`}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-4 text-center py-10">
                <p className="text-xl text-darkbg">
                  No videos found {selectedBook ? `for ${selectedBook}` : ""}.
                  Please try another book.
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && !isFiltering && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-darkbg text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-full ${
                      currentPage === pageNum
                        ? "bg-darkbg text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-darkbg text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
