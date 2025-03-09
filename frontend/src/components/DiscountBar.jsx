import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';


const DiscountBar = () => {
  // Define animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: -20 }, // Initial state
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }, // Final state with bounce effect
  };

  return (
    <div className="bg-gray-400/80 py-1 font-poppins font-regular text-white hidden md:block mt-1"> {/* Hide on small screens */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center px-4">
        {/* Flex container to align h1 and button in a row on larger screens */}
        <motion.h1
          className="text-base sm:text-sm mr-4 text-center sm:text-left"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Exciting offers up to 50% off!
        </motion.h1>
        <NavLink to="/collection">
          <button
            className="bg-secondary text-white py-1 px-0 rounded-full hover:bg-primary transition-all duration-300 font-poppins font-light text-xs sm:text-sm pulse mt-4 sm:mt-0"
          >
            Shop Now
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default DiscountBar;