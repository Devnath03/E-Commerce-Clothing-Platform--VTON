import { assets } from "@/assets/assets";
import React, { useState, useEffect } from "react";
import Title from "./Title";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import { motion, AnimatePresence } from "framer-motion"; // For animations

const Gallery = () => {
  const images = [
    { src: assets.hero_img, title: "Image 1", description: "This is the first image in the gallery." },
    { src: assets.hero_img2, title: "Image 2", description: "This is the second image in the gallery." },
    { src: assets.hero_img, title: "Image 3", description: "This is the third image in the gallery." },
    { src: assets.hero_img2, title: "Image 4", description: "This is the fourth image in the gallery." },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoChange, setIsAutoChange] = useState(true);

  // Auto-change images and content every 5 seconds
  useEffect(() => {
    if (isAutoChange) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image and content every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoChange, images.length]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setIsAutoChange(false); // Pause auto-change when lightbox is open
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsAutoChange(true); // Resume auto-change when lightbox is closed
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 bg-gray-100">
      {/* Title Section */}
      <div className="text-center text-2xl py-1 mb-5">
        <Title text1={"GALLERY"} text2={"COLLECTIONS"} />
      </div>

      {/* Split Layout: Left (Content) and Right (Image) */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4">
        {/* Left Side: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center items-start space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800">
                {images[currentIndex].title}
              </h2>
              <p className="text-gray-600 text-lg">
                {images[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-2/5 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={`Gallery ${currentIndex}`}
              className="w-full h-auto rounded-lg shadow-2xl cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={() => openLightbox(images[currentIndex].src)}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full p-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-5 right-5 text-white text-1xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;