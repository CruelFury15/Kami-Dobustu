import { motion as Motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const OracleLoader = () => {
  const audioRef = useRef(null);
  
  const [particles] = useState(() => 
    [...Array(6)].map(() => ({
      top: 20 + Math.random() * 60,
      left: 20 + Math.random() * 60,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }))
  );

  useEffect(() => {
    try {
      const ambient = new Audio('/audios/mystery.mp3');
      ambient.loop = true;
      ambient.volume = 0.8;
      ambient.play().catch(() => {
      });
      audioRef.current = ambient;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      zIndex: 1000
    }}>
      <div className="loader-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        padding: '-20px'
      }}>
      
      <Motion.div 
        className="moon"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fcd34d, #f59e0b, #d97706)',
          boxShadow: '0 0 60px rgba(252, 211, 77, 0.8), inset -20px -20px 40px rgba(0,0,0,0.2)',
          position: 'relative',
          marginBottom: '-50px'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '25%',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '30%',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '40%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.06)',
        }} />
      </Motion.div>

      <Motion.div
        className="oracle-orbit"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          marginTop: '-100px',
          marginLeft: '-100px',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <Motion.div
          className="oracle-symbol"
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            marginLeft: '-20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #fcd34d, #f59e0b)',
            boxShadow: '0 0 25px rgba(252, 211, 77, 1), 0 0 40px rgba(252, 211, 77, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            border: '2px solid rgba(255, 255, 255, 0.5)'
          }}
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          🔮
        </Motion.div>
      </Motion.div>

      <Motion.div
        className="mystical-orbit"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '320px',
          height: '320px',
          marginTop: '-160px',
          marginLeft: '-160px',
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {['✨', '🌟', '⭐', '💫'].map((symbol, index) => (
          <Motion.div
            key={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '20px',
              height: '20px',
              marginTop: '-10px',
              marginLeft: '-10px',
              fontSize: '16px',
              transform: `rotate(${index * 90}deg) translateY(-160px)`,
              transformOrigin: '10px 160px'
            }}
            animate={{ 
              rotate: 360,
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
            }}
          >
            {symbol}
          </Motion.div>
        ))}
      </Motion.div>

      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="oracle-whisper"
        style={{
          color: '#fcd34d',
          fontSize: '2.0rem',
          textAlign: 'center',
          fontStyle: 'italic',
          textShadow: '0 0 15px rgba(252, 211, 77, 0.8)',
          marginTop: '40px',
          fontWeight: '300'
        }}
      >
        Peering through the veil of your journey...
      </Motion.p>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '8px'
        }}
      >
        {[0, 1, 2].map((index) => (
          <Motion.div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#fcd34d'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 3, duration: 4, repeat: Infinity }}
        style={{
          marginTop: '30px',
          color: '#d1d5db',
          fontSize: '1.5rem',
          textAlign: 'center'
        }}
      >
        The Kami Dobutsu awakens...
      </Motion.div>

      {particles.map((particle, index) => (
        <Motion.div
          key={`particle-${index}`}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#fcd34d',
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
    </div>
  );
};

export default OracleLoader;