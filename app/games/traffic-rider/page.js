'use client';
import { useEffect, useRef } from 'react';

const TrafficRiderGame = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.width = `${window.innerWidth}px`;
        iframeRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    handleResize();

    const iframeLoadHandler = () => {
      if (iframeRef.current) {
        try {
          // Attempt to remove watermarks (may not work due to CORS)
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
          if (iframeDoc) {
            const watermarkElements = iframeDoc.querySelectorAll('.watermark, .footer, .branding, .css-1h1938b, .MuiGrid-container, .MuiGrid-wrap-xs-nowrap, .css-1xe247z');
            watermarkElements.forEach(el => el.remove());
            
            const gameContainer = iframeDoc.querySelector('#game-container') || iframeDoc.body;
            if (gameContainer) {
              gameContainer.style.overflow = 'hidden';
              gameContainer.style.margin = '0';
              gameContainer.style.padding = '0';
            }
          }
        } catch (e) {
          console.log('Could not access iframe document due to cross-origin policy');
        }
      }
    };

    const currentIframe = iframeRef.current;
    currentIframe?.addEventListener('load', iframeLoadHandler);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentIframe?.removeEventListener('load', iframeLoadHandler);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'black'
    }}>
      <iframe
        ref={iframeRef}
        src="https://www.crazygames.com/embed/traffic-rider-vvq"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        allow="gamepad *; fullscreen *"
        allowFullScreen
        title="Traffic Rider Game"
        loading="eager"
      />
    </div>
  );
};

export default TrafficRiderGame;