import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";

export default function  NotificationDialog ({ show, onClose, onConfirm, onCheckboxChange }) {
   const { t } = useTranslation();
   const [isTrackerChecked, setIsTrackerChecked] = useState(false);
   const [isEmailChecked, setIsEmailChecked] = useState(false);

   useEffect(() => {
      if (show) {
         const trackerState = localStorage.getItem("isTrackerChecked") === "true";
         const emailState = localStorage.getItem("isEmailChecked") === "true";

         setIsTrackerChecked(trackerState);
         setIsEmailChecked(emailState);
      }
   }, [show]);

   const handleSave = () => {
      localStorage.setItem("isTrackerChecked", isTrackerChecked);
      localStorage.setItem("isEmailChecked", isEmailChecked);

      onCheckboxChange(isTrackerChecked || isEmailChecked);
      onConfirm();
   };

   const handleClose = () => {
      handleUncheckAll();
      onClose();
   };

   const handleCheckboxChange = (type, value) => {
      if (type === "tracker") setIsTrackerChecked(value);
      if (type === "email") setIsEmailChecked(value);

      const hasSelection = value || isTrackerChecked || isEmailChecked;
      onCheckboxChange(hasSelection);
   };

   const handleUncheckAll = () => {
      setIsTrackerChecked(false);
      setIsEmailChecked(false);
      onCheckboxChange(false);
   };

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   if (!show) return null;

   return (
      <div
         className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 shadow-sm"
         onClick={handleOverlayClick}
      >
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 border-dialog border-gray-700 relative">
            <button 
               onClick={onClose}
               className="absolute top-3 right-3 rounded-md"
            >
               <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
            </button>
            <div className="text-start px-6 py-2">
               <h3 className="mb-5 text-lg">
                  Подписаться на новые комментарии
               </h3>
               <div className="flex flex-col gap-4">
                  <label className="flex items-center">
                     <input
                        type="checkbox"
                        checked={isTrackerChecked}
                        onChange={(e) =>
                           handleCheckboxChange("tracker", e.target.checked)
                        }
                        className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                     />
                     <span className="">Трекер</span>
                  </label>
                  <label className="flex items-center">
                     <input 
                        type="checkbox"
                        checked={isEmailChecked}
                        onChange={(e) =>
                           handleCheckboxChange("email", e.target.checked)
                        }
                        className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                     />
                     <span className="">По почте</span>
                  </label>
               </div>
               <div className="flex gap-4 pt-8 pb-2">
                  <button
                     className="bg-red-600 dark:hover:bg-red-800 hover:bg-red-700 text-white rounded-md px-4 py-2 shadow-md"
                     onClick={handleSave}
                  >
                     Сохранить
                  </button>
                  <button
                     className="bg-gray-600 rounded-md px-4 py-2 hover:bg-gray-700 shadow-md"
                     onClick={handleClose}
                  >
                     {t("dialogs:no_cancel")}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

NotificationDialog.propTypes = {
   show: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
   onCheckboxChange: PropTypes.func.isRequired
};
