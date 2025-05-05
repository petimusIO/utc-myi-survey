import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

export default function Form9() {
  const { userData, setUserData } = useContext(StepperContext);

  const clickChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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

  const buttonOptions = [
    { value: "Thoughts/Feelings", label: "I need help with my thoughts." },
    { value: "Fires", label: "I need help with fires in my life." },
    { value: "Control", label: "I need to take control of my story." },
    { value: "Focus", label: "I need to focus on my goals." },
    { value: "Help-Me", label: "I want help. " },
    { value: "Action-Plan", label: "I need a plan." },
    { value: "Adjusting", label: "I struggle with adjusting." },
    { value: "Help-Others", label: "I want to help others." },
  ];

  const btnClassName = "option-button";

  return (
    <div className="form-container">
      <div className="form-box">
        <motion.div
          className="form-content"
          animate="visible"
          initial="hidden"
          variants={container}
        >
          <motion.p variants={item} className="question-text">
          Which Statement is <b className='text-pmmGrit'>MOST</b> Important To <b className='text-pmmGrit'>YOU</b> Now. 
          </motion.p>
          <motion.div
            variants={container}
            className="button-container"
          >
            {buttonOptions.map((goal, index) => (
              <motion.button
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clickChange}
                value={goal.value}
                name="statement"
                className="option-button"
              >
                {goal.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
