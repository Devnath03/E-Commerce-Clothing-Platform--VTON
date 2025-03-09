import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion'; 
import { VelocityScroll } from "./ui/scroll-based-velocity";
// import SplashCursor from '@/components/Animations/SplashCursor/SplashCursor';

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className='flex flex-col relative opacity-86 overflow-hidden z-0'>
      <div className='flex flex-col relative opacity-86 w-full h-[500px] overflow-hidden z-0'> {/* Adjust height here */}
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* {isPlaying && <SplashCursor />} */}
          <motion.video
            ref={videoRef}
            src="src/assets/video1.mp4" // Video source
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover" // Ensure video covers the container
            //style={{ width: '100%', height: '100%' }} // Explicitly set width and height
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onPlay={handlePlay}
            onPause={handlePause}
            onError={(e) => {
              console.error("Video failed to load:", e);
              e.target.src = "src/assets/fallback.jpg"; // Fallback image
            }}  
          />
        </div>
        
        {/* Overlay Text Section */}
        <div className='relative z-10 flex flex-col justify-center items-center h-full text-white'>
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-white'></p>
              <motion.p 
                className='font-medium text-sm md:text-base glitch' 
                data-text="OUR BESTSELLERS"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} // Staggered entrance
              >
                OUR BESTSELLERS
              </motion.p>
            </div>
            <motion.h1 
              className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed glitch' 
              data-text="Latest Arrivals"
              initial={{ scale: 0.8, opacity:  0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.8, type: 'spring', stiffness: 300, damping: 20 }} // Spring animation with damping
            >
              Latest Arrivals
            </motion.h1>
            <div className='flex items-center gap-2'>
              <motion.p 
                className='font-semibold text-sm md:text-base glitch' 
                data-text="SHOP NOW"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }} // Staggered entrance
              >
                SHOP NOW
              </motion.p>
              <p className='w-8 md:w-11 h-[1px] bg-white'></p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex flex-col relative bg-black/90 text-sm text-white opacity-86 w-full h overflow-hidden mt-2 z-0'>
        <VelocityScroll>
          CHECK OUT NEW VIRTUAL TRY-ON FEATURE
        </VelocityScroll>
      </div> */}
    </div>
  );
}

export default Hero;