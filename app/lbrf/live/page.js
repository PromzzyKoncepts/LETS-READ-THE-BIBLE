"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowDown,
} from "react-icons/fa";
import { BsFullscreen } from "react-icons/bs";
import { LuPictureInPicture2 } from "react-icons/lu";
import { RiForward10Fill, RiRewind10Fill } from "react-icons/ri";
import { FaRotateLeft } from "react-icons/fa6";
import Hls from "hls.js";
// import { io } from 'socket.io-client';

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

export default function LiveStreamPage() {
  // Video player refs and state
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Comments refs and state
  const commentsEndRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Socket.io state
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  // Initialize HLS player
  useEffect(() => {
    if (typeof window !== "undefined" && videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls();
      hlsRef.current = hls;

      if (Hls.isSupported()) {
        hls.loadSource(
          "https://cdnstack.internetmultimediaonline.org/ln24/lntoons.stream/chunklist_w1275422486.m3u8"
        );
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => console.log("Autoplay prevented:", e));
          setIsPlaying(true);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error(
                  "Fatal network error encountered, try to recover"
                );
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Fatal media error encountered, try to recover");
                hls.recoverMediaError();
                break;
              default:
                console.error("Cannot recover");
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://cdnstack.internetmultimediaonline.org/ln24/lntoons.stream/chunklist_w1275422486.m3u8";
        video.addEventListener("loadedmetadata", () => {
          video.play().catch((e) => console.log("Autoplay prevented:", e));
          setIsPlaying(true);
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  // Initialize Socket.io connection
  useEffect(() => {
    // const socketInstance = io("http://localhost:3000");
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
      {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true,
      }
    );

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Socket.io event handlers
  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      console.log("Connected to Socket.io server");
      setConnectionStatus("connected");
      setReconnectAttempts(0);

      // Request initial comments when connected
      socket.emit("get_comments");
    };

    const onDisconnect = () => {
      console.log("Disconnected from Socket.io server");
      setConnectionStatus("disconnected");
    };

    const onConnectError = (error) => {
      console.error("Socket.io connection error:", error);
      setConnectionStatus("error");
    };

    const onReconnectAttempt = (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
      setReconnectAttempts(attempt);
      setConnectionStatus("reconnecting");
    };

    const onReconnectFailed = () => {
      console.error("Reconnection failed");
      setConnectionStatus("failed");
    };

    const onInitComments = (data) => {
      setComments(data);
    };

    const onAddComment = (comment) => {
      setComments((prev) => [...prev, comment]);
      if (!showScrollButton) {
        setTimeout(() => {
          commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("reconnect_attempt", onReconnectAttempt);
    socket.on("reconnect_failed", onReconnectFailed);
    socket.on("init_comments", onInitComments);
    socket.on("add_comment", onAddComment);

    // Manually check connection status in case we missed the initial events
    if (socket.connected) {
      setConnectionStatus("connected");
      socket.emit("get_comments");
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("reconnect_attempt", onReconnectAttempt);
      socket.off("reconnect_failed", onReconnectFailed);
      socket.off("init_comments", onInitComments);
      socket.off("add_comment", onAddComment);
    };
  }, [socket, showScrollButton]);

  // Handle scroll events for comments
  useEffect(() => {
    const container = commentsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Load name from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("streamUserName") || "";
      setName(savedName);
    }
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !name.trim()) return;
    if (!socket || connectionStatus !== "connected") {
      alert("Connection error. Please try again later.");
      return;
    }

    // Save name to localStorage
    localStorage.setItem("streamUserName", name);

    socket.emit("new_comment", {
      name: name,
      text: commentText,
      timestamp: new Date().toISOString(),
    });
    setCommentText("");
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((e) => console.log("Play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current
        .requestFullscreen()
        .catch((e) => console.log("Fullscreen error:", e));
    } else {
      document.exitFullscreen();
    }
  };

  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error("Picture-in-Picture error:", err);
    }
  };

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const getRandomColor = (name) => {
    if (!name) return colors[0];
    const hash = name
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const connectionStatusText = {
    connected: { text: "Connected", color: "text-green-500" },
    connecting: { text: "Connecting...", color: "text-yellow-500" },
    reconnecting: {
      text: `Reconnecting (${reconnectAttempts})...`,
      color: "text-yellow-500",
    },
    disconnected: { text: "Disconnected", color: "text-red-500" },
    error: { text: "Connection error", color: "text-red-500" },
    failed: { text: "Connection failed", color: "text-red-500" },
  }[connectionStatus] || { text: "Unknown status", color: "text-gray-500" };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Live Bible Streaming
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Video Player */}
          <div className="flex-1">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                playsInline
                autoPlay
                muted={isMuted}
                onClick={togglePlayPause}
              />

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="text-white text-2xl"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>

                  <button
                    onClick={() => skip(-10)}
                    className="text-white text-xl"
                  >
                    <FaRotateLeft />
                  </button>

                  <button
                    onClick={() => skip(10)}
                    className="text-white text-xl"
                  >
                    <RiForward10Fill />
                  </button>

                  <div className="flex items-center ml-2">
                    <button
                      onClick={toggleMute}
                      className="text-white text-xl mr-2"
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>

                  <div className="flex-1"></div>

                  <button onClick={togglePiP} className="text-white text-xl">
                    <LuPictureInPicture2 />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white text-xl"
                  >
                    <BsFullscreen />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">About This Stream</h2>
              <p>
                Join us for live Bible reading and discussion. Feel free to
                share your thoughts in the comments section!
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="w-full md:w-96 flex flex-col">
            <div className="bg-white rounded-lg shadow flex-1 flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Live Comments</h2>
                <div className={`text-sm ${connectionStatusText.color}`}>
                  {connectionStatusText.text}
                </div>
              </div>

              <div
                ref={commentsContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {comments.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    {connectionStatus === "connected"
                      ? "No comments yet. Be the first to comment!"
                      : "Loading comments..."}
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full ${getRandomColor(
                          comment.name
                        )} flex items-center justify-center text-white font-bold`}
                      >
                        {comment.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="font-semibold">
                          {comment.name || "Anonymous"}
                        </div>
                        <div className="text-gray-700">{comment.text}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(comment.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={commentsEndRef} />

                {showScrollButton && (
                  <button
                    onClick={scrollToBottom}
                    className="fixed bottom-32 right-32 md:right-96 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                  >
                    <FaArrowDown />
                  </button>
                )}
              </div>

              <form
                onSubmit={handleSubmitComment}
                className="p-4 border-t space-y-2"
              >
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={
                      !commentText.trim() ||
                      !name.trim() ||
                      connectionStatus !== "connected"
                    }
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
