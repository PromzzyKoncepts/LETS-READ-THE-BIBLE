/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdEmergencyRecording } from "react-icons/md";
import { IoPersonCircleSharp, IoShareSocialSharp } from "react-icons/io5";
import { IoMdCloudUpload, IoMdCloudDownload } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";
import Footer from "/app/components/Footer";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Swiper from "../components/Swiper";

const Page = () => {
  const [user, setUser] = useState(null);
  const [viewAvatar, setViewAvatar] = useState(false);
  const [viewPicture, setViewPicture] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const card = [
    { title: "fiesta 4", src: "/images/LBRF_4_0.png" },
    { title: "fiesta 1", src: "/images/LBRF_3yy.png" },
    { title: "fiesta 3", src: "/images/LBRF_3_1.png" },
    { title: "fiesta 2", src: "/images/LBRF_3_0.png" },
  ];

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    const imgFolder = zip.folder("cards");
    try {
      for (const item of card) {
        const response = await fetch(item.src);
        const blob = await response.blob();
        imgFolder.file(`${item.title}.png`, blob, { binary: true });
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "fiesta-cards.zip");
    } catch (error) {
      console.error("Error downloading images:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
      const hasPopupBeenShown = sessionStorage.getItem("hasPopupBeenShown");
      if (!hasPopupBeenShown) {
        setViewAvatar(true);
        sessionStorage.setItem("hasPopupBeenShown", "true");
      }
    }
  }, []);

  const actions = [
    {
      href: "/avatar",
      icon: <IoPersonCircleSharp size={22} />,
      label: "Create fiesta avatar",
      gradient: "linear-gradient(135deg, #FFCDB4 0%, #ED6073 100%)",
      textColor: "#4a1520",
    },
    {
      href: "/lbrf/picture",
      icon: <IoMdCloudUpload size={22} />,
      label: "Upload Bible reading picture",
      gradient: "linear-gradient(135deg, #EA8937 0%, #F8C254 100%)",
      textColor: "#3d2200",
    },
    {
      href: "/fiesta/upload",
      icon: <IoMdCloudUpload size={22} />,
      label: "Select a chapter",
      gradient: "linear-gradient(135deg, #c7c7e0 0%, #8E8EB1 100%)",
      textColor: "#1e1e3a",
    },
    {
      href: "/fiesta/upload",
      icon: <IoMdCloudUpload size={22} />,
      label: "Upload now",
      gradient: "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
      textColor: "#052e0e",
    },
    {
      href: "/record",
      icon: <MdEmergencyRecording size={22} />,
      label: "Record and Read",
      gradient: "linear-gradient(135deg, #0081EE 0%, #88CEDF 100%)",
      textColor: "#001e3d",
    },
    {
      href: "/lbrf",
      icon: <RiLoginCircleFill size={22} />,
      label: "Register a friend",
      gradient: "linear-gradient(135deg, #d946ef 0%, #a21caf 100%)",
      textColor: "#fff",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Schoolbell&display=swap');

        .fiesta-root {
          font-family: 'DM Sans', sans-serif;
          background: #f0ede6;
          min-height: 100vh;
        }

        /* ── MODALS ── */
        .fiesta-overlay {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(12,12,26,0.6);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .fiesta-dialog {
          background: #fff;
          border-radius: 22px;
          padding: 2.25rem 2rem;
          max-width: 430px; width: 100%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(0,0,0,0.3);
          animation: popIn .3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes popIn {
          from { transform: scale(0.88) translateY(16px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .fiesta-dialog-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #c8851f;
          letter-spacing: 2px;
          margin: 0 0 .4rem;
        }
        .fiesta-dialog p { color: #555; font-size: .92rem; line-height: 1.6; margin: 0 0 1.5rem; }
        .fiesta-dialog-actions { display: flex; gap: .65rem; justify-content: center; flex-wrap: wrap; }
        .fbtn-ghost {
          border: 2px solid #0c0c1a; background: transparent; color: #0c0c1a;
          border-radius: 999px; padding: .55rem 1.25rem;
          font-size: .85rem; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s, color .18s;
        }
        .fbtn-ghost:hover { background: #0c0c1a; color: #fff; }
        .fbtn-dark {
          background: #0c0c1a; color: #f5c257;
          border: 2px solid #0c0c1a;
          border-radius: 999px; padding: .55rem 1.25rem;
          font-size: .85rem; font-weight: 600; cursor: pointer;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background .18s;
        }
        .fbtn-dark:hover { background: #1e1e3a; }

        /* ── HERO BANNER ── */
        .fiesta-hero {
          position: relative;
          overflow: hidden;
          border-radius: 0 0 28px 28px;
          margin-bottom: 2.5rem;
        }
        .fiesta-hero-img {
          width: 100%; height: 240px;
          object-fit: cover; display: block;
        }
        @media (min-width: 768px) { .fiesta-hero-img { height: 340px; } }
        .fiesta-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(12,12,26,.75) 0%, rgba(12,12,26,.2) 60%, transparent 100%);
        }
        .fiesta-hero-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1.75rem;
        }
        .fiesta-hero-kicker {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 500;
          color: #f5c257;
          text-transform: uppercase; letter-spacing: .14em;
          margin: 0 0 .3rem;
        }
        .fiesta-hero-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 300;
          color: rgba(255,255,255,.7);
          margin: 0 0 .15rem;
          font-style: italic;
        }
        .fiesta-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.2rem);
          color: #fff;
          letter-spacing: 2px;
          line-height: 1;
          margin: 0 0 .4rem;
        }
        .fiesta-hero-sub {
          font-size: .82rem; color: rgba(255,255,255,.65);
          font-weight: 300; margin: 0;
        }
        .fiesta-hero-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(200,133,31,.9);
          color: #fff;
          border-radius: 999px; padding: .3rem .85rem;
          font-size: .75rem; font-weight: 600;
          letter-spacing: .04em;
          margin-bottom: .6rem;
        }
        .fiesta-hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #fff; opacity: .7;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }

        /* ── LAYOUT ── */
        .fiesta-body {
          padding: 0 1.25rem 3rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .fiesta-body {
            padding: 0 2.5rem 4rem;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 2.5rem;
            align-items: start;
          }
        }

        /* ── CONTENT ── */
        .fiesta-content {}
        .fiesta-event-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: #0c0c1a;
          letter-spacing: 2px;
          line-height: 1;
          margin: 0 0 .3rem;
        }
        .fiesta-event-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: #d9340f;
          letter-spacing: 1.5px;
          margin: 0 0 1rem;
        }

        /* Mobile swiper + download */
        .fiesta-mobile-media { margin-bottom: 1rem; }
        .btn-download-mobile {
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          background: #0c0c1a; color: #f5c257;
          border-radius: 10px; padding: .7rem 1.5rem;
          font-size: .85rem; font-weight: 600;
          border: none; cursor: pointer; width: 100%;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1.25rem;
          transition: background .18s;
        }
        .btn-download-mobile:hover { background: #1e1e3a; }
        .btn-download-mobile:disabled { opacity: .55; cursor: not-allowed; }

        .fiesta-prose p {
          color: #444;
          font-size: .92rem;
          line-height: 1.8;
          margin: 0 0 .85rem;
        }
        .fiesta-prose .highlight {
          color: #1565c0;
          font-weight: 500;
          font-size: .95rem;
        }
        .fiesta-verse {
          border-left: 3px solid #c8851f;
          padding: .6rem 1rem;
          margin: 1rem 0 1.25rem;
          background: rgba(200,133,31,.06);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #5a3e10;
          font-size: .88rem;
          line-height: 1.7;
        }

        /* ── SIDEBAR ACTIONS ── */
        .fiesta-sidebar {}
        .fiesta-sidebar-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 1.5px;
          color: #888; margin: 0 0 .85rem;
          text-transform: uppercase;
        }
        .fiesta-actions { display: flex; flex-direction: column; gap: .65rem; margin-bottom: 1.75rem; }

        .action-card {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem;
          border-radius: 14px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: .875rem; font-weight: 600;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 4px 14px rgba(0,0,0,.12);
          position: relative;
          overflow: hidden;
        }
        .action-card::after {
          content: '→';
          position: absolute; right: 1rem;
          opacity: .45;
          font-size: .85rem;
        }
        .action-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.18); }
        .action-card:active { transform: translateY(0); }
        .action-card-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: rgba(255,255,255,.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── BANNER CTA ── */
        .fiesta-banner-cta {
          border-radius: 18px;
          overflow: hidden;
          margin-top: 2.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.15);
        }
        .fiesta-banner-cta img { width: 100%; display: block; }

        @media (max-width: 767px) {
          .fiesta-sidebar { margin-top: 2rem; }
          .fiesta-actions { flex-direction: row; flex-wrap: wrap; }
          .action-card { flex: 1 1 calc(50% - .35rem); min-width: 140px; }
          .action-card::after { display: none; }
        }
      `}</style>

      <div className="fiesta-root">
        {/* ── CONGRATS MODAL ── */}
        {viewAvatar && user && (
          <div className="fiesta-overlay">
            <div className="fiesta-dialog">
              <p className="fiesta-dialog-title">Congratulations! 🎉</p>
              <p>
                You successfully registered. Next, we recommend you create your
                Bible Fiesta Avatar to represent you in the reading community.
              </p>
              <div className="fiesta-dialog-actions">
                <button
                  className="fbtn-ghost"
                  onClick={() => {
                    setViewAvatar(false);
                    setViewPicture(true);
                  }}
                >
                  Close
                </button>
                <Link href="/avatar" className="fbtn-dark">
                  Create my avatar
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── UPLOAD PHOTO MODAL ── */}
        {viewPicture && (
          <div className="fiesta-overlay">
            <div className="fiesta-dialog">
              <p className="fiesta-dialog-title">One more thing…</p>
              <p>
                Capture and upload a quick photo of you or your kid(s) reading
                the Bible. It makes a big difference!
              </p>
              <div className="fiesta-dialog-actions">
                <button
                  className="fbtn-ghost"
                  onClick={() => {
                    setViewAvatar(false);
                    setViewPicture(false);
                  }}
                >
                  I've uploaded mine
                </button>
                <Link href="/lbrf/picture" className="fbtn-dark">
                  Upload photo
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── HERO ── */}
        <div className="fiesta-hero">
          <Image
            src="/images/top.png"
            alt="LBRF Hero"
            width={1400}
            height={340}
            className="fiesta-hero-img"
            priority
          />
          <div className="fiesta-hero-overlay" />
          <div className="fiesta-hero-content">
            <div className="fiesta-hero-badge">
              <span className="fiesta-hero-badge-dot" />
              LIVE EVENT
            </div>
            {user ? (
              <>
                {user?.fullName && (
                  <p className="fiesta-hero-name">
                    Dearly Esteemed {user.fullName}
                  </p>
                )}
                <h1 className="fiesta-hero-title">
                  Thank you for registering!
                </h1>
                <p
                  className="fiesta-hero-sub"
                  style={{ fontFamily: "'Schoolbell', cursive" }}
                >
                  You have successfully registered for the Lovetoons Bible
                  Reading Fiesta
                </p>
              </>
            ) : (
              <>
                <h1 className="fiesta-hero-title">
                  Kindly register to participate
                </h1>
                <p className="fiesta-hero-sub">
                  <Link
                    href="/lbrf"
                    style={{ color: "#f5c257", textDecoration: "underline" }}
                  >
                    Click here to register
                  </Link>{" "}
                  for the Lovetoons Bible Reading Fiesta
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="fiesta-body">
          {/* LEFT: Content */}
          <div className="fiesta-content">
            <h2 className="fiesta-event-title">
              Lovetoons Bible Reading Fiesta
            </h2>
            <h3 className="fiesta-event-sub">
              A 72-HR Bible Reading Rendezvous
            </h3>

            {/* Mobile swiper */}
            <div className="fiesta-mobile-media md:hidden">
              <Swiper carousels={card} />
            </div>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="btn-download-mobile md:hidden"
            >
              <IoMdCloudDownload size={18} />
              {isDownloading ? "Downloading…" : "Download all Publicity Cards"}
            </button>

            <div className="fiesta-prose">
              <p>
                <span className="highlight">
                  Don't just register, take up the mantle —
                </span>{" "}
                Join millions of children around the world in a meaningful
                journey to read the Bible.
              </p>
              <p>
                The Lovetoons Bible Reading Fiesta is an inspiring campaign
                aimed at engaging children everywhere to read the Bible. This is
                more than just reading; it's about instilling a consciousness of
                the Bible while fostering a love for the Bible in their hearts.
              </p>
              <div className="fiesta-verse">
                "Start children off on the way they should go, and even when
                they are old, they will not turn from it." — Proverbs 22:6
              </div>
              <p>
                Through this wonderful program, children can read a chapter of
                the Old Testament, record themselves, and share their readings
                with millions of other children — learning inspiring truths and
                engaging with the profound messages of faith, hope, and love.
              </p>
              <p>
                Let's come together to guide our kids on this beautiful journey,
                helping them to discover the love of our Lord Jesus Christ and
                the amazing person of the Holy Spirit. Your involvement can make
                a lasting difference in their lives!
              </p>
            </div>

            {/* Banner CTA */}
            <div className="fiesta-banner-cta">
              <Link href="/lbrf">
                <Image
                  src="/images/LBRF-SEPT-Banner-1.png"
                  alt="sponsor LBR"
                  width={1000}
                  height={300}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Link>
            </div>
          </div>

          {/* RIGHT: Sidebar actions */}
          <div className="fiesta-sidebar">
            <p className="fiesta-sidebar-title">Quick actions</p>
            <div className="fiesta-actions">
              {actions.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="action-card"
                  style={{ background: a.gradient, color: a.textColor }}
                >
                  <span className="action-card-icon">{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>

            {/* Desktop download */}
            <p className="fiesta-sidebar-title" style={{ marginTop: "1.5rem" }}>
              Publicity cards
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".6rem",
                marginBottom: "1rem",
              }}
            >
              {card.map((item) => (
                <div
                  key={item.title}
                  style={{
                    position: "relative",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <a
                    href={item.src}
                    download={item.title}
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: "rgba(0,0,0,.55)",
                      borderRadius: "50%",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <IoMdCloudDownload size={16} />
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".5rem",
                background: "#0c0c1a",
                color: "#f5c257",
                borderRadius: 10,
                padding: ".7rem 1rem",
                fontSize: ".82rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                width: "100%",
                fontFamily: "'DM Sans', sans-serif",
                opacity: isDownloading ? 0.55 : 1,
                transition: "background .18s",
              }}
            >
              <IoMdCloudDownload size={16} />
              {isDownloading ? "Downloading…" : "Download all cards"}
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
