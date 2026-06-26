"use client";
import { useState, useEffect, useRef } from "react";
import { readingPlan, months } from "../data/readingPlanData";

export default function ReadingPlanPage() {
  const today = new Date();
  const todayMonth = months[today.getMonth()];
  const todayDay = today.getDate();

  const [selectedYear, setSelectedYear] = useState("year1");
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);
  const [completed, setCompleted] = useState({});
  const todayRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bible-reading-plan-progress");
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedMonth, selectedYear]);

  const toggleDay = (key) => {
    setCompleted((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("bible-reading-plan-progress", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const currentMonthEntries = readingPlan[selectedYear]?.[selectedMonth] ?? [];

  const totalDaysInYear = months.reduce(
    (acc, m) => acc + (readingPlan[selectedYear]?.[m]?.length ?? 0),
    0
  );
  const completedInYear = months.reduce((acc, m) => {
    const entries = readingPlan[selectedYear]?.[m] ?? [];
    return acc + entries.filter((e) => completed[`${selectedYear}-${m}-${e.day}`]).length;
  }, 0);

  const completedInMonth = currentMonthEntries.filter(
    (e) => completed[`${selectedYear}-${selectedMonth}-${e.day}`]
  ).length;

  const yearProgress = totalDaysInYear > 0 ? Math.round((completedInYear / totalDaysInYear) * 100) : 0;
  const monthProgress =
    currentMonthEntries.length > 0
      ? Math.round((completedInMonth / currentMonthEntries.length) * 100)
      : 0;

  const isToday = (month, day) => month === todayMonth && day === todayDay;

  return (
    <>
      <style jsx global>{`
        .rp-page {
          background: #e8f4ff;
          background-image:
            radial-gradient(circle at 10% 15%, rgba(238,120,34,0.1) 0%, transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(99,18,96,0.08) 0%, transparent 40%);
          min-height: 100vh;
        }
        .rp-hero {
          background: linear-gradient(135deg, #631260 0%, #8b1a88 60%, #a0208d 100%);
        }
        .rp-year-btn-active {
          background: linear-gradient(to right, #EE7822, #EFB741);
          color: #1a0a00;
          box-shadow: 0 4px 14px rgba(238,120,34,0.4);
        }
        .rp-year-btn {
          background: rgba(255,255,255,0.15);
          color: white;
        }
        .rp-month-active {
          background: linear-gradient(to bottom right, #EE7822, #EFB741);
          color: #1a0a00;
          box-shadow: 0 3px 10px rgba(238,120,34,0.3);
        }
        .rp-month-today {
          background: rgba(99,18,96,0.12);
          color: #631260;
          border: 2px solid #631260;
        }
        .rp-month-idle {
          background: white;
          color: #555;
          border: 1px solid #e0e0e0;
        }
        .rp-row {
          background: white;
          border: 1px solid #e8e8f0;
        }
        .rp-row:hover {
          border-color: #c5a8f0;
          box-shadow: 0 2px 8px rgba(99,18,96,0.08);
        }
        .rp-row-today {
          background: linear-gradient(to right, #fff8f0, #fff3e0);
          border: 2px solid #EE7822;
          box-shadow: 0 3px 12px rgba(238,120,34,0.18);
        }
        .rp-row-done {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }
        .rp-progress-bar {
          background: linear-gradient(to right, #EE7822, #EFB741);
        }
        .rp-progress-track {
          background: rgba(255,255,255,0.25);
        }
        .rp-progress-track-light {
          background: #e5e7eb;
        }
      `}</style>

      <div className="rp-page pb-24 md:pb-10 font-sniglet">
        {/* Hero header */}
        <div className="rp-hero pt-24 pb-10 px-5 md:px-16 text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-amber-300 text-sm font-lucky tracking-widest uppercase mb-1">
              2-Year Plan
            </p>
            <h1 className="font-lucky text-3xl md:text-5xl mb-2 text-white">
              Bible Reading Plan
            </h1>
            <p className="text-purple-200 text-sm md:text-base max-w-xl">
              One passage from the New Testament and one from the Old Testament — every single day.
            </p>

            {/* Year toggle */}
            <div className="flex gap-3 mt-6">
              {["year1", "year2"].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-6 py-2 rounded-full font-lucky text-sm transition-all duration-300 ${
                    selectedYear === y ? "rp-year-btn-active" : "rp-year-btn"
                  }`}
                  style={
                    selectedYear === y
                      ? { background: "linear-gradient(to right, #EE7822, #EFB741)", color: "#1a0a00", boxShadow: "0 4px 14px rgba(238,120,34,0.4)" }
                      : { background: "rgba(255,255,255,0.15)", color: "white" }
                  }
                >
                  {y === "year1" ? "Year 1" : "Year 2"}
                </button>
              ))}
            </div>

            {/* Year progress */}
            <div className="mt-5 max-w-md">
              <div className="flex justify-between text-xs text-purple-200 mb-1">
                <span>{completedInYear} of {totalDaysInYear} days read</span>
                <span className="font-lucky">{yearProgress}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden rp-progress-track">
                <div
                  className="h-full rounded-full transition-all duration-500 rp-progress-bar"
                  style={{ width: `${yearProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 mt-6">
          {/* Month selector */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {months.map((m) => {
                const entries = readingPlan[selectedYear]?.[m] ?? [];
                const done = entries.filter((e) => completed[`${selectedYear}-${m}-${e.day}`]).length;
                const pct = entries.length > 0 ? Math.round((done / entries.length) * 100) : 0;
                const isCurrentMonth = m === todayMonth;
                const isActive = m === selectedMonth;
                return (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`flex flex-col items-center px-4 py-2 rounded-xl text-xs font-lucky transition-all duration-300 min-w-[68px] shadow-sm`}
                    style={
                      isActive
                        ? { background: "linear-gradient(to bottom right, #EE7822, #EFB741)", color: "#1a0a00", boxShadow: "0 3px 10px rgba(238,120,34,0.3)", transform: "scale(1.05)" }
                        : isCurrentMonth
                        ? { background: "rgba(99,18,96,0.1)", color: "#631260", border: "2px solid #631260" }
                        : { background: "white", color: "#666", border: "1px solid #e0e0e0" }
                    }
                  >
                    <span>{m.slice(0, 3)}</span>
                    {pct > 0 && (
                      <span className={`mt-0.5 text-[10px] ${isActive ? "text-amber-900" : "text-green-600"}`}>
                        {pct}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Month header + legend */}
          <div className="mt-5 mb-3 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-lucky text-2xl text-[#631260]">{selectedMonth}</h2>
              <p className="text-gray-500 text-xs mt-0.5">
                {completedInMonth} / {currentMonthEntries.length} days completed
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ background: "linear-gradient(to right,#EE7822,#EFB741)" }} />
                Today
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-200 border border-green-400" />
                Done
              </span>
            </div>
          </div>

          {/* Month progress bar */}
          <div className="h-1.5 rounded-full mb-5 overflow-hidden rp-progress-track-light">
            <div
              className="h-full rounded-full transition-all duration-500 rp-progress-bar"
              style={{ width: `${monthProgress}%` }}
            />
          </div>

          {/* Column headers — desktop only */}
          <div className="hidden md:grid grid-cols-[44px_1fr_1fr_48px] gap-3 text-xs text-gray-400 uppercase tracking-wider font-lucky px-4 mb-2">
            <span>Day</span>
            <span>New Testament</span>
            <span>Old Testament</span>
            <span className="text-center">Done</span>
          </div>

          {/* Reading entries */}
          <div className="flex flex-col gap-2">
            {currentMonthEntries.map((entry) => {
              const key = `${selectedYear}-${selectedMonth}-${entry.day}`;
              const isDone = !!completed[key];
              const isTodayEntry = isToday(selectedMonth, entry.day);

              return (
                <div
                  key={entry.day}
                  ref={isTodayEntry ? todayRef : null}
                  onClick={() => toggleDay(key)}
                  className="grid grid-cols-[44px_1fr_48px] md:grid-cols-[44px_1fr_1fr_48px] gap-3 items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 select-none"
                  style={
                    isTodayEntry
                      ? { background: "linear-gradient(to right, #fff8f0, #fff3e0)", border: "2px solid #EE7822", boxShadow: "0 3px 12px rgba(238,120,34,0.18)" }
                      : isDone
                      ? { background: "#f0fdf4", border: "1px solid #bbf7d0" }
                      : { background: "white", border: "1px solid #e8e8f0" }
                  }
                >
                  {/* Day number */}
                  <span
                    className="font-lucky text-lg"
                    style={{
                      color: isTodayEntry ? "#EE7822" : isDone ? "#16a34a" : "#9ca3af",
                    }}
                  >
                    {entry.day}
                  </span>

                  {/* NT + OT */}
                  <div className="md:contents flex flex-col gap-0.5">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: isTodayEntry ? "#92400e" : isDone ? "#15803d" : "#1e2a3a" }}
                    >
                      {entry.nt}
                    </span>
                    {/* OT — shown inline on mobile, in own column on desktop */}
                    <span
                      className="text-sm md:hidden"
                      style={{ color: isTodayEntry ? "#b45309" : isDone ? "#166534" : "#6b7280" }}
                    >
                      {entry.ot}
                    </span>
                    <span
                      className="text-sm hidden md:block"
                      style={{ color: isTodayEntry ? "#b45309" : isDone ? "#166534" : "#6b7280" }}
                    >
                      {entry.ot}
                    </span>
                  </div>

                  {/* Checkbox */}
                  <div className="flex justify-center">
                    <div
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        background: isDone ? "#22c55e" : "transparent",
                        borderColor: isDone ? "#22c55e" : isTodayEntry ? "#EE7822" : "#d1d5db",
                      }}
                    >
                      {isDone && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {currentMonthEntries.length === 0 && (
            <div className="text-center text-gray-400 py-16">
              <p className="text-4xl mb-3">📖</p>
              <p>No readings found for this month.</p>
            </div>
          )}

          {/* Reset */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                if (confirm("Reset all progress for this month?")) {
                  setCompleted((prev) => {
                    const next = { ...prev };
                    currentMonthEntries.forEach((e) => {
                      delete next[`${selectedYear}-${selectedMonth}-${e.day}`];
                    });
                    try {
                      localStorage.setItem("bible-reading-plan-progress", JSON.stringify(next));
                    } catch {}
                    return next;
                  });
                }
              }}
              className="text-xs text-gray-400 hover:text-[#631260] underline transition-colors"
            >
              Reset this month
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
