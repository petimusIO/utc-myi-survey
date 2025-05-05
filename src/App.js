import { useEffect, useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { StepperContext } from './contexts/StepperContext';
import FormStepper from './Components/FormStepper';
import Navbar from './Components/Navbar';
import StepperControl from './Components/StepperControl';
import FinalForm from './Components/Steps/FinalForm';
import Form1 from './Components/Steps/Form1';
import Form2 from './Components/Steps/Form2';
import Form3 from './Components/Steps/Form3';
import Form4 from './Components/Steps/Form4';
import Form5 from './Components/Steps/Form5';
import Form6 from './Components/Steps/Form6';
import Form7 from './Components/Steps/Form7';
import Form8 from './Components/Steps/Form8';
import Form9 from './Components/Steps/Form9';
import Form10 from './Components/Steps/Form10';
import Form11 from './Components/Steps/Form11';
import Form12 from './Components/Steps/Form12';

import axios from 'axios';
import WelcomeMessage from './Components/welcome'; // Import the WelcomeMessage component

function App() {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currStep, setStep] = useState(1);
  const [userData, setUserData] = useState({
    xp: [],
    c_xp: [],
  });
  const [finalData, setFinalData] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true); // State to control the welcome message visibility
  const [animationComplete, setAnimationComplete] = useState(false); // State to track animation completion

  const steps = [
    "",
    "Welcome",
    "Age + Email",
    "Future Feelings",
    "Goal Management",
    "Goal Convos",
    "Customized Plan",
    "Importance",
    "Stressor",
    "Experience",
    "Final Thoughts",
    "Thank You",
  ];

  const api = axios.create({
    baseURL: `https://utc-survey-api.onrender.com/api`,
  });

  async function getQuestionSteps() {
    let res = await api.get("/data");
    console.log("HERE IS THE RESPONSE...");
    console.log(res.data);
    return res.data.total_questions;
  }

  useEffect(() => {
    const test = async () => {
      const get_total_q = await getQuestionSteps();
      setTotalQuestions(get_total_q);
    };
    test();
  }, []);

  const displayStep = (step) => {
    switch (step) {
      /*
      case 1:
        getQuestionSteps();
        return <Form3 />;
      */
      case 1:
        return <Form1 />;
      case 2:
        return <Form4 />;
      case 3:
        return <Form2 />;
      case 4:
        return <Form5 />;
      case 5:
        return <Form6 />;
      case 6:
        return <Form7 />;
      case 7:
        return <Form8 />;
      case 8:
        return <Form11 />;
      case 9:
        return <Form10 />;
      case 10:
        return <Form9 />;
      case 11:
        return <Form12 />;
      case 12:
        return <FinalForm />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setStep(newStep);
  };

  const handleAnimationComplete = () => {
    setShowWelcome(false); // Hide the welcome message
    setAnimationComplete(true); // Mark animation as complete
  };

  console.log("CURRENTSTEP: ", currStep);
  console.log("total step: ", steps.length - 1);

  return (
    <div className="App">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeMessage onAnimationComplete={handleAnimationComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showWelcome && animationComplete && (
          <motion.div
            className="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container main-content">
              {/* STEPPER */}
              
              {currStep !== steps.length && (
  <FormStepper steps={steps} currStep={currStep} />
)}

              
              {/* DISPLAY FORMS */}
              <div className="my-1 p-4 display-content">
                <StepperContext.Provider
                  value={{ userData, setUserData, finalData, setFinalData }}
                >
                  {displayStep(currStep)}
                </StepperContext.Provider>
              </div>

              {/* Navigation Control */}
              {currStep !== steps.length && (
                <StepperControl
                  handleClick={handleClick}
                  currentStep={currStep}
                  steps={steps}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
