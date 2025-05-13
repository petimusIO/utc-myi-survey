import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import UTCLogo from "../img/UTC-logo.png";

const api = axios.create({
  baseURL: `https://petimus-utc-survey-api.onrender.com/user`//`http://localhost:3001/user`
});

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1, scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

// Updated item variants to enable custom delays
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom, 
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const actionPlans = {
  dormant: [
    "Clarify Your Mission – Write a personal mission statement.",
    "Start Small – Choose one habit that aligns with your values and commit for 7 days.",
    "Find a Mentor – Seek someone to guide and challenge you."
  ],
  growing: [
    "Document Your Growth Plan – Set a goal in 3 areas: Personal, Relational, Professional.",
    "Build Your Circle – Surround yourself with 2-3 growth-minded individuals.",
    "Share Your Story – Post or journal one lesson weekly to reinforce your voice."
  ],
  high: [
    "Mentor Others – Invest weekly in someone coming behind you.",
    "Expand Your Platform – Speak, write, or serve in a new space.",
    "Audit & Adjust – Quarterly reflection on goals, growth, and gaps."
  ]
};

export default function FinalForm() {
  const [backendData, setBackendData] = useState({});
  const { userData } = useContext(StepperContext);
  const [totalScore, setTotalScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [category, setCategory] = useState("");
  const [showBonus, setShowBonus] = useState(false);
  const [scoreComplete, setScoreComplete] = useState(false);
  
  useEffect(() => {
    // Calculate total score from survey responses
    const calculateScore = () => {
      let score = 0;
      let count = 0;
      
      for (const key in userData) {
        if (!key.includes("statement") && !isNaN(userData[key])) {
          score += parseInt(userData[key]);
          count++;
        }
      }
      
      return score;
    };
    
    const score = calculateScore();
    setTotalScore(score);
    
    // Start with 0 and animate up to the score
    setDisplayScore(0);
    setScoreComplete(false);
    
    // Determine category based on score
  let categoryValue;
  if (score >= 10 && score <= 24) {
    categoryValue = "dormant";
    setCategory("dormant");
  } else if (score >= 25 && score <= 39) {
    categoryValue = "growing";
    setCategory("growing");
  } else {
    categoryValue = "high";
    setCategory("high");
  }
  
  // Send data to backend - use the directly calculated categoryValue 
  const addUser = async () => {
    try {
      const res = await api.post("/", {
        ...userData,
        totalScore: score,
        category: categoryValue // Use the direct value, not the state
      });
      console.log("API response:", res);
    } catch (error) {
      console.error("API error:", error);
    }
  };
  addUser();
  }, [userData]);

  useEffect(() => {
    // Animate the score counting up
    if (displayScore < totalScore) {
      const timeout = setTimeout(() => {
        setDisplayScore(prev => Math.min(prev + 1, totalScore));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (displayScore === totalScore && totalScore > 0) {
      // Mark score animation as complete to trigger the next animations
      const timeout = setTimeout(() => {
        setScoreComplete(true);
      }, 500); // Small delay after score finishes
      return () => clearTimeout(timeout);
    }
  }, [displayScore, totalScore]);

  const getCategoryName = () => {
    switch(category) {
      case "dormant": return "Dormant Potential";
      case "growing": return "Growing Influence";
      case "high": return "High-Impact Leader";
      default: return "";
    }
  };

  const getCategoryDescription = () => {
    switch(category) {
      case "dormant": return "You have influence in you, but it's not activated consistently.";
      case "growing": return "You're aware of your influence and are building momentum.";
      case "high": return "You're leading intentionally and living with purpose.";
      default: return "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <motion.div
        className="bg-white rounded-lg p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section - Add this before the score section */}
      <motion.div variants={itemVariants} custom={0} className="flex justify-center mb-6">
        <img 
          src={UTCLogo} 
          alt="UTC Logo" 
          className="h-14 md:h-6" // Adjust size as needed
        />
      </motion.div>
        {/* Score Section - Always visible first */}
        <motion.div variants={itemVariants} custom={0} className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Your Personal Impact Score</h2>
          <motion.div 
            className="text-4xl md:text-5xl font-bold text-pmmGrit mb-2"
            key={totalScore}
            animate={{ opacity: 1 }}
          >
            {displayScore}
          </motion.div>
          <p className="text-xs text-gray-500">Total Score Range: 10-50</p>
          
          <AnimatePresence>
            {scoreComplete && (
              <motion.div 
                className="mt-4 py-2 px-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-bold text-lg mb-1">{getCategoryName()}</h3>
                <p className="text-sm">{getCategoryDescription()}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Action Plan Section - Appears after score completes */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-lg font-bold mb-2">✅ Your Personalized Action Plan</h2>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-bold text-md mb-1">→ For {getCategoryName()}:</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {actionPlans[category] && actionPlans[category].map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Collapsible Bonus Section - Appears after action plan */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="mb-6"
            >
              <button 
                className="text-left w-full flex justify-between items-center"
                onClick={() => setShowBonus(!showBonus)}
              >
                <h2 className="text-lg font-bold">⏳ BONUS: 1-Day Influence Accelerator</h2>
                <span>{showBonus ? '▲' : '▼'}</span>
              </button>
              
              <AnimatePresence>
                {showBonus && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm mb-2">A quick-start plan to boost your influence in 24 hours.</p>
                    
                    <div className="space-y-2">
                      {/* Morning */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h3 className="font-bold text-sm mb-1">Morning:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Reflect on your values and write down your personal mission.</li>
                          <li>Text or call 3 people and encourage them specifically.</li>
                        </ul>
                      </div>
                      
                      {/* Afternoon */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h3 className="font-bold text-sm mb-1">Afternoon:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Share a short story or lesson online (or journal it).</li>
                          <li>Evaluate how you spend your time – cut one thing that drains your focus.</li>
                        </ul>
                      </div>
                      
                      {/* Evening */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h3 className="font-bold text-sm mb-1">Evening:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Schedule a growth activity for the next 7 days.</li>
                          <li>Write 3 things you want to be known for.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Call to Action - Appears last */}
        <AnimatePresence>
          {scoreComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.8 }}
              className="text-center"
            >
              <p className="mb-3 text-sm font-medium">Ready to level up your leadership?</p>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://learn.liveprosperous.com/pages/focus-fridays-signup-form" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-pmmGrit hover:bg-pmmBlue text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 text-sm text-center cursor-pointer"
                >
                  Join Focus Friday Email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}