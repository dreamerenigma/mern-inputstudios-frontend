import React, { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi2';

const ScrollToTopButton = () => {
   const [showScroll, setShowScroll] = useState(false);

   const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
         setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
         setShowScroll(false);
      }
   };

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
      return () => {
         window.removeEventListener('scroll', checkScrollTop);
      };
   }, [showScroll]);

   return (
      <div
         className={`fixed bottom-5 right-5 z-50 ${
         showScroll
            ? 'opacity-100 transition-opacity duration-700'
            : 'opacity-0 transition-opacity duration-1000 delay-800'
         }`}
      >
         {showScroll && (
            <div
               className="flex items-center cursor-pointer bg-gray-300 px-3 py-2 rounded shadow-lg hover:bg-white"
               onClick={scrollTop}
            >
               <HiArrowUp className="text-black mr-2 animate-bounce" />
               <span className="text-black animate-bounce">Наверх</span>
            </div>
         )}
      </div>
   );
};

export default ScrollToTopButton;