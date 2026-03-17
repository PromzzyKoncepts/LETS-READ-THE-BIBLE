"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tab from "./components/Tab";
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
        if (response.status !== 200) throw new Error("Failed to fetch videos");
        setVideos(response.data.slice(0, 12));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchVideos();
  }, []);

  const card = [
    {
      title: "Year of Manifestation",
      src: "https://lovetoons.org/img/YEAR_OF_MANIFESTATION_web2.png",
    },
    { title: "Tick Talk", src: "/images/ticktalk.png" },
    { title: "Comics 3", src: "/images/comics2.png" },
  ];

  const raceItems = [
    {
      letter: "R",
      color: ["#4ade80", "#16a34a"],
      label: "Read a verse everyday",
    },
    { letter: "A", color: ["#60a5fa", "#2563eb"], label: "Apply the Word" },
    { letter: "C", color: ["#fb923c", "#ea580c"], label: "Confess the Word" },
    {
      letter: "E",
      color: ["#c084fc", "#9333ea"],
      label: "Excel & Manifest Truth",
    },
  ];

  const channels = [
    {
      href: "/bible-videos",
      img: "/images/fiesta.png",
      bg: "#1a7a91",
      title: "LBRF",
      desc: "Watch our Bible reading videos for kids!",
      cta: "Watch Now",
      ctaBg: "#e2faff",
      ctaColor: "#0f4a57",
    },
    {
      href: "/daily-bible",
      img: "/images/bible-daily.png",
      bg: "#c8620e",
      title: "Daily Bible Reading",
      desc: "Complete the reading of the Bible by following our daily plan.",
      cta: "Watch today's reading",
      ctaBg: "#ffe7d1",
      ctaColor: "#5a3500",
    },
    {
      href: "/videos",
      img: "/images/campaign.png",
      bg: "#fff",
      title: "Let's Read the Bible Campaign",
      desc: "Join millions of children discovering the Word of God.",
      cta: "Learn More",
      ctaBg: "#e8eeff",
      ctaColor: "#1a3ab5",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        * { box-sizing: border-box; }

        .home-root {
          font-family: 'DM Sans', sans-serif;
          background: #f5f2ec;
          overflow-x: hidden;
        }

        /* ─── HERO ───────────────────────────────── */
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 5rem 1.25rem 3rem;
        }
        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-bg-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(160deg, rgba(12,8,30,.72) 0%, rgba(60,20,80,.6) 60%, rgba(12,8,30,.8) 100%);
        }
        .hero-inner {
          position: relative; z-index: 2;
          max-width: 1100px; width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr; gap: 2rem; }
          .hero-verse-col { order: -1; }
        }

        /* RACE card */
        .race-card {
          background: rgba(90,16,86,.88);
          border-radius: 28px;
          padding: 2rem 1.75rem 0;
          box-shadow: 0 30px 70px rgba(0,0,0,.4);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
        }
        .race-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 28px;
          opacity: .12;
        }
        .race-title-row {
          display: flex; justify-content: center; gap: .35rem;
          margin-bottom: .75rem;
          position: relative;
        }
        .race-letter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          line-height: 1;
          filter: drop-shadow(0 6px 0 rgba(0,0,0,.25));
        }
        .race-pill {
          position: relative; display: inline-block; margin-bottom: 1.5rem;
          text-align: center;
        }
        .race-pill-shadow {
          position: absolute; inset: 0;
          border-radius: 999px;
          background: #92400e;
          transform: translateY(3px);
        }
        .race-pill-face {
          position: relative;
          border-radius: 999px;
          background: linear-gradient(to bottom, #f97316, #ea580c);
          padding: .5rem 2rem;
          color: #fff;
          font-weight: 700;
          font-size: .9rem;
          letter-spacing: .04em;
        }
        .race-row {
          display: flex; align-items: center;
          margin-bottom: .9rem;
          position: relative;
        }
        .race-row-circle {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #fff;
          flex-shrink: 0;
          z-index: 1;
          box-shadow: 0 6px 0 rgba(0,0,0,.3);
        }
        .race-row-bar {
          flex: 1;
          margin-left: -14px;
          border-radius: 999px;
          padding: .75rem 1rem .75rem 1.5rem;
          color: #fff;
          font-weight: 600;
          font-size: .88rem;
          box-shadow: 0 8px 0 rgba(0,0,0,.2);
        }
        .race-bible-img {
          width: 80%;
          margin: 1.5rem auto -3.5rem;
          display: block;
          filter: drop-shadow(0 16px 24px rgba(0,0,0,.4));
          animation: slowBounce 3s ease-in-out infinite;
        }
        @keyframes slowBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        /* Memory verse col */
        .verse-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,.25);
        }
        .verse-card-header {
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          padding: .85rem 1rem;
          text-align: center;
        }
        .verse-card-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0;
        }

        /* ─── SWIPER BAND ──────────────────────────── */
        .swiper-band {
          background: linear-gradient(to bottom, #ede9ff, #fff);
          padding: 2rem 0 3rem;
        }

        /* ─── CHANNELS SECTION ─────────────────────── */
        .channels-section {
          background: #fff8f4;
          padding: 4rem 1.25rem;
        }
        .section-eyebrow {
          font-size: .75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: #c8851f;
          text-align: center;
          margin: 0 0 .4rem;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: 2px;
          color: #0c0c1a;
          text-align: center;
          margin: 0 0 2.5rem;
        }
        .channels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .channel-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(0,0,0,.1);
          transition: transform .2s, box-shadow .2s;
          display: flex; flex-direction: column;
          text-decoration: none;
        }
        .channel-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(0,0,0,.18); }
        .channel-card-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
        .channel-card-body {
          padding: 1rem 1.1rem 1.25rem;
          flex: 1;
          display: flex; flex-direction: column; gap: .5rem;
        }
        .channel-card-title { font-weight: 700; font-size: .95rem; color: inherit; margin: 0; }
        .channel-card-desc  { font-size: .82rem; opacity: .75; margin: 0; flex: 1; line-height: 1.5; }
        .channel-card-cta {
          display: inline-block;
          padding: .38rem .9rem;
          border-radius: 8px;
          font-size: .78rem; font-weight: 600;
          text-decoration: none;
          width: fit-content;
          margin-top: .25rem;
          transition: opacity .15s;
        }
        .channel-card-cta:hover { opacity: .8; }

        /* ─── VIDEOS SECTION ───────────────────────── */
        .videos-section {
          background: linear-gradient(to bottom, #fce4e4, #fff8f4);
          padding: 4rem 1.25rem 2rem;
        }
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
          max-width: 1100px;
          margin: 2rem auto 0;
          padding: 0 0 1rem;
        }
        .video-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 9/14;
          background: #334;
          box-shadow: 0 4px 16px rgba(0,0,0,.15);
          transition: transform .18s, box-shadow .18s;
          text-decoration: none;
          display: block;
        }
        .video-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,.22); }
        .video-card video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .video-card-label {
          position: absolute; bottom: .75rem; left: .75rem; right: .75rem;
          background: rgba(12,12,26,.65);
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: .45rem .75rem;
          color: #fff;
          font-size: .78rem; font-weight: 500;
        }

        .view-all-btn {
          display: flex;
          align-items: center; justify-content: center;
          width: fit-content;
          margin: 2rem auto 0;
          background: #0c0c1a; color: #f5c257;
          padding: .75rem 2rem;
          border-radius: 999px;
          font-weight: 700; font-size: .9rem;
          text-decoration: none;
          letter-spacing: .04em;
          transition: background .18s, transform .14s;
          box-shadow: 0 4px 18px rgba(0,0,0,.2);
        }
        .view-all-btn:hover { background: #1e1e3a; transform: translateY(-2px); }
      `}</style>

      <div className="home-root">
        {/* ─── HERO ─── */}
        <section className="hero-section">
          <img
            src="/images/letsreadthebible.jpg"
            alt=""
            className="hero-bg"
            aria-hidden="true"
          />
          <div className="hero-bg-overlay" />

          <div className="hero-inner">
            {/* RACE card */}
            <div className="race-card">
              <img
                src="/images/kidsbible.png"
                alt=""
                className="race-card-bg"
                aria-hidden="true"
              />

              <div className="race-title-row">
                {["R", "A", "C", "E"].map((l, i) => {
                  const colors = [
                    ["#4ade80", "#16a34a"],
                    ["#60a5fa", "#2563eb"],
                    ["#fb923c", "#ea580c"],
                    ["#c084fc", "#9333ea"],
                  ];
                  return (
                    <span
                      key={l}
                      className="race-letter"
                      style={{
                        color: colors[i][0],
                        WebkitTextStroke: `2px ${colors[i][1]}`,
                      }}
                    >
                      {l}
                    </span>
                  );
                })}
              </div>

              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div className="race-pill">
                  <div className="race-pill-shadow" />
                  <div className="race-pill-face">Read A Chapter Everyday</div>
                </div>
              </div>

              {raceItems.map(({ letter, color, label }) => (
                <div className="race-row" key={letter}>
                  <div
                    className="race-row-circle"
                    style={{
                      background: `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
                    }}
                  >
                    {letter}
                  </div>
                  <div
                    className="race-row-bar"
                    style={{
                      background: `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}

              <img
                src="https://letsreadthebible.club/_next/image?url=%2Fimages%2Freadbible.png&w=1080&q=75"
                alt="Read the Bible"
                className="race-bible-img"
              />
            </div>

            {/* Memory verse */}
            <div className="verse-card">
              <div className="verse-card-header">
                <h2>Kids Memory Verse</h2>
              </div>
              <video
                src="https://cdn1.kingschat.online/uploads/media/53d9893773312e341fb91400/OCtqSTc1dVZBOXk1Yk14Vk1TYmpqQT09/Leo_14Th_March_Main_1.m4v"
                width={400}
                height={400}
                style={{ width: "100%", display: "block" }}
                controls
                loop={false}
              />
            </div>
          </div>
        </section>

        {/* ─── TAB ─── */}
        <Tab />

        {/* ─── SWIPER BAND ─── */}
        <div className="swiper-band">
          <Swiper carousels={card} />
        </div>

        {/* ─── CHANNELS ─── */}
        <section className="channels-section">
          <p className="section-eyebrow">Explore Content</p>
          <h2 className="section-title">Explore Our Videos</h2>
          <div className="channels-grid">
            {channels.map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                className="channel-card"
                style={{
                  background: ch.bg,
                  color: ch.bg === "#fff" ? "#1a1a2e" : "#fff",
                }}
              >
                <Image
                  src={ch.img}
                  alt={ch.title}
                  width={600}
                  height={450}
                  className="channel-card-img"
                />
                <div className="channel-card-body">
                  <p className="channel-card-title">{ch.title}</p>
                  <p className="channel-card-desc">{ch.desc}</p>
                  <span
                    className="channel-card-cta"
                    style={{ background: ch.ctaBg, color: ch.ctaColor }}
                  >
                    {ch.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── VIDEOS GRID ─── */}
        {videos.length > 0 && (
          <section className="videos-section">
            <p className="section-eyebrow">Community</p>
            <h2 className="section-title">Featured Readings</h2>

            <div className="videos-grid">
              {videos.map((item) => (
                <Link
                  key={item.id}
                  href={`/videos/${item.id}`}
                  className="video-card"
                  onMouseEnter={(e) =>
                    e.currentTarget.querySelector("video")?.play()
                  }
                  onMouseLeave={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) {
                      v.pause();
                      v.currentTime = 0;
                    }
                  }}
                >
                  <video
                    src={item.url}
                    width={300}
                    height={400}
                    muted
                    loop
                    playsInline
                  />
                  <div className="video-card-label">
                    {item.book} {item.chapter_start}
                    {item.chapter_end &&
                      item.chapter_end !== item.chapter_start &&
                      ` – ${item.chapter_end}`}
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/videos" className="view-all-btn">
              View all Videos →
            </Link>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
