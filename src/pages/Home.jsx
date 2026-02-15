/* eslint-disable no-unused-vars */
import {motion} from "framer-motion";
/* eslint-enable no-unused-vars */
import {NavLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import audioManager from '../utils/audioManager';

function Home() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Show alert after 1 second
        const showTimer = setTimeout(() => {
            setShowAlert(true);
        }, 1000);

        // Hide alert after 6 seconds total (1s delay + 5s display)
        const hideTimer = setTimeout(() => {
            setShowAlert(false);
        }, 6000);

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
    };

    return (
        <>
            {showAlert && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                    className="audio-alert"
                >
                    <p>🔊 This page has audio. Click anywhere to enable sound!</p>
                </motion.div>
            )}

            <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
            <motion.div className = "chinsetext" initial={{opacity:0, y: 20}}
                        animate={{opacity:1, y: 0}}
                        transition={{delay:0.5, duration:2}}>
                            神 動 物
            </motion.div>
                <div className="title flex items-center justify-center">
                    <motion.h1
                        initial={{opacity:0, y: 20}}
                        animate={{opacity:1, y: 0}}
                        transition={{delay:0.5, duration:2}}
                    >
                        Kami Dōbutsu
                    </motion.h1>
                </div>

                <div className="subtitle-container">
                    <motion.p 
                        className="smalltitle" 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:1, duration:2}}
                    >
                        Discover Your Spirit Animal!
                    </motion.p>
                </div>

                <div className="description-container">
                    <motion.p 
                        className="question" 
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{delay:1.5, duration:2}}
                    >
                        Answer the ancient questions. Let the ritual reveal the creature that walks beside your soul.
                    </motion.p>
                </div>

                <NavLink to="/questions">
                    <motion.button
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
                    Enter The Rite!
                  </motion.button>
                </NavLink>
            </div>
        </>
    );
}

export default Home;