import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';

export default function DeleteCommentDialog ({ show, onClose, onConfirm }) {
   const { t } = useTranslation();
   if (!show) return null;

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   return (
      <div 
         className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 shadow-sm"
         onClick={handleOverlayClick}
      >
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 border-dialog border-gray-700 relative">
            <button 
               onClick={onClose}
               className="absolute top-3 right-3 rounded-md"
            >
               <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
            </button>
            <div className="text-center">
               <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
               <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  {t("dialogs:sure_want_delete_comment")}
               </h3>
               <div className="flex justify-center gap-4">
                  <button
                     className="bg-red-600 dark:hover:bg-red-800 hover:bg-red-700  text-white rounded-md px-4 py-2 shadow-md"
                     onClick={onConfirm}
                  >
                     {t("dialogs:yes_im_sure")}
                  </button>
                  <button
                     className="bg-gray-600 rounded-md px-4 py-2 hover:bg-gray-700 shadow-md"
                     onClick={onClose}
                  >
                     {t("dialogs:no_cancel")}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

DeleteCommentDialog.propTypes = {
   show: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
};
