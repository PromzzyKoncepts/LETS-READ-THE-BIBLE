// app/components/PlaylistSidebar.jsx
"use client";

export default function PlaylistSidebar({
  currentDate,
  previousDates,
  onSelectDate,
}) {
  const formatPlaylistDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return { display: "Today", isToday: true };
    }

    // Check if date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return { display: "Yesterday", isYesterday: true };
    }

    return {
      display: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  };

  const isCurrentDate = (date) => date === currentDate;

  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 rounded-t-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            Reading Playlist
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Catch up on missed readings
          </p>
        </div>

        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {previousDates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No previous readings available</p>
            </div>
          ) : (
            <div className="space-y-2">
              {previousDates.map((date) => {
                const formatted = formatPlaylistDate(date);
                return (
                  <button
                    key={date}
                    onClick={() => onSelectDate(date)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isCurrentDate(date)
                        ? "bg-blue-50 border-2 border-blue-200"
                        : "hover:bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCurrentDate(date)
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {formatted.display}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      {isCurrentDate(date) && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Now Playing
                        </span>
                      )}
                    </div>
                    {formatted.isToday && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Latest
                      </span>
                    )}
                    {formatted.isYesterday && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                        Recent
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Current Date Indicator */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Currently viewing:</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-800">
                {formatPlaylistDate(currentDate).display}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(currentDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
