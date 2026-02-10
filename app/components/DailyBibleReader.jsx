// app/components/DailyBibleReader.jsx
"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import DateSelector from "./DateSelector";
import PlaylistRow from "./PlaylistRow";
import ShareButton from "./ShareButton";

export default function DailyBibleReader() {
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchDailyVideos = async (date) => {
    try {
      setLoading(true);
      const dateParam = date || selectedDate;
      const response = await fetch(`/api/daily-bible?date=${dateParam}`);

      if (!response.ok) throw new Error("Failed to fetch videos");

      const data = await response.json();
      setDailyData(data);
      setSelectedDate(data.date);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyVideos();
  }, []);

  const handleDateChange = (newDate) => {
    fetchDailyVideos(newDate);
  };

  const handleSelectPlaylistDate = (date) => {
    fetchDailyVideos(date);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const oldTestamentVideo = dailyData?.videos?.find(
    (v) => v.video_group === "old"
  );
  const newTestamentVideo = dailyData?.videos?.find(
    (v) => v.video_group === "new"
  );

  return (
    <div className="min-h-screen bg-gray-50 bg-[url('/images/2148336420.jpg')]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="text-center mb-6">
            <div className="flex justify-end mb-2">
              <ShareButton date={selectedDate} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Daily Bible Reading
            </h1>
            <p className="text-lg text-gray-600">
              Watch and learn with Old & New Testament stories
            </p>
          </div>

          {/* Current Date Display */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 transition-transform hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full mb-2 shadow-sm">
                  <span className="text-sm font-semibold text-[#4b1e8a]">
                    {dailyData?.isToday ? "TODAY'S READING" : "READING FOR"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#4b1e8a]">
                  {dailyData ? formatDate(dailyData.date) : ""}
                </h2>
              </div>

              <DateSelector
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                className="md:ml-auto"
              />
            </div>

            {!dailyData?.isToday && (
              <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl inline-flex items-center gap-3 shadow-inner">
                <span className="text-lg animate-pulse">⏰</span>
                <span className="font-medium text-black">
                  Catching up on a previous reading
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Main Videos Section */}
        <div className="mb-12">
          {/* Status Messages */}
          {loading && (
            <div className="text-center py-16 bg-white rounded-xl shadow">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-900 border-t-transparent mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 font-medium">
                Loading today's Bible story...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 p-6 rounded-xl mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-red-600">❌</span>
                <div>
                  <h3 className="text-lg font-bold text-red-700">Error</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Single Video Player Component */}
          {!loading && !error && dailyData && (
            <>
              {dailyData.videos?.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow">
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    No stories available today
                  </h3>
                  <p className="text-gray-600">
                    Check back soon for new Bible readings
                  </p>
                </div>
              ) : (
                <VideoPlayer
                  oldVideo={oldTestamentVideo}
                  newVideo={newTestamentVideo}
                />
              )}
            </>
          )}
        </div>

        {/* Playlist Row */}
        {!loading && dailyData && (
          <PlaylistRow
            currentDate={dailyData.date}
            previousDates={dailyData.previousDates}
            onSelectDate={handleSelectPlaylistDate}
            isToday={dailyData.isToday}
          />
        )}
      </div>
    </div>
  );
}
