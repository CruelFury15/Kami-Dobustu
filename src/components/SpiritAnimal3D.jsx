import { motion } from 'framer-motion';

// Import all animal images
import WolfImg from '../assets/Wolf.jpg';
import BearImg from '../assets/Bear.jpg';
import FoxImg from '../assets/Fox.jpg';
import OwlImg from '../assets/Owl.jpg';
import DolphinImg from '../assets/Dolphin.jpg';
import TigerImg from '../assets/Tiger.jpg';
import ButterflyImg from '../assets/Butterfly.jpg';
import LionImg from '../assets/Lion.jpg';
import RavenImg from '../assets/Raven.jpg';
import DeerImg from '../assets/Deer.jpg';
import SnakeImg from '../assets/Snake.jpg';
import HawkImg from '../assets/Hawk.jpg';
import TurtleImg from '../assets/Turtle.jpg';
import HummingBirdImg from '../assets/HummingBird.jpg';
import BatImg from '../assets/Bat.jpg';
import LeopardImg from '../assets/Leopard.jpg';
import PenguinImg from '../assets/Penguin.jpg';

const SpiritAnimal3D = ({ animal, element, imageUrl }) => {
  // Map animal names to imported images
  const animalImages = {
    'Wolf': WolfImg,
    'Bear': BearImg,
    'Fox': FoxImg,
    'Owl': OwlImg,
    'Dolphin': DolphinImg,
    'Tiger': TigerImg,
    'Butterfly': ButterflyImg,
    'Lion': LionImg,
    'Raven': RavenImg,
    'Deer': DeerImg,
    'Snake': SnakeImg,
    'Hawk': HawkImg,
    'Eagle': HawkImg, // Eagle uses Hawk image
    'Turtle': TurtleImg,
    'Hummingbird': HummingBirdImg,
    'Bat': BatImg,
    'Leopard': LeopardImg,
    'Penguin': PenguinImg
  };

  const localImage = animalImages[animal] || WolfImg;
  const elementColors = {
    'Fire': { primary: '#ff6b35', glow: 'rgba(255, 107, 53, 0.6)' },
    'Water': { primary: '#4facfe', glow: 'rgba(79, 172, 254, 0.6)' },
    'Earth': { primary: '#d2691e', glow: 'rgba(210, 105, 30, 0.6)' },
    'Air': { primary: '#a8edea', glow: 'rgba(168, 237, 234, 0.6)' },
    'Spirit': { primary: '#667eea', glow: 'rgba(102, 126, 234, 0.6)' }
  };

  const colors = elementColors[element] || elementColors['Spirit'];

  return (
    <motion.div
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        margin: '0 auto',
        cursor: 'pointer'
      }}
    >
      {/* Glowing background */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '20px',
          background: `radial-gradient(circle, ${colors.glow}, transparent)`,
          filter: 'blur(30px)',
          zIndex: 0
        }}
      />

      {/* Main image container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        border: `3px solid ${colors.primary}`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${colors.glow}`,
        zIndex: 1
      }}>
        {/* Animated image with slow motion effect */}
        <motion.img
          src={imageUrl || localImage}
          alt={animal}
          animate={{
            scale: [1, 1.08, 1],
            x: [0, -5, 5, -3, 0],
            y: [0, 3, -3, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Element badge - rounded pill */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 20px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          border: `2px solid ${colors.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>
            {element === 'Fire' ? '🔥' : element === 'Water' ? '💧' : element === 'Earth' ? '🌍' : element === 'Air' ? '💨' : '✨'}
          </span>
          <span style={{
            color: colors.primary,
            fontSize: '1rem',
            fontWeight: '600',
            textShadow: `0 0 10px ${colors.glow}`
          }}>
            {element}
          </span>
        </div>
      </div>

      {/* Corner sparkles */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '10px',
            height: '10px',
            background: colors.primary,
            borderRadius: '50%',
            boxShadow: `0 0 20px ${colors.glow}`,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-160px)`
          }}
        />
      ))}
    </motion.div>
  );
};

export default SpiritAnimal3D;
