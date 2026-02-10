// app/components/DateSelector.jsx
"use client";

export default function DateSelector({ selectedDate, onDateChange }) {
  const today = new Date().toISOString().split("T")[0];

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    onDateChange(date.toISOString().split("T")[0]);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const nextDay = date.toISOString().split("T")[0];

    // Don't allow future dates
    if (nextDay > today) return;
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(today);
  };

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-3  ">
      <button
        onClick={goToPreviousDay}
        className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl hover:scale-110 transition-transform shadow"
        title="Previous day"
      >
        <svg
          className="w-6 h-6 text-blue-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          max={today}
          className="px-4 py-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 text-lg font-bold text-center min-w-[180px]"
        />
        <span className="absolute -top-2 left-2 px-2 bg-blue-500 text-white text-xs font-bold rounded">
          CHOOSE DATE
        </span>
      </div>

      <button
        onClick={goToNextDay}
        disabled={selectedDate >= today}
        className={`p-3 rounded-xl transition-transform shadow ${
          selectedDate >= today
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-100 to-blue-200 hover:scale-110 text-blue-700"
        }`}
        title="Next day"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <button
        onClick={goToToday}
        disabled={selectedDate === today}
        className={`px-5 py-3 rounded-xl font-bold text-lg transition-all ${
          selectedDate === today
            ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed shadow-inner"
            : "bg-[#761371] text-white hover:scale-105 shadow-lg hover:shadow-xl"
        }`}
      >
        <span className="flex items-center gap-2">
          <span>🎯</span>
          TODAY
        </span>
      </button>
    </div>
  );
}
