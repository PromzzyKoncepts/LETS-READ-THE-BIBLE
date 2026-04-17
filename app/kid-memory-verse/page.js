"use client";

import { useState, useEffect, useRef } from "react";

export default function MemoryVerseVideoPage() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [learning, setLearning] = useState({
    name: "",
    email: "",
    text: "",
    file: null,
  });
  const [status, setStatus] = useState({ learning: "" });
  const [activeTab, setActiveTab] = useState("comments");
  const videoRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  useEffect(() => {
    fetchVideos();
    loadComments();
  }, []);

  const fetchVideos = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(
        "https://parentforum.lovetoons.org/php/kid-video.php",
        {
          signal: controller.signal,
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }

      const videoList = data.map((item, i) => ({
        id: i + 1,
        thumbnail: item.thumbnail || "/placeholder-thumb.jpg",
        video_link: item.video_link || "",
        title: item.title || `Verse ${i + 1}`,
        verse_text: item.verse_text || "",
      }));

      setVideos(videoList);
      if (videoList.length > 0) {
        setActiveVideo(videoList[0]);
      } else {
        setError(true);
        setErrorMessage("No videos found.");
      }
    } catch (err) {
      console.error("Video fetch error:", err);
      setError(true);

      if (err.name === "AbortError") {
        setErrorMessage("Request timed out. Please check your connection.");
      } else if (err.message.includes("fetch")) {
        setErrorMessage(
          "Network error. Please check your internet connection."
        );
      } else if (err.message.includes("CORS")) {
        setErrorMessage(
          "CORS policy blocked the request. The server needs to allow cross-origin requests."
        );
      } else {
        setErrorMessage(err.message || "Failed to load videos.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadComments = () => {
    try {
      const saved = localStorage.getItem("kidsMemoryComments");
      if (saved) setComments(JSON.parse(saved));
    } catch (err) {
      console.error("Error loading comments:", err);
      setComments([]);
    }
  };

  const saveComments = (updated) => {
    setComments(updated);
    localStorage.setItem("kidsMemoryComments", JSON.stringify(updated));
  };

  const addComment = () => {
    if (!newComment.name || !newComment.text) {
      alert("Please enter your name and comment 💛");
      return;
    }
    const comment = {
      id: Date.now(),
      name: newComment.name.slice(0, 40),
      text: newComment.text.slice(0, 400),
      videoId: activeVideo.id,
      date: new Date().toLocaleString(),
    };
    saveComments([comment, ...comments]);
    setNewComment({ name: "", text: "" });
  };

  const shareLearning = async () => {
    if (!learning.name || !learning.email || !learning.text) {
      alert("Please fill all fields");
      return;
    }

    setStatus({ learning: "loading" });

    try {
      const formData = new FormData();
      Object.keys(learning).forEach((key) => {
        if (learning[key]) formData.append(key, learning[key]);
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(
        "https://lovetoons.org/php/learning-memory-verse.php",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
          mode: "cors",
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus({ learning: "success" });
      setTimeout(() => {
        setLearning({ name: "", email: "", text: "", file: null });
        setStatus({ learning: "" });
      }, 3000);
    } catch (err) {
      console.error("Share learning error:", err);
      setStatus({ learning: "error" });

      setTimeout(() => {
        setStatus({ learning: "" });
      }, 5000);
    }
  };

  const currentComments = comments.filter((c) => c.videoId === activeVideo?.id);

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const versesSection = document.querySelector(".verses-card");
    if (versesSection) {
      versesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="loader-wrap">
        <style>{globalStyles}</style>
        <div className="loader-spinner" />
        <p>Loading memory verses…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-wrap">
        <style>{globalStyles}</style>
        <span style={{ fontSize: "2.5rem" }}>😔</span>
        <p>Couldn&apos;t load videos.</p>
        {errorMessage && (
          <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
            Error: {errorMessage}
          </p>
        )}
        <button
          onClick={() => {
            setLoading(true);
            setError(false);
            fetchVideos();
          }}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 Try Again
        </button>
        <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "1rem" }}>
          Tip: This might be a CORS issue. Contact the website administrator to
          add your domain to allowed origins.
        </p>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <style>{globalStyles}</style>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-badge">
            📖 Let&apos;s Read the Bible Campaign
          </span>
          <h1 className="hero-title">
            Memory <em>Verse</em> Videos
          </h1>
          <p className="hero-sub">
            Watch · Learn · Share what God is teaching you!
          </p>
        </div>
      </header>

      {/* ── Layout ── */}
      <main className="layout">
        {/* Left – Player + tabs */}
        <section className="col-left">
          <div className="card player-card">
            <div className="video-wrap">
              {activeVideo?.video_link ? (
                <video
                  ref={videoRef}
                  className="video-el"
                  controls
                  key={activeVideo?.video_link}
                  src={activeVideo?.video_link}
                  onError={(e) => {
                    console.error(
                      "Video failed to load:",
                      activeVideo?.video_link
                    );
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    const fallback = document.createElement("div");
                    fallback.className = "video-fallback";
                    fallback.innerHTML =
                      "⚠️ Video failed to load. Please try another verse.";
                    fallback.style.cssText =
                      "display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;color:#666;padding:1rem;text-align:center;";
                    if (parent && !parent.querySelector(".video-fallback")) {
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="video-fallback">⚠️ Video unavailable</div>
              )}
            </div>

            <div className="thumb-strip">
              {currentVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    if (videoRef.current) videoRef.current.load();
                  }}
                  className={`thumb-btn${
                    activeVideo?.id === video.id ? " thumb-btn--active" : ""
                  }`}
                  title={video.title || `Verse ${video.id}`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title || `Verse ${video.id}`}
                    className="thumb-img"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/120x80?text=No+Image";
                    }}
                  />
                  {activeVideo?.id === video.id && (
                    <span className="thumb-badge">▶</span>
                  )}
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="thumb-pagination">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="thumb-page-btn"
                >
                  ←
                </button>
                <span className="thumb-page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="thumb-page-btn"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Tab panel */}
          <div className="card tab-card">
            <div className="tabs">
              <button
                className={`tab-btn${
                  activeTab === "comments" ? " tab-btn--active" : ""
                }`}
                onClick={() => setActiveTab("comments")}
              >
                💬 Comments
                {currentComments.length > 0 && (
                  <span className="tab-count">{currentComments.length}</span>
                )}
              </button>
              <button
                className={`tab-btn${
                  activeTab === "learn" ? " tab-btn--active" : ""
                }`}
                onClick={() => setActiveTab("learn")}
              >
                💡 Share Learning
              </button>
            </div>

            {activeTab === "comments" && (
              <div className="tab-body">
                <div className="comment-list">
                  {currentComments.length === 0 ? (
                    <div className="empty-state">
                      <span>🙏</span>
                      <p>Be the first to share!</p>
                    </div>
                  ) : (
                    currentComments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-avatar">
                          {comment.name[0].toUpperCase()}
                        </div>
                        <div className="comment-body">
                          <div className="comment-name">{comment.name}</div>
                          <div className="comment-text">{comment.text}</div>
                          <div className="comment-date">{comment.date}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="field"
                    placeholder="Your name"
                    value={newComment.name}
                    onChange={(e) =>
                      setNewComment({ ...newComment, name: e.target.value })
                    }
                  />
                  <textarea
                    className="field textarea"
                    placeholder="Share what you learned…"
                    value={newComment.text}
                    onChange={(e) =>
                      setNewComment({ ...newComment, text: e.target.value })
                    }
                  />
                  <button className="btn btn--primary" onClick={addComment}>
                    💬 Post Comment
                  </button>
                </div>
              </div>
            )}

            {activeTab === "learn" && (
              <div className="tab-body">
                <p className="learn-hint">
                  Share what God taught you through this verse!
                </p>
                <div className="form-group">
                  <input
                    className="field"
                    placeholder="Your name"
                    value={learning.name}
                    onChange={(e) =>
                      setLearning({ ...learning, name: e.target.value })
                    }
                  />
                  <input
                    className="field"
                    placeholder="Your email"
                    type="email"
                    value={learning.email}
                    onChange={(e) =>
                      setLearning({ ...learning, email: e.target.value })
                    }
                  />
                  <label className="file-label">
                    <span>
                      📎{" "}
                      {learning.file
                        ? learning.file.name
                        : "Attach a photo (optional)"}
                    </span>
                    <input
                      type="file"
                      className="file-input"
                      accept="image/*"
                      onChange={(e) =>
                        setLearning({ ...learning, file: e.target.files?.[0] })
                      }
                    />
                  </label>
                  <textarea
                    className="field textarea"
                    placeholder="What did you learn? ✍️"
                    value={learning.text}
                    onChange={(e) =>
                      setLearning({ ...learning, text: e.target.value })
                    }
                  />
                  <button
                    className="btn btn--primary"
                    onClick={shareLearning}
                    disabled={status.learning === "loading"}
                  >
                    {status.learning === "loading"
                      ? "⏳ Sharing…"
                      : "🙏 Share My Learning"}
                  </button>
                  {status.learning === "success" && (
                    <div className="toast toast--success">
                      🎉 Thank you for sharing!
                    </div>
                  )}
                  {status.learning === "error" && (
                    <div className="toast toast--error">
                      😢 Something went wrong. Please try again.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right – Verse grid with pagination */}
        <section className="col-right">
          <div className="card verses-card">
            <h2 className="card-title">📜 All Verses</h2>
            <p className="card-sub">
              Showing {indexOfFirstVideo + 1}–
              {Math.min(indexOfLastVideo, videos.length)} of {videos.length}{" "}
              verses
            </p>
            <div className="verse-grid">
              {currentVideos.map((video) => (
                <button
                  key={video.id}
                  className={`verse-tile${
                    activeVideo?.id === video.id ? " verse-tile--active" : ""
                  }`}
                  onClick={() => {
                    setActiveVideo(video);
                    if (videoRef.current) videoRef.current.load();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Verse ${video.id}`}
                    className="verse-img"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div className="verse-label">
                    {video.title || `Verse ${video.id}`}
                  </div>
                  {activeVideo?.id === video.id && (
                    <div className="verse-playing">▶ Playing</div>
                  )}
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="pagination-btn pagination-prev"
                >
                  ← Prev
                </button>
                <div className="pagination-pages">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`pagination-number${
                            currentPage === pageNum ? " active" : ""
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="pagination-dots">
                          …
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-btn pagination-next"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: #1A3F6F;
    --blue: #2563EB;
    --sky: #60A5FA;
    --yellow: #FBBF24;
    --orange: #F97316;
    --bg: #F0F5FF;
    --surface: #FFFFFF;
    --border: #DBEAFE;
    --muted: #94A3B8;
    --text: #1E293B;
    --radius: 16px;
    --shadow: 0 4px 24px rgba(30,58,138,.10);
    --shadow-lg: 0 8px 48px rgba(30,58,138,.16);
  }

  body {
    font-family: 'Nunito', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── Page wrapper ── */
  .page-wrap {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Loading state ── */
  .loader-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 1rem;
    font-size: 1.1rem;
    font-family: 'Nunito', sans-serif;
    color: var(--navy);
    text-align: center;
    padding: 1.5rem;
  }

  .loader-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--border);
    border-top-color: var(--blue);
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%);
    padding: clamp(2rem, 8vw, 4rem) 1rem clamp(1.5rem, 5vw, 3.5rem);
    text-align: center;
    color: #fff;
    overflow: hidden;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-badge {
    display: inline-block;
    background: var(--yellow);
    color: var(--navy);
    font-weight: 800;
    font-size: clamp(0.65rem, 2.5vw, 0.8rem);
    letter-spacing: .04em;
    padding: 0.35rem 1.1rem;
    border-radius: 999px;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .hero-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(1.8rem, 7vw, 3.8rem);
    line-height: 1.2;
    margin-bottom: 0.75rem;
    text-shadow: 0 4px 12px rgba(0,0,0,.25);
    word-break: break-word;
  }

  .hero-title em {
    color: var(--yellow);
    font-style: normal;
  }

  .hero-sub {
    font-size: clamp(0.85rem, 3.5vw, 1.1rem);
    opacity: .85;
    font-weight: 600;
    max-width: 600px;
    margin: 0 auto;
  }

  /* ── Main layout ── */
  .layout {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 1.25rem) clamp(2rem, 6vw, 4rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 2.5vw, 1.75rem);
    align-items: start;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
  }

  .col-left,
  .col-right {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2.5vw, 1.5rem);
    min-width: 0; /* prevents grid blowout */
  }

  /* ── Cards ── */
  .card {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  .card:hover {
    box-shadow: var(--shadow-lg);
  }

  /* ── Video player ── */
  .player-card {
    padding: 0;
  }

  .video-wrap {
    background: #000;
    line-height: 0;
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9; /* responsive height tied to width */
    min-height: 180px;
    max-height: 420px;
  }

  .video-el {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .video-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 180px;
    background: #f0f0f0;
    color: #666;
    text-align: center;
    padding: 1rem;
    font-family: 'Nunito', sans-serif;
  }

  /* ── Thumb strip ── */
  .thumb-strip {
    display: flex;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    overflow-x: auto;
    scrollbar-width: thin;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .thumb-strip::-webkit-scrollbar {
    height: 5px;
  }
  .thumb-strip::-webkit-scrollbar-track {
    background: var(--border);
    border-radius: 10px;
  }
  .thumb-strip::-webkit-scrollbar-thumb {
    background: var(--blue);
    border-radius: 10px;
  }

  .thumb-btn {
    position: relative;
    flex-shrink: 0;
    width: clamp(56px, 10vw, 80px);
    height: clamp(40px, 7vw, 60px);
    border: 3px solid transparent;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    background: none;
    padding: 0;
    transition: all 0.2s ease;
    scroll-snap-align: start;
  }

  .thumb-btn:hover {
    transform: translateY(-2px);
    border-color: var(--sky);
  }

  .thumb-btn--active {
    border-color: var(--orange);
  }

  .thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .thumb-badge {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(249,115,22,0.7);
    color: #fff;
    font-size: 1rem;
  }

  /* ── Thumb pagination ── */
  .thumb-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem 0.85rem;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }

  .thumb-page-btn {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 8px;
    padding: 0.3rem 0.8rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--navy);
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 44px;
    min-height: 44px;
  }

  .thumb-page-btn:hover:not(:disabled) {
    background: var(--blue);
    border-color: var(--blue);
    color: white;
  }

  .thumb-page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .thumb-page-info {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--navy);
    background: var(--bg);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
  }

  /* ── Tabs ── */
  .tab-card {
    padding: 0;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 2px solid var(--border);
  }

  .tab-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: clamp(0.65rem, 2.5vw, 0.9rem) 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: clamp(0.75rem, 3vw, 0.9rem);
    color: var(--muted);
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s ease;
    min-height: 48px;
    white-space: nowrap;
  }

  .tab-btn:hover {
    color: var(--navy);
    background: rgba(37,99,235,0.05);
  }

  .tab-btn--active {
    color: var(--blue);
    border-bottom-color: var(--blue);
  }

  .tab-count {
    background: var(--blue);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    flex-shrink: 0;
  }

  .tab-body {
    padding: clamp(0.85rem, 3.5vw, 1.25rem);
  }

  /* ── Comments ── */
  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    max-height: 260px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: clamp(1rem, 5vw, 2rem);
    color: var(--muted);
    font-weight: 600;
    text-align: center;
  }

  .empty-state span {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  .comment-item {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
  }

  .comment-avatar {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--sky));
    color: #fff;
    font-weight: 800;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .comment-body {
    flex: 1;
    min-width: 0; /* prevents text overflow */
    background: #F8FAFF;
    border-radius: 12px;
    padding: 0.6rem 0.8rem;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .comment-name {
    font-weight: 800;
    color: var(--navy);
    font-size: 0.82rem;
    margin-bottom: 0.2rem;
  }

  .comment-text {
    color: var(--text);
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .comment-date {
    font-size: 0.68rem;
    color: var(--muted);
    margin-top: 0.3rem;
  }

  /* ── Forms ── */
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .field {
    width: 100%;
    padding: clamp(0.65rem, 2vw, 0.75rem) 1rem;
    border: 2px solid var(--border);
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px; /* 16px prevents iOS zoom */
    color: var(--text);
    background: #F8FAFF;
    outline: none;
    transition: all 0.2s ease;
    resize: vertical;
    -webkit-appearance: none;
    appearance: none;
  }

  .field:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }

  .textarea {
    min-height: 90px;
  }

  .file-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border: 2px dashed var(--border);
    border-radius: 12px;
    background: #F8FAFF;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--muted);
    transition: all 0.2s ease;
    word-break: break-all;
  }

  .file-label:hover {
    border-color: var(--blue);
    background: rgba(37,99,235,0.05);
  }

  .file-input {
    display: none;
  }

  /* ── Buttons ── */
  .btn {
    width: 100%;
    padding: clamp(0.65rem, 2vw, 0.8rem);
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: clamp(0.85rem, 3.5vw, 0.95rem);
    transition: all 0.2s ease;
    min-height: 48px;
  }

  .btn:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn--primary {
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: #fff;
  }

  /* ── Toasts ── */
  .toast {
    padding: 0.65rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    text-align: center;
    animation: fadeUp 0.3s ease;
  }

  .toast--success {
    background: #DCFCE7;
    color: #166534;
  }

  .toast--error {
    background: #FEE2E2;
    color: #991B1B;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Verses section ── */
  .verses-card {
    padding: clamp(1rem, 3.5vw, 1.5rem);
  }

  .card-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(1.2rem, 4.5vw, 1.5rem);
    color: var(--navy);
    margin-bottom: 0.25rem;
    word-break: break-word;
  }

  .card-sub {
    font-size: clamp(0.72rem, 2.5vw, 0.85rem);
    color: var(--muted);
    margin-bottom: 1rem;
  }

  /* ── Verse grid ── */
  .verse-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: clamp(0.5rem, 2vw, 0.75rem);
  }

  @media (max-width: 480px) {
    .verse-grid {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 0.45rem;
    }
  }

  @media (max-width: 360px) {
    .verse-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.4rem;
    }
  }

  .verse-tile {
    position: relative;
    border: 3px solid transparent;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    background: none;
    padding: 0;
    transition: all 0.2s ease;
    aspect-ratio: 3 / 2;
    width: 100%;
  }

  .verse-tile:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: var(--sky);
  }

  .verse-tile:active {
    transform: translateY(0);
  }

  .verse-tile--active {
    border-color: var(--orange);
    box-shadow: 0 0 0 4px rgba(249,115,22,0.2);
  }

  .verse-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .verse-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.72));
    color: #fff;
    font-weight: 800;
    font-size: clamp(0.6rem, 2.5vw, 0.72rem);
    padding: 0.4rem 0.45rem 0.3rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .verse-playing {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--orange);
    color: #fff;
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 0.15rem 0.4rem;
    border-radius: 999px;
  }

  .learn-hint {
    font-size: 0.88rem;
    color: var(--muted);
    margin-bottom: 0.65rem;
  }

  /* ── Pagination ── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }

  .pagination-btn {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 40px;
    padding: clamp(0.35rem, 1.5vw, 0.5rem) clamp(0.7rem, 2.5vw, 1rem);
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: clamp(0.72rem, 2.5vw, 0.85rem);
    color: var(--navy);
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 40px;
    white-space: nowrap;
  }

  .pagination-btn:hover:not(:disabled) {
    background: var(--blue);
    border-color: var(--blue);
    color: white;
    transform: translateY(-1px);
  }

  .pagination-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .pagination-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pagination-pages {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .pagination-number {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 8px;
    min-width: 34px;
    height: 34px;
    padding: 0 0.4rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--navy);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination-number:hover {
    background: var(--sky);
    border-color: var(--sky);
    color: white;
  }

  .pagination-number.active {
    background: var(--orange);
    border-color: var(--orange);
    color: white;
  }

  .pagination-dots {
    color: var(--muted);
    font-weight: 700;
    padding: 0 0.2rem;
  }

  /* ── Tablet (768–1024px) ── */
  @media (min-width: 768px) and (max-width: 1024px) {
    .verse-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .thumb-strip {
      gap: 0.5rem;
    }
  }

  /* ── Small mobile (≤480px) ── */
  @media (max-width: 480px) {
    .thumb-btn {
      width: 52px;
      height: 38px;
    }

    .comment-item {
      gap: 0.45rem;
    }

    .comment-avatar {
      width: 30px;
      height: 30px;
      font-size: 0.8rem;
    }

    .comment-body {
      padding: 0.45rem 0.65rem;
    }

    .pagination-number {
      min-width: 30px;
      height: 30px;
      font-size: 0.78rem;
    }
  }

  /* ── Touch devices ── */
  @media (hover: none) and (pointer: coarse) {
    .btn,
    .tab-btn,
    .thumb-btn,
    .verse-tile,
    .pagination-btn,
    .pagination-number {
      cursor: default;
    }

    .btn:active,
    .tab-btn:active,
    .thumb-btn:active {
      opacity: 0.7;
      transform: scale(0.98);
    }
  }

  /* ── Landscape mobile ── */
  @media (max-width: 768px) and (orientation: landscape) {
    .hero {
      padding: 1.25rem 1rem;
    }

    .video-wrap {
      max-height: 260px;
    }

    .comment-list {
      max-height: 180px;
    }
  }

  /* ── Print ── */
  @media print {
    .hero {
      background: var(--navy);
      print-color-adjust: exact;
    }

    .btn,
    .thumb-btn,
    .verse-tile,
    .tab-btn,
    .file-label,
    .pagination {
      display: none;
    }

    .video-wrap {
      break-inside: avoid;
    }
      .card::after, .card::before{
      background: none;}
  }
`;
