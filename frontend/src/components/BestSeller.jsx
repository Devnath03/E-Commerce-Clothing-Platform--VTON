import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5))
  },[products])

  
  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state
    visible: { opacity: 1, y: 0 }, // Final state
  };

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, odio exercitationem! Pariatur sit ipsa.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants} // Use the defined variants
            initial="hidden" // Initial state
            whileInView="visible" // Animate when in view
            exit="hidden" // Exit animation
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
          >
            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} colors={item.colors} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;