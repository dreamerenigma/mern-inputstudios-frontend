import React, { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi2';

const ScrollToTopButton = () => {
   const [showScroll, setShowScroll] = useState(false);
   const [buttonBottom, setButtonBottom] = useState('20px');

   const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
         setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
         setShowScroll(false);
      }
   };

   const checkFooterPosition = () => {
      const footer = document.getElementById('footer');
      if (footer) {
         const footerRect = footer.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         if (footerRect.top < windowHeight) {
            const newButtonBottom = `${windowHeight - footerRect.top + 20}px`; // Adjust 20px as needed
            setButtonBottom(newButtonBottom);
         } else {
            setButtonBottom('20px');
         }
      }
   };

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
      window.addEventListener('scroll', checkFooterPosition);
      window.addEventListener('resize', checkFooterPosition);
      return () => {
         window.removeEventListener('scroll', checkScrollTop);
         window.removeEventListener('scroll', checkFooterPosition);
         window.removeEventListener('resize', checkFooterPosition);
      };
   }, [showScroll]);

   useEffect(() => {
      checkFooterPosition();
   }, []);

   return (
      <div
         className={`fixed right-5 z-50 ${
         showScroll
            ? 'opacity-100 transition-opacity duration-700'
            : 'opacity-0 transition-opacity duration-1000 delay-800'
         }`}
         style={{ bottom: buttonBottom, zIndex: 1000 }} // Ensure the button is above other elements, like the footer
      >
         <div
            className="flex items-center cursor-pointer bg-gray-300 px-3 py-2 rounded shadow-lg hover:bg-white"
            onClick={scrollTop}
         >
            <HiArrowUp className="text-black mr-2 animate-bounce" />
            <span className="text-black animate-bounce">Наверх</span>
         </div>
      </div>
   );
};

export default ScrollToTopButton;
