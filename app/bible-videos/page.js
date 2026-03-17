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
    <div className="bp-root">
      {/* Animated Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`cloud cloud-1 ${showClouds ? "animate-float-slow" : ""}`}
        />
        <div
          className={`cloud cloud-2 ${
            showClouds ? "animate-float-medium" : ""
          }`}
        />
        <div
          className={`cloud cloud-3 ${showClouds ? "animate-float-fast" : ""}`}
        />
      </div>
      <div className="bp-inner">
        {/* ── Header ── */}
        <header className="bp-header">
          <p className="bp-eyebrow">Lovetoons Bible Reading Fiesta</p>
          <h1 className="bp-title">
            Bible <span className="bp-title-accent">Reading</span>
          </h1>
          <p className="bp-subtitle">Watch and learn about God&apos;s love!</p>
          <div className="bp-icons-row hidden">
            {["✨", "⭐", "🕊️", "❤️", "⭐", "✨"].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </header>

        <div className="bp-grid">
          {/* ── Video Player ── */}
          <div className="bp-player-col">
            <div className="bp-player-card">
              {/* Card header */}
              <div className="bp-player-header">
                <div className="bp-now-playing-meta">
                  <span className="bp-book-icon">
                    {currentBook?.icon || "📖"}
                  </span>
                  <div>
                    <p className="bp-now-playing-label">Now Playing</p>
                    <h2 className="bp-book-title">{currentBook?.title}</h2>
                  </div>
                </div>
                <span className="bp-counter">
                  {currentIndex + 1} <span style={{ opacity: 0.45 }}>/</span>{" "}
                  {playlist.length}
                </span>

                {/* Testament selector — mobile */}
                <div className="bp-mobile-select">
                  <select
                    value={testament}
                    onChange={(e) => {
                      setTestament(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="bp-select"
                  >
                    <option value="newtestament">New Testament</option>
                    <option value="oldtestament">Old Testament</option>
                  </select>
                </div>
              </div>

              {/* Video */}
              <div className="bp-video-wrap">
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
                  className="bp-video"
                >
                  <source src={currentBook?.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Play Controls Overlay */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 hidden md:visible">
                  <button
                    onClick={playPrevious}
                    className="bp-overlay-btn blue"
                  >
                    <span>⏮️</span>
                  </button>
                  <button onClick={playNext} className="bp-overlay-btn green">
                    <span>⏭️</span>
                  </button>
                </div>
              </div>

              {/* Status + nav */}
              <div className="bp-player-footer">
                <div
                  className={`bp-status ${isPlaying ? "playing" : "paused"}`}
                >
                  {isPlaying ? "▶ Playing" : "⏸ Paused"}
                </div>
                <div className="bp-nav-btns">
                  <button onClick={playPrevious} className="bp-nav-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                    </svg>
                    Prev
                  </button>
                  <button onClick={playNext} className="bp-nav-btn primary">
                    Next
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Did You Know */}
            <div className="bp-funfact">
              <span className="bp-funfact-icon">💡</span>
              <div>
                <p className="bp-funfact-title">Did You Know?</p>
                <p className="bp-funfact-text">
                  The Bible is the most translated book in the world — available
                  in over 700 languages!
                </p>
              </div>
            </div>
          </div>

          {/* ── Playlist ── */}
          <div className="bp-playlist-card">
            {/* Testament selector — desktop */}
            <div className="bp-testament-toggle">
              <button
                onClick={() => {
                  setTestament("newtestament");
                  setCurrentIndex(0);
                }}
                className={`bp-toggle-btn ${
                  testament === "newtestament" ? "active-new" : ""
                }`}
              >
                New Testament
              </button>
              {/* Old Testament button hidden as per original */}
              <button
                onClick={() => {
                  setTestament("oldtestament");
                  setCurrentIndex(0);
                }}
                className={`bp-toggle-btn hidden ${
                  testament === "oldtestament" ? "active-old" : ""
                }`}
              >
                Old Testament
              </button>
            </div>

            <p className="bp-playlist-label">
              Playlist · {playlist.length} segments
            </p>

            <div className="bp-playlist-scroll">
              {playlist.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`bp-playlist-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <span className="bp-item-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="bp-item-icon">{item.icon}</span>
                  <span className="bp-item-title">{item.title}</span>
                  {index === currentIndex && (
                    <span className="bp-item-playing">
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bp-footer hidden">
          <p>
            <span className="bp-footer-bold">Remember:</span> Jesus loves you!
            ❤️
          </p>
          <div className="bp-footer-icons">
            {["🕊️", "🙏", "❤️", "⭐"].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap");

        .bp-root {
          font-family: "DM Sans", sans-serif;
          min-height: 100svh;
          background: #0e0b20;
          position: relative;
          overflow-x: hidden;
        }

        /* starfield */
        .bp-root::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
              ellipse at 18% 12%,
              rgba(100, 30, 160, 0.5) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse at 82% 75%,
              rgba(20, 60, 160, 0.4) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse at 50% 45%,
              rgba(200, 133, 31, 0.12) 0%,
              transparent 65%
            ),
            #0e0b20;
          pointer-events: none;
        }

        .bp-inner {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          margin: 0 auto;
          padding: 7rem 1.25rem 4rem;
        }

        /* ── header ── */
        .bp-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .bp-eyebrow {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #f5c257;
          margin-bottom: 0.4rem;
        }
        .bp-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          letter-spacing: 3px;
          line-height: 1;
          color: #fff;
          margin-bottom: 0.4rem;
        }
        .bp-title-accent {
          color: #f5c257;
        }
        .bp-subtitle {
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.88rem;
          font-weight: 300;
        }
        .bp-icons-row {
          display: flex;
          gap: 0.65rem;
          justify-content: center;
          margin-top: 0.85rem;
          font-size: 1.4rem;
        }

        /* ── layout ── */
        .bp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .bp-grid {
            grid-template-columns: 1fr 360px;
            gap: 2rem;
          }
        }

        /* ── player card ── */
        .bp-player-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .bp-player-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          flex-wrap: wrap;
        }
        .bp-now-playing-meta {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex: 1;
          min-width: 0;
        }
        .bp-book-icon {
          font-size: 1.6rem;
          flex-shrink: 0;
        }
        .bp-now-playing-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #f5c257;
          margin-bottom: 1px;
        }
        .bp-book-title {
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bp-counter {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 1px;
          flex-shrink: 0;
        }
        .bp-mobile-select {
          display: none;
        }
        @media (max-width: 1023px) {
          .bp-mobile-select {
            display: block;
          }
        }
        .bp-select {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 0.4rem 0.75rem;
          font-family: "DM Sans", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .bp-video-wrap {
          position: relative;
          background: #000;
        }
        .bp-video {
          width: 100%;
          height: auto;
          display: block;
          max-height: 480px;
          object-fit: contain;
        }

        .bp-overlay-btn {
          padding: 0.65rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: transform 0.15s;
        }
        .bp-overlay-btn:hover {
          transform: scale(1.1);
        }
        .bp-overlay-btn.blue {
          background: linear-gradient(135deg, #60a5fa, #2563eb);
        }
        .bp-overlay-btn.green {
          background: linear-gradient(135deg, #4ade80, #16a34a);
        }

        .bp-player-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .bp-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }
        .bp-status.playing {
          background: rgba(74, 222, 128, 0.15);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }
        .bp-status.paused {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .bp-nav-btns {
          display: flex;
          gap: 0.6rem;
        }
        .bp-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: "DM Sans", sans-serif;
          cursor: pointer;
          transition: background 0.18s, transform 0.14s;
        }
        .bp-nav-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          transform: translateY(-1px);
        }
        .bp-nav-btn.primary {
          background: rgba(245, 194, 87, 0.15);
          color: #f5c257;
          border-color: rgba(245, 194, 87, 0.3);
        }
        .bp-nav-btn.primary:hover {
          background: rgba(245, 194, 87, 0.25);
        }

        /* funfact */
        .bp-funfact {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          margin-top: 1.1rem;
          background: rgba(234, 137, 55, 0.1);
          border: 1px solid rgba(234, 137, 55, 0.25);
          border-radius: 16px;
          padding: 1rem 1.25rem;
        }
        .bp-funfact-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bp-funfact-title {
          font-weight: 700;
          color: #f5c257;
          font-size: 0.88rem;
          margin-bottom: 0.25rem;
        }
        .bp-funfact-text {
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.82rem;
          line-height: 1.6;
        }

        /* ── playlist card ── */
        .bp-playlist-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 1.25rem;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
        }

        .bp-testament-toggle {
          display: none;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 1024px) {
          .bp-testament-toggle {
            display: flex;
          }
        }
        .bp-toggle-btn {
          flex: 1;
          padding: 0.6rem;
          border-radius: 10px;
          font-family: "DM Sans", sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }
        .bp-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .bp-toggle-btn.active-new {
          background: linear-gradient(
            135deg,
            rgba(96, 165, 250, 0.3),
            rgba(37, 99, 235, 0.3)
          );
          color: #93c5fd;
          border-color: rgba(96, 165, 250, 0.4);
        }
        .bp-toggle-btn.active-old {
          background: linear-gradient(
            135deg,
            rgba(251, 191, 36, 0.25),
            rgba(234, 88, 12, 0.25)
          );
          color: #fcd34d;
          border-color: rgba(251, 191, 36, 0.35);
        }

        .bp-playlist-label {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 0.75rem;
        }

        .bp-playlist-scroll {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-height: 500px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .bp-playlist-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .bp-playlist-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
        }
        .bp-playlist-scroll::-webkit-scrollbar-thumb {
          background: rgba(245, 194, 87, 0.3);
          border-radius: 4px;
        }

        .bp-playlist-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          width: 100%;
          text-align: left;
          padding: 0.7rem 0.85rem;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          font-family: "DM Sans", sans-serif;
          transition: background 0.18s, border-color 0.18s, transform 0.12s;
          color: rgba(255, 255, 255, 0.55);
        }
        .bp-playlist-item:hover {
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.85);
          transform: translateX(2px);
        }
        .bp-playlist-item.active {
          background: linear-gradient(
            135deg,
            rgba(200, 133, 31, 0.25),
            rgba(245, 194, 87, 0.15)
          );
          border-color: rgba(245, 194, 87, 0.35);
          color: #fff;
        }
        .bp-item-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
          width: 22px;
        }
        .bp-playlist-item.active .bp-item-num {
          color: #f5c257;
        }
        .bp-item-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .bp-item-title {
          font-size: 0.87rem;
          font-weight: 500;
          flex: 1;
        }

        /* animated bars for now-playing */
        .bp-item-playing {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 16px;
          flex-shrink: 0;
        }
        .bp-item-playing span {
          display: block;
          width: 3px;
          background: #f5c257;
          border-radius: 2px;
          animation: barBounce 0.8s ease-in-out infinite;
        }
        .bp-item-playing span:nth-child(1) {
          height: 8px;
          animation-delay: 0s;
        }
        .bp-item-playing span:nth-child(2) {
          height: 14px;
          animation-delay: 0.2s;
        }
        .bp-item-playing span:nth-child(3) {
          height: 10px;
          animation-delay: 0.4s;
        }
        @keyframes barBounce {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.4);
          }
        }

        /* ── footer ── */
        .bp-footer {
          margin-top: 2.5rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.85rem;
        }
        .bp-footer-bold {
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
        }
        .bp-footer-icons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          margin-top: 0.65rem;
          font-size: 1.3rem;
        }

        /* ── clouds (unchanged from original) ── */
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

        .cloud {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.06;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
        }
        .cloud-1 {
          width: 150px;
          height: 60px;
          top: 10%;
          left: 5%;
        }
        .cloud-2 {
          width: 120px;
          height: 50px;
          top: 20%;
          right: 10%;
        }
        .cloud-3 {
          width: 100px;
          height: 40px;
          top: 15%;
          left: 30%;
        }
      `}</style>
    </div>
  );
}
