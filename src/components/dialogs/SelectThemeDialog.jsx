import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { MdLightMode, MdNightlight } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setTheme, syncSystemTheme } from '../../redux/theme/themeSlice';

export default function SelectThemeDialog({ show, onClose, onConfirm }) {
   const { t } = useTranslation();
   const dialogRef = useRef(null);
   const dispatch = useDispatch();
   const [selectedTheme, setSelectedTheme] = useState('system');

   useEffect(() => {
      const handleSystemThemeChange = () => {
         if (selectedTheme === "system") {
            dispatch(syncSystemTheme());
         }
      };
   
      const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
      systemThemeMedia.addEventListener("change", handleSystemThemeChange);
   
      return () => {
         systemThemeMedia.removeEventListener("change", handleSystemThemeChange);
      };
   }, [selectedTheme, dispatch]);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            e.stopPropagation();
            onClose();
         }
      };
   
      if (show) {
         document.addEventListener("mousedown", handleClickOutside);
      }
   
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [show, onClose]);

   if (!show) return null;

   const handleThemeChange = (e) => {
      setSelectedTheme(e.target.value);
   };

   const handleConfirmClick = (e) => {
      e.stopPropagation();
      localStorage.setItem("theme", selectedTheme);
      dispatch(setTheme(selectedTheme));
      if (selectedTheme === "system") {
         dispatch(syncSystemTheme());
      }
      onConfirm(selectedTheme);
      onClose();
   };

   const handleCancelClick = (e) => {
      e.stopPropagation();
      onClose();
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 shadow-sm">
         <div className="mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 border-dialog border-gray-300 dark:border-gray-700 relative" ref={dialogRef}>
            <button onClick={onClose} className="absolute top-3 right-3 rounded-md">
               <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-300 dark:hover:bg-gray-600" onClick={handleCancelClick} />
            </button>
            <div className="text-left">
               <h3 className="px-5 py-4 mb-2 text-lg">
                  {t("dialogs:choose_theme")}
               </h3>
               <div className="flex flex-col gap-2 mb-5">
                  <label className="flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700/60 px-5 py-3">
                     <div className="flex items-center flex-grow">
                        <IoMdSettings name="system" className="mr-3" size={28} />
                        <span>{t("dialogs:system_theme")}</span>
                     </div>
                     <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={selectedTheme === 'system'}
                        onChange={handleThemeChange}
                        className="w-4 h-4 text-teal-600 bg-gray-300 border-gray-300 focus:ring-teal-500 focus:ring-2 rounded-full cursor-pointer"
                     />
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700/60 px-5 py-3">
                     <div className="flex items-center flex-grow">
                        <MdLightMode name="light" className="mr-3" size={28} />
                        <span>{t("dialogs:light_theme")}</span>
                     </div>
                     <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={selectedTheme === 'light'}
                        onChange={handleThemeChange}
                        className="w-4 h-4 text-teal-600 bg-gray-300 border-gray-300 focus:ring-teal-500 focus:ring-2 rounded-full cursor-pointer"
                     />
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700/60 px-5 py-3">
                     <div className="flex items-center flex-grow">
                        <MdNightlight name="dark" className="mr-3" size={26} />
                        <span>{t("dialogs:dark_theme")}</span>
                     </div>
                     <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={selectedTheme === 'dark'}
                        onChange={handleThemeChange}
                        className="w-4 h-4 text-teal-600 bg-gray-300 border-gray-300 focus:ring-teal-500 focus:ring-2 rounded-full cursor-pointer"
                     />
                  </label>
               </div>
               <div className="flex justify-end gap-4 p-4">
                  <button
                     className="bg-teal-400 dark:bg-teal-500 hover:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-md px-4 py-2 shadow-md"
                     onClick={handleConfirmClick}
                  >
                     {t("dialogs:apply")}
                  </button>
                  <button
                     className="bg-gray-300 dark:bg-gray-600 rounded-md px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-700 shadow-md"
                     onClick={handleCancelClick}
                  >
                     {t("dialogs:cancel")}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

SelectThemeDialog.propTypes = {
   show: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
};
