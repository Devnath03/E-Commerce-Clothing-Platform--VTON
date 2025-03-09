import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    const handleClose = () => {
        setShowSearch(false);
    };

    return (
        <AnimatePresence>
            {showSearch && visible && (
                <motion.div
                    className='fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50'
                    initial={{ opacity: 0, y: -50 }} // Initial state for appearance
                    animate={{ opacity: 1, y: 0 }} // Animate to this state
                    exit={{ opacity: 0, y: -50 }} // Exit animation
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                >
                    <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                        {/* Search Input */}
                        <motion.div
                            className='flex items-center gap-3 w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm'
                            initial={{ scale: 0.9, opacity: 0 }} // Initial state
                            animate={{ scale: 1, opacity: 1 }} // Animate to this state
                            transition={{ delay: 0.2, duration: 0.3 }} // Slight delay for smooth appearance
                        >
                            <img
                                className='w-5 h-5 opacity-70'
                                src={assets.search_icon}
                                alt="Search"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='flex-1 outline-none bg-transparent text-sm placeholder-gray-400'
                                type="text"
                                placeholder='Search for products...'
                                autoFocus // Automatically focus on the input when the search bar appears
                            />
                        </motion.div>

                        {/* Close Button */}
                        <motion.img
                            onClick={handleClose}
                            className='w-4 h-4 cursor-pointer opacity-70 hover:opacity-100'
                            src={assets.cross_icon}
                            alt="Close"
                            initial={{ rotate: 0, scale: 1 }} // Initial state
                            whileHover={{ scale: 1.2 }} // Scale up on hover
                            whileTap={{ rotate: 90, scale: 0.8 }} // Rotate and scale down on click
                            transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth spring transition
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;