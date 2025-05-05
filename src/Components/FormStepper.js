import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FormStepper.css';

export default function FormStepper({ steps, currStep }) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    return steps.map((step, index) => ({
      ...step,
      highlighted: index === stepNumber,
      selected: index <= stepNumber,
      completed: index < stepNumber,
    }));
  };

  useEffect(() => {
    const stepState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
    stepRef.current = stepState;
    setNewStep(updateStep(currStep - 1, stepRef.current));
  }, [steps, currStep]);

  const getDisplayedSteps = () => {
    const start = Math.max(0, currStep - 2);
    const end = Math.min(start + 3, steps.length);
    return newStep.slice(start, end);
  };

  const displayedSteps = getDisplayedSteps();

  // Calculate percentage done
  const percentageDone = Math.round((currStep / steps.length) * 100);

  // Framer motion animation settings
  const counterVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  // Dynamic color based on progress percentage
  const getCounterColor = () => {
    if (percentageDone === 100) return 'bg-green-500'; // Completed
    if (percentageDone >= 75) return 'bg-yellow-400'; // Almost there
    return 'bg-blue-500'; // Regular progress
  };

  return (
    <div>
      {/* Cool percentage done counter */}
      <div className="step-counter-container flex justify-center items-center mt-4 mb-4">
        <motion.div
          className={`step-counter text-white py-2 px-4 rounded-lg font-bold ${getCounterColor()}`}
          variants={counterVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={percentageDone} // Ensures that the number re-animates when it changes
        >
          {percentageDone < 100 ? (
            <>
              <span className="text-sm">{percentageDone}%</span> completed{' '}
              <span role="img" aria-label="progress">
                🚀
              </span>
            </>
          ) : (
            <>
              All steps completed!{' '}
              <span role="img" aria-label="party">
                🎉
              </span>
            </>
          )}
        </motion.div>
      </div>

      {/* Stepper */}
      <motion.div className="form-stepper-container">
        {displayedSteps.map((step, index) => (
          <div key={index} className={`step-wrapper ${index !== displayedSteps.length - 1 ? 'flex-grow' : ''}`}>
            <div className={`step-number ${step.selected ? 'step-number-selected' : ''}`}>
              {step.completed ? (
                <span className="checkmark">&#10003;</span>
              ) : (
                newStep.indexOf(step) + 1
              )}
            </div>
            {index !== displayedSteps.length - 1 && (
              <div className={`step-line ${step.completed ? 'step-line-completed' : ''}`}></div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}