import { useState, useEffect } from 'react';
import { ritualQuestions } from "../data/question";
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import audioManager from '../utils/audioManager';

function Questions() {
  const navigate = useNavigate();
  
  const [shuffledQuestions] = useState(() => {
    return [...ritualQuestions].sort(() => Math.random() - 0.5).slice(0, 8);
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Enable scrolling on questions page
    document.body.classList.add('scrollable');
    document.body.classList.remove('no-scroll');

    audioManager.playBackgroundMusic();

    const enableAudio = () => {
      audioManager.enableAudio();
    };

    document.addEventListener('mousemove', enableAudio, { once: true });
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });

    return () => {
      document.removeEventListener('mousemove', enableAudio);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentStep];

  const handleOptionClick = (option) => {
    const newAnswer = { questionId: currentQuestion.id, choice: option.text };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentStep < shuffledQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Quiz completed!", updatedAnswers);
      navigate('/results', { state: { answers: updatedAnswers } });
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
      width: '100%'
    }}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '30px',
        padding: '20px 0'
      }}>
        {Array.from({ length: shuffledQuestions.length }, (_, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: index === currentStep ? '3px solid #fcd34d' : '3px solid #666',
                backgroundColor: index === currentStep ? '#fcd34d' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: index === currentStep ? '#000' : '#666',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: index === currentStep ? '0 0 15px rgba(252, 211, 77, 0.6)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {index + 1}
            </div>
            
            {index < shuffledQuestions.length - 1 && (
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#666',
                  margin: '0 5px'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <motion.div 
        className='questionbox'
        key={currentQuestion.id}
        initial={{ opacity: 0, scale: 1, y: 20 }}
        animate={{ opacity: 1, scale: 0.95, y: 0 }}
        exit={{ opacity: 0, scale: 1, y: -20 }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#fcd34d', fontSize:'24px', textAlign: 'center' }}>
          {currentQuestion.text}
        </h2>
        
        <div>
          {currentQuestion.options.map((option, index) => (
            <button 
              className='ansbutton'
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
    </div>
  );
}

export default Questions;