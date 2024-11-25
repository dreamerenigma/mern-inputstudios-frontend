import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { VscPaintcan } from "react-icons/vsc";
import SelectThemeDialog from "./dialogs/SelectThemeDialog";
import ChangeFontDialog from "./dialogs/ChangeFontDialog";
import LanguageSettingsModal from "../pages/profile/dialogs/LanguageSettingsModal";

export default function DashSettings() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const [isOpen, setIsOpen] = useState(false);
   const [isShowSelectThemeDialog, setShowSelectThemeDialog] = useState(false);
   const [isShowChangeFontDialog, setShowChangeFontDialog] = useState(false);
   const [selectedTheme, setSelectedTheme] = useState('system');
   const [selectedFont, setSelectedFont] = useState("Arial");
   const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
   const [selectedLanguage, setSelectedLanguage] = useState('Выберите язык');
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'system';
      const savedFont = localStorage.getItem('font') || 'Arial';
      const savedLanguage = localStorage.getItem('language') || 'Выберите язык';
      setSelectedFont(savedFont);
      setSelectedTheme(savedTheme);
      setSelectedLanguage(savedLanguage);
   }, []);

   const getThemeText = (theme) => {
      switch (theme) {
         case 'light':
            return 'Светлая';
         case 'dark':
            return 'Темная';
         default:
            return 'Системная';
      }
   };

   const getFontText = (font) => {
      switch (font) {
         case 'Arial':
            return 'Arial';
         case 'Georgia':
            return 'Georgia';
         case 'Times New Roman':
            return 'Times New Roman';
         case 'Verdana':
            return 'Verdana';
         case 'Roboto':
            return 'Roboto';
         default:
            return 'Стандартный';
      }
   };

   const toggleOpen = () => {
      setIsOpen((prev) => !prev);
   };

   const handleCloseDialog = () => {
      setShowSelectThemeDialog(false);
      setShowChangeFontDialog(false);
      setIsLanguageSettingsOpen(false);
   };

   const handleOpenThemeDialog = () => {
      setShowSelectThemeDialog(true);
   };

   const handleOpenFontDialog = () => {
      setShowChangeFontDialog(true);
   };

   const handleLanguageSettings = () => {
      setIsLanguageSettingsOpen(true);
   };
   
   const handleConfirmThemeChange = (theme) => {
      setSelectedTheme(theme);
      localStorage.setItem('theme', theme);
      handleCloseDialog();
   };

   const handleConfirmFontChange = (font) => {
      setSelectedFont(font);
      localStorage.setItem('font', font);
      handleCloseDialog();
   };

   const handleLanguageChange = (language) => {
      setSelectedLanguage(language);
      localStorage.setItem('language', language);
   };
   
   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)] pb-20">
         <div className="gap-4 overview flex flex-col max-w-5xl w-full h-auto md:mt-8 mx-auto px-4">
            <div className="items-center mb-4 custom-flex-1030">
               <h1 className="font-semibold text-3xl">{t("settings")}</h1>
               <p className="text-base mt-8">
                  В разделе настроек вы можете управлять основными параметрами приложения, включая выбор темы оформления (светлая или тёмная), включение и отключение уведомлений, настройку звуковых эффектов, а также просмотр версии приложения. Здесь вы найдёте все необходимые инструменты, чтобы адаптировать приложение под свои предпочтения, сделать использование максимально удобным и настроить функционал в соответствии с вашими потребностями.
               </p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <div className="flex items-center">
                     <div className="flex items-center justify-between w-full pl-4 pt-3">
                        <div className="flex items-center">
                           <VscPaintcan size={28} />
                           <span className="text-md font-semibold pl-4">Оформление</span>
                        </div>
                     </div>
                  </div>
                  <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200" onClick={handleOpenThemeDialog}>
                     <div className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-2">
                        <span className="whitespace-nowrap">Темы</span>
                        <span className="whitespace-nowrap">{getThemeText(selectedTheme)}</span>
                        <span className="whitespace-normal hide-below-1030px">Выбор темы применяется во всем приложении</span>
                     </div>
                     <div className="flex items-center justify-end">
                        <span className="mx-4 flex items-center justify-end text-left cursor-pointer">
                           <IoIosArrowForward />
                        </span>
                     </div>
                     <SelectThemeDialog 
                        show={isShowSelectThemeDialog} 
                        onClose={handleCloseDialog} 
                        onConfirm={handleConfirmThemeChange} 
                     />
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200" onClick={handleOpenFontDialog} >
                     <div 
                        className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-2"
                     >
                        <span className="whitespace-nowrap">Шрифт</span>
                        <span className="whitespace-nowrap" style={{ fontFamily: selectedFont }}>{
                           getFontText(selectedFont)}
                        </span>
                        <span className="whitespace-normal hide-below-1030px">Выбор шрифта применяется ко всем текстам в приложении</span>
                     </div>
                     <div className="flex items-center justify-end">
                        <span className="mx-4 flex items-center justify-end text-left cursor-pointer">
                           <IoIosArrowForward />
                        </span>
                     </div>
                     <ChangeFontDialog 
                        show={isShowChangeFontDialog} 
                        onClose={handleCloseDialog} 
                        onConfirm={handleConfirmFontChange} 
                     />
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div>
                     <div
                        className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200"
                        onClick={handleLanguageSettings}
                     >
                        <div className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-4">
                           <span>Язык</span>
                           <span>{selectedLanguage}</span>
                           <span>Запрос перед переводом</span>
                        </div>
                        <div className="flex justify-end">
                           <span className="mx-4 flex items-center cursor-pointer">
                              <IoIosArrowForward />
                           </span>
                        </div>
                     </div>
                     <LanguageSettingsModal 
                        isOpen={isLanguageSettingsOpen} 
                        onClose={handleCloseDialog} 
                        setSelectedLanguage={setSelectedLanguage} 
                        selectedLanguage={selectedLanguage}
                        handleLanguageChange={handleLanguageChange}
                     />
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4 p-5">
                     <div className="flex flex-col w-full">
                        <div className="flex custom-flex-500 items-start">
                           <span>{t("profile:related")}</span>
                           <Link to={`${languagePrefix}/dashboard?tab=addresses`} className="custom-margin-500 text-teal-500 hover:underline hover:text-teal-700">
                              Узнать больше о настройках приложения
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <div className="flex items-center">
                     <div className="flex items-center justify-between w-full pl-4 pt-3">
                        <div className="flex items-center">
                           <IoMdNotificationsOutline size={28} />
                           <span className="text-md font-semibold pl-4">Уведомления</span>
                        </div>
                     </div>
                  </div>
                  <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200">
                     <div 
                        className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-2"
                     >
                        <span className="whitespace-nowrap">Темы</span>
                        <span className="whitespace-nowrap">Системная</span>
                        <span className="whitespace-normal hide-below-1030px">Выбор темы применяется во всем приложении</span>
                     </div>
                     <div className="flex items-center justify-end">
                        <span className="mx-4 flex items-center justify-end text-left cursor-pointer">
                           <IoIosArrowForward />
                        </span>
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200">
                     <div 
                        className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-2"
                     >
                        <span className="whitespace-nowrap">Шрифт</span>
                        <span className="whitespace-nowrap">{t("profile:country")}</span>
                        <span className="whitespace-normal hide-below-1030px">Выбор шрифта применяется ко всем текстам в приложении</span>
                     </div>
                        <div className="flex items-center justify-end">
                           <span className="mx-4 flex items-center justify-end text-left cursor-pointer">
                              <IoIosArrowForward />
                           </span>
                        </div>
                     
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex dark:hover:bg-gray-700/60 hover:bg-gray-200">
                     <div className="grid grid-cols-3 responsive-grid items-center w-full pl-4 cursor-pointer px-4 py-4">
                        <span>Язык</span>
                        <span>Выберите язык</span>
                        <span>Запрос перед переводом</span>
                     </div>
                     <div className="flex justify-end">
                        <span className="mx-4 flex items-center cursor-pointer">
                           <IoIosArrowForward />
                        </span>
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4 p-5">
                     <div className="flex flex-col w-full">
                        <div className="flex custom-flex-500 items-start">
                           <span>{t("profile:related")}</span>
                           <Link to={`${languagePrefix}/dashboard?tab=addresses`} className="custom-margin-500 text-teal-500 hover:underline hover:text-teal-700">
                              Узнать больше об оповещениях
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <div
                     className={`flex items-center justify-between w-full p-4 space-x-4 cursor-pointer ${
                        theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'
                     } ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                     onClick={toggleOpen}
                  >
                     <div className="flex items-center">
                        <FiInfo size={28} />
                        <span className="text-md font-semibold pl-4">О приложении</span>
                     </div>
                     <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  {isOpen && (
                     <>
                        <hr className="border-t border-gray-300 dark:border-gray-600" />
                        <div className="flex flex-col dark:bg-gray-700/30 bg-gray-100 rounded-b-lg">
                           <div className="grid grid-cols-3 items-center w-full pl-4 py-2">
                              <span className="py-2">{t("version")}</span>
                              <span className="py-2">{t("version_app")}</span>
                           </div>
                           <hr className="border-t border-gray-300 dark:border-gray-600" />
                           <div className="grid grid-cols-3 items-center w-full pl-4 py-2">
                              <span className="whitespace-nowrap">Разработчик</span>
                              <span className="py-2">Input Studios</span>
                           </div>
                           <hr className="border-t border-gray-300 dark:border-gray-600" />
                           <div className="grid grid-cols-3 items-center w-full pl-4">
                              <span className="whitespace-nowrap">Описание</span>
                              <span className="py-2">Информационный сайт компании Input Studios</span>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
