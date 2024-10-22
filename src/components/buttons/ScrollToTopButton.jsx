import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiArrowUp } from 'react-icons/hi2';
import PropTypes from 'prop-types';

const ScrollToTopButton = ({ languageChanged, setLanguageChanged, scrollPositionRef }) => {
   const { t } = useTranslation();
   const [showScroll, setShowScroll] = useState(false);
   const [buttonBottom, setButtonBottom] = useState('20px');

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   useEffect(() => {
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
               const newButtonBottom = `${windowHeight - footerRect.top + 20}px`;
               setButtonBottom(newButtonBottom);
            } else {
               setButtonBottom('20px');
            }
         }
      };

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
      const footer = document.getElementById('footer');
      if (footer) {
         const footerRect = footer.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         if (footerRect.top < windowHeight) {
            const newButtonBottom = `${windowHeight - footerRect.top + 20}px`;
            setButtonBottom(newButtonBottom);
         }
      }
   }, []);

   useEffect(() => {
      if (languageChanged) {
         window.scrollTo(0, scrollPositionRef.current);
         setLanguageChanged(false);
      }
   }, [languageChanged, setLanguageChanged, scrollPositionRef]);

   return (
      <div
         className={`fixed right-5 z-50 ${
            showScroll
               ? 'opacity-100 transition-opacity duration-700'
               : 'opacity-0 transition-opacity duration-1000 delay-800'
         }`}
         style={{ bottom: buttonBottom, zIndex: 1000 }}
      >
         <div
            className="flex items-center cursor-pointer bg-gray-300 px-3 py-2 rounded shadow-lg hover:bg-white"
            onClick={scrollTop}
         >
            <HiArrowUp className="text-black mr-2 animate-bounce" />
            <span className="text-black animate-bounce">{t("scroll_up_button")}</span>
         </div>
      </div>
   );
};

ScrollToTopButton.propTypes = {
   languageChanged: PropTypes.bool.isRequired,
   setLanguageChanged: PropTypes.func.isRequired,
   scrollPositionRef: PropTypes.shape({
      current: PropTypes.number.isRequired,
   }).isRequired,
};

export default ScrollToTopButton;