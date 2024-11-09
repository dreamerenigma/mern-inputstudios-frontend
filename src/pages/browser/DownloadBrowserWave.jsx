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
import NextDownloadBrowserDialog from "./dialogs/NextDownloadBrowserDialog";

export default function DownloadBrowserWave() {
   const { t } = useTranslation();
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { theme } = useSelector((state) => state.theme);
   const dropdownRef = useRef(null);
   const [modalOpen, setModalOpen] = useState(false);
   const downloadLinkRef = useRef(null);
   const [downloadLink, setDownloadLink] = useState("");
   const [showDialog, setShowDialog] = useState(false);
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
      setDownloadLink("/downloads/InputStudiosWaveSetup.exe");
      setModalOpen(true);
   };

   const handleTextLink = (link) => (e) => {
      e.stopPropagation();
      console.log("Text clicked!");
      setDownloadLink(link);
      setModalOpen(true);
   }

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

   useEffect(() => {
      setShowDialog(true);
   }, []);

   const handleCloseDialog = () => {
      setShowDialog(false);
   };

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
                  Input Studios Wave— лучший <br />
                  браузер для Windows
               </p>
               <div className="relative inline-block z-50" ref={dropdownRef}>
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
                           <DownloadModal showModal={modalOpen} setShowModal={setModalOpen} downloadLink={downloadLink} />
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
            <div>
               <p className="mt-8 text-xl">
                  Input Studios Wave теперь доступен на Linux. Скачать для{" "}
                  <a
                     onClick={handleTextLink("/downloads/InputStudiosWaveSetup.deb")}
                     className="text-teal-500 hover:underline cursor-pointer"
                  >
                     Linux (.deb)
                  </a>{" "}
                  |{" "}
                  <a
                     onClick={handleTextLink("/downloads/InputStudiosWaveSetup.rpm")}
                     className="text-teal-500 hover:underline cursor-pointer"
                  >
                     Linux (.rpm)
                  </a>
               </p>
            </div>
         </div>
         <div className="flex flex-col gap-10 mx-auto max-w-screen-lg w-full px-4 md:px-8 my-16 sm:my-24 lg:my-32">
            <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-gray-800 rounded-2xl py-10 md:py-20 items-center w-full">
               <img 
                  src="/images/apps/wave/business-browser.png" 
                  alt="BusinessBrowser" 
                  width="150" 
                  height="150" 
                  className="ml-4 md:ml-12 mr-6 md:mr-14 mb-6 md:mb-0" 
               />
               <div className="flex flex-col w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between w-full">
                     <div className="flex flex-col text-left w-full lg:w-[500px] px-12 md:px-0">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                           Разверните Input Studios Wave для бизнеса уже сегодня
                        </span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-4">
                           Получите Input Studios Wave с его новейшими функциями для всех основных платформ.
                        </span>
                     </div>
                     <CustomButton className="mt-4 lg:mt-0 sm:w-3/4 md:w-[260px] lg:w-auto mx-12 px-4">
                        Скачать Wave для бизнеса
                     </CustomButton>
                  </div>
               </div>
            </div>
            <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-gray-800 rounded-2xl py-10 md:py-12 items-center w-full mt-12">
               <img 
                  src="/images/apps/wave/preview-browser.png" 
                  alt="PreviewBrowser" 
                  width="200" 
                  height="200" 
                  className="ml-4 md:ml-12 mr-6 md:mr-14 mb-6 md:mb-0" 
               />
               <div className="flex flex-col w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between w-full">
                     <div className="flex flex-col text-left w-full lg:w-[500px] px-12 md:px-0">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">Будьте на переднем крае. <br />Загрузите предварительные сборки <br />Input Studios Wave.</span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-4">Хотите первыми узнать, что нового в Wave? Инсайдерские каналы <br />постоянно обновляются новейшими функциями, поэтому загрузите сейчас <br />и станьте инсайдером.</span>
                     </div>
                     <CustomButton className="mt-4 lg:mt-0 sm:w-3/4 md:w-[260px] lg:w-auto mx-12 px-4">
                        Скачать инсайдерские каналы
                     </CustomButton>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex p-8 bg-gray-700 w-full">
            <span className="ml-8 text-sm">* Доступность и возможности функций зависят от типа устройства, рынка и версии браузера.</span>
         </div>
         {showDialog && (
            <NextDownloadBrowserDialog show={showDialog} onClose={handleCloseDialog} />
         )}
      </div>
   );
}
