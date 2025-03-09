import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { assets } from '../assets/assets';

const OurPolicy = () => {
  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state
    visible: { opacity: 1, y: 0 }, // Final state
  };

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      {/** Map through the policies to create animated divs */}
      {[
        {
          img: assets.exchange_icon,
          title: 'Easy Exchange Policy',
          description: 'We offer hassle free exchange policy',
        },
        {
          img: assets.quality_icon,
          title: '7 Days Return Policy',
          description: 'We offer hassle free exchange policy',
        },
        {
          img: assets.support_img,
          title: 'Best customer support',
          description: 'We offer hassle free exchange policy',
        },
      ].map((policy, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible" // Animate when in view
          transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered animation
        >
          <img src={policy.img} className='w-12 m-auto mb-5' alt={policy.title} />
          <p className='font-semibold'>{policy.title}</p>
          <p className='text-gray-400'>{policy.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OurPolicy;