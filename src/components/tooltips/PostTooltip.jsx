import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function PostTooltip ({ showTooltip }) {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      let timeout;
      if (showTooltip) {
         setIsVisible(true);
      } else {
         timeout = setTimeout(() => setIsVisible(false), 300);
      }
      return () => clearTimeout(timeout);
   }, [showTooltip]);

   return (
      isVisible && (
         <div
            className={`fixed top-[76px] left-1/2 transform -translate-x-1/2 bg-gray-600 bg-opacity-75 text-white text-sm p-5 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ${
               showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            style={{ zIndex: 1000 }}
         >
            Ссылка скопирована в буфер обмена
         </div>
      )
   );
}

PostTooltip.propTypes = {
   showTooltip: PropTypes.bool.isRequired,
};

