// app/components/ShareModal.jsx
"use client";

import { useState, useEffect } from "react";

export default function ShareModal({
  isOpen,
  onClose,
  videoTitle,
  videoGroup,
  date,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const getShareText = () => {
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

    let title = "📖 Daily Bible Reading";
    if (videoTitle && videoGroup) {
      title = `${
        videoGroup === "old" ? "📖 Old Testament" : "✝️ New Testament"
      }: ${videoTitle}`;
    }

    return `${title}${formattedDate ? ` - ${formattedDate}` : ""}

Watch this Bible reading with me! 🙏

${shareUrl}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = getShareText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareViaFacebook = () => {
    const encodedUrl = encodeURIComponent(shareUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank"
    );
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(videoTitle || "Daily Bible Reading");
    const encodedUrl = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      "_blank"
    );
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(videoTitle || "Daily Bible Reading");
    const body = encodeURIComponent(getShareText());
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaTelegram = () => {
    const text = encodeURIComponent(getShareText());
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`,
      "_blank"
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-emerald-300 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 rounded-t-xl sticky top-0">
          <div className="flex justify-between items-center">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl md:text-3xl">📤</span>
              Share This Bible Reading
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* URL Display */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2 font-bold">
              Share this link:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 overflow-hidden">
                <div className="px-3 py-2 border-2 border-emerald-200 rounded-lg bg-gray-50 text-gray-700 text-sm truncate">
                  {shareUrl}
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap ${
                  isCopied
                    ? "bg-green-100 text-green-800"
                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                }`}
              >
                {isCopied ? "✅ Copied!" : "📋 Copy Link"}
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 font-bold">Share via:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-200 hover:border-green-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">💬</span>
                <span className="font-bold text-gray-800 text-sm">
                  WhatsApp
                </span>
              </button>

              <button
                onClick={shareViaFacebook}
                className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">👥</span>
                <span className="font-bold text-gray-800 text-sm">
                  Facebook
                </span>
              </button>

              <button
                onClick={shareViaTwitter}
                className="p-3 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl border-2 border-sky-200 hover:border-sky-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">🐦</span>
                <span className="font-bold text-gray-800 text-sm">Twitter</span>
              </button>

              <button
                onClick={shareViaEmail}
                className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl border-2 border-red-200 hover:border-red-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">✉️</span>
                <span className="font-bold text-gray-800 text-sm">Email</span>
              </button>

              <button
                onClick={shareViaTelegram}
                className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-2 border-cyan-200 hover:border-cyan-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span className="text-2xl">📢</span>
                <span className="font-bold text-gray-800 text-sm">
                  Telegram
                </span>
              </button>

              {navigator.share && (
                <button
                  onClick={() =>
                    navigator.share({
                      title: videoTitle || "Daily Bible Reading",
                      text: getShareText(),
                      url: shareUrl,
                    })
                  }
                  className="p-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:scale-105 transition-all flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">📱</span>
                  <span className="font-bold text-gray-800 text-sm">
                    More...
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Native Share Button (full width) */}
          {navigator.share && (
            <button
              onClick={() =>
                navigator.share({
                  title: videoTitle || "Daily Bible Reading",
                  text: getShareText(),
                  url: shareUrl,
                })
              }
              className="w-full py-3 mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl">📱</span>
              Share with Device Options
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-center text-gray-600 text-sm">
            Share God's word with friends and family! 🙏
          </p>
          <p className="text-center text-gray-500 text-xs mt-1">
            The link will take them to this exact Bible reading
          </p>
        </div>
      </div>
    </div>
  );
}
