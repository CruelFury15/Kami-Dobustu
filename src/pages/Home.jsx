import { motion as Motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import audioManager from '../utils/audioManager';

function Home() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        document.body.classList.add('no-scroll');
        document.body.classList.remove('scrollable');

        const showTimer = setTimeout(() => {
            setShowAlert(true);
        }, 1000);

        const hideTimer = setTimeout(() => {
            setShowAlert(false);
        }, 4000);

        audioManager.playBackgroundMusic();
        const enableAudio = () => {
            audioManager.enableAudio();
            setShowAlert(false);
        };

        document.addEventListener('mousemove', enableAudio, { once: true });
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            document.removeEventListener('mousemove', enableAudio);
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };
    }, []);

    const handleButtonClick = () => {
        audioManager.playButtonSound();
        navigate('/questions');
    };

    return (
        <>
            {showAlert && (
                <Motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                    className="audio-alert"
                >
                    <p>🔊 This page has audio. Click anywhere to enable sound!</p>
                </Motion.div>
            )}

            <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <Motion.div 
                    className="chinsetext" 
                    initial={{opacity:0, y: 20}}
                    animate={{opacity:1, y: 0}}
                    transition={{delay:0.5, duration:2}}
                >
                    神 動 物
                </Motion.div>

                <div className="title flex items-center justify-center w-full">
                    <Motion.h1
                        initial={{opacity:0, y: 20}}
                        animate={{opacity:1, y: 0}}
                        transition={{delay:0.5, duration:2}}
                    >
                        Kami Dōbutsu
                    </Motion.h1>
                </div>

                <div className="subtitle-container w-full">
                    <Motion.p 
                        className="smalltitle" 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:1, duration:2}}
                    >
                        Discover Your Spirit Animal!
                    </Motion.p>
                </div>

                <div className="description-container w-full">
                    <Motion.p 
                        className="question" 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:1.5, duration:2}}
                    >
                        Answer the ancient questions. Let the ritual reveal the creature that walks beside your soul.
                    </Motion.p>
                </div>

                <div className="flex justify-center w-full">
                    <Motion.button
                        onClick={handleButtonClick}
                        initial={{y:0}}
                        animate={{scale: [1, 1.15, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,       
                          repeatType: "loop"      
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.90 }}
                        className="ritual-button"
                    >
                        🌟 Enter The Rite 🌟
                    </Motion.button>
                </div>
            </div>
        </>
    );
}

export default Home;