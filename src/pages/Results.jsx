import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { fetchOracleResult } from '../utils/api';
import OracleLoader from '../components/OracleLoader';

// Import all animal images
import BatImg from '../assets/Bat.jpg';
import BearImg from '../assets/Bear.jpg';
import ButterflyImg from '../assets/Butterfly.jpg';
import DeerImg from '../assets/Deer.jpg';
import DolphinImg from '../assets/Dolphin.jpg';
import FoxImg from '../assets/Fox.jpg';
import HawkImg from '../assets/Hawk.jpg';
import HummingBirdImg from '../assets/HummingBird.jpg';
import LeopardImg from '../assets/Leopard.jpg';
import LionImg from '../assets/Lion.jpg';
import OwlImg from '../assets/Owl.jpg';
import PenguinImg from '../assets/Penguin.jpg';
import RavenImg from '../assets/Raven.jpg';
import SnakeImg from '../assets/Snake.jpg';
import TigerImg from '../assets/Tiger.jpg';
import TurtleImg from '../assets/Turtle.jpg';
import WolfImg from '../assets/Wolf.jpg';

const createMysticalPlaceholder = (animal, element) => {
  const elementColors = {
    'Fire': { primary: '#ff6b35', secondary: '#f7931e', tertiary: '#ffcc02', glow: 'rgba(255, 107, 53, 0.6)' },
    'Water': { primary: '#4facfe', secondary: '#00f2fe', tertiary: '#43e97b', glow: 'rgba(79, 172, 254, 0.6)' },
    'Earth': { primary: '#8b5a3c', secondary: '#d2691e', tertiary: '#daa520', glow: 'rgba(210, 105, 30, 0.6)' },
    'Air': { primary: '#a8edea', secondary: '#fed6e3', tertiary: '#d299c2', glow: 'rgba(168, 237, 234, 0.6)' },
    'Spirit': { primary: '#667eea', secondary: '#764ba2', tertiary: '#f093fb', glow: 'rgba(102, 126, 234, 0.6)' }
  };

  const colors = elementColors[element] || elementColors['Spirit'];
  
  // Map animal names to imported images
  const animalImages = {
    'Bat': BatImg,
    'Bear': BearImg,
    'Butterfly': ButterflyImg,
    'Deer': DeerImg,
    'Dolphin': DolphinImg,
    'Eagle': HawkImg, // Using Hawk image for Eagle
    'Fox': FoxImg,
    'Hawk': HawkImg,
    'Hummingbird': HummingBirdImg,
    'Leopard': LeopardImg,
    'Lion': LionImg,
    'Owl': OwlImg,
    'Penguin': PenguinImg,
    'Raven': RavenImg,
    'Snake': SnakeImg,
    'Tiger': TigerImg,
    'Turtle': TurtleImg,
    'Wolf': WolfImg
  };

  const imageUrl = animalImages[animal] || WolfImg;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '20px',
      boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${colors.glow}`,
      border: '3px solid rgba(252, 211, 77, 0.6)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <img 
        src={imageUrl} 
        alt={animal}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          animation: 'slowMotion 20s ease-in-out infinite'
        }}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '20px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600',
        zIndex: 2,
        border: '2px solid rgba(252, 211, 77, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        ✨ {element} ✨
      </div>
      
      <style>{`
        @keyframes slowMotion {
          0%, 100% { 
            transform: scale(1) translate(0, 0);
          }
          25% { 
            transform: scale(1.05) translate(-2%, -2%);
          }
          50% { 
            transform: scale(1.08) translate(2%, 1%);
          }
          75% { 
            transform: scale(1.05) translate(-1%, 2%);
          }
        }
      `}</style>
      
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.5); }
        }
      `}</style>
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isRitualComplete, setIsRitualComplete] = useState(false);

  useEffect(() => {
    const answers = location.state?.answers || [];
    
    if (!answers || answers.length === 0) {
      window.location.href = '/';
      return;
    }
    
    const getResult = async () => {
      try {
        console.log('🔮 Consulting the Oracle with answers:', answers);
        const result = await fetchOracleResult(answers);
        console.log('✅ Oracle result received:', result);
        setData(result);
      } catch (error) {
        console.error('❌ Failed to get oracle result:', error);
        setData({
          success: true,
          spiritAnimal: {
            animal: "Wolf",
            title: "The Loyal Guardian",
            description: "You have a strong sense of loyalty and protect those you care about. Your intuition guides you through life's challenges with wisdom and courage.",
            traits: ["loyalty", "intuition", "leadership", "courage"],
            element: "Earth",
            imagePrompt: "majestic wolf with glowing blue eyes standing on a moonlit mountain peak, ethereal mist swirling around, silver fur with mystical light patterns"
          },
          message: "The Oracle has spoken through ancient wisdom.",
          source: "fallback"
        });
      }
    };

    const timer = setTimeout(() => {
      setIsRitualComplete(true);
    }, 5000); // Reduced to 5 seconds - no image generation needed

    getResult();
    return () => clearTimeout(timer);
  }, [location.state?.answers]);

  if (!data || !isRitualComplete) {
    return <OracleLoader />;
  }

  const { spiritAnimal } = data;

  return (
    <Motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="results-container"
      style={{
        padding: '10px 10px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#fcd34d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="spirit-reveal"
      >
        <Motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 1, type: "spring", bounce: 0.4 }}
          style={{ 
            marginBottom: '10px',
            filter: 'drop-shadow(0 0 20px rgba(252, 211, 77, 0.6))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {spiritAnimal.imageUrl ? (
            <img 
              src={spiritAnimal.imageUrl} 
              alt={`Sacred ${spiritAnimal.animal}`}
              style={{
                width: '250px',
                height: '235px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '3px solid #fcd34d',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(252, 211, 77, 0.4)',
                display: 'block',
                margin: '0 auto'
              }}
            />
          ) : (
            <div style={{ width: '250px', height: '235px' }}>
              {createMysticalPlaceholder(spiritAnimal.animal, spiritAnimal.element)}
            </div>
          )}
        </Motion.div>

        <Motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ 
            fontSize: '2.5rem', 
            marginBottom: '5px',
            marginTop: '5px',
            textShadow: '0 0 20px rgba(252, 211, 77, 0.8)',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }}
        >
          {spiritAnimal.animal}
        </Motion.h1>
        
        <Motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ 
            fontSize: '1.3rem', 
            marginBottom: '10px',
            color: '#d1d5db',
            fontStyle: 'italic'
          }}
        >
          {spiritAnimal.title}
        </Motion.h2>
        
        <Motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ 
            fontSize: '1rem', 
            lineHeight: '1.4',
            marginBottom: '15px',
            maxWidth: '700px',
            margin: '0 auto 15px',
            color: '#e5e7eb',
            fontWeight: '300',
            padding: '0 10px'
          }}
        >
          {spiritAnimal.description}
        </Motion.p>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ marginBottom: '10px' }}
        >
          <h3 style={{ 
            marginBottom: '8px', 
            color: '#fcd34d',
            fontSize: '1.1rem'
          }}>
            Your Sacred Traits
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px',
            flexWrap: 'wrap',
            padding: '0 10px'
          }}>
            {spiritAnimal.traits.map((trait, index) => (
              <Motion.span 
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8 + (index * 0.1), duration: 0.5 }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'rgba(252, 211, 77, 0.2)',
                  border: '2px solid #fcd34d',
                  borderRadius: '18px',
                  fontSize: '0.85rem',
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(252, 211, 77, 0.3)'
                }}
              >
                {trait}
              </Motion.span>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{ marginBottom: '10px' }}
        >
          <p style={{ 
            fontSize: '1rem',
            color: '#9ca3af',
            fontWeight: '500'
          }}>
            ✨ Element: <span style={{ color: '#fcd34d' }}>{spiritAnimal.element}</span> ✨
          </p>
        </Motion.div>

        {spiritAnimal.imagePrompt && (
          <Motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            style={{ 
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              border: '1px solid rgba(252, 211, 77, 0.3)',
              maxWidth: '700px',
              margin: '0 auto 10px'
            }}
          >
            <h4 style={{ 
              color: '#fcd34d', 
              marginBottom: '6px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              🎨 Sacred Vision
            </h4>
            <p style={{ 
              color: '#d1d5db',
              fontSize: '0.8rem',
              fontStyle: 'italic',
              lineHeight: '1.3'
            }}>
              {spiritAnimal.imagePrompt}
            </p>
          </Motion.div>
        )}

        <Motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          onClick={() => {
            navigate('/', { replace: true });
          }}
          style={{
            marginTop: '8px',
            marginBottom: '15px',
            padding: '10px 25px',
            backgroundColor: 'transparent',
            border: '3px solid #fcd34d',
            color: '#fcd34d',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fcd34d';
            e.target.style.color = '#000';
            e.target.style.boxShadow = '0 0 25px rgba(252, 211, 77, 0.8)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#fcd34d';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'scale(1)';
          }}
        >
          🌟 Discover Another Spirit 🌟
        </Motion.button>
      </Motion.div>
    </Motion.div>
  );
};

export default Results;
