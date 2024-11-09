import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const NextDownloadBrowserDialog = ({ show, onClose }) => {
   if (!show) return null;

   return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md" onClick={onClose}>
         <div 
            className="bg-white dark:bg-gray-700 rounded-lg p-6 sm:p-10 md:p-20 max-w-full sm:max-w-lg md:max-w-4xl w-full relative" 
            onClick={(e) => e.stopPropagation()}
         >
            <button 
               onClick={onClose} 
               className="absolute top-4 right-4 text-gray-400 hover:text-white">
               <AiOutlineClose size={24} />
            </button>
            <div className="flex flex-col items-center justify-center mx-auto w-full">
               <img src="/images/apps/wave/wave_logo.png" alt="Logo" className="mb-4 w-16 sm:w-20 h-16 sm:h-20" />
               <p className="text-center text-2xl sm:text-3xl mb-4">
                  Вы уже просматриваете веб-страницы в Input Studios Wave.
               </p>
               <p className="text-center text-xl sm:text-2xl mb-4">
                  Ознакомьтесь с новейшими функциями здесь.
               </p>
               <button 
                  onClick={onClose} 
                  className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-2 rounded-lg mb-4 shadow-lg"
               >
                  Ознакомьтесь с новыми функциями
               </button>
               <p 
                  className="text-center text-lg sm:text-xl mb-2 text-teal-500 cursor-pointer transition-all duration-200 hover:text-teal-700 hover:-translate-y-1" 
                  onClick={onClose}
               >
                  Продолжить загрузку Wave
               </p>
               <div className="bg-teal-100 dark:bg-gray-600 rounded-xl p-4 sm:p-6 shadow-lg mt-12 w-[80%] sm:w-[430px] mx-auto">
                  <p className="text-center text-white text-lg mb-4">Загрузите мобильное приложение Wave уже сегодня</p>
                  <img src="/images/apps/wave/qr_download_wave_mobile.png" alt="Mobile App" className="mt-4 w-[150px] sm:w-[200px] mx-auto block" />
               </div>
            </div>
         </div>
      </div>
   );
};

NextDownloadBrowserDialog.propTypes = {
   show: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};

export default NextDownloadBrowserDialog;
