"use client";

import { useState, useEffect, useRef } from "react";

const booksofthebible = {
  newtestament: [
    {
      title: "Introduction",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/01%20Lagos%20Segment%20%20Part%201.mp4",
      color: "bg-pink-100",
      icon: "🌍",
    },
    {
      title: "Matthew - Mark",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/02%20Lagos%20Segment%20Part%202.mp4",
      color: "bg-blue-100",
      icon: "✝️",
    },
    {
      title: "Luke",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/03%20Lagos%20Segment%20Part%203.mp4",
      color: "bg-green-100",
      icon: "📖",
    },
    {
      title: "John - Acts",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/04%20Zambia%20Segment.mp4",
      color: "bg-yellow-100",
      icon: "🌍",
    },
    {
      title: "Romans - Ephesians",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/05%20Hawaii%20Segment.mp4",
      color: "bg-purple-100",
      icon: "🌺",
    },
    {
      title: "Philippians - 2 Thessalonians",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/06%20India%20Segment.mp4",
      color: "bg-orange-100",
      icon: "🕌",
    },
    {
      title: "1 Timothy - Philemon",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/07%20Ghana%20Segment.mp4",
      color: "bg-red-100",
      icon: "⭐",
    },
    {
      title: "Hebrews - 2 Peter",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/08%20Amsterdam%20Segment.mp4",
      color: "bg-teal-100",
      icon: "🌷",
    },
    {
      title: "1 John - 3 John",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/09%20Capetown%20Segment.mp4",
      color: "bg-indigo-100",
      icon: "🏔️",
    },
    {
      title: "Jude - Revelation",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/letreadthebible//2026/New-testament/10%20Lagos%20Segment%20Part%204%20Ends%20The%20Lbrf.mp4",
      color: "bg-cyan-100",
      icon: "✝️",
    },
  ],

  oldtestament: [
    {
      title: "Genesis",
      url: "https://d1ent1.loveworldcloud.com/~kiddiesmedia/LOVETOONS_TV/app_promo/Salvation%20Video%20English(1).mp4",
      color: "bg-amber-100",
      icon: "🌎",
    },
  ],
};

