import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaWindows } from "react-icons/fa";
import CustomButton from "../../components/buttons/CustomButton";
import { HiArrowNarrowDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import DownloadModal  from "../../components/modals/DownloadModal"
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function DownloadBrowserWave() {
   const { t } = useTranslation();
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { theme } = useSelector((state) => state.theme);
   const dropdownRef = useRef(null);
   const [modalOpen, setModalOpen] = useState(false);
   const downloadLinkRef = useRef(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const toggleDropdown = () => {
      console.log("Toggle Dropdown called");
      setDropdownOpen(!dropdownOpen);
   };

   const closeDropdown = () => {
      console.log("Close Dropdown called");
      setDropdownOpen(false);
   };

   const handleTextClick = (e) => {
      e.stopPropagation();
      console.log("Text clicked!");
      setModalOpen(true);
   };

   const handleIconClick = (e) => {
      e.stopPropagation();
      toggleDropdown();
   };

   useEffect(() => {
      function handleClickOutside(event) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
         }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [dropdownRef]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-[60px]">
         <Helmet>
            <title>{t("download_wave")}</title>
            <link rel="icon" type="image/png" href="/icons/browser/favicon.ico" />
         </Helmet>
         <div className="mb-8 mt-12">
            <img src="/images/apps/wave/wave_logo.png" alt="InputStudiosWave" className="w-24" />
         </div>
         <h1 className="text-center mb-4 w-[50%] text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
            Просматривайте веб-страницы с помощью Input Studios Wave на ПК устройствах
         </h1>
         <div className="flex flex-col lg:flex-row items-center justify-center mt-16">
            <img
               src="/images/apps/wave/computer.png"
               alt="Computer"
               className="max-w-[25%] rounded-lg mb-4 lg:mb-0 custom-max-width"
            />
            <div className="ml-0 lg:ml-12 text-left mt-4 lg:mt-0 order-2 lg:order-2">
               <p className="text-3xl">Windows</p>
               <p className="text-lg mb-4 overflow-wrap">
                  Input Studios — лучший <br />
                  браузер для Windows
               </p>
               <div className="relative inline-block" ref={dropdownRef}>
                  <Button
                     className={`relative bg-teal-500 text-white w-56 rounded-lg hover:bg-teal-700 ${
                     dropdownOpen ? 'bg-teal-500' : ''
                     }`}
                  >
                     <span className="flex items-center">
                     <>
                        <span onClick={handleTextClick} className="cursor-pointer">
                           Загрузки <br />
                           для Windows 11 / 10
                        </span>
                        {modalOpen && (
                           <DownloadModal showModal={modalOpen} setShowModal={setModalOpen} />
                        )}
                        <a
                           ref={downloadLinkRef}
                           href="/downloads/InputStudiosWaveSetup.exe"
                           download
                           style={{ display: 'none' }}
                        />
                     </>
                        <span
                           className="mx-2 ml-8 h-8 w-px bg-gray-400"
                           onClick={handleIconClick} 
                        >
                           <IoIosArrowDown
                              className={`ml-2 mt-2 inline-block h-4 w-4 ${
                              dropdownOpen ? 'transform rotate-180' : ''
                              }`}
                           />
                        </span>
                     </span>
                  </Button>
                  {dropdownOpen && (
                     <ul
                        className={`absolute border border-gray-200 mt-2 w-56 rounded-lg shadow-lg ${
                           theme ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                     >
                        <span className="flex justify-center py-2">Также доступно для</span>
                        <li
                           tabIndex="0"
                           className="flex items-center px-4 py-2 hover:bg-gray-600 focus:bg-gray-600 cursor-pointer group"
                           onClick={closeDropdown}
                        >
                           <FaWindows className="mr-2" />
                           Windows 8.1 / 8 / 7
                           <HiArrowNarrowDown className="ml-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200" />
                        </li>
                        <li
                           tabIndex="0"
                           className="flex items-center px-4 py-2 hover:bg-gray-600 focus:bg-gray-600 cursor-pointer group"
                           onClick={closeDropdown}
                        >
                           <FaWindows className="mr-2" />
                              Windows Server
                           <HiArrowNarrowDown className="ml-9 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200" />
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </div>
         <div className="mt-20 px-4 text-center">
            <Link to={`${languagePrefix}/`} className="text-xl text-teal-500 hover:text-teal-700 hover:underline">
               <span>Используете Windows Server? Скачайте Input Studios Wave здесь.</span>
            </Link>
         </div>
         <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg py-6 mx-20 mt-20 items-center import">
            <img 
               src="/images/apps/wave/business-browser.png" 
               alt="BusinessBrowser" 
               width="150" 
               height="150" 
               className="ml-12 mr-14 ml-6-custom mr-0-custom" 
            />
            <div className="flex flex-col w-full">
               <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col text-left padding-custom">
                     <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">Разверните Input Studios Wave для бизнеса уже сегодня</span>
                     <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-4">Получите Input Studios Wave с его новейшими функциями для всех основных платформ.</span>
                  </div>
                  <CustomButton className="ml-10 mr-20 ml-6-custom mr-0-custom">
                     Скачать Wave для бизнеса
                  </CustomButton>
               </div>
            </div>
         </div>
         <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg py-6 mx-20 my-20 items-center import">
            <img 
               src="/images/apps/wave/preview-browser.png" 
               alt="PreviewBrowser" 
               width="200" 
               height="200" 
               className="ml-12 mr-14 ml-6-custom mr-0-custom"
            />
            <div className="flex flex-col w-full">
               <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col text-left padding-custom">
                     <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">Будьте на переднем крае. <br />Загрузите предварительные сборки <br />Input Studios Wave.</span>
                     <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-4">Хотите первыми узнать, что нового в Wave? Инсайдерские каналы <br />постоянно обновляются новейшими функциями, поэтому загрузите сейчас <br />и станьте инсайдером.</span>
                  </div>
                  <CustomButton style={{ marginLeft: '120px' }} className="p-6 mr-20 ml-6-custom mr-0-custom ml-0-custom">
                     Скачать инсайдерские каналы
                  </CustomButton>
               </div>
            </div>
         </div>
         <div className="flex p-8 bg-gray-700 w-full">
            <span className="ml-8">* Доступность и возможности функций зависят от типа устройства, рынка и версии браузера.</span>
         </div>
      </div>
   );
}
