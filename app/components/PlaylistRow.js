// app/components/PlaylistRow.jsx
"use client";

import { useState } from "react";

// Image URLs for each day (you can replace these with actual images)
const DATE_IMAGES = {
  default: "images/bible-image.png", // Default Bible study image
  today: "images/bible-image.png",
  recent: "images/bible-image.png",
  yesterday: "images/bible-image.png",
};

const DAY_EMOJIS = {
  today: "🎯",
  yesterday: "📅",
  recent: "📖",
  default: "📅",
};

export default function PlaylistRow({
  currentDate,
  previousDates,
  onSelectDate,
  isToday,
}) {
  const [imageErrors, setImageErrors] = useState({});

  const formatPlaylistDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return {
        display: "TODAY",
        isToday: true,
        emoji: DAY_EMOJIS.today,
        image: DATE_IMAGES.today,
        type: "today",
      };
    }

    // Check if date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return {
        display: "YESTERDAY",
        isYesterday: true,
        emoji: DAY_EMOJIS.yesterday,
        image: DATE_IMAGES.yesterday,
        type: "yesterday",
      };
    }

    // Check if it's this week
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) {
      return {
        display: date.toLocaleDateString("en-US", { weekday: "long" }),
        emoji: DAY_EMOJIS.recent,
        isRecent: true,
        image: DATE_IMAGES.recent,
        type: "recent",
      };
    }

    return {
      display: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      emoji: DAY_EMOJIS.default,
      image: DATE_IMAGES.default,
      type: "default",
    };
  };

  const isCurrentDate = (date) => date === currentDate;

  const handleImageError = (date) => {
    setImageErrors((prev) => ({ ...prev, [date]: true }));
  };

  return (
    <div className="mt-12">
      {/* Playlist Header */}
      <div className="rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-white ">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-800 mb-3">
            Watch Previous Stories
          </h2>
          <p className="text-xl text-gray-700">
            Missed a day? Catch up here! Click any date to watch
          </p>
        </div>
        <div className="">
          {previousDates.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4">🎉</span>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                You&apos;re all caught up!
              </h3>
              <p className="text-gray-600">
                No previous stories to watch. Great job!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previousDates.map((date) => {
                  const formatted = formatPlaylistDate(date);
                  const current = isCurrentDate(date);
                  const showImage = !imageErrors[date];

                  return (
                    <button
                      key={date}
                      onClick={() => onSelectDate(date)}
                      className={`
                      relative group overflow-hidden transform transition-all duration-300
                      ${
                        current
                          ? "scale-105 ring-4 ring-yellow-400 ring-offset-2"
                          : "hover:scale-110"
                      }
                      rounded-xl
                    `}
                    >
                      <div
                        className={`
                      h-full rounded-xl overflow-hidden relative
                      ${current ? "shadow-2xl" : "shadow-lg"}
                    `}
                      >
                        {/* Background Image or Gradient */}
                        {showImage ? (
                          <div className="absolute inset-0">
                            <img
                              src={formatted.image}
                              alt={formatted.display}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(date)}
                            />
                            {/* Dark overlay for better text visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                          </div>
                        ) : (
                          <div
                            className={`
                            absolute inset-0 bg-gradient-to-br
                            ${
                              current
                                ? "from-yellow-400 to-orange-400"
                                : formatted.isToday
                                ? "from-blue-500 to-purple-500"
                                : formatted.isYesterday
                                ? "from-purple-500 to-pink-500"
                                : formatted.isRecent
                                ? "from-green-500 to-teal-500"
                                : "from-gray-700 to-gray-900"
                            }
                          `}
                          />
                        )}

                        {/* Content Overlay */}
                        <div className="relative h-full min-h-[140px] flex flex-col items-center justify-center p-4">
                          {/* Date Emoji - Large and centered */}
                          <div className="text-4xl mb-3 drop-shadow-lg">
                            {formatted.emoji}
                          </div>

                          {/* Day Label */}
                          <div className="mb-2">
                            <span
                              className={`
                            text-xl font-bold drop-shadow-lg
                            ${
                              current || !showImage
                                ? "text-white"
                                : "text-white"
                            }
                          `}
                            >
                              {formatted.display}
                            </span>
                          </div>

                          {/* Date Number */}
                          <div
                            className={`
                          text-sm font-bold px-3 py-1.5 rounded-full inline-block backdrop-blur-sm
                          ${
                            current
                              ? "bg-white/30 text-white border border-white/50"
                              : showImage
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-white/30 text-white border border-white/50"
                          }
                        `}
                          >
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>

                          {/* Current Playing Indicator */}
                          {current && (
                            <div className="absolute top-2 right-2">
                              <div className="animate-pulse bg-white/90 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                ▶ PLAYING
                              </div>
                            </div>
                          )}

                          {/* Hover Overlay */}
                          {!current && (
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-2xl">▶</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Subtle glow effect on hover */}
                      {!current && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instructions */}
              <div className="mt-8 pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">How to use:</p>
                      <p className="text-gray-600 text-sm">
                        Click any date card above to watch that day&apos; Bible
                        reading.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                      <span className="text-sm font-bold text-gray-700">
                        Now Playing
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                      <span className="text-sm font-bold text-gray-700">
                        Click to Watch
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Quick Navigation */}
      {previousDates.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onSelectDate(previousDates[0])}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">⏪</span>
            <span>Watch Most Recent</span>
          </button>
          <button
            onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split("T")[0];
              onSelectDate(yesterdayStr);
            }}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">📅</span>
            <span>Watch Yesterday</span>
          </button>
        </div>
      )}
    </div>
  );
}
