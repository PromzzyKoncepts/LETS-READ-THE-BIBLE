"use client";
import { useState, useEffect, useRef } from "react";
export default function MemoryVerseVideoPage() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [learning, setLearning] = useState({
    name: "",
    email: "",
    text: "",
    file: null,
  });
  const [status, setStatus] = useState({ learning: "", download: "" });
  const [activeTab, setActiveTab] = useState("comments");
  const videoRef = useRef(null);

  useEffect(() => {
    fetchVideos();
    loadComments();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch(
        "https://parentforum.lovetoons.org/php/kid-video.php"
      );
      const data = await res.json();
      const videoList = data.map((item, i) => ({
        id: i + 1,
        thumbnail: item.thumbnail,
        video_link: item.video_link,
      }));
      setVideos(videoList);
      setActiveVideo(videoList[0]);
    } catch {
      const fallback = [1, 2, 3, 4, 5, 6].map((i) => ({
        id: i,
        thumbnail: `/images/pics/${i - 1}.png`,
        video_link: `https://parentforum.lovetoons.org/php/kid-video.php?id=${i}`,
      }));
      setVideos(fallback);
      setActiveVideo(fallback[0]);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = () => {
    const saved = localStorage.getItem("kidsMemoryComments");
    if (saved) setComments(JSON.parse(saved));
  };

  const saveComments = (newComments) => {
    setComments(newComments);
    localStorage.setItem("kidsMemoryComments", JSON.stringify(newComments));
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

  const handleDownload = async () => {
    if (!user.name || !user.email) return;
    setStatus((s) => ({ ...s, download: "loading" }));
    try {
      await fetch("https://lovetoons.org/php/download-memory-verse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      videos.forEach((video, i) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = video.thumbnail;
          link.download = `verse_${i + 1}.png`;
          link.click();
        }, i * 500);
      });
      setStatus((s) => ({ ...s, download: "success" }));
      setTimeout(() => {
        setShowModal(false);
        setUser({ name: "", email: "" });
        setStatus((s) => ({ ...s, download: "" }));
      }, 2000);
    } catch {
      setStatus((s) => ({ ...s, download: "error" }));
    }
  };

  const shareLearning = async () => {
    if (!learning.name || !learning.email || !learning.text) {
      alert("Please fill all fields");
      return;
    }
    setStatus((s) => ({ ...s, learning: "loading" }));
    try {
      const formData = new FormData();
      Object.keys(learning).forEach((key) => {
        if (learning[key]) formData.append(key, learning[key]);
      });
      await fetch("https://lovetoons.org/php/learning-memory-verse.php", {
        method: "POST",
        body: formData,
      });
      setStatus((s) => ({ ...s, learning: "success" }));
      setTimeout(() => {
        setLearning({ name: "", email: "", text: "", file: null });
        setStatus((s) => ({ ...s, learning: "" }));
      }, 3000);
    } catch {
      setStatus((s) => ({ ...s, learning: "error" }));
    }
  };

  const currentComments = comments.filter((c) => c.videoId === activeVideo?.id);

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="loader-spinner" />
        <p>Loading memory verses…</p>
        <style>{globalStyles}</style>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <style>{globalStyles}</style>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-inner">
          <span className="hero-badge">📖 Let`s Read the Bible Campaign</span>
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
        {/* Left – Player + bottom panel */}
        <section className="col-left">
          {/* Player card */}
          <div className="card player-card">
            <div className="video-wrap">
              <video
                ref={videoRef}
                className="video-el"
                controls
                key={activeVideo?.video_link}
                src={activeVideo?.video_link}
              />
            </div>

            {/* Thumbnail strip */}
            <div className="thumb-strip">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    videoRef.current?.load();
                  }}
                  className={`thumb-btn${
                    activeVideo?.id === video.id ? " thumb-btn--active" : ""
                  }`}
                  title={`Verse ${video.id}`}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Verse ${video.id}`}
                    className="thumb-img"
                  />
                  {activeVideo?.id === video.id && (
                    <span className="thumb-badge">{video.id}</span>
                  )}
                </button>
              ))}
            </div>

            <button className="dl-btn" onClick={() => setShowModal(true)}>
              <span className="dl-btn-icon">⬇</span>
              Download All Verse Cards
            </button>
          </div>

          {/* Tab panel – Comments / Learn */}
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
                      😢 Something went wrong, please try again.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right – verse card grid */}
        <section className="col-right">
          <div className="card verses-card">
            <h2 className="card-title">📜 All Verses</h2>
            <p className="card-sub">Tap a card below to switch the video</p>
            <div className="verse-grid">
              {videos.map((video, i) => (
                <button
                  key={video.id}
                  className={`verse-tile${
                    activeVideo?.id === video.id ? " verse-tile--active" : ""
                  }`}
                  onClick={() => {
                    setActiveVideo(video);
                    videoRef.current?.load();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Verse ${i + 1}`}
                    className="verse-img"
                  />
                  <div className="verse-label">Verse {i + 1}</div>
                  {activeVideo?.id === video.id && (
                    <div className="verse-playing">▶ Playing</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick download CTA */}
          <div className="card cta-card">
            <div className="cta-icon">🎁</div>
            <h3 className="cta-title">Get All Verse Cards</h3>
            <p className="cta-text">
              Download printable verse cards to hang on the fridge or share with
              friends!
            </p>
            <button
              className="btn btn--accent"
              onClick={() => setShowModal(true)}
            >
              ⬇ Download Free
            </button>
          </div>
        </section>
      </main>

      {/* ── Download Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">📥</div>
            <h2 className="modal-title">Download Verse Cards</h2>
            <p className="modal-sub">
              Enter your details and we`ll send your cards right away.
            </p>
            <input
              className="field"
              placeholder="Your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className="field"
              placeholder="Your email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button
              className="btn btn--primary"
              onClick={handleDownload}
              disabled={
                status.download === "loading" || !user.name || !user.email
              }
            >
              {status.download === "loading"
                ? "⏳ Preparing…"
                : "⬇ Download Cards"}
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            {status.download === "success" && (
              <div className="toast toast--success">🎉 Downloading!</div>
            )}
            {status.download === "error" && (
              <div className="toast toast--error">
                Error – please try again.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy:    #1A3F6F;
    --blue:    #2563EB;
    --sky:     #60A5FA;
    --yellow:  #FBBF24;
    --orange:  #F97316;
    --green:   #22C55E;
    --red:     #EF4444;
    --bg:      #F0F5FF;
    --surface: #FFFFFF;
    --border:  #DBEAFE;
    --muted:   #94A3B8;
    --text:    #1E293B;
    --radius:  16px;
    --shadow:  0 4px 24px rgba(30,58,138,.10);
    --shadow-lg: 0 8px 48px rgba(30,58,138,.16);
  }

  body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); }

  /* ── Loader ── */
  .loader-wrap {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 100vh; gap: 1rem; font-size: 1.1rem; font-family: 'Nunito', sans-serif;
    color: var(--navy);
  }
  .loader-spinner {
    width: 48px; height: 48px;
    border: 4px solid var(--border);
    border-top-color: var(--blue);
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Hero ── */
  .hero {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%);
    padding: 4rem 1.5rem 3.5rem;
    text-align: center; color: #fff;
  }
  .hero-orb {
    position: absolute; border-radius: 50%;
    opacity: .12; animation: float 8s ease-in-out infinite;
  }
  .orb-1 { width: 320px; height: 320px; background: var(--sky);  top: -80px; left: -80px; animation-delay: 0s; }
  .orb-2 { width: 200px; height: 200px; background: var(--yellow); bottom: -60px; right: 10%; animation-delay: 2s; }
  .orb-3 { width: 140px; height: 140px; background: var(--orange); top: 20%; right: -40px; animation-delay: 4s; }
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-18px) scale(1.04); }
  }
  .hero-inner { position: relative; z-index: 1; }
  .hero-badge {
    display: inline-block;
    background: var(--yellow); color: var(--navy);
    font-weight: 800; font-size: .8rem; letter-spacing: .04em;
    padding: .35rem 1.1rem; border-radius: 999px;
    margin-bottom: 1.1rem; text-transform: uppercase;
  }
  .hero-title {
    font-family: 'Fredoka One', cursive;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    line-height: 1.1; margin-bottom: .6rem;
    text-shadow: 0 4px 12px rgba(0,0,0,.25);
  }
  .hero-title em { color: var(--yellow); font-style: normal; }
  .hero-sub { font-size: 1.1rem; opacity: .85; font-weight: 600; letter-spacing: .02em; }

  /* ── Layout ── */
  .layout {
    max-width: 1240px; margin: 0 auto;
    padding: 2.5rem 1.25rem 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
    align-items: start;
  }
  @media (max-width: 800px) {
    .layout { grid-template-columns: 1fr; }
  }
  .col-left, .col-right { display: flex; flex-direction: column; gap: 1.5rem; }

  /* ── Card ── */
  .card {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  /* ── Player card ── */
  .player-card { padding: 0; }
  .video-wrap { background: #000; line-height: 0; }
  .video-el { width: 100%; max-height: 320px; object-fit: contain; display: block; }
  .thumb-strip {
    display: flex; gap: .6rem; padding: 1rem 1rem .5rem;
    overflow-x: auto; scrollbar-width: thin;
  }
  .thumb-btn {
    position: relative; flex-shrink: 0;
    width: 72px; height: 56px; border: 3px solid transparent;
    border-radius: 10px; overflow: hidden; cursor: pointer;
    background: none; padding: 0; transition: border-color .2s, transform .2s;
  }
  .thumb-btn:hover { transform: translateY(-2px); border-color: var(--sky); }
  .thumb-btn--active { border-color: var(--orange); }
  .thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .thumb-badge {
    position: absolute; bottom: 2px; right: 4px;
    font-size: .65rem; font-weight: 800;
    background: var(--orange); color: #fff;
    padding: .05rem .35rem; border-radius: 4px;
  }
  .dl-btn {
    display: flex; align-items: center; justify-content: center; gap: .5rem;
    width: calc(100% - 2rem); margin: .75rem 1rem 1rem;
    padding: .8rem;
    background: linear-gradient(135deg, var(--orange), #c2410c);
    color: #fff; border: none; border-radius: 999px;
    font-family: 'Nunito', sans-serif; font-weight: 800; font-size: .95rem;
    cursor: pointer; transition: opacity .2s, transform .15s;
  }
  .dl-btn:hover { opacity: .9; transform: translateY(-1px); }
  .dl-btn-icon { font-size: 1.1rem; }

  /* ── Tabs ── */
  .tab-card { padding: 0; }
  .tabs {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 2px solid var(--border);
  }
  .tab-btn {
    display: flex; align-items: center; justify-content: center; gap: .4rem;
    padding: .9rem .5rem;
    background: none; border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-weight: 700; font-size: .9rem;
    color: var(--muted); border-bottom: 3px solid transparent; margin-bottom: -2px;
    transition: color .2s, border-color .2s;
  }
  .tab-btn:hover { color: var(--navy); }
  .tab-btn--active { color: var(--blue); border-bottom-color: var(--blue); }
  .tab-count {
    background: var(--blue); color: #fff;
    font-size: .65rem; font-weight: 800;
    padding: .1rem .4rem; border-radius: 999px;
  }
  .tab-body { padding: 1.25rem; }

  /* ── Comments ── */
  .comment-list { display: flex; flex-direction: column; gap: .75rem; margin-bottom: 1.25rem; max-height: 260px; overflow-y: auto; }
  .empty-state {
    display: flex; flex-direction: column; align-items: center; gap: .5rem;
    padding: 2rem; color: var(--muted); font-weight: 600; font-size: 1rem;
  }
  .empty-state span { font-size: 2rem; }
  .comment-item { display: flex; gap: .75rem; align-items: flex-start; }
  .comment-avatar {
    flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--sky));
    color: #fff; font-weight: 800; font-size: .95rem;
    display: flex; align-items: center; justify-content: center;
  }
  .comment-body { flex: 1; background: #F8FAFF; border-radius: 12px; padding: .65rem .85rem; }
  .comment-name { font-weight: 800; color: var(--navy); font-size: .85rem; margin-bottom: .25rem; }
  .comment-text { color: var(--text); font-size: .9rem; line-height: 1.5; }
  .comment-date { font-size: .7rem; color: var(--muted); margin-top: .35rem; }

  /* ── Forms ── */
  .form-group { display: flex; flex-direction: column; gap: .75rem; }
  .field {
    width: 100%; padding: .75rem 1rem;
    border: 2px solid var(--border); border-radius: 12px;
    font-family: 'Nunito', sans-serif; font-size: .95rem; color: var(--text);
    background: #F8FAFF; outline: none; transition: border-color .2s, box-shadow .2s;
    resize: vertical;
  }
  .field:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  .textarea { min-height: 90px; }
  .file-label {
    display: flex; align-items: center; gap: .6rem;
    padding: .7rem 1rem; border: 2px dashed var(--border); border-radius: 12px;
    background: #F8FAFF; cursor: pointer; font-size: .9rem; color: var(--muted);
    transition: border-color .2s;
  }
  .file-label:hover { border-color: var(--blue); }
  .file-input { display: none; }

  /* ── Buttons ── */
  .btn {
    width: 100%; padding: .8rem;
    border: none; border-radius: 999px; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-weight: 800; font-size: .95rem;
    transition: opacity .2s, transform .15s;
  }
  .btn:hover { opacity: .88; transform: translateY(-1px); }
  .btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .btn--primary { background: linear-gradient(135deg, var(--navy), var(--blue)); color: #fff; }
  .btn--accent  { background: linear-gradient(135deg, var(--yellow), var(--orange)); color: var(--navy); }
  .btn--ghost   { background: none; border: 2px solid var(--border); color: var(--muted); }
  .btn--ghost:hover { border-color: var(--navy); color: var(--navy); }

  /* ── Toasts ── */
  .toast {
    padding: .65rem 1rem; border-radius: 10px;
    font-weight: 700; font-size: .9rem; text-align: center;
    animation: fadeUp .3s ease;
  }
  .toast--success { background: #DCFCE7; color: #166534; }
  .toast--error   { background: #FEE2E2; color: #991B1B; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Verse grid (right col) ── */
  .verses-card { padding: 1.5rem; }
  .card-title {
    font-family: 'Fredoka One', cursive;
    font-size: 1.5rem; color: var(--navy); margin-bottom: .25rem;
  }
  .card-sub { font-size: .85rem; color: var(--muted); margin-bottom: 1.25rem; }
  .verse-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: .75rem;
  }
  .verse-tile {
    position: relative; border: 3px solid transparent;
    border-radius: 14px; overflow: hidden; cursor: pointer;
    background: none; padding: 0;
    transition: border-color .2s, transform .2s, box-shadow .2s;
    aspect-ratio: 3/2;
  }
  .verse-tile:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--sky); }
  .verse-tile--active { border-color: var(--orange); box-shadow: 0 0 0 4px rgba(249,115,22,.2); }
  .verse-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .verse-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,.65));
    color: #fff; font-weight: 800; font-size: .75rem;
    padding: .5rem .6rem .35rem; text-align: center;
  }
  .verse-playing {
    position: absolute; top: 6px; right: 6px;
    background: var(--orange); color: #fff;
    font-size: .65rem; font-weight: 800; letter-spacing: .04em;
    padding: .15rem .45rem; border-radius: 999px;
  }

  /* ── CTA card ── */
  .cta-card {
    padding: 2rem 1.5rem; text-align: center;
    background: linear-gradient(135deg, var(--navy), var(--blue));
    color: #fff;
  }
  .cta-icon { font-size: 2.5rem; margin-bottom: .75rem; }
  .cta-title {
    font-family: 'Fredoka One', cursive; font-size: 1.5rem;
    margin-bottom: .5rem;
  }
  .cta-text { font-size: .9rem; opacity: .85; margin-bottom: 1.25rem; line-height: 1.6; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.65);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--surface);
    padding: 2rem; border-radius: 24px; max-width: 420px; width: 90%;
    display: flex; flex-direction: column; gap: 1rem;
    animation: slideUp .25s ease;
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  .modal-icon { font-size: 2.5rem; text-align: center; }
  .modal-title {
    font-family: 'Fredoka One', cursive; font-size: 1.6rem;
    color: var(--navy); text-align: center;
  }
  .modal-sub { font-size: .9rem; color: var(--muted); text-align: center; margin-top: -.5rem; }

  /* ── Learn hint ── */
  .learn-hint { font-size: .9rem; color: var(--muted); margin-bottom: .5rem; }
`;
