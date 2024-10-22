import { HiX } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function DownloadModal({ showModal, setShowModal }) {
   const { t } = useTranslation();
   const modalRef = useRef();
   const [loading, setLoading] = useState(true);
   const [downloadComplete, setDownloadComplete] = useState(false);

   useEffect(() => {
      const handleCloseModal = (e) => {
         if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
         }
      };

      document.addEventListener('mousedown', handleCloseModal);
      return () => {
         document.removeEventListener('mousedown', handleCloseModal);
      };
   }, [setShowModal]);

   useEffect(() => {
      if (showModal) {
         setLoading(true);
         const timer = setTimeout(() => {
            setLoading(false);
         }, 1000);
         
         return () => clearTimeout(timer);
      }
   }, [showModal]);

   if (!showModal) return null;

   const handleLanguageChange = (language) => {
      console.log(`Language changed to: ${language}`);
   };

   const handleDownload = () => {
      setDownloadComplete(true);
      const link = document.createElement('a');
      link.href = '/downloads/InputStudiosWaveSetup.exe';
      link.setAttribute('download', 'InputStudiosWaveSetup.exe');
      document.body.appendChild(link);
      link.click();
      link.remove();
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
         <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg max-w-[820px] w-full relative overflow-hidden min-h-[550px]">
            <button
               onClick={() => setShowModal(false)}
               className="absolute top-5 right-5 transform transition-transform duration-200 hover:translate-y-[-2px]"
            >
               <HiX className="h-6 w-6" />
            </button>
            {loading ? (
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                  <div className="loader border-t-transparent border-solid rounded-full border-teal-500 border-4 h-8 w-8 mb-4 animate-spin"></div>
                  <p className="text-lg text-gray-700 dark:text-white">{t("loading")}...</p>
               </div>
            ) : downloadComplete ? (
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                  <p className="text-4xl text-gray-700 dark:text-white mb-4">{t("thanks")}</p>
                  <p className="text-xl text-gray-700 dark:text-white mb-6">{t("download_will_start_soon")}</p>
                  <button
                     onClick={() => setShowModal(false)}
                     className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded shadow-md text-lg"
                  >
                     {t("close")}
                  </button>
               </div>
            ) : (
               <div className="text-left mt-2">
                  <div className="mb-6">
                     <h2 className="text-3xl mx-4 mb-8 font-medium">{t("download_wave")}</h2>
                  </div>
                  <div className="custom-scrollbar overflow-y-auto">
                     <div className="mb-4 mx-2 p-2 max-h-[30vh]">
                        <div className="dark:bg-gray-600 rounded-xl p-2">
                           <p className="m-4">
                              {t("terms_license_agreement")}
                           </p>
                           <p className="font-bold mx-4 mb-3">INPUT STUDIOS WAVE</p>
                           <hr className="border-gray-300 mb-2 mx-4" />
                           <p className="mb-2 mx-4">{t("installed_terms_viewed_")}</p>
                           <p className="mb-2 mx-4">{t("license_terms_agreement_between")}</p>
                           <p className="mb-2 mx-4">{t("windows_devices")}</p>
                           <p className="mb-2 mx-4">{t("windows_license_terms")}</p>
                           <p className="mb-2 mx-4">{t("updates")}</p>
                           <p className="mb-2 mx-4">{t("preview_versions")}</p>
                           <p className="mb-2 mx-4">{t("data_collection_previews")}</p>
                           <p className="mb-2 mx-4">{t("other_Services")}</p>
                           <p className="mb-2 mx-4">{t("devices_without_windows")}</p>
                           <hr className="border-gray-300 mb-2 mx-4" />
                           <p className="mb-2 mx-4">{t("devices_without_windows")}</p>
                           <hr className="border-gray-300 mb-2 mx-4" />
                           <p className="mb-2 mx-4">{t("devices_without_windows")}</p>
                        </div>
                     </div>
                  </div>
                  <div className="mt-6 mb-4">
                     <p className="text-base text-teal-500 mx-4 font-medium hover:underline hover:text-teal-700">
                        {t("privacy_statement")}
                     </p>
                  </div>
                  <div className="relative flex justify-between">
                     <div className="flex cursor-pointer">
                        <p className="text-sm mx-4 mb-2">{t("select_language")}</p>
                     </div>
                     <div className="absolute z-10 mx-4 mt-7 mb-4 w-[300px] bg-white border border-gray-300 rounded-md shadow-lg">
                        <ul className="py-1">
                           <li
                              onClick={() => handleLanguageChange('Русский')}
                              className="flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 cursor-pointer"
                           >
                              {t("russian_lang")}
                              <span className="ml-auto">
                                 <IoIosArrowDown className="text-black" />
                              </span>
                           </li>
                        </ul>
                     </div>
                     <button 
                        onClick={handleDownload}
                        className="ml-auto bg-teal-500 hover:bg-teal-700 text-white px-4 mt-6 py-2 rounded shadow-md"
                     >
                        {t("accept_download")}
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

DownloadModal.propTypes = {
   setShowModal: PropTypes.func.isRequired,
   showModal: PropTypes.bool.isRequired,
};
