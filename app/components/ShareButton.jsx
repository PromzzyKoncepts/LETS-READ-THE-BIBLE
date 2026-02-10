// app/components/ShareButton.jsx
"use client";

import { useState } from "react";

export default function ShareButton({
  videoTitle = "",
  videoGroup = "",
  date = "",
}) {
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getShareText = () => {
    const currentUrl = window.location.href;
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

${currentUrl}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoTitle || "Daily Bible Reading",
          text: getShareText(),
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share or error occurred
        console.log("Share cancelled or failed:", error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
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

  const handleShare = async () => {
    setIsSharing(true);

    try {
      if (navigator.share) {
        await handleNativeShare();
      } else {
        await handleCopyLink();
      }
    } catch (error) {
      console.error("Error sharing:", error);
      await handleCopyLink();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`
        px-4 py-2 rounded-xl font-bold
        bg-gradient-to-r from-green-500 to-emerald-600
        text-white hover:from-green-600 hover:to-emerald-700
        transform hover:scale-105 transition-all duration-200
        shadow-lg hover:shadow-xl
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        min-w-[120px]
      `}
      title="Share this Bible reading"
    >
      {isSharing ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>Sharing...</span>
        </>
      ) : isCopied ? (
        <>
          <span className="text-xl">✅</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span className="text-xl">📤</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
}
