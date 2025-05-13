import { useEffect, useState } from 'react';
import './App.css';
// DATA IMPORTS
import { StepperContext } from './contexts/StepperContext';
import surveyData from './contexts/SurveyQuestion.json';
// COMPONENT IMPORTS
import FormStepper from './Components/FormStepper';
import StepperControl from './Components/StepperControl';
import FinalForm from './Components/Steps/FinalForm';
import LikertQuestion from './Components/LikertQuestion.tsx';
// 3rd party imports
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currStep, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);

  const handleAnswerSelected = (fieldName, text, value) => {
    console.log("userData: ", userData);
    setUserData({
      ...userData,
      [fieldName]: value
      //[`${fieldName}_value`]: value
    });
  };

  const displayStep = (step) => {
    // Show the final form only when we've gone through all questions
    if (step > surveyData.questions.length) {
      return <FinalForm />;
    }
    
    // Show the current question based on the step number
    if (step >= 1 && step <= surveyData.questions.length) {
      const currentQuestion = surveyData.questions[step - 1];
      return (
        <LikertQuestion
          key={currentQuestion.questionId}
          questionIndex={currentQuestion.questionId}
          questionText={currentQuestion.questionText}
          fieldName={currentQuestion.fieldName}
          onAnswerSelected={handleAnswerSelected}
        />
      );
    }
    
    return null;
  };

  const handleClick = (direction) => {
    let newStep = currStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= surveyData.questions.length + 1 && setStep(newStep);
  };


  console.log("CURRENTSTEP: ", currStep);
  console.log("total step: ", surveyData.questions.length + 1);

  return (
    <div className="App">

          <motion.div
            className="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container main-content">
              {/* STEPPER */}
              
              {currStep !== surveyData.questions.length + 1 && (
                <FormStepper steps={surveyData.questions} currStep={currStep} />
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
              {currStep !== surveyData.questions.length + 1 && (
                <StepperControl
                  handleClick={handleClick}
                  currentStep={currStep}
                  steps={surveyData.questions}
                />
              )}
            </div>
          </motion.div>
    </div>
  );
}

export default App;
