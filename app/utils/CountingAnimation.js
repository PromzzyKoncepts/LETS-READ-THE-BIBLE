import React, { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ targetNumber, fontSize }) => {
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const counterRef = useRef(null);

  // Format the number into K, M, or B without decimal places
  const formatNumber = (number) => {
    if (number >= 1_000_000_000) {
      return `${Math.round(number / 1_000_000_000)}B`; // Billions
    } else if (number >= 1_000_000) {
      return `${Math.round(number / 1_000_000)}M`; // Millions
    } else if (number >= 1_000) {
      return `${Math.round(number / 1_000)}K`; // Thousands
    }
    return Math.round(number); // Less than 1K, show as is
  };

  useEffect(() => {
    const handleScroll = () => {
      if (counterRef.current) {
        const rect = counterRef.current.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isVisible) {
          setStartCounting(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!startCounting) return;

    const duration = 5000; // 5 seconds
    const frameRate = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(duration / frameRate);
    const increment = targetNumber / totalFrames;

    let currentCount = 0;
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame += 1;
      currentCount += increment;
      if (frame >= totalFrames) {
        clearInterval(counterInterval);
        setCount(targetNumber);
      } else {
        setCount(currentCount);
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [startCounting, targetNumber]);

  return (
    <div
      ref={counterRef}
      className={`font-bold ${fontSize === "8" ? "md:text-8xl text-6xl" : "md:text-5xl text-4xl"} transition-all duration-300 ease-in-out font-lucky text-white tracking-wider`}
    >
      {formatNumber(count)}+
    </div>
  );
};

export default AnimatedCounter;
