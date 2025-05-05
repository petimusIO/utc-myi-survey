import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import { motion } from 'framer-motion';

const ageGroups = [
  'Elementary School Student',
  'Middle School Student',
  'High School Student',
  'Parent/Guardian',
  'Teacher',
  'Administrator',
];

const ResponsiveForm = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
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
      <motion.form
        onSubmit={handleSubmit}
        className="form-box"
        style={{ maxWidth: '80%' }}
        variants={container}
        animate="visible"
        initial="hidden"
      >
        <motion.h2 variants={item} className="form-title">
          Tell Us More About You!
        </motion.h2>

        <motion.div variants={item} className="form-group">
          <label htmlFor="first_name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={userData.first_name || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name"
            required
          />
        </motion.div>

        <motion.div variants={item} className="form-group">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your age"
            required
          />
        </motion.div>

        <motion.div variants={item} className="form-group">
          <label htmlFor="ageGroup" className="form-label">
            Age Group:
          </label>
          <select
            id="ageGroup"
            name="ageGroup"
            value={userData.ageGroup || ''}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="" disabled hidden>
              Tap to select your age group
            </option>
            {ageGroups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default ResponsiveForm;
