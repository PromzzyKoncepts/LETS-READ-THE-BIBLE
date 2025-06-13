'use client';
import { useEffect, useRef, useState } from 'react';

const TrafficRiderGame = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);

  useEffect(() => {
    // Encode the game URL for the proxy
    const gameUrl = encodeURIComponent('https://www.crazygames.com/embed/traffic-rider-vvq');
    setProxyUrl(`/api/proxy?url=${gameUrl}`);

    const handleResize = () => {
      if (iframeRef.current) {
        const viewportHeight = window.innerHeight;
        const calculatedHeight = Math.min(viewportHeight - 100, 800);
        iframeRef.current.style.height = `${calculatedHeight}px`;
      }
    };

    // Set initial height
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="game-container">
      {proxyUrl ? (
        <iframe
          ref={iframeRef}
          src={proxyUrl}
          style={{
            width: '100%',
            height: '600px', // Initial height before resize calculation
            border: 'none',
            overflow: 'hidden',
          }}
          allow="gamepad *; fullscreen *"
          allowFullScreen
          title="Traffic Rider Game"
          loading="eager"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      ) : (
        <div>Loading game...</div>
      )}
    </div>
  );
};

export default TrafficRiderGame;