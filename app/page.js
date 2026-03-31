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
  const [leaderboard, setLeaderboard] = useState({
    male: 0,
    female: 0,
    total: 0,
    loading: true,
  });

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

  useEffect(() => {
    axios
      .get("https://lovetoons.org/php/leading.php")
      .then((res) => setLeaderboard({ ...res.data, loading: false }))
      .catch(() => setLeaderboard((prev) => ({ ...prev, loading: false })));
  }, []);

  const card = [
    {
      title: "Lovetoons Bible Reading Fiesta",
      src: "https://lovetoons.org/img/LBRF_SLIDER_2.jpg",
      link: "https://letsreadthebible.club/lbrf",
    },
    {
      title: "Communion service",
      src: "https://lovetoons.org/img/MAC_SIZE_COMMUNION_SERVICE.png",
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

        /* ─── LEADERBOARD CARD ─────────────────────── */
        .leaderboard-card {
          background: rgba(10, 6, 28, 0.92);
          border-radius: 28px;
          padding: 2rem 1.75rem 2rem;
          box-shadow: 0 30px 70px rgba(0,0,0,.5);
          border: 1px solid rgba(255,255,255,.08);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .lb-bg-glow {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,.25) 0%, transparent 70%);
          top: -80px; right: -80px;
          pointer-events: none;
        }
        .lb-bg-glow2 {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,.15) 0%, transparent 70%);
          bottom: -40px; left: -40px;
          pointer-events: none;
        }
        .lb-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.9rem;
          letter-spacing: 3px;
          color: #fff;
          text-align: center;
          margin: 0;
          line-height: 1;
        }
        .lb-title span { color: #f59e0b; }
        .lb-subtitle {
          text-align: center;
          font-size: .72rem;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: rgba(255,255,255,.4);
          margin-top: .2rem;
        }
        .lb-total-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          border-radius: 20px;
          padding: 1.4rem 1rem;
          box-shadow: 0 8px 28px rgba(124,58,237,.4);
          position: relative;
          overflow: hidden;
        }
        .lb-total-badge::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .lb-total-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          line-height: 1;
          color: #fff;
          letter-spacing: 2px;
        }
        .lb-total-label {
          font-size: .75rem;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: rgba(255,255,255,.6);
          margin-top: .3rem;
        }
        .lb-bar-section { display: flex; flex-direction: column; gap: 1rem; }
        .lb-bar-row { display: flex; flex-direction: column; gap: .4rem; }
        .lb-bar-meta {
          display: flex; justify-content: space-between; align-items: center;
        }
        .lb-bar-name {
          display: flex; align-items: center; gap: .5rem;
          font-weight: 600; font-size: .9rem; color: #e5e7eb;
        }
        .lb-bar-pct {
          font-size: .75rem;
          color: rgba(255,255,255,.4);
          margin-left: .25rem;
        }
        .lb-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem;
          color: #fff;
          letter-spacing: 1px;
        }
        .lb-bar-track {
          height: 14px;
          background: rgba(255,255,255,.07);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .lb-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 1.4s cubic-bezier(.22,1,.36,1);
          position: relative;
        }
        .lb-bar-fill::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: rgba(255,255,255,.2);
          border-radius: 999px 999px 0 0;
        }
        .lb-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,.07);
          margin: 0;
        }
        .lb-race-pill {
          display: flex;
          align-items: center; justify-content: center; gap: .5rem;
          background: rgba(245,158,11,.1);
          border: 1px solid rgba(245,158,11,.22);
          border-radius: 999px;
          padding: .55rem 1.25rem;
          font-size: .8rem;
          font-weight: 600;
          color: #f59e0b;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .lb-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,.04) 0%,
            rgba(255,255,255,.12) 50%,
            rgba(255,255,255,.04) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
          border-radius: 8px;
          color: transparent !important;
          min-width: 80px;
          display: inline-block;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .lb-crown {
          font-size: 1.6rem;
          line-height: 1;
          display: block;
          text-align: center;
          margin-bottom: -.25rem;
        }

        /* ─── VERSE CARD ──────────────────────────── */
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

        /* ─── LEARN A MEMORY VERSE SECTION ─────────── */
        .memory-verse-section {
          position: relative;
          background: linear-gradient(135deg, #0a3d8f 0%, #1565c0 40%, #0d47a1 70%, #051e4f 100%);
          padding: 5rem 1.25rem;
          overflow: hidden;
        }
        .memory-verse-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(255, 215, 0, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(0, 200, 255, 0.1) 0%, transparent 45%),
            radial-gradient(circle at 60% 80%, rgba(255, 100, 50, 0.08) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }
        /* floating star decorations */
        .memory-verse-section::after {
          content: '✦ ✦ ✦ ✦ ✦';
          position: absolute;
          top: 1.5rem; left: 50%; transform: translateX(-50%);
          font-size: .65rem;
          letter-spacing: 1.5rem;
          color: rgba(255, 215, 0, 0.35);
          pointer-events: none;
          z-index: 0;
        }
        .mv-inner {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .mv-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          .mv-actions { justify-content: center; }
          .mv-badge-row { justify-content: center; }
        }

        /* Cover image */
        .mv-cover-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mv-cover-glow {
          position: absolute;
          width: 85%; height: 85%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,.28) 0%, transparent 70%);
          filter: blur(32px);
          pointer-events: none;
        }
        .mv-cover-img {
          position: relative;
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          box-shadow:
            0 30px 80px rgba(0,0,0,.5),
            0 0 0 3px rgba(255,215,0,.25),
            0 0 0 8px rgba(255,215,0,.06);
          display: block;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .mv-cover-img:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 40px 100px rgba(0,0,0,.55),
            0 0 0 3px rgba(255,215,0,.4),
            0 0 0 10px rgba(255,215,0,.1);
        }
        .mv-cover-badge {
          position: absolute;
          top: -12px; right: -10px;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: .85rem;
          letter-spacing: 1.5px;
          padding: .4rem .85rem;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(239,68,68,.5);
          white-space: nowrap;
        }

        /* Text side */
        .mv-text-col { display: flex; flex-direction: column; gap: 1.5rem; }
        .mv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: rgba(255,215,0,.12);
          border: 1px solid rgba(255,215,0,.25);
          border-radius: 999px;
          padding: .35rem 1rem;
          font-size: .72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .15em;
          color: #fcd34d;
          width: fit-content;
        }
        .mv-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          line-height: .95;
          color: #fff;
          margin: 0;
          letter-spacing: 2px;
        }
        .mv-heading em {
          font-style: normal;
          color: #fcd34d;
          display: block;
        }
        .mv-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255,255,255,.75);
          margin: 0;
          max-width: 440px;
        }
        .mv-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
        }
        .mv-pill {
          display: flex;
          align-items: center;
          gap: .35rem;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          padding: .35rem .9rem;
          font-size: .78rem;
          font-weight: 500;
          color: rgba(255,255,255,.8);
        }
        .mv-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: .25rem;
        }
        .mv-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: #fff;
          padding: .85rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: .95rem;
          text-decoration: none;
          letter-spacing: .03em;
          box-shadow: 0 8px 28px rgba(249,115,22,.45);
          transition: transform .18s, box-shadow .18s;
        }
        .mv-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(249,115,22,.55);
        }
        .mv-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: rgba(255,255,255,.1);
          border: 1.5px solid rgba(255,255,255,.25);
          color: #fff;
          padding: .85rem 1.75rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: .95rem;
          text-decoration: none;
          letter-spacing: .03em;
          backdrop-filter: blur(8px);
          transition: background .18s, transform .18s;
        }
        .mv-btn-secondary:hover {
          background: rgba(255,255,255,.18);
          transform: translateY(-3px);
        }
        .mv-btn-icon { font-size: 1.1em; }
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
            {/* <div className="leaderboard">
              <Image
                src={"/images/KINGS.png"}
                alt={"lovetoons bible reading fiesta"}
                width={600}
                height={450}
                className="channel-card-im"
              />
            </div> */}

            {/* ─── LEADERBOARD CARD ─── */}
            <div className="leaderboard-card hidden">
              <div className="lb-bg-glow" />
              <div className="lb-bg-glow2" />
              <div>
                <span className="lb-crown">🏆</span>
                <h2 className="lb-title">
                  LBRF <span>Leaderboard</span>
                </h2>
                <p className="lb-subtitle">Lovetoons Bible Reading Fiesta</p>
              </div>
              {/* Total participants */}
              <div className="lb-total-badge">
                <div
                  className={`lb-total-num${
                    leaderboard.loading ? " lb-shimmer" : ""
                  }`}
                >
                  {leaderboard.loading
                    ? "\u00A0\u00A0\u00A0\u00A0\u00A0"
                    : leaderboard.total.toLocaleString()}
                </div>
                <div className="lb-total-label">Total Participants</div>
              </div>
              <hr className="lb-divider" />
              {/* Gender bars */}
              <div className="lb-bar-section">
                {[
                  {
                    label: "Boys",
                    emoji: "👦",
                    count: leaderboard.male,
                    color: ["#60a5fa", "#2563eb"],
                    pct:
                      leaderboard.total > 0
                        ? (leaderboard.male / leaderboard.total) * 100
                        : 0,
                  },
                  {
                    label: "Girls",
                    emoji: "👧",
                    count: leaderboard.female,
                    color: ["#f472b6", "#db2777"],
                    pct:
                      leaderboard.total > 0
                        ? (leaderboard.female / leaderboard.total) * 100
                        : 0,
                  },
                ].map(({ label, emoji, count, color, pct }) => (
                  <div className="lb-bar-row" key={label}>
                    <div className="lb-bar-meta">
                      <span className="lb-bar-name">
                        {emoji} {label}
                        {!leaderboard.loading && leaderboard.total > 0 && (
                          <span className="lb-bar-pct">
                            ({pct.toFixed(1)}%)
                          </span>
                        )}
                      </span>
                      <span
                        className={`lb-bar-count${
                          leaderboard.loading ? " lb-shimmer" : ""
                        }`}
                      >
                        {leaderboard.loading
                          ? "\u00A0\u00A0\u00A0\u00A0"
                          : count.toLocaleString()}
                      </span>
                    </div>
                    <div className="lb-bar-track">
                      <div
                        className="lb-bar-fill"
                        style={{
                          width: leaderboard.loading ? "0%" : `${pct}%`,
                          background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <hr className="lb-divider" />
              <Link href="/lbrf" className="view-all-btn">
                Register for Lovetoons Bible Reading Fiesta →
              </Link>
              <div className="lb-race-pill">📖 Read A Chapter Everyday</div>
            </div>

            {/* ─── Memory Verse ─── */}
            <div className="verse-card">
              <div className="verse-card-header">
                <h2>Kids Memory Verse</h2>
              </div>
              <video
                src="https://cdn1.kingschat.online/uploads/media/53a9b55073312e7f0c012900/WG1yd3pLelp0NGVWMjI3ViszWEFoQT09/MATHEW_3_1_2.mp4"
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
        <Swiper carousels={card} />

        {/* ─── LEARN A MEMORY VERSE FEATURE SECTION ─── */}
        <section className="memory-verse-section">
          <div className="mv-inner">
            {/* Cover image */}
            <div className="mv-cover-wrap">
              <div className="mv-cover-glow" />
              <Image
                src="/images/pics/Cover_Page.jpg"
                alt="Learn a Memory Verse"
                width={420}
                height={560}
                className="mv-cover-img"
              />
              <span className="mv-cover-badge">✨ NEW FEATURE</span>
            </div>

            {/* Text content */}
            <div className="mv-text-col">
              <span className="mv-eyebrow">📖 Featured</span>
              <h2 className="mv-heading">
                Learn A<em>Memory Verse</em>
              </h2>
              <p className="mv-desc">
                Learn and keep God’s Word in your hearts! Our interactive memory
                verse feature makes scripture memorization fun, engaging, and
                rewarding for children of all ages.
              </p>

              <div className="mv-badge-row">
                <span className="mv-pill">🎯 Interactive</span>
                <span className="mv-pill">🧒 Kids Friendly</span>
                <span className="mv-pill">📱 Mobile Ready</span>
              </div>

              <div className="mv-actions">
                <Link
                  href="https://letsreadthebible.club/learn-a-verse"
                  className="mv-btn-primary"
                  rel="noopener noreferrer"
                >
                  <span className="mv-btn-icon">🚀</span>
                  Start Learning
                </Link>
                {/* <a
                  href="https://letsreadthebible.club/learn-a-verse"
                  download
                  className="mv-btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mv-btn-icon">⬇️</span>
                  Download
                </a> */}
              </div>
            </div>
          </div>
        </section>

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
