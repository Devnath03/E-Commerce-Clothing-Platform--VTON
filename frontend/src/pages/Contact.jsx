import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'; // Ensure this is correctly imported

const Contact = () => {
  return (
    <motion.div
      className='p-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' // Add padding for better spacing
      initial={{ opacity: 0, y: 20 }} // Initial state for appearance
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 20 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
    >
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <motion.div
        className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'
        initial={{ opacity: 0 }} // Initial state for content
        animate={{ opacity: 1 }} // Animate to visible
        transition={{ duration: 0.5, delay: 0.3 }} // Delay for staggered effect
      >
        <motion.img
          className='w-full md:max-w-[480px]'
          src={assets.contact_img}
          alt=""
          initial={{ scale: 0.95 }} // Initial scale for image
          animate={{ scale: 1 }} // Animate to full scale
          transition={{ duration: 0.5 }} // Transition duration for smooth scaling
        />
        <div className='flex flex-col justify-center items-start gap-6'>
          <motion.p
            className='font-semibold text-xl text-gray-600'
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.4 }} // Delay for staggered effect
          >
            Our Store
          </motion.p>
          <motion.p
            className='text-gray-500'
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.5 }} // Delay for staggered effect
          >
            169/A Gonahena Kadawatha 11350.
            <br /> Colombo
            <br /> Western Province
            <br /> Sri Lanka

          </motion.p>
          <motion.p
            className='text-gray-500'
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.6 }} // Delay for staggered effect
          >
            Tel: (+94) 77-451-5426 <br /> Email: clothing@gmail.com
          </motion.p>
          <motion.p
            className='font-semibold text-xl text-gray-600'
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.7 }} // Delay for staggered effect
          >
            Careers at Forever
          </motion.p>
          <motion.p
            className='text-gray-500'
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.8 }} // Delay for staggered effect
          >
            Learn more about our teams and job openings. Get in touch subscribing the newsletter
          </motion.p>
          <motion.button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on click
            transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth spring transition
          >
 Explore Jobs
          </motion.button>
        </div>
      </motion.div>

      <NewsletterBox /> {/* Corrected component name */}
    </motion.div>
  );
};

export default Contact;