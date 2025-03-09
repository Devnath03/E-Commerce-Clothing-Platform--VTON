import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state
    visible: { opacity: 1, y: 0 }, // Final state
  };

  return (
    <div className='my-9 pt-6 '>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Here are some of our latest collections. Check them out and find the perfect one for you.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {latestProducts.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants} // Use the defined variants
            initial="hidden" // Initial state
            whileInView="visible" // Animate when in view
            exit="hidden" // Exit animation
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
          >
            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} colors={item.colors} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;