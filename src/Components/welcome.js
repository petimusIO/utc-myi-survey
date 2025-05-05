import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = ({ onAnimationComplete }) => {
  const [message, setMessage] = useState('');
  const welcomeText = "Welcome! Answer 12 anonymous questions to find the best lesson to start.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setMessage(welcomeText.substring(0, index));
      index++;
      if (index > welcomeText.length) {
        clearInterval(interval);
        setTimeout(onAnimationComplete, 1500); // Add a delay before calling the completion callback
      }
    }, 50); // Adjust typing speed here
    return () => clearInterval(interval);
  }, [onAnimationComplete]);

  return (
    <motion.div
      className="welcome-message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>{message}</h1>
    </motion.div>
  );
};

export default WelcomeMessage;