export default function BiblePlaylistPage() {
  const videoRef = useRef(null);

  const [testament, setTestament] = useState("newtestament");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showClouds, setShowClouds] = useState(true);

  const playlist = booksofthebible[testament];
  const currentBook = playlist[currentIndex];

  /* 🔄 Load last watched video */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("biblePlaylist"));
    if (saved) {
      setTestament(saved.testament);
      setCurrentIndex(saved.index);
    }
  }, []);

  /* 📌 Save progress */
  useEffect(() => {
    localStorage.setItem(
      "biblePlaylist",
      JSON.stringify({ testament, index: currentIndex })
    );
  }, [testament, currentIndex]);

  /* ⏭️ Play next (loop enabled) */
  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // 🔁 loop playlist
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(playlist.length - 1); // 🔁 loop to end
    }
  };

  // Animate clouds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowClouds((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 p-4 md:p-6">
      {/* Animated Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`cloud cloud-1 ${showClouds ? "animate-float-slow" : ""}`}
        ></div>
        <div
          className={`cloud cloud-2 ${
            showClouds ? "animate-float-medium" : ""
          }`}
        ></div>
        <div
          className={`cloud cloud-3 ${showClouds ? "animate-float-fast" : ""}`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-6 md:mb-8 mt-[100px]">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2 animate-bounce-slow">
            Bible Reading
          </h1>
          <p className="text-lg md:text-xl text-blue-600 font-semibold">
            Watch and learn about God's love!
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-4 mt-4">
            <span className="text-3xl">✨</span>
            <span className="text-3xl">⭐</span>
            <span className="text-3xl">🕊️</span>
            <span className="text-3xl">❤️</span>
            <span className="text-3xl">⭐</span>
            <span className="text-3xl">✨</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* 🎬 Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-5 md:p-6 rounded-3xl shadow-2xl border-4 border-yellow-300 transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 flex items-center">
                  <span className="mr-3">{currentBook?.icon || "📖"}</span>
                  {currentBook?.title}
                  <span className="ml-3 text-xl bg-yellow-300 text-purple-800 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {playlist.length}
                  </span>
                </h2>

                {/* Testament Selector for mobile */}
                <div className="lg:hidden">
                  <select
                    value={testament}
                    onChange={(e) => {
                      setTestament(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="p-2 rounded-full bg-white border-2 border-yellow-400 text-purple-800 font-bold"
                  >
                    <option value="newtestament">New Testament</option>
                    <option value="oldtestament">Old Testament</option>
                  </select>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <video
                  ref={videoRef}
                  key={`${testament}-${currentIndex}`}
                  controls
                  autoPlay
                  onEnded={playNext}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-auto rounded-2xl"
                >
                  <source src={currentBook?.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Play Controls Overlay */}
                <div className="absolute bottom-8  left-0 right-0 flex justify-center space-x-4 hidden md:visible">
                  <button
                    onClick={playPrevious}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transform transition-transform duration-200"
                  >
                    <span className="text-xl">⏮️</span>
                  </button>

                  <button
                    onClick={playNext}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transform transition-transform duration-200"
                  >
                    <span className="text-xl">⏭️</span>
                  </button>
                </div>
              </div>

              {/* Video Status */}
              <div className="mt-4 flex items-center justify-center">
                <div
                  className={`px-4 py-2 rounded-full ${
                    isPlaying
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {isPlaying ? "▶️ Now Playing" : "⏸️ Paused"}
                </div>
              </div>
            </div>

            {/* Fun Facts Box */}
            <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-2xl border-2 border-orange-300">
              <h3 className="text-xl font-bold text-orange-800 mb-2 flex items-center">
                <span className="mr-2">💡</span> Did You Know?
              </h3>
              <p className="text-orange-700">
                The Bible is the most translated book in the world! It's
                available in over 700 languages.
              </p>
            </div>
          </div>

          {/* 📜 Playlist */}
          <div className="bg-gradient-to-b from-purple-50 to-pink-50 p-5 md:p-6 rounded-3xl shadow-2xl border-4 border-pink-300">
            {/* Testament Selector for desktop */}
            <div className="mb-6 hidden lg:block">
              <label className="block mb-3 text-lg font-bold text-purple-800">
                📚 Select Testament
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setTestament("newtestament");
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all duration-300 ${
                    testament === "newtestament"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "bg-white text-purple-700 border-2 border-purple-300 hover:border-purple-500"
                  }`}
                >
                  New Testament
                </button>
                <button
                  onClick={() => {
                    setTestament("oldtestament");
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-3 hidden rounded-xl text-lg font-bold transition-all duration-300 ${
                    testament === "oldtestament"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                      : "bg-white text-amber-700 border-2 border-amber-300 hover:border-amber-500"
                  }`}
                >
                  Old Testament
                </button>
              </div>
            </div>

            {/* Playlist Items */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {playlist.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center
                    ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl"
                        : `${item.color} text-purple-800 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100`
                    }`}
                >
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className="text-lg font-semibold">{item.title}</span>
                  {index === currentIndex && (
                    <span className="ml-auto animate-pulse">▶️</span>
                  )}
                </button>
              ))}
            </div>

            {/* Playlist Controls */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={playPrevious}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-3 rounded-xl font-bold flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">⏮️</span> Previous
              </button>
              <button
                onClick={playNext}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-3 rounded-xl font-bold flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Next <span className="ml-2">⏭️</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-blue-600">
          <p className="text-lg">
            <span className="font-bold">Remember:</span> Jesus loves you! ❤️
          </p>
          <div className="flex justify-center space-x-6 mt-4 text-2xl">
            <span>🕊️</span>
            <span>🙏</span>
            <span>❤️</span>
            <span>⭐</span>
          </div>
        </footer>
      </div>

      {/* Add custom styles for clouds and animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(20px) translateY(-10px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-30px) translateY(-15px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(40px) translateY(-5px);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .cloud {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
        }

        .cloud-1 {
          width: 150px;
          height: 60px;
          top: 10%;
          left: 5%;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
        }

        .cloud-2 {
          width: 120px;
          height: 50px;
          top: 20%;
          right: 10%;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
        }

        .cloud-3 {
          width: 100px;
          height: 40px;
          top: 15%;
          left: 30%;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
        }

        /* Custom scrollbar for playlist */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.8);
        }
      `}</style>
    </div>
  );
}
