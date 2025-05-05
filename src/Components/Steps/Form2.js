import React from 'react';
import { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

export default function Form5() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const clickChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Framer Motion animations
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <motion.div
          variants={container}
          animate="visible"
          initial="hidden"
          className="form-content"
        >
          <motion.p variants={item} className="question-text">
            How Would You Say People Handle <b className='text-pmmGrit'>THEIR</b> Feelings?
          </motion.p>
          <motion.div variants={container} className="button-container">
            {['They ignore them', 'They are unaware of them', 'They are overwhelmed by them', 'They are aware and control them'].map((option, index) => (
              <motion.button
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clickChange}
                value={option}
                name="comm_handler"
                className="option-button"
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
