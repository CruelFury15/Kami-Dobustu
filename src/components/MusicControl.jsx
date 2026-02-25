import { useState, useEffect } from 'react';
import audioManager from '../utils/audioManager';
import { useLocation } from 'react-router-dom';

function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

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

  // Show at top on Questions and Results pages, bottom on Home
  const isTopPosition = location.pathname === '/questions' || location.pathname === '/results';
  
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

  const buttonStyle = {
    position: 'fixed',
    zIndex: 1000,
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: isPlaying ? 'rgba(252, 211, 77, 0.9)' : 'rgba(107, 114, 128, 0.9)',
    border: '2px solid rgba(252, 211, 77, 0.6)',
    color: isPlaying ? '#1f2937' : '#f3f4f6',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    opacity: isVisible ? 1 : 0.3,
    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
  };

  // Position based on page
  if (isTopPosition) {
    buttonStyle.top = '20px';
    buttonStyle.right = '20px';
  } else {
    buttonStyle.bottom = '20px';
    buttonStyle.right = '20px';
  }

  return (
    <button
      onClick={toggleMusic}
      className={`music-control ${isVisible ? 'visible' : 'hidden'}`}
      style={buttonStyle}
      title={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      {isPlaying ? '🔇' : '🔊'}
    </button>
  );
}

export default MusicControl;
