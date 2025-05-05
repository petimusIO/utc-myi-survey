import React, { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../contexts/StepperContext';
import axios from 'axios';
import { motion } from "framer-motion";
import PillarResults from '../PillarResults';
//import './FinalForm.css'; // Assuming you have a CSS file for additional styling

const api = axios.create({
  baseURL: `https://utc-survey-api-1.onrender.com/user`
});

const strategies = {
  "Thoughts/Feelings": [
    "It’s normal for people to not focus on themselves.",
    "Not managing stress can impact your ability to succeed.",
    "Stopping and reflecting can help center you.",
    "Make little things like breathing a practice to ground you."
  ],
  "Fires": [
    "Becoming aware of where you are emotionally is vitally important.",
    "Identify and focus on the positives around you.",
    "Do something! Don’t avoid issues. Address them one step at a time.",
    "Change your approach. Visualize a path of success."
  ],
  "Control": [
    "Take the time to reflect on what you really want.",
    "Reflect on how expectations from others have impacted you.",
    "There is power in dreaming, and imagination.",
    "Live in alignment with your values."
  ],
  "Focus": [
    "Be clear with your goals. Know your conditions & capacity.",
    "Self-care allows you to plan and prepare for your journey",
    "Identify your needs.",
    "Seek support to help."
  ],
  "Help-Me": [
    "Connecting with people is vital to your health",
    "Your team feeds your soul",
    "Tend to your relationships to keep them healthy",
    "Find the balance of agents and guides to support you"
  ],
  "Action-Plan": [
    "Don’t live life on autopilot.",
    "Create a routine to help you with your goals.",
    "Reflect on how bad you want to accomplish your goal.",
    "Commit to your goals and assess them weekly."
  ],
  "Adjusting": [
    "Flexibility is crucial for life fulfillment.",
    "If frustrated, take a moment, breath, and refocus.",
    "Broaden your perspective to see the entire picture.",
    "All obstacles aren’t roadblocks. You can still get to your destination."
  ],
  "Help-Others": [
    "Remember, some people are scared to ask for help.",
    "Living authentically will help others do the same.",
    "Intentionally listen and watch for what people are saying.",
    "Create a safe space and listen without judgment."
  ]
};

const links = {
  "Thoughts/Feelings": "https://learn.liveprosperous.com/courses/bepresent",
  "Fires": "https://learn.liveprosperous.com/courses/beafirefighter",
  "Control": "https://learn.liveprosperous.com/courses/beanauthor",
  "Focus": "https://learn.liveprosperous.com/courses/beintentional",
  "Help-Me": "https://learn.liveprosperous.com/courses/beamanager",
  "Action-Plan": "https://learn.liveprosperous.com/courses/beapilot",
  "Adjusting": "https://learn.liveprosperous.com/courses/beagile",
  "Help-Others": "https://learn.liveprosperous.com/courses/bealifeguard"
};

const statement2pillar = {
  "Help-Me": "Be a Manager",
  "Action-Plan": "Be a Pilot",
  "Help-Others": "Be a Lifeguard",
  "Thoughts/Feelings": "Be Present",
  "Control": "Be an Author",
  "Focus": "Be Intentional",
  "Fires": "Be a Firefighter",
  "Adjusting": "Be Agile",
};

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1, scale: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 1.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, opacity: 1
  }
};

export default function FinalForm() {
  const [backendData, setBackendData] = useState({});
  const { userData } = useContext(StepperContext);

  useEffect(() => {
    fetch("/api/data")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  useEffect(() => {
    const addUser = async () => {
      const res = await api.post("/", userData);
      console.log("HERE IS THE RESPONSE...", res);
    };
    addUser();
  }, [userData]);

  const handleLinkClick = () => {
    const link = links[userData.statement];
    if (link) {
      window.open(link, '_blank');
    } else {
      console.log("error?");
    }
  };

  return (
    <div>
<div className="flex flex-col md:flex-column md:pt-8 items-center md:space-x-10 bg-white rounded-lg">
  <motion.img
    variants={itemVariants}
    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-pmmGold mb-6 md:mb-6"
    src="https://uploads-ssl.webflow.com/65fded56193c91c4ae0eb328/662c1a8c2c50441c8e78a7df_Freddie-Scott-Avatar.jpg"
    alt="Coach Freddie Scott"
  />

  <motion.div 
    variants={itemVariants} 
    className="text-gray-800 text-center md:text-left md:flex-grow"
  >
    <p className="text-center text-sm lg:text-lg font-medium mb-2 leading-snug pb-0">
      I'm <span className="">Freddie Scott</span>, former <span className="">Pro Athlete</span>, <span className="">Transition Coach</span>, and <span className="">Advocate</span> for your success.



      I'd like you to start with our{' '}
      <span onClick={handleLinkClick} className="inline-block text-pmmGrit px-0 py-0 rounded-full font-bold mx-2 transform transition duration-300 hover:scale-105">
        {statement2pillar[userData.statement]}
      </span>{' '}
      course.



      To start, reflect on these key points.
    </p>
  </motion.div>
</div>

<motion.div 
  variants={itemVariants} 
  animate="visible" 
  initial="hidden" 
  className="mt-6 text-sm"
>
  {strategies[userData.statement] && <PillarResults data={strategies[userData.statement]} />}
</motion.div>

<div className="flex justify-center mt-8">
  <button 
    onClick={handleLinkClick} 
    className="text-sm md:text-base bg-pmmGrit hover:bg-pmmBlue text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
  >
    Take the Course
  </button>
</div>
</div>
  );
}
