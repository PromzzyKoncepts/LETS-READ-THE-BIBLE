"use client";

import { useState, useEffect, useRef } from "react";

export default function MemoryVerseVideoPage() {
  // State
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

  const videoRef = useRef(null);

  // Load videos
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
      // Fallback data
      const fallback = [1, 2, 3, 4, 5, 6].map((i) => ({
        id: i,
        thumbnail: `/images/pics/${i - 1}.png`,
        video_link: `https://parentforum.lovetoons.org/php/video.php?id=${i}`,
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

    setStatus({ ...status, download: "loading" });

    try {
      await fetch("https://lovetoons.org/php/download-memory-verse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      // Download all thumbnails
      videos.forEach((video, i) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = video.thumbnail;
          link.download = `verse_${i + 1}.png`;
          link.click();
        }, i * 500);
      });

      setStatus({ ...status, download: "success" });
      setTimeout(() => {
        setShowModal(false);
        setUser({ name: "", email: "" });
        setStatus({ ...status, download: "" });
      }, 2000);
    } catch {
      setStatus({ ...status, download: "error" });
    }
  };

  const shareLearning = async () => {
    if (!learning.name || !learning.email || !learning.text) {
      alert("Please fill all fields");
      return;
    }

    setStatus({ ...status, learning: "loading" });

    try {
      const formData = new FormData();
      Object.keys(learning).forEach((key) => {
        if (learning[key]) formData.append(key, learning[key]);
      });

      await fetch("https://lovetoons.org/php/learning-memory-verse.php", {
        method: "POST",
        body: formData,
      });

      setStatus({ ...status, learning: "success" });
      setTimeout(() => {
        setLearning({ name: "", email: "", text: "", file: null });
        setStatus({ ...status, learning: "" });
      }, 3000);
    } catch {
      setStatus({ ...status, learning: "error" });
    }
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>📖</div>
        <div>Loading memory verses...</div>
      </div>
    );
  }

  const currentComments = comments.filter((c) => c.videoId === activeVideo?.id);

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Sniglet&family=Manrope:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.badge}>📖 Let's Read the Bible Campaign</div>
        <h1 style={styles.title}>
          Memory <span style={{ color: "#FFD93D" }}>Verse</span> Videos
        </h1>
        <p style={styles.subtitle}>
          Watch, learn, and share what God is teaching you!
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Left Column - Video */}
        <div>
          <div style={styles.card}>
            <video
              ref={videoRef}
              style={styles.video}
              controls
              key={activeVideo?.video_link}
              src={activeVideo?.video_link}
            />

            <div style={styles.thumbnails}>
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    videoRef.current?.load();
                  }}
                  style={{
                    ...styles.thumb,
                    borderColor:
                      activeVideo?.id === video.id ? "#FF6B35" : "transparent",
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={`Verse ${video.id}`}
                    style={styles.thumbImg}
                  />
                </button>
              ))}
            </div>

            <button
              style={styles.downloadBtn}
              onClick={() => setShowModal(true)}
            >
              ⬇️ Download All Verse Cards
            </button>
          </div>

          {/* Comments */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>💬 Comments</h3>

            <div style={styles.commentList}>
              {currentComments.length === 0 && (
                <div style={styles.empty}>Be the first to share! 🙏</div>
              )}
              {currentComments.map((comment) => (
                <div key={comment.id} style={styles.comment}>
                  <div style={styles.commentName}>✏️ {comment.name}</div>
                  <div style={styles.commentText}>{comment.text}</div>
                  <div style={styles.commentDate}>{comment.date}</div>
                </div>
              ))}
            </div>

            <input
              style={styles.input}
              placeholder="Your name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
            />
            <textarea
              style={{ ...styles.input, minHeight: "80px" }}
              placeholder="Share what you learned..."
              value={newComment.text}
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
            />
            <button style={styles.button} onClick={addComment}>
              💬 Post Comment
            </button>
          </div>
        </div>

        {/* Right Column - Learning Form */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>What Did You Learn? 💡</h3>
          <p style={styles.hint}>
            Share what God taught you through this verse!
          </p>

          <input
            style={styles.input}
            placeholder="Your name"
            value={learning.name}
            onChange={(e) => setLearning({ ...learning, name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Your email"
            type="email"
            value={learning.email}
            onChange={(e) =>
              setLearning({ ...learning, email: e.target.value })
            }
          />
          <input
            style={styles.input}
            type="file"
            onChange={(e) =>
              setLearning({ ...learning, file: e.target.files?.[0] })
            }
          />
          <textarea
            style={{ ...styles.input, minHeight: "120px" }}
            placeholder="What did you learn? ✍️"
            value={learning.text}
            onChange={(e) => setLearning({ ...learning, text: e.target.value })}
          />

          <button
            style={styles.button}
            onClick={shareLearning}
            disabled={status.learning === "loading"}
          >
            {status.learning === "loading"
              ? "⏳ Sharing..."
              : "🙏 Share My Learning"}
          </button>

          {status.learning === "success" && (
            <div style={styles.success}>🎉 Thank you!</div>
          )}
          {status.learning === "error" && (
            <div style={styles.error}>😢 Please try again</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>📥 Download Cards</h2>
            <p>Enter your details to receive all verse cards</p>

            <input
              style={styles.input}
              placeholder="Your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Your email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <button
              style={styles.button}
              onClick={handleDownload}
              disabled={
                status.download === "loading" || !user.name || !user.email
              }
            >
              {status.download === "loading"
                ? "⏳ Preparing..."
                : "⬇️ Download"}
            </button>
            <button
              style={styles.cancelBtn}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            {status.download === "error" && (
              <div style={styles.error}>Error, try again</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  wrapper: {
    fontFamily: "'Manrope', sans-serif",
    background: "#F0F7FF",
    minHeight: "100vh",
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "1rem",
    fontSize: "1.2rem",
  },
  header: {
    background: "linear-gradient(135deg, #1B4F8A, #2A6EC5)",
    padding: "3rem 1.5rem",
    textAlign: "center",
    color: "white",
  },
  badge: {
    display: "inline-block",
    background: "#FFD93D",
    color: "#1B4F8A",
    padding: "0.3rem 1rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "'Luckiest Guy', cursive",
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1.5rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "1.5rem",
    boxShadow: "0 8px 40px rgba(27,79,138,0.1)",
    marginBottom: "2rem",
  },
  video: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "1rem",
  },
  thumbnails: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  thumb: {
    width: "70px",
    height: "70px",
    border: "3px solid transparent",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    background: "none",
    padding: 0,
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  downloadBtn: {
    width: "100%",
    padding: "0.8rem",
    background: "linear-gradient(135deg, #FF6B35, #e8501f)",
    color: "white",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "0.5rem",
  },
  sectionTitle: {
    fontFamily: "'Luckiest Guy', cursive",
    color: "#1B4F8A",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  hint: {
    color: "#666",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.7rem",
    border: "2px solid #d1e4f7",
    borderRadius: "12px",
    marginBottom: "1rem",
    fontSize: "0.95rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    background: "linear-gradient(135deg, #1B4F8A, #2A6EC5)",
    color: "white",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  commentList: {
    maxHeight: "300px",
    overflowY: "auto",
    marginBottom: "1rem",
  },
  comment: {
    background: "#f8f9fa",
    padding: "0.8rem",
    borderRadius: "12px",
    marginBottom: "0.5rem",
    borderLeft: "4px solid #FF6B35",
  },
  commentName: {
    fontWeight: "bold",
    color: "#1B4F8A",
    marginBottom: "0.3rem",
  },
  commentText: {
    color: "#555",
    fontSize: "0.9rem",
  },
  commentDate: {
    fontSize: "0.7rem",
    color: "#999",
    textAlign: "right",
    marginTop: "0.3rem",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    padding: "2rem",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "white",
    padding: "2rem",
    borderRadius: "24px",
    maxWidth: "400px",
    width: "90%",
  },
  cancelBtn: {
    width: "100%",
    padding: "0.7rem",
    background: "none",
    border: "2px solid #ddd",
    borderRadius: "999px",
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: "0.5rem",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "0.5rem",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "0.5rem",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "0.5rem",
  },
};

// Mobile responsive
if (typeof window !== "undefined" && window.innerWidth < 768) {
  styles.container.gridTemplateColumns = "1fr";
}
