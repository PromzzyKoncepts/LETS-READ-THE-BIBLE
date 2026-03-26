"use client";
import { useState } from "react";
const images = [
  {
    id: 1,
    src: "/imgages/pics/0.png",
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_0.png", // optional
    alt: "Memory Verse 1",
    title: "Rejoice in the Lord Always",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
  {
    id: 2,
    src: "/imgages/pics/1.png", // thumbnail
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_1.png", // download file
    alt: "Memory Verse 2",
    title: "Shepherd",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
  {
    id: 3,
    src: "/imgages/pics/2.png", // thumbnail
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_2.png", // download file
    alt: "Memory Verse 2",
    title: "Obedience",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
  {
    id: 4,
    src: "/imgages/pics/3.png", // thumbnail
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_3.png", // download file
    alt: "Memory Verse",
    title: "I can do all things",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
  {
    id: 5,
    src: "/imgages/pics/4.png", // thumbnail
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_4.png", // download file
    alt: "Memory Verse 2",
    title: "Be Kind",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
  {
    id: 5,
    src: "/imgages/pics/5.png", // thumbnail
    link: "/imgages/pics/Memory_Verse_sheet_for_LBRF_page_5.png", // download file
    alt: "Memory Verse 2",
    title: "Light",
    description:
      "A vibrant verse card designed to inspire young hearts and minds.",
  },
];

export default function MemoryVersePage() {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [downloadForm, setDownloadForm] = useState({ name: "", email: "" });
  const [learningForm, setLearningForm] = useState({
    name: "",
    email: "",
    learning: "",
  });
  const [downloadState, setDownloadState] = useState("idle"); // idle | loading | success | error
  const [learningState, setLearningState] = useState("idle");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownloadSubmit = async () => {
    if (!downloadForm.name || !downloadForm.email) return;
    setDownloadState("loading");
    try {
      const res = await fetch(
        "https://lovetoons.org/api/download-memory-verse.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: downloadForm.name,
            email: downloadForm.email,
          }),
        }
      );
      // if (res.ok) {
      //   setDownloadState("success");
      //   // trigger actual download of all images
      //   images.forEach((img) => {
      //     const a = document.createElement("a");
      //     a.href = img.src;
      //     a.download = img.alt;
      //     a.click();
      //   });
      //   setTimeout(() => {
      //     setShowDownloadModal(false);
      //     setDownloadState("idle");
      //     setDownloadForm({ name: "", email: "" });
      //   }, 2000);
      // } else {
      //   setDownloadState("error");
      // }

      if (res.ok) {
        setDownloadState("success");

        // trigger actual download of all images
        images.forEach((img) => {
          const a = document.createElement("a");
          a.href = img.link || img.src; // use download link, fallback to src
          a.download = img.alt;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });

        setTimeout(() => {
          setShowDownloadModal(false);
          setDownloadState("idle");
          setDownloadForm({ name: "", email: "" });
        }, 2000);
      } else {
        setDownloadState("error");
      }
    } catch {
      setDownloadState("error");
    }
  };

  const handleLearningSubmit = async () => {
    if (!learningForm.name || !learningForm.email || !learningForm.learning)
      return;
    setLearningState("loading");
    try {
      const res = await fetch(
        "https://lovetoons.org/api/learning-memory-verse.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(learningForm),
        }
      );
      if (res.ok) {
        setLearningState("success");
        setTimeout(() => {
          setLearningState("idle");
          setLearningForm({ name: "", email: "", learning: "" });
        }, 3000);
      } else {
        setLearningState("error");
      }
    } catch {
      setLearningState("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Sniglet&family=Manrope:wght@400;600;700&display=swap');

        :root {
          --sun: #FFD93D;
          --sky: #1B4F8A;
          --sky-light: #2A6EC5;
          --cloud: #F0F7FF;
          --warm: #FF6B35;
          --grass: #4CAF50;
          --white: #ffffff;
          --ink: #1a1a2e;
          --card-bg: rgba(255,255,255,0.92);
          --radius: 20px;
        }

        .mvp-wrapper {
          font-family: 'Manrope', sans-serif;
          color: var(--ink);
          background: var(--cloud);
          min-height: 100vh;
        }

        /* ── HERO ── */
        .mvp-hero {
          min-height: 30vh;
          background: linear-gradient(135deg, var(--sky) 0%, var(--sky-light) 60%, #3a8fd4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .mvp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 80%, rgba(255,217,61,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.13) 0%, transparent 50%);
        }
        .mvp-hero-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .mvp-hero-stars span {
          position: absolute;
          font-size: 1.2rem;
          animation: twinkle 3s ease-in-out infinite alternate;
          opacity: 0.6;
        }
        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(0.9); }
          to   { opacity: 0.9; transform: scale(1.1); }
        }
        .mvp-hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
        }
        .mvp-hero-badge {
          display: inline-block;
          background: var(--sun);
          color: var(--sky);
          font-family: 'Sniglet', cursive;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          margin-bottom: 1rem;
          font-weight: 800;
        }
        .mvp-hero h1 {
          font-family: 'Luckiest Guy', cursive;
          font-size: clamp(2rem, 5vw, 3.6rem);
          color: var(--white);
          line-height: 1.1;
          letter-spacing: 0.02em;
          text-shadow: 0 4px 18px rgba(0,0,0,0.25);
          margin: 0 0 0.75rem;
        }
        .mvp-hero h1 span { color: var(--sun); }
        .mvp-hero p {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.85);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── MAIN CONTENT ── */
        .mvp-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .mvp-content { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* ── LEFT COLUMN ── */
        .mvp-left {}
        .mvp-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: 0 8px 40px rgba(27,79,138,0.12);
          overflow: hidden;
        }
        .mvp-main-image-wrap {
          position: relative;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #dbeafe, #e0f2fe);
          overflow: hidden;
        }
        .mvp-main-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .mvp-main-image-wrap:hover img { transform: scale(1.03); }
        .mvp-image-label {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(27,79,138,0.85);
          color: white;
          font-family: 'Sniglet', cursive;
          font-size: 0.82rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .mvp-image-info {
          padding: 1.25rem 1.5rem 1rem;
        }
        .mvp-image-info h3 {
          font-family: 'Sniglet', cursive;
          font-size: 1.1rem;
          color: var(--sky);
          margin: 0 0 0.35rem;
        }
        .mvp-image-info p {
          font-size: 0.88rem;
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        /* thumbnails */
        .mvp-thumbs {
          display: flex;
          gap: 0.6rem;
          padding: 0 1.5rem 1.25rem;
          flex-wrap: wrap;
        }
        .mvp-thumb {
          width: 62px;
          height: 62px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: border-color 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .mvp-thumb.active { border-color: var(--warm); transform: scale(1.08); }
        .mvp-thumb:hover:not(.active) { border-color: var(--sky-light); }
        .mvp-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* thumb placeholder (no image) */
        .mvp-thumb-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sniglet', cursive;
          font-size: 0.7rem;
          color: var(--sky);
          text-align: center;
        }

        /* download button */
        .mvp-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 1.5rem 1.5rem;
          background: linear-gradient(135deg, var(--warm) 0%, #e8501f 100%);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 0.85rem 1.5rem;
          font-family: 'Sniglet', cursive;
          font-size: 1rem;
          cursor: pointer;
          width: calc(100% - 3rem);
          box-shadow: 0 4px 18px rgba(255,107,53,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .mvp-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,107,53,0.45);
        }
        .mvp-download-btn:active { transform: translateY(0); }

        /* ── RIGHT COLUMN ── */
        .mvp-right {}
        .mvp-form-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: 0 8px 40px rgba(27,79,138,0.10);
          padding: 2rem 1.75rem;
        }
        .mvp-form-title {
          font-family: 'Luckiest Guy', cursive;
          font-size: 1.6rem;
          color: var(--sky);
          margin: 0 0 0.4rem;
          letter-spacing: 0.02em;
        }
        .mvp-form-subtitle {
          font-size: 0.9rem;
          color: #667;
          margin: 0 0 1.5rem;
          line-height: 1.5;
        }

        .mvp-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.1rem;
        }
        .mvp-field label {
          font-family: 'Sniglet', cursive;
          font-size: 0.85rem;
          color: var(--sky);
          font-weight: 700;
        }
        .mvp-field input,
        .mvp-field textarea {
          padding: 0.75rem 1rem;
          border: 2px solid #d1e4f7;
          border-radius: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.95rem;
          color: var(--ink);
          background: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }
        .mvp-field input:focus,
        .mvp-field textarea:focus {
          border-color: var(--sky-light);
          box-shadow: 0 0 0 3px rgba(42,110,197,0.12);
        }
        .mvp-field textarea { min-height: 130px; }

        .mvp-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--sky) 0%, var(--sky-light) 100%);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 0.9rem 1.5rem;
          font-family: 'Sniglet', cursive;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          box-shadow: 0 4px 18px rgba(27,79,138,0.25);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .mvp-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(27,79,138,0.35); }
        .mvp-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .mvp-status {
          text-align: center;
          font-family: 'Sniglet', cursive;
          font-size: 0.9rem;
          margin-top: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        .mvp-status.success { background: #dcfce7; color: #166534; }
        .mvp-status.error   { background: #fee2e2; color: #991b1b; }

        /* ── MODAL ── */
        .mvp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,20,50,0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        .mvp-modal {
          background: white;
          border-radius: 24px;
          padding: 2.25rem 2rem;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 24px 80px rgba(0,0,0,0.25);
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(24px); opacity:0 } to { transform:none; opacity:1 } }
        .mvp-modal-icon {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .mvp-modal h2 {
          font-family: 'Luckiest Guy', cursive;
          color: var(--sky);
          text-align: center;
          font-size: 1.55rem;
          margin: 0 0 0.4rem;
        }
        .mvp-modal p {
          text-align: center;
          color: #555;
          font-size: 0.9rem;
          margin: 0 0 1.5rem;
          line-height: 1.5;
        }
        .mvp-modal-actions {
          display: flex;
          gap: 0.75rem;
          flex-direction: column;
        }
        .mvp-modal-cancel {
          background: none;
          border: 2px solid #d1d5db;
          color: #666;
          border-radius: 999px;
          padding: 0.7rem;
          font-family: 'Sniglet', cursive;
          cursor: pointer;
          transition: background 0.15s;
        }
        .mvp-modal-cancel:hover { background: #f3f4f6; }

        /* spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* placeholder image fallback */
        .mvp-img-fallback {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--sky);
        }
        .mvp-img-fallback span { font-family: 'Sniglet', cursive; font-size: 0.9rem; opacity: 0.7; }
      `}</style>

      <div className="mvp-wrapper">
        {/* HERO */}
        <section className="mvp-hero">
          <div className="mvp-hero-stars" aria-hidden>
            {[
              ["⭐", "12%", "18%", "0s"],
              ["✨", "75%", "25%", "0.8s"],
              ["🌟", "40%", "70%", "1.5s"],
              ["⭐", "88%", "60%", "0.4s"],
              ["✨", "5%", "55%", "1.1s"],
            ].map(([e, l, t, d], i) => (
              <span key={i} style={{ left: l, top: t, animationDelay: d }}>
                {e}
              </span>
            ))}
          </div>
          <div className="mvp-hero-content">
            <div className="mvp-hero-badge">
              📖 Let&apos;s Read the Bible Campaign
            </div>
            <h1>
              Memory <span>Verse</span> Cards
            </h1>
            <p>
              Download beautiful illustrated scripture cards, share them with
              friends, and tell us what God is teaching you through His Word!
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="mvp-content">
          {/* LEFT: Image Viewer */}
          <div className="mvp-left">
            <div className="mvp-card">
              {/* Main image */}
              <div className="mvp-main-image-wrap">
                <ImageWithFallback
                  src={activeImage.src}
                  alt={activeImage.alt}
                />
                <div className="mvp-image-label">📌 {activeImage.title}</div>
              </div>

              {/* Info */}
              <div className="mvp-image-info">
                <h3>{activeImage.title}</h3>
                <p>{activeImage.description}</p>
              </div>

              {/* Thumbnails */}
              <div className="mvp-thumbs">
                {images.map((img) => (
                  <button
                    key={img.id}
                    className={`mvp-thumb${
                      activeImage.id === img.id ? " active" : ""
                    }`}
                    onClick={() => setActiveImage(img)}
                    title={img.title}
                    style={{ border: "none", padding: 0, background: "none" }}
                  >
                    <div className="mvp-thumb-placeholder">
                      <span>{img.title.split("–")[1]?.trim() || img.id}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Download button */}
              <button
                className="mvp-download-btn"
                onClick={() => setShowDownloadModal(true)}
              >
                <span>⬇️</span> Download All Verse Cards
              </button>
            </div>
          </div>

          {/* RIGHT: Learning Form */}
          <div className="mvp-right">
            <div className="mvp-form-card">
              <div className="mvp-form-title">What Did You Learn? 💡</div>
              <p className="mvp-form-subtitle">
                Share what God taught you through this memory verse. Your story
                encourages others!
              </p>

              <div className="mvp-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Adaeze or Tunde"
                  value={learningForm.name}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="mvp-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={learningForm.email}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <div className="mvp-field">
                <label>What did you learn? ✍️</label>
                <textarea
                  placeholder="Share what this verse means to you, how it changed your day, or what God spoke to your heart..."
                  value={learningForm.learning}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, learning: e.target.value }))
                  }
                />
              </div>

              <button
                className="mvp-submit-btn"
                onClick={handleLearningSubmit}
                disabled={learningState === "loading"}
              >
                {learningState === "loading" ? (
                  <>
                    <span className="spinner" /> Sharing...
                  </>
                ) : learningState === "success" ? (
                  "🎉 Shared!"
                ) : (
                  <>
                    <span>🙏</span> Share My Learning
                  </>
                )}
              </button>

              {learningState === "success" && (
                <div className="mvp-status success">
                  🎉 Thank you! Your learning has been shared.
                </div>
              )}
              {learningState === "error" && (
                <div className="mvp-status error">
                  😢 Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div
          className="mvp-modal-overlay"
          onClick={() => setShowDownloadModal(false)}
        >
          <div className="mvp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mvp-modal-icon">📥</div>
            <h2>Download All Cards</h2>
            <p>
              Enter your details and we&apos;ll send you all the memory verse
              cards. They&apos;re totally free!
            </p>

            <div className="mvp-field">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Adaeze or Tunde"
                value={downloadForm.name}
                onChange={(e) =>
                  setDownloadForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="mvp-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={downloadForm.email}
                onChange={(e) =>
                  setDownloadForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>

            <div className="mvp-modal-actions">
              <button
                className="mvp-submit-btn"
                onClick={handleDownloadSubmit}
                disabled={
                  downloadState === "loading" ||
                  !downloadForm.name ||
                  !downloadForm.email
                }
                style={{ marginTop: 0 }}
              >
                {downloadState === "loading" ? (
                  <>
                    <span className="spinner" /> Preparing download...
                  </>
                ) : downloadState === "success" ? (
                  "✅ Downloading!"
                ) : (
                  <>
                    <span>⬇️</span> Download All Cards
                  </>
                )}
              </button>
              {downloadState === "error" && (
                <div className="mvp-status error">
                  😢 Something went wrong. Please try again.
                </div>
              )}
              <button
                className="mvp-modal-cancel"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Handles missing images gracefully
function ImageWithFallback({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="mvp-img-fallback">
        <span style={{ fontSize: "3rem" }}>📖</span>
        <span>{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErrored(true)} />;
}
