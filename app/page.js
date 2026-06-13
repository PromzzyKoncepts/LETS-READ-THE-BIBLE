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
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const card = [];

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
      desc: "Join millions of children to study and learn God's word.",
      cta: "Learn More",
      ctaBg: "#e8eeff",
      ctaColor: "#1a3ab5",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0c0c10;
          --ink-soft: #3a3a46;
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --cream: #faf8f4;
          --white: #ffffff;
          --blue-deep: #0a2a6e;
          --blue-mid: #1565c0;
          --radius-lg: 20px;
          --radius-pill: 999px;
        }

        .home-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* ─── HERO ─────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 7rem 1.5rem 5rem;
        }

        .hero-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 30%;
          z-index: 0;
          will-change: transform;
        }

        /* Multi-layer overlay for clean text legibility */
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(to bottom,
              rgba(8, 6, 20, 0.78) 0%,
              rgba(8, 6, 20, 0.55) 50%,
              rgba(8, 6, 20, 0.82) 100%
            );
        }

        /* Subtle grain texture */
        .hero-grain {
          position: absolute; inset: 0; z-index: 2;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* Thin gold rule at very top */
        .hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          z-index: 10;
        }

        .hero-content {
          position: relative; z-index: 3;
          max-width: 820px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
          animation: heroFadeUp .9s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          border: 1px solid rgba(201,168,76,.35);
          border-radius: var(--radius-pill);
          padding: .4rem 1.1rem;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--gold-light);
          backdrop-filter: blur(10px);
          background: rgba(201,168,76,.06);
          animation: heroFadeUp .9s .1s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 1.0;
          color: var(--white);
          letter-spacing: -.01em;
          animation: heroFadeUp .9s .18s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
          font-weight: 300;
        }

        .hero-subtitle {
          font-size: clamp(.9rem, 2vw, 1.1rem);
          font-weight: 300;
          color: rgba(255,255,255,.62);
          line-height: 1.75;
          max-width: 520px;
          animation: heroFadeUp .9s .26s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-divider {
          width: 40px;
          height: 1px;
          background: rgba(201,168,76,.45);
          animation: heroFadeUp .9s .3s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .85rem;
          justify-content: center;
          animation: heroFadeUp .9s .36s cubic-bezier(.22,1,.36,1) both;
        }

        /* Gold primary CTA */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          background: var(--gold);
          color: #1a1200;
          padding: .85rem 2.1rem;
          border-radius: var(--radius-pill);
          font-size: .88rem;
          font-weight: 600;
          letter-spacing: .03em;
          text-decoration: none;
          transition: background .2s, transform .18s, box-shadow .18s;
          box-shadow: 0 6px 28px rgba(201,168,76,.35);
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(201,168,76,.45);
        }

        /* Ghost secondary CTA */
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          border: 1px solid rgba(255,255,255,.28);
          color: rgba(255,255,255,.85);
          padding: .85rem 1.9rem;
          border-radius: var(--radius-pill);
          font-size: .88rem;
          font-weight: 400;
          letter-spacing: .03em;
          text-decoration: none;
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,.06);
          transition: background .2s, border-color .2s, transform .18s;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,.12);
          border-color: rgba(255,255,255,.45);
          transform: translateY(-2px);
        }

        /* Cert card floating at bottom of hero */
        .hero-cert {
          position: relative; z-index: 3;
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .75rem;
          animation: heroFadeUp .9s .48s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-cert-label {
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.38);
        }

        .hero-cert-link {
          display: block;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 24px 60px rgba(0,0,0,.55),
            0 0 0 1px rgba(201,168,76,.2);
          transition: transform .22s, box-shadow .22s;
          max-width: 320px;
          width: 100%;
        }
        .hero-cert-link:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow:
            0 34px 80px rgba(0,0,0,.6),
            0 0 0 1.5px rgba(201,168,76,.4);
        }

        .hero-cert-link img {
          width: 100%;
          display: block;
          border-radius: 14px;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .4rem;
          animation: heroFadeUp .9s .6s cubic-bezier(.22,1,.36,1) both;
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,.4), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: .4; transform: scaleY(1); }
          50%       { opacity: .9; transform: scaleY(1.2); }
        }
        .hero-scroll-text {
          font-size: .62rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        /* ─── TAB STRIP ──────────────────────────── */
        /* Tab component rendered as-is */

        /* ─── MEMORY VERSE ────────────────────────── */
        .mv-section {
          position: relative;
          background: var(--blue-deep);
          padding: 6rem 1.5rem;
          overflow: hidden;
        }

        /* Noise texture overlay */
        .mv-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: .04;
          pointer-events: none;
        }

        /* Accent glow */
        .mv-section::after {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(21,101,192,.5) 0%, transparent 70%);
          top: -200px; right: -200px;
          pointer-events: none;
        }

        .mv-inner {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .mv-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          .mv-actions { justify-content: center; }
          .mv-pills { justify-content: center; }
        }

        .mv-cover-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .mv-cover-img {
          width: 100%;
          max-width: 400px;
          border-radius: var(--radius-lg);
          display: block;
          box-shadow:
            0 40px 100px rgba(0,0,0,.55),
            0 0 0 1px rgba(255,255,255,.06);
          transition: transform .3s ease;
        }
        .mv-cover-img:hover { transform: translateY(-6px); }

        .mv-new-badge {
          position: absolute;
          top: -10px; right: 0;
          background: linear-gradient(135deg, var(--gold), #e07b20);
          color: #fff;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: .35rem .9rem;
          border-radius: var(--radius-pill);
          box-shadow: 0 4px 16px rgba(201,168,76,.4);
        }

        .mv-text { display: flex; flex-direction: column; gap: 1.5rem; }

        .mv-label {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          font-size: .7rem;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--gold-light);
          width: fit-content;
        }
        .mv-label::before {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: var(--gold);
        }

        .mv-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          line-height: 1.05;
          color: var(--white);
        }
        .mv-heading em {
          font-style: italic;
          color: var(--gold-light);
        }

        .mv-desc {
          font-size: .95rem;
          line-height: 1.8;
          color: rgba(255,255,255,.6);
          max-width: 420px;
          font-weight: 300;
        }

        .mv-pills {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
        }
        .mv-pill {
          display: flex;
          align-items: center;
          gap: .35rem;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: var(--radius-pill);
          padding: .3rem .85rem;
          font-size: .76rem;
          font-weight: 400;
          color: rgba(255,255,255,.55);
          letter-spacing: .04em;
        }

        .mv-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .85rem;
          margin-top: .25rem;
        }

        .mv-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: var(--gold);
          color: #1a1200;
          padding: .8rem 1.9rem;
          border-radius: var(--radius-pill);
          font-size: .88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(201,168,76,.3);
          transition: background .2s, transform .18s;
        }
        .mv-btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }

        /* ─── VIDEO (memory verse card in hero) ───── */
        .verse-card-section {
          background: var(--cream);
          padding: 5rem 1.5rem;
        }
        .verse-card-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .verse-card-inner { grid-template-columns: 1fr; gap: 2rem; }
        }
        .verse-text { display: flex; flex-direction: column; gap: 1.25rem; }
        .verse-label {
          font-size: .7rem;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--blue-mid);
        }
        .verse-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--ink);
          line-height: 1.1;
        }
        .verse-desc {
          font-size: .92rem;
          line-height: 1.8;
          color: var(--ink-soft);
          font-weight: 300;
        }
        .verse-video-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
          line-height: 0;
        }
        .verse-video-wrap video {
          width: 100%;
          display: block;
        }

        /* ─── CHANNELS SECTION ─────────────────────── */
        .channels-section {
          background: var(--white);
          padding: 5rem 1.5rem;
          border-top: 1px solid rgba(0,0,0,.06);
        }
        .section-header {
          max-width: 1100px;
          margin: 0 auto 3rem;
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .section-label {
          font-size: .7rem;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--blue-mid);
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--ink);
          line-height: 1.1;
        }

        .channels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .channel-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,.08);
          transition: transform .2s, box-shadow .2s;
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .channel-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,.14);
        }
        .channel-card-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
        .channel-card-body {
          padding: 1.1rem 1.25rem 1.4rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }
        .channel-card-title { font-weight: 600; font-size: .92rem; margin: 0; color: inherit; }
        .channel-card-desc { font-size: .82rem; line-height: 1.55; margin: 0; flex: 1; opacity: .7; }
        .channel-card-cta {
          display: inline-block;
          padding: .35rem .9rem;
          border-radius: 8px;
          font-size: .76rem;
          font-weight: 600;
          text-decoration: none;
          width: fit-content;
          margin-top: .4rem;
          transition: opacity .15s;
        }
        .channel-card-cta:hover { opacity: .75; }

        /* ─── VIDEOS SECTION ───────────────────────── */
        .videos-section {
          background: var(--cream);
          padding: 5rem 1.5rem 4rem;
          border-top: 1px solid rgba(0,0,0,.06);
        }
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          max-width: 1100px;
          margin: 2.5rem auto 0;
        }
        .video-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 9/14;
          background: #222;
          box-shadow: 0 4px 16px rgba(0,0,0,.12);
          transition: transform .18s, box-shadow .18s;
          text-decoration: none;
          display: block;
        }
        .video-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,.2);
        }
        .video-card video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .video-card-label {
          position: absolute;
          bottom: .7rem; left: .7rem; right: .7rem;
          background: rgba(10,10,20,.7);
          backdrop-filter: blur(6px);
          border-radius: 8px;
          padding: .4rem .7rem;
          color: #fff;
          font-size: .76rem;
          font-weight: 500;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          margin: 2.5rem auto 0;
          border: 1px solid var(--ink);
          color: var(--ink);
          padding: .75rem 2rem;
          border-radius: var(--radius-pill);
          font-size: .86rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: .04em;
          transition: background .18s, color .18s, transform .14s;
          width: fit-content;
          display: flex;
        }
        .view-all-btn:hover {
          background: var(--ink);
          color: var(--cream);
          transform: translateY(-2px);
        }

        @media (max-width: 540px) {
          .hero-title { font-size: 2.6rem; }
          .hero-cert-link { max-width: 260px; }
          .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
          .hero-actions { flex-direction: column; width: 100%; max-width: 320px; }
        }
      `}</style>

      <div className="home-root">
        {/* ─── HERO ─── */}
        <section className="hero">
          <img
            src="/images/letsreadthebible.jpg"
            alt=""
            className="hero-bg"
            aria-hidden="true"
          />
          <div className="hero-overlay" />
          <div className="hero-grain" />

          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Let`s Read the Bible Campaign
            </span>

            <h1 className="hero-title">
               God`s Word  
              <br />
              <em>is for YOU!</em>
            </h1>

            <div className="hero-divider" />

            <p className="hero-subtitle">
             Join millions of children reading the Bible every day. 
              Read. Learn. Grow. Build amazing character, and faith that wins - one verse at a time! 
            </p>

            <div className="hero-actions">
              <Link href="/bible-videos" className="btn-primary">
                Watch Bible Videos
              </Link>
              <Link href="/videos" className="btn-ghost">
                Explore Campaign →
              </Link>
            </div>
          </div>

          {/* Certificate download — preserved */}
          {/* <div className="hero-cert hidden">
            <span className="hero-cert-label">
              Download your certificate &amp; badge
            </span>
            <Link
              href="https://lovetoons.org/certificate.php"
              className="hero-cert-link"
              rel="noopener noreferrer"
            >
              <Image
                src="https://lovetoons.org/img/LBRF_Certificate_LBRF%20Participation(1).png"
                alt="LBRF Participation Certificate"
                width={600}
                height={450}
                style={{ borderRadius: 14 }}
              />
            </Link>
          </div> */}

          <div className="hero-scroll" aria-hidden="true">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-text">Scroll</span>
          </div>
        </section>

        {/* ─── TAB ─── */}
        <Tab />

        {/* ─── SWIPER BAND ─── */}
        <Swiper carousels={card} />

        {/* ─── KIDS MEMORY VERSE VIDEO ─── */}
        <section className="verse-card-section">
          <div className="verse-card-inner">
            <div className="verse-text">
              <span className="verse-label">Featured</span>
              <h2 className="verse-heading">
                Kids
                <br />
                Memory Verse
              </h2>
              <p className="verse-desc">
                Helping children learn God`s Word through
                engaging, memorable video content.
              </p>
            </div>
            <div className="verse-video-wrap">
              <video
                src="https://cdn1.kingschat.online/uploads/media/53d9893773312e341fb91400/aHpqeUFiNVVpSUltWUY2cGJMVUpudz09/You_Are_Called_To_Lead_Full_Video_-1.m4v"
                width={400}
                height={400}
                controls
                loop={false}
                playsInline
              />
            </div>
          </div>
        </section>

        {/* ─── LEARN A MEMORY VERSE FEATURE ─── */}
        <section className="mv-section">
          <div className="mv-inner">
            <div className="mv-cover-wrap">
              <Image
                src="/images/pics/Cover_Page.jpg"
                alt="Learn a Memory Verse"
                width={420}
                height={560}
                className="mv-cover-img"
              />
              <span className="mv-new-badge">✨ New Feature</span>
            </div>

            <div className="mv-text">
              <span className="mv-label">Interactive Learning</span>
              <h2 className="mv-heading">
                Learn A<br />
                <em>Memory Verse</em>
              </h2>
              <p className="mv-desc">
                Learn and keep God`s Word in your heart. Our interactive memory
                verse feature makes scripture memorization fun, engaging, and
                rewarding for children of all ages.
              </p>
              <div className="mv-pills">
                <span className="mv-pill">🎯 Interactive</span>
                <span className="mv-pill">🧒 Kids Friendly</span>
                <span className="mv-pill">📱 Works on any device</span>
              </div>
              <div className="mv-actions">
                <Link
                  href="https://letsreadthebible.club/learn-a-verse"
                  className="mv-btn-primary"
                  rel="noopener noreferrer"
                >
                  Start Learning →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CHANNELS ─── */}
        <section className="channels-section hidden" style={{ display: "none" }}>
          <div className="section-header">
            <span className="section-label">Explore Content</span>
            <h2 className="section-title">Our Video Channels</h2>
          </div>
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
            <div className="section-header">
              <span className="section-label">Community</span>
              <h2 className="section-title">Featured Readings</h2>
            </div>
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
