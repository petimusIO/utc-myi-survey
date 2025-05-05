import React from 'react';
import { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

export default function Form4() {
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
          initial="hidden"
          animate="visible"
          className="form-content"
        >
          <motion.p className='question-text' variants={item}>
            When You Look In Your <b className='text-pmmGrit'>COMMUNITY</b>, How Do You Think Most People Feel Around You?...🤔
          </motion.p>

          <motion.div variants={container} className="button-container">
            {['Worried 😟', 'Calm 😌', 'Confident 😁', 'Uncertain 🫣', 'Frustrated 😖', 'Happy 😊'].map((feeling, index) => (
              <motion.button
                key={index}
                variants={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clickChange}
                value={feeling.split(' ')[0]}
                name="comm_feeling"
                className="feeling-button"
              >
                {feeling}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
