import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HeroAnimation = () => {
  const [showText, setShowText] = useState(false);
  const videoRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 5 && video.currentTime < 6) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowText(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    [textRef1, textRef2, textRef3].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [textRef1, textRef2, textRef3].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row my-20">
   

      {/* Text Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center">
        <motion.div
          ref={textRef1}
          className="text-black text-5xl text-center bg-opacity-100 p-10 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5 }}
        >
          Discover Your Perfect Fit
        </motion.div>
        <motion.div
          ref={textRef2}
          className="text-black text-3xl text-center bg-opacity-100 p-8 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          Experience Fashion Like Never Before
        </motion.div>
        <motion.div
          ref={textRef3}
          className="text-gray-700 text-xl text-center bg-opacity-100 p-6 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          With our Virtual Try-On, explore styles, colors, and sizes before you
          buy. Shop with confidence!
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAnimation;
