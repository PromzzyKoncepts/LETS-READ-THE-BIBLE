"use client";
import axios from "axios";
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaPlay, FaForward, FaBackward } from "react-icons/fa";
import { BsPauseFill, BsFullscreen  } from "react-icons/bs";
import { LuPictureInPicture2 } from "react-icons/lu";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
import { RiForward10Fill } from "react-icons/ri";
import { FaRotateLeft } from "react-icons/fa6";
import { getChapter, getChaptersInRange, getVersesInChapter } from "@/app/components/read/readApi";

const baseUrl = "https://lets-read-the-bible.vercel.app"


const VideoDetailsPage = () => {
  const [hasEnded, setHasEnded] = useState(false);
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState([]);

  const [videos, setVideos] = useState([]);
  
useEffect(() => {
  setIsVisible(true); // Trigger the animation when the component mounts
}, []);

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/videos`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch videos");
      }

      const {data } = response;
      setVideos(data);
    } catch (error) {
      console.log(error)
    }
  };

  fetchVideos();
}, []);


useEffect(() => {
  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/videos/${videoId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch video details");
      }
      setVideo(response?.data);
      const chapters = getChaptersInRange(response?.data?.book, response?.data?.chapter_start, response?.data?.chapter_end);
      setChapters(chapters);
      setSelectedChapter(response.data.chapter_start);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchVideo();
}, [videoId]);

console.log(chapters, verses)

useEffect(() => {
  if (selectedChapter !== null) {
    const verses = getVersesInChapter(video.book, selectedChapter);
    setVerses(verses);
  }
}, [selectedChapter, video]);

const handleChapterClick = (chapter) => {
  setSelectedChapter(chapter);
};

  useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.addEventListener("timeupdate", updateProgress);
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current.duration);
      });
      videoRef.current.addEventListener("ended", () => {
        setHasEnded(true);
        setIsPlaying(false);
      });
    }
  }, [video]);

  const updateProgress = () => {
    setCurrentTime(videoRef.current.currentTime);
    if (progressBarRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    }
  };

  const togglePlayPause = () => {
    if (hasEnded) {
      videoRef.current.currentTime = 0;
      setHasEnded(false);
    }
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const togglePiP = async () => {
    if (!isPiP) {
      await videoRef.current.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
    setIsPiP(!isPiP);
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const handleHover = () => {
    setIsHovered(true);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    videoRef.current.currentTime = newTime;
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
  
            <h3 className="font-lucky text-2xl md:text-5xl text-darkbg">Loading engaging Videos</h3>
            <p className="text-center mx-auto text-xl text-pinkbg font-bold">Please wait a sec...</p>
        </div>;
        </div>;
      </div>);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!video) {
    return <div>Video not found.</div>;
  }

  return (
    <div style={{ backgroundImage: `url(/images/pngbg.png)`, backgroundSize: 'cover' }}
    className="px-5 bg-[#F4C2C2] md:px-24 pt-28 min-h-screen">
      <div className="  grid md:grid-cols-3 gap-5 items-start">
      <div
        className=" col-span-2 relative bg-white w-fit md:w-[55rem] h-[35rem] shadow-lg shadow-darkbg border-2 border-white rounded-3xl overflow-hidden"
        onClick={handleHover}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          src={video.video_url}
          type="video/mp4"
          muted={isMuted}
          className="w-full h-full object-cover"
        />
        {isHovered && (
          <div>
          <div className="absolute inset-0 flex items-center gap-5 bg-darkbg bg-opacity-10 justify-center ">
            <button
              onClick={() => skip(-10)}
              className="text-white text-4xl ml-4"
            >
             <FaBackward/>
            </button>
            <button
              onClick={togglePlayPause}
              className="text-white text-6xl"
            >
              {hasEnded ? <FaRotateLeft size={35} /> : (isPlaying ? <BsPauseFill  size={40} /> : <FaPlay  size={38} />)}
            </button>
            
            <button
              onClick={() => skip(10)}
              className="text-white text-4xl mr-4"
            >
             <FaForward/>
            </button>
          </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2f0033] to-transparent bg-opacity-50 px-7 py-5">
          <div className="flex items-center">
            <div onClick={handleProgressBarClick} className="flex-1 bg-gray-600 h-2 rounded-full transition-all duration-500 ease-in-out">
              <div
                ref={progressBarRef}
                className="bg-white h-3 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
            <span className="text-white ml-2">
              {Math.floor(duration - currentTime)}s
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <button onClick={toggleMute} className="text-white text-xl">
                {isMuted ? <FaVolumeXmark/> : <FaVolumeHigh/>}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="ml-2 bg-white"
                ref={volumeBarRef}
              />
            </div>
            <div className="flex items-center">
              <button onClick={togglePiP} className="text-white text-xl mr-2">
                <LuPictureInPicture2/>
              </button>
              <button onClick={toggleFullscreen} className="text-white text-xl">
                {isFullscreen ? <BsFullscreen size={15}/> : <BsFullscreen size={15}/>}
              </button>
            </div>
          </div>
        </div>

        <p className={`absolute bg-darkbg bg-opacity-20 top-4 font-sniglet px-5 py-2 rounded-full backdr op-blur-md right-4 slide-in-right ${isVisible ? 'visible' : ''}`}>
          <span className="font-bold font-jua text-white text-xl tracking-wider">{video.book} : </span>{"  "}
          <span className="font-bold font-jua text-white text-xl">
          {" "}{video.chapter_start}{" "}
            {video.chapter_end && video.chapter_end !== video.chapter_start && ` - ${video.chapter_end}`}
          </span>
        </p>

        <p className="text-white absolute  bottom-4 font-bubblegum  rounded-full  left-1/2 slide-in-top">
              Read by: {video.kid_fullname} 
        </p>
      </div>
    )}
  </div>


      {/* do the component here please */}
      <div className="bg-white font-sniglet rounded-3xl">
        <div className="flex space-x-2 font-lucky text-xl">
          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => handleChapterClick(chapter.chapter)}
              className={`px-4 py-2  ${
                selectedChapter === chapter.chapter ? 'bg-gray-100 rounded--3xl border-t-2 border-l-2 border-r-2 text-darkbg' : ' text-slate-700'
              }`}
            >
             {chapter.book_name} Chapter {chapter.chapter}
            </button>
          ))}
        </div>
        <div className="px-5 py-4  bg-gray-100 border-r-2 shadow-lg shadow-darkbg border-l-2 border-b-2 h-[70vh] overflow-y-auto example rounded-b-2xl">
          <ul className="pb-4">
            {verses.map((verse, index) => (
              <li key={index} className="mb-3">
                <strong>{verse.verse}:</strong> {verse.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      
      <h2 className="font-lucky text-center text-5xl py-10">Explore More Videos</h2>
      <div className=" grid md:grid-cols-3 gap-4 ">
        {videos.map((item, index) => (
          <Link 
          key={item.id} 
          href={`/videos/${item.id}`} 
          className="relative hover:group  hover: cursor-pointer hover:border-2 border-white bg-slate-500 rounded-2xl hover:shadow-md hover:shadow-slate-600">
            <div
            className="w-full h-full hover:group"
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('.video');
                console.log(video)
                if (video) {
                  video.play();
                }
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('.video');
                console.log(video)

                if (video) {
                  video.pause();
                  video.currentTime = 0; // Reset video to the beginning
                }
              }}
            >
              <video
                src={item.url}
                width={200}
                height={200}
                className="w-full object-cover video h-full rounded-2xl"
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

export default VideoDetailsPage;