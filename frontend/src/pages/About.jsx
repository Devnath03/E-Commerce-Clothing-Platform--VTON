import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <motion.div
      className='flex flex-col sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'
      initial={{ opacity: 0, y: 20 }} // Initial state for appearance
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 20 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
    >
      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <motion.div
        className='my-10 flex flex-col md:flex-row gap-16'
        initial={{ opacity: 0 }} // Initial state for content
        animate={{ opacity: 1 }} // Animate to visible
        transition={{ duration: 0.5, delay: 0.3 }} // Delay for staggered effect
      >
        <motion.img
          className='w-full md:max-w-[450px]'
          src={assets.aboutim}
          alt=""
          initial={{ scale: 0.9 }} // Initial scale for image
          animate={{ scale: 1 }} // Animate to full scale
          transition={{ duration: 0.5 }} // Transition duration for smooth scaling
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <motion.p
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.4 }} // Delay for staggered effect
          >
           Clothing Store is a family-owned business that has been operating for over 20 years. We are dedicated to providing the best quality clothing and accessories for our customers. Our mission is to provide exceptional customer service and convenience to our customers. We are committed to providing the best quality products at affordable prices. We are proud to be a part of the community and look forward to serving you for many years to come. 
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.5 }} // Delay for staggered effect
          >
           Here at Clothing Store, we believe that everyone deserves to look and feel their best. That's why we offer a wide range of clothing and
           </motion.p>
          <b className='text-gray-800'>Our Mission</b>
          <motion.p
            initial={{ opacity: 0, y: 20 }} // Initial state for paragraph
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.6 }} // Delay for staggered effect
          >
            Our mission is to provide exceptional customer service and convenience to our customers. We are committed to providing the best quality products at affordable prices. We are proud to be a part of the community and look forward to serving you for many years to come.
            </motion.p>
        </div>
      </motion.div>

      <motion.div
        className='text-4xl py-4'
        initial={{ opacity: 0, y: -20 }} // Initial state for title
        animate={{ opacity: 1, y: 0 }} // Animate to visible
        transition={{ duration: 0.5, delay: 0.7 }} // Delay for staggered effect
      >
        <Title text1={'WHY'} text2={"CHOOSE US"} />
      </motion.div>

      <motion.div
        className='flex flex-col md:flex-row text-sm mb-20'
        initial={{ opacity: 0 }} // Initial state for features
        animate={{ opacity: 1 }} // Animate to visible
        transition ={{ duration: 0.5, delay: 0.8 }} // Delay for staggered effect
      >
        <motion.div
          className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
          initial={{ opacity: 0, y: 20 }} // Initial state for feature box
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5, delay: 0.9 }} // Delay for staggered effect
        >
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            Qualuty is our top priority. We ensure that all our products are of the highest quality and meet the highest standards. We are committed to providing the best quality products at affordable prices.
          </p>
        </motion.div>
        <motion.div
          className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
          initial={{ opacity: 0, y: 20 }} // Initial state for feature box
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5, delay: 1.0 }} // Delay for staggered effect
        >
          <b>Convenience:</b>
          <p className='text-gray-600'>
            we are committed to providing the best quality products at affordable prices. We are proud to be a part of the community and look forward to serving you for many years to come.  
          </p>
        </motion.div>
        <motion.div
          className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
          initial={{ opacity: 0, y: 20 }} // Initial state for feature box
          animate={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ duration: 0.5, delay: 1.1 }} // Delay for staggered effect
        >
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            We are committed to providing exceptional customer service to our customers. We are dedicated to providing the best quality products at affordable prices. We are proud to be a part of the community and look forward to serving you for many years to come.
          </p>
        </motion.div>
      </motion.div>

      <NewsletterBox />
    </motion.div>
  );
};

export default About;