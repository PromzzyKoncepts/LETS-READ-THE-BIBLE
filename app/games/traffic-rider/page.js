'use client';
import { useEffect, useRef } from 'react';

const TrafficRiderGame = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Adjust iframe height based on window resize
    const handleResize = () => {
      if (iframeRef.current) {
        // Calculate height based on viewport, leaving some space for UI
        const viewportHeight = window.innerHeight;
        const calculatedHeight = Math.min(viewportHeight - 100, 800); // Max height 800px
        iframeRef.current.style.height = `${calculatedHeight}px`;
      }
    };

    // Set initial height
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="game-container">
      <iframe
        ref={iframeRef}
        src="https://www.crazygames.com/embed/traffic-rider-vvq"
        style={{
          width: '100%',
          height:'100vh',
          border: 'none',
          // borderRadius: '8px',
          overflow: 'hidden',
        }}
        allow="gamepad *; fullscreen *"
        allowFullScreen
        title="Traffic Rider Game"
        loading="eager"
      />
      
      <style jsx>{`
        .game-container {
          max-width: 100%;
          margin: 0 auto;
          // padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default TrafficRiderGame;