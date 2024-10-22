import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';
import CookieManagementModal from '../components/modals/CookieManagementModal';

const CustomCookieConsentNotification = () => {
   const { t } = useTranslation();
   const [isVisible, setIsVisible] = useState(true);
   const [showModal, setShowModal] = useState(false); // State for showing modal

   useEffect(() => {
      const cookieConsent = Cookies.get('cookieConsent');
      if (cookieConsent) {
         setIsVisible(false); // Hide notification if consent is already given
      }
   }, []);

   const handleClose = () => {
      setIsVisible(false);
   };

   const handleAccept = () => {
      console.log('Cookies accepted');
      Cookies.set('cookieConsent', 'accepted', { expires: 365 }); // Set cookie consent
      setIsVisible(false); // Hide notification
   };

   const handleDecline = () => {
      console.log('Cookies declined');
      Cookies.set('cookieConsent', 'declined', { expires: 365 }); // Set cookie consent to declined
      setIsVisible(false); // Hide notification
   };

   const handleSettings = () => {
      console.log('Opening cookie settings modal');
      setShowModal(true); // Show the settings modal
   };

   return (
      <>
         {isVisible && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-500 shadow-lg p-4 flex justify-between items-center z-50">
               <span className="mr-auto">
                  {t("cookie_consent")}
               </span>
               <button 
                  onClick={handleClose} 
                  className="absolute top-2 right-2 text-white focus:outline-none"
                  aria-label="Close"
               >
                  <AiOutlineClose size={24} />
               </button>
               <div className="flex items-center ml-auto mr-8">
                  <button 
                     onClick={handleSettings} // Call handleSettings to open modal
                     className="bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded mr-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                     {t("cookie_settings")}
                  </button>
                  <button 
                     onClick={handleDecline} 
                     className="bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded mr-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                     {t("cookie_deny")}
                  </button>
                  <button 
                     onClick={handleAccept} 
                     className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                     {t("cookie_allow")}
                  </button>
               </div>
            </div>
         )}
         {showModal && (
            <CookieManagementModal 
               showModal={showModal} 
               handleCloseModal={() => setShowModal(false)} // Close the modal
            />
         )}
      </>
   );
};

export default CustomCookieConsentNotification;
