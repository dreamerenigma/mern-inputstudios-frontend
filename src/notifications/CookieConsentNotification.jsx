import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';
import CookieManagementModal from '../components/modals/CookieManagementModal';

const CustomCookieConsentNotification = () => {
   const { t } = useTranslation();
   const [isVisible, setIsVisible] = useState(true);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      const cookieConsent = Cookies.get('cookieConsent');
      if (cookieConsent) {
         setIsVisible(false);
      }
   }, []);

   const handleClose = () => {
      setIsVisible(false);
   };

   const handleAccept = () => {
      console.log('Cookies accepted');
      Cookies.set('cookieConsent', 'accepted', { expires: 365 });
      setIsVisible(false);
   };

   const handleDecline = () => {
      console.log('Cookies declined');
      Cookies.set('cookieConsent', 'declined', { expires: 365 });
      setIsVisible(false);
   };

   const handleSettings = () => {
      console.log('Opening cookie settings modal');
      setShowModal(true);
   };

   return (
      <>
         {isVisible && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-500 shadow-lg p-4 z-50 md:flex md:justify-between md:items-center">
               <button 
                  onClick={handleClose} 
                  className="absolute top-2 right-2 text-white focus:outline-none"
                  aria-label="Close"
               >
                  <AiOutlineClose size={24} />
               </button>
               <div className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
                  <span className="block text-white">{t("cookie_consent")}</span>
               </div>
               <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full md:w-auto items-center mr-12">
                  <button 
                     onClick={handleSettings}
                     className="bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-auto"
                  >
                     {t("cookie_settings")}
                  </button>
                  <button 
                     onClick={handleDecline} 
                     className="bg-gray-300 text-gray-600 font-medium px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-auto"
                  >
                     {t("cookie_deny")}
                  </button>
                  <button 
                     onClick={handleAccept} 
                     className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-auto"
                  >
                     {t("cookie_allow")}
                  </button>
               </div>
            </div>
         )}
         {showModal && (
            <CookieManagementModal 
               showModal={showModal} 
               handleCloseModal={() => setShowModal(false)}
            />
         )}
      </>
   );
};

export default CustomCookieConsentNotification;
