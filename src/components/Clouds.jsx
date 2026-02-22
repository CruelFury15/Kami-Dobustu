import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Clouds() {
  const cloudsRef = useRef([]);

  useEffect(() => {
    cloudsRef.current.forEach((cloud, index) => {
      if (cloud) {
        if (index < 6) {
          if (index % 2 === 0) {
            gsap.fromTo(cloud, 
              { x: -700 },
              {
                x: window.innerWidth + 700,
                duration: 15 + index * 2,
                repeat: -1,
                ease: 'none'
              }
            );
          } else {
            gsap.fromTo(cloud,
              { x: window.innerWidth + 700 },
              {
                x: -700,
                duration: 18 + index * 2,
                repeat: -1,
                ease: 'none'
              }
            );
          }
          
          gsap.to(cloud, {
            y: index % 2 === 0 ? 50 : -50,
            duration: 10 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
          });
        } 
        else {
          if (index % 2 === 0) {
            gsap.fromTo(cloud, 
              { x: -500 },
              {
                x: window.innerWidth + 500,
                duration: 50 + index * 5,
                repeat: -1,
                ease: 'none'
              }
            );
          } else {
            gsap.fromTo(cloud,
              { x: window.innerWidth + 500 },
              {
                x: -500,
                duration: 55 + index * 5,
                repeat: -1,
                ease: 'none'
              }
            );
          }
          
          gsap.to(cloud, {
            y: index % 2 === 0 ? 30 : -30,
            duration: 25 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
          });
        }
      }
    });
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      pointerEvents: 'none',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      <div
        ref={el => cloudsRef.current[0] = el}
        style={{
          position: 'absolute',
          top: '15%',
          left: 0,
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.5) 0%, rgba(75, 0, 130, 0.3) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />
      
      <div
        ref={el => cloudsRef.current[1] = el}
        style={{
          position: 'absolute',
          top: '25%',
          right: 0,
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 191, 255, 0.5) 0%, rgba(30, 144, 255, 0.3) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />
      
      <div
        ref={el => cloudsRef.current[2] = el}
        style={{
          position: 'absolute',
          top: '45%',
          left: 0,
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 20, 147, 0.5) 0%, rgba(199, 21, 133, 0.3) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />
      
      <div
        ref={el => cloudsRef.current[3] = el}
        style={{
          position: 'absolute',
          top: '55%',
          right: 0,
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(148, 0, 211, 0.6) 0%, rgba(138, 43, 226, 0.4) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />
      
      <div
        ref={el => cloudsRef.current[4] = el}
        style={{
          position: 'absolute',
          top: '70%',
          left: 0,
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 206, 209, 0.55) 0%, rgba(64, 224, 208, 0.35) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />
      
      <div
        ref={el => cloudsRef.current[5] = el}
        style={{
          position: 'absolute',
          top: '10%',
          right: 0,
          width: '490px',
          height: '490px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.6) 0%, rgba(255, 140, 0, 0.4) 30%, transparent 60%)',
          filter: 'blur(30px)',
          opacity: 1
        }}
      />

      <div
        ref={el => cloudsRef.current[6] = el}
        style={{
          position: 'absolute',
          top: '8%',
          left: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 230, 250, 0.4) 0%, rgba(186, 85, 211, 0.2) 30%, transparent 60%)',
          filter: 'blur(40px)',
          opacity: 0.8
        }}
      />
      
      <div
        ref={el => cloudsRef.current[7] = el}
        style={{
          position: 'absolute',
          top: '35%',
          right: '15%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.45) 0%, rgba(255, 105, 180, 0.25) 30%, transparent 60%)',
          filter: 'blur(40px)',
          opacity: 0.8
        }}
      />
      
      <div
        ref={el => cloudsRef.current[8] = el}
        style={{
          position: 'absolute',
          top: '60%',
          left: '25%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75, 0, 130, 0.5) 0%, rgba(106, 90, 205, 0.3) 30%, transparent 60%)',
          filter: 'blur(40px)',
          opacity: 0.8
        }}
      />
      
      <div
        ref={el => cloudsRef.current[9] = el}
        style={{
          position: 'absolute',
          top: '80%',
          right: '20%',
          width: '410px',
          height: '410px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 127, 80, 0.5) 0%, rgba(255, 99, 71, 0.3) 30%, transparent 60%)',
          filter: 'blur(40px)',
          opacity: 0.8
        }}
      />
    </div>
  );
}

export default Clouds;
