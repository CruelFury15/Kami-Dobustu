import { useState, useEffect } from 'react';
import audioManager from '../utils/audioManager';

function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Update state when audio manager changes
    const interval = setInterval(() => {
      setIsPlaying(audioManager.isMusicPlaying());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    const newState = audioManager.toggleBackgroundMusic();
    setIsPlaying(newState);
  };

  // Hide on mobile when scrolling
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsVisible(true), 1000);
    };

    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className={`music-control ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: isPlaying ? 'rgba(252, 211, 77, 0.9)' : 'rgba(107, 114, 128, 0.9)',
        border: '2px solid rgba(252, 211, 77, 0.6)',
        color: isPlaying ? '#1f2937' : '#f3f4f6',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        opacity: isVisible ? 1 : 0.3,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      }}
      title={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      {isPlaying ? '🔇' : '🔊'}
    </button>
  );
}

export default MusicControl;
