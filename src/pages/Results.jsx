import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { fetchOracleResult } from '../utils/api';
import OracleLoader from '../components/OracleLoader';
import SpiritAnimal3D from '../components/SpiritAnimal3D';

const PARTICLES = [...Array(20)].map(() => ({
  xOffset: Math.random() * 40 - 20,
  duration: 5 + Math.random() * 3,
  delay: Math.random() * 4,
  top: Math.random() * 100,
  left: Math.random() * 100
}));

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isRitualComplete, setIsRitualComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const answers = location.state?.answers || [];
    
    if (!answers || answers.length === 0) {
      window.location.href = '/';
      return;
    }

    document.body.classList.add('scrollable');
    document.body.classList.remove('no-scroll');
    
    const getResult = async () => {
      try {
        const result = await fetchOracleResult(answers);
        setData(result);
      } catch (error) {
        console.error('Failed to get oracle result:', error);
        setData({
          success: true,
          spiritAnimal: {
            animal: "Wolf",
            title: "The Loyal Guardian",
            description: "You have a strong sense of loyalty and protect those you care about.",
            detailedAnalysis: "Your choices reveal a deep commitment to those you love, combined with an intuitive understanding of complex situations. You navigate life with both wisdom and courage, never abandoning your pack even in the darkest times.",
            traits: ["loyalty", "intuition", "leadership", "courage"],
            strengths: ["Natural leader", "Protective instinct", "Strategic thinking", "Deep empathy"],
            challenges: ["Can be overly protective", "Difficulty trusting outsiders", "Tendency to carry burdens alone", "Struggles with vulnerability"],
            element: "Earth",
            lifePhilosophy: "True strength lies not in standing alone, but in knowing when to lead and when to follow.",
            spiritualGuidance: "Trust your instincts—they have guided you well thus far. Remember that even the strongest wolf needs the pack.",
            compatibility: {
              highCompatibility: ["Eagle", "Bear"],
              lowCompatibility: ["Snake", "Fox"]
            }
          }
        });
      }
    };

    const timer = setTimeout(() => setIsRitualComplete(true), 5000); 
    getResult();
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('scrollable');
      document.body.classList.add('no-scroll');
    };
  }, [location.state?.answers]);

  if (!data || !isRitualComplete) {
    return <OracleLoader />;
  }

  const { spiritAnimal } = data;
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🔮' },
    { id: 'analysis', label: 'Analysis', icon: '🧠' },
    { id: 'strengths', label: 'Strengths', icon: '⚡' },
    { id: 'guidance', label: 'Guidance', icon: '🙏' }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px 0', position: 'relative', overflowX: 'hidden', overflowY: 'visible' }}>
      {PARTICLES.map((particle, i) => (
        <Motion.div 
          key={i} 
          animate={{ y: [0, -50, 0], x: [0, particle.xOffset, 0], opacity: [0, 0.6, 0], scale: [0, 1.2, 0] }} 
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }} 
          style={{ 
            position: 'fixed', 
            width: '8px', 
            height: '8px', 
            background: i % 3 === 0 ? '#fcd34d' : i % 3 === 1 ? '#9333ea' : '#4facfe', 
            borderRadius: '50%', 
            top: `${particle.top}%`, 
            left: `${particle.left}%`, 
            boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(252, 211, 77, 0.8)' : i % 3 === 1 ? 'rgba(147, 51, 234, 0.8)' : 'rgba(79, 172, 254, 0.8)'}`, 
            pointerEvents: 'none', 
            zIndex: 0 
          }} 
        />
      ))}

      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <SpiritAnimal3D animal={spiritAnimal.animal} element={spiritAnimal.element} imageUrl={spiritAnimal.imageUrl} />
          <Motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", bounce: 0.5 }} style={{ fontSize: '3.5rem', color: '#fcd34d', marginTop: '30px', marginBottom: '10px', textShadow: '0 0 30px rgba(252, 211, 77, 0.8)', fontFamily: 'serif', fontWeight: 'bold' }}>{spiritAnimal.animal}</Motion.h1>
          <Motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ fontSize: '1.5rem', color: '#d1d5db', fontStyle: 'italic', marginBottom: '20px' }}>{spiritAnimal.title}</Motion.h2>
          <Motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9 }} style={{ width: '300px', height: '3px', background: 'linear-gradient(90deg, transparent, #fcd34d, transparent)', margin: '0 auto', boxShadow: '0 0 15px rgba(252, 211, 77, 0.6)' }} />
        </Motion.div>

        <Motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {tabs.map((tab, index) => (
            <Motion.button key={tab.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 + (index * 0.1) }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 24px', background: activeTab === tab.id ? 'linear-gradient(135deg, #fcd34d, #f59e0b)' : 'rgba(0, 0, 0, 0.4)', border: activeTab === tab.id ? '2px solid #fcd34d' : '2px solid rgba(252, 211, 77, 0.3)', borderRadius: '25px', color: activeTab === tab.id ? '#000' : '#fcd34d', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: activeTab === tab.id ? '0 0 25px rgba(252, 211, 77, 0.6)' : 'none', backdropFilter: 'blur(10px)' }}>
              {tab.icon} {tab.label}
            </Motion.button>
          ))}
        </Motion.div>

        <Motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', padding: '40px', border: '2px solid rgba(252, 211, 77, 0.3)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(15px)', marginBottom: '30px', minHeight: '400px' }}>
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ color: '#fcd34d', fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>🔮 Your Spirit Essence</h3>
              <p style={{ color: '#e5e7eb', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px', textAlign: 'center' }}>{spiritAnimal.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <div style={{ padding: '25px', background: 'rgba(252, 211, 77, 0.1)', borderRadius: '15px', border: '2px solid rgba(252, 211, 77, 0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{spiritAnimal.element === 'Fire' ? '🔥' : spiritAnimal.element === 'Water' ? '💧' : spiritAnimal.element === 'Earth' ? '🌍' : spiritAnimal.element === 'Air' ? '💨' : '✨'}</div>
                  <div style={{ color: '#fcd34d', fontSize: '1.3rem', fontWeight: 'bold' }}>{spiritAnimal.element}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '5px' }}>Primary Element</div>
                </div>
                <div style={{ padding: '25px', background: 'rgba(147, 51, 234, 0.1)', borderRadius: '15px', border: '2px solid rgba(147, 51, 234, 0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎯</div>
                  <div style={{ color: '#9333ea', fontSize: '1.3rem', fontWeight: 'bold' }}>{spiritAnimal.traits?.length || 8}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '5px' }}>Sacred Traits</div>
                </div>
                <div style={{ padding: '25px', background: 'rgba(79, 172, 254, 0.1)', borderRadius: '15px', border: '2px solid rgba(79, 172, 254, 0.3)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌟</div>
                  <div style={{ color: '#4facfe', fontSize: '1.3rem', fontWeight: 'bold' }}>{location.state?.answers?.length || 8}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '5px' }}>Choices Analyzed</div>
                </div>
              </div>
              <div style={{ marginTop: '30px' }}>
                <h4 style={{ color: '#fcd34d', fontSize: '1.3rem', marginBottom: '15px', textAlign: 'center' }}>✨ Your Sacred Traits</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                  {spiritAnimal.traits?.map((trait, index) => (
                    <Motion.div key={index} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.1 * index, type: "spring" }} style={{ padding: '10px 20px', background: 'rgba(252, 211, 77, 0.2)', border: '2px solid #fcd34d', borderRadius: '20px', color: '#fcd34d', fontSize: '1rem', fontWeight: '600', textTransform: 'capitalize', boxShadow: '0 4px 15px rgba(252, 211, 77, 0.3)' }}>{trait}</Motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div>
              <h3 style={{ color: '#fcd34d', fontSize: '2rem', marginBottom: '25px', textAlign: 'center' }}>🧠 Deep Personality Analysis</h3>
              <div style={{ background: 'rgba(252, 211, 77, 0.05)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(252, 211, 77, 0.2)', marginBottom: '30px' }}>
                <p style={{ color: '#e5e7eb', fontSize: '1.1rem', lineHeight: '1.9', textAlign: 'justify' }}>{spiritAnimal.detailedAnalysis || spiritAnimal.description}</p>
              </div>
              {spiritAnimal.lifePhilosophy && (
                <div style={{ background: 'rgba(147, 51, 234, 0.1)', padding: '25px', borderRadius: '15px', border: '2px solid rgba(147, 51, 234, 0.3)', marginTop: '25px' }}>
                  <h4 style={{ color: '#9333ea', fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>📜 Your Life Philosophy</h4>
                  <p style={{ color: '#d8b4fe', fontSize: '1.05rem', lineHeight: '1.8', fontStyle: 'italic' }}>"{spiritAnimal.lifePhilosophy}"</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'strengths' && (
            <div>
              <h3 style={{ color: '#fcd34d', fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>⚡ Strengths & Growth Areas</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                <div>
                  <h4 style={{ color: '#4facfe', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>💪 Your Strengths</h4>
                  {spiritAnimal.strengths?.map((strength, index) => (
                    <Motion.div key={index} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }} style={{ padding: '15px', background: 'rgba(79, 172, 254, 0.1)', borderRadius: '10px', border: '1px solid rgba(79, 172, 254, 0.3)', marginBottom: '12px', color: '#e5e7eb', fontSize: '1rem' }}>✓ {strength}</Motion.div>
                  ))}
                </div>
                <div>
                  <h4 style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🌱 Growth Opportunities</h4>
                  {spiritAnimal.challenges?.map((challenge, index) => (
                    <Motion.div key={index} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index }} style={{ padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '12px', color: '#e5e7eb', fontSize: '1rem' }}>→ {challenge}</Motion.div>
                  ))}
                </div>
              </div>
              {spiritAnimal.compatibility && (
                <div style={{ marginTop: '40px' }}>
                  <h4 style={{ color: '#fcd34d', fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>🤝 Spirit Compatibility</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div style={{ padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '15px', border: '2px solid rgba(34, 197, 94, 0.3)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💚</div>
                      <div style={{ color: '#22c55e', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>High Compatibility</div>
                      <div style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>{spiritAnimal.compatibility.highCompatibility?.join(', ')}</div>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '15px', border: '2px solid rgba(239, 68, 68, 0.3)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚠️</div>
                      <div style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>Challenging Dynamics</div>
                      <div style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>{spiritAnimal.compatibility.lowCompatibility?.join(', ')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'guidance' && (
            <div>
              <h3 style={{ color: '#fcd34d', fontSize: '2rem', marginBottom: '25px', textAlign: 'center' }}>🙏 Spiritual Guidance</h3>
              <div style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 172, 254, 0.2))', padding: '35px', borderRadius: '20px', border: '2px solid rgba(252, 211, 77, 0.4)', boxShadow: '0 10px 40px rgba(147, 51, 234, 0.3)', marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '4rem', opacity: 0.1 }}>🌟</div>
                <p style={{ color: '#e5e7eb', fontSize: '1.2rem', lineHeight: '2', textAlign: 'center', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>{spiritAnimal.spiritualGuidance || "Trust your journey. The path you walk is uniquely yours, and every step brings you closer to your true self."}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                {[
                  { icon: '🧘', title: 'Meditation', text: 'Connect with your inner spirit' },
                  { icon: '🌿', title: 'Nature', text: 'Find peace in natural spaces' },
                  { icon: '📖', title: 'Reflection', text: 'Journal your journey' },
                  { icon: '🤝', title: 'Community', text: 'Share your wisdom' }
                ].map((item, index) => (
                  <Motion.div key={index} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 * index, type: "spring" }} whileHover={{ scale: 1.05 }} style={{ padding: '25px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '15px', border: '2px solid rgba(252, 211, 77, 0.2)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{item.icon}</div>
                    <div style={{ color: '#fcd34d', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>{item.title}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{item.text}</div>
                  </Motion.div>
                ))}
              </div>
            </div>
          )}
        </Motion.div>

                <Motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '30px', marginBottom: '0', overflow: 'hidden' }}>
          <Motion.button onClick={() => navigate('/', { replace: true })} style={{ padding: '15px 35px', background: 'transparent', border: '3px solid #fcd34d', color: '#fcd34d', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 20px rgba(252, 211, 77, 0.3)' }} onMouseEnter={(e) => { e.target.style.background = '#fcd34d'; e.target.style.color = '#000'; e.target.style.boxShadow = '0 0 30px rgba(252, 211, 77, 0.8)'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fcd34d'; e.target.style.boxShadow = '0 0 20px rgba(252, 211, 77, 0.3)'; }}>🏠 Return Home</Motion.button>
          <Motion.button onClick={() => navigate('/questions', { replace: true })} style={{ padding: '15px 35px', background: 'transparent', border: '3px solid #9333ea', color: '#fff', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }} onMouseEnter={(e) => { e.target.style.boxShadow = '0 0 35px rgba(147, 51, 234, 0.8)'; e.target.style.background = '#D8BFD8'; }} onMouseLeave={(e) => { e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.5)'; e.target.style.background = 'transparent'; }}>🔄 Discover Another Spirit</Motion.button>
        </Motion.div>

      </Motion.div>
    </div>
  );
};

export default Results;
