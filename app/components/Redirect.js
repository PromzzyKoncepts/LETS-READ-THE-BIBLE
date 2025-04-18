"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image" 

export default function CountdownPopup({ redirectUrl }) {
  const [countdown, setCountdown] = useState(5);
  const [isClosing, setIsClosing] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const timerRef = useRef(null); 
  const router = useRouter();

  useEffect(() => {
    if (countdown <= 0) {
      router.push(redirectUrl);
      return;
    }

    // Store the timer in the ref
    timerRef.current = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => {
      // Clear the timer when component unmounts or countdown changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [countdown, redirectUrl, router]);

  const handleClose = () => {
    // Clear the countdown timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  // Animation for the countdown number
  const countdownAnimation = {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 0.5 }
  };

  if (!showPopup) return null;

  else return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      
      {/* Popup Container */}
      <div className={`relative bg-slate-200  text-slate-900 rounded-2xl p-6 max-w-xl max-h-3xl h-full w-full shadow-2xl ${isClosing ? 'scale-95' : 'scale-100'} transition-transform duration-300`}>
        {/* Decorative elements */}
        <div className="absolute -top-4 z-[99] -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold">!</span>
        </div>
        
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-slate-800">
            <Image src="/images/LBRF_4_0.png" className="w-[70%] rounded-xl mx-auto h-fit" width={500} height={500} alt="card" />
          <h2 className="text-4xl font-bold  py-4 font-lucky">Bible reading Fiesta is <span className="text-lime-600">LIVE</span> </h2>
          <p className=" text-lg mb-0">
            Redirecting you to <span className="font-bold">Fiesta Livestream</span> in...
          </p>
          
          {/* Countdown Circle */}
          <div className="flex justify-center mb-3 ">
            <div className="relative w-24 h-24">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-slate-900 bg-opacity-60"></div>
              
              {/* Animated progress circle */}
              <div 
                className="absolute font-lucky inset-0 rounded-full border-4 border-white border-opacity-30"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                  background: `conic-gradient(rgba(0, 0, 0, 0.7) ${(5 - countdown) * 20}%, transparent 0)`
                }}
              ></div>
              
              {/* Countdown number */}
              <div 
                className="absolute inset-0 flex items-center justify-center font-lucky font-bold text-4xl"
              >
                <span 
                  className="transform-gpu text-white"
                  style={{
                    transform: `scale(${countdownAnimation.scale.join(',')})`,
                    opacity: countdownAnimation.opacity.join(','),
                    transition: `all ${countdownAnimation.transition.duration}s`
                  }}
                >
                  {countdown}
                </span>
              </div>
            </div>
          </div>
          
          
          <div className="flex flex-col font-lucky tracking-wider sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleClose}
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Stay on this page
            </button>
            
            <button 
              onClick={() => router.push(redirectUrl)}
              className="px-6 py-3 bg-gradient-to-t from-lime-700 to-lime-500 text-slate-800 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Go now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}