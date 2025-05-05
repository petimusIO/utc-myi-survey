import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

export default function Form10() {
  const { userData, setUserData } = useContext(StepperContext);

  const clickChange = (e) => {
    const { name, value } = e.target;
    const selected = userData[name] || [];

    if (selected.includes(value)) {
      const updatedSelected = selected.filter((item) => item !== value);
      setUserData({ ...userData, [name]: updatedSelected });
    } else {
      const updatedSelected = [...selected, value];
      setUserData({ ...userData, [name]: updatedSelected });
    }
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
    { value: "Significance/Purpose", label: "Lack of Purpose" },
    { value: "Personal/Finances", label: "Personal / Financial Loss" },
    { value: "Divorce", label: "Divorce" },
    { value: "Time-Management", label: "Lack of Time Management" },
    { value: "Physical-Challenge", label: "Physical Challenges" },
    { value: "Depression", label: "Depression" },
    { value: "Anger", label: "Anger" },
    { value: "Substance-Abuse", label: "Substance Abuse" },
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
            Click On <b className='text-pmmGrit'>EVERY</b> Issue <b className='text-pmmGrit'>YOU'VE</b> Experienced. 
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
                name="xp"
                className={`${userData["xp"].includes(goal.value) ?  btnClassName + " bg-blue-200" : btnClassName }`}
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
