// app/components/VideoPlayer.jsx
"use client";

import { useState } from "react";
import ShareModal from "./ShareModal";

export default function VideoPlayer({ oldVideo, newVideo }) {
  const [activeTab, setActiveTab] = useState("old");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const currentVideo = activeTab === "old" ? oldVideo : newVideo;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoTitle={currentVideo?.title}
        videoGroup={activeTab}
        date={currentVideo?.date}
      />

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-full">
        <button
          onClick={() => setActiveTab("old")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-center font-semibold transition-all duration-300 ${
            activeTab === "old"
              ? "bg-[#132576] text-white shadow-lg shadow-amber-200/50"
              : "text-gray-600 hover:text-amber-600 hover:bg-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            />
          </svg>
          Old Testament
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-center font-semibold transition-all duration-300 ${
            activeTab === "new"
              ? "bg-[#b1571b] text-white shadow-lg shadow-blue-200/50"
              : "text-gray-600 hover:text-blue-600 hover:bg-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            />
          </svg>
          New Testament
        </button>
      </div>
      {/* Video Container */}
      <div className="bg-[hsl(37,100%,95%)] rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Video Header */}
        <div
          className={`px-8 py-6 ${
            activeTab === "old" ? "bg-[#132576]" : "bg-[#b1571b]"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl backdrop-blur-sm bg-white/10 ${
                    activeTab === "old" ? "bg-amber-500/20" : "bg-blue-500/20"
                  }`}
                >
                  {activeTab === "old" ? (
                    <span className="text-2xl">📜</span>
                  ) : (
                    <span className="text-2xl">✝️</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {activeTab === "old"
                      ? "Old Testament Story"
                      : "New Testament Story"}
                  </h2>
                  <p className="text-sm opacity-90 font-light text-white ">
                    {activeTab === "old"
                      ? "From the beginning of God's Word"
                      : "About Jesus and His teachings"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video Content */}
        <div className="p-8">
          {/* Video Title and Date */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentVideo?.title || "No video available"}
                </h3>
                {currentVideo?.date && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">
                      {formatDate(currentVideo.date)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {isPlaying && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Now Playing
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Single Video Player */}
          <div className="relative group">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-800">
              {currentVideo ? (
                <video
                  key={currentVideo.video_link}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                  title={currentVideo.title}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  poster={currentVideo.thumbnail || undefined}
                >
                  <source src={currentVideo.video_link} type="video/mp4" />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                        <span className="text-5xl">📺</span>
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold mb-2">
                          Video Unsupported
                        </p>
                        <p className="text-gray-400">
                          Your browser doesn&apos;t support this video format
                        </p>
                      </div>
                    </div>
                  </div>
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center space-y-6">
                    <div className="inline-flex p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <span className="text-6xl">📖</span>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-bold mb-2">
                        Content Coming Soon
                      </p>
                      <p className="text-gray-400 max-w-md">
                        No {activeTab === "old" ? "Old" : "New"} Testament video
                        available at the moment
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Overlay Controls */}
            {currentVideo && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="pointer-events-auto">
                    <button className="p-3 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 22v-20l18 10-18 10z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                      activeTab === "old"
                        ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200"
                        : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {activeTab === "old" ? "Old Testament" : "New Testament"}
                  </span>
                  {currentVideo?.video_group && (
                    <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">
                      Daily Reading
                    </span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed max-w-2xl">
                  {activeTab === "old"
                    ? "This story comes from the first part of the Bible, revealing God's eternal plan from creation through the prophets."
                    : "This teaching illuminates the life, ministry, and enduring message of Jesus Christ and the early church."}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center gap-3 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share Video</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-100">
                    {activeTab === "old" ? (
                      <span className="text-gray-600">📚</span>
                    ) : (
                      <span className="text-gray-600">✍️</span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    Reading
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {activeTab === "old" ? "Old" : "New"} Testament
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <span className="text-gray-600">⏱️</span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    Duration
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  ~5 minutes
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <span className="text-gray-600">🎬</span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    Format
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">Video</div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <span className="text-gray-600">✅</span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    Available
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  24/7 Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher Hint */}
      <div className="mt-8 px-6 py-4 bg-gradient-to-r from-gray-50/50 to-white rounded-2xl border border-gray-100">
        <p className="text-gray-600 text-sm text-center">
          Switch between{" "}
          <span className="font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Old Testament
          </span>{" "}
          and{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            New Testament
          </span>{" "}
          using the tabs above
        </p>
      </div>
    </div>
  );
}
