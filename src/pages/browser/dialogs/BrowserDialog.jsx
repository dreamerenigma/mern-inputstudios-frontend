import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const BrowserDialog = () => {
   const { t } = useTranslation();
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleDownloadClick = (event) => {
      event.preventDefault();
      setIsDialogOpen(true);
   };

   const closeDialog = () => {
      setIsDialogOpen(false);
      window.location.href = `${languagePrefix}/wave/download`;
   };

   return (
      <div className="inline-block mt-10">
         <Link to="#" onClick={handleDownloadClick}>
            <CustomButton>{t("browser:download_your_device")}</CustomButton>
         </Link>
         {isDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-4 rounded-lg shadow-lg relative w-96">
                  <button 
                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                     onClick={closeDialog}
                  >
                     <FaTimes size={20} />
                  </button>
                  <h2 className="text-xl mb-4">{t("browser:please_confirm_download")}</h2>
                  <p>{t("browser:continue_downloading_app")}</p>
                  <div className="mt-4 text-center">
                     <button 
                        onClick={closeDialog} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                     >
                        {t("browser:browser:browser:confirm")}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default BrowserDialog;
