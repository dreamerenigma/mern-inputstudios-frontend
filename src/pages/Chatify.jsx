import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet";

export default function Chatify() {
   const { t } = useTranslation();
   const [downloadComplete, setDownloadComplete] = useState(false);
   const [currentColumn, setCurrentColumn] = useState(0);
   const [currentImage, setCurrentImage] = useState(0);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const columns = [
      {
         title: "На компьютере",
         subtitle: "Windows",
         content: "С приложением для Windows можно звонить, демонстрировать экран и работать гораздо быстрее. Требуется Windows 10 или новее. Попробуйте новые функции — скачайте бета-версию приложения.",
      },
      {
         title: "Мобильное устройство/планшет",
         subtitle: "Android",
         content: "Минимальные системные требования для версии 2.22.13.77: ОС Android 4.0.3 или новее",
      },
      {
         title: "В браузере",
         subtitle: "Chatify Web",
         content: "Ваше устройство не поддерживается? Используйте Chatify в браузере.",
      },
   ];

   const columnsImage = [
      {
         title: "Общайтесь в конфиденциальном режиме",
         image: "/images/apps/chatify/communicate_confidential_mode.png"
      },
      {
         title: "Оставайтесь на связи",
         image: "/images/apps/chatify/stay_in_touch.png"
      },
      {
         title: "Создавайте сообщества",
         image: "/images/apps/chatify/create_communities.png"
      },
      {
         title: "Выражайте себя",
         image: "/images/apps/chatify/express_yourself.png"
      },
      {
         title: "Chatify Business",
         image: "/images/apps/chatify/chatify_business.png"
      },
   ];

   const handleDownload = () => {
      setDownloadComplete(true);
      const link = document.createElement('a');
      link.href = 'https://disk.yandex.ru/d/RS63DAnQ1rgUlQ';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
   };

   const closeModal = () => {
      setDownloadComplete(false);
   };

   const handleOverlayClick = () => {
      closeModal();
   };

   const handleModalClick = (event) => {
      event.stopPropagation();
   };

   const handlePrev = () => {
      if (currentColumn > 0) {
         setCurrentColumn(prev => prev - 1);
      }
   };
   
   const handleNext = () => {
      if (currentColumn < columns.length - 1) {
         setCurrentColumn(prev => prev + 1);
      }
   };

   const handlePrevImage = () => {
      if (currentImage > 0) {
         setCurrentImage(prev => prev - 1);
      }
   };
   
   const handleNextImage = () => {
      if (currentImage < columnsImage.length - 1) {
         setCurrentImage(prev => prev + 1);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center">
         <Helmet>
            <title>{t("download_chatify_title")}</title>
            <link rel="icon" type="image/png" href="/icons/chatify/favicon.ico" />
         </Helmet>
         <div className="bg-teal-100 w-full h-[650px] flex items-center px-4 md:px-8 lg:px-16">
            <div className="flex flex-col mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
               <div className="flex flex-col justify-center ">
                  <h2 className="text-4xl md:mt-4 md:text-6xl text-black font-semibold mb-2">{t("download_chatify")}</h2>
                  <p className="my-3 text-black text-xl">{t("use_chatify_devices")}</p>
                  <p className="text-sm text-black">
                     {t("install_chatify")}{' '}
                     <Link to={`${languagePrefix}/terms-of-use`} className="text-teal-500 underline hover:text-teal-700">
                        {t("terms_of_use")}
                     </Link>{' '}
                     {t("and")}{' '}
                     <a href={`${languagePrefix}/privacy`} className="text-teal-500 underline hover:text-teal-700">
                        {t("chatify_privacy_policy")}
                     </a>.
                  </p>
               </div>
               <div className="bg-white rounded-lg shadow-lg p-6 mt-12 max-w-lg w-full">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="text-lg text-black">{t("on_computer")}</h3>
                        <p className="text-2xl text-black font-semibold">Windows</p>
                        <p className="text-base mt-4 text-gray-600">
                              {t("use_chatify_web")}
                        </p>
                        <div>
                              <button 
                                 className="bg-teal-500 text-white font-bold mt-4 py-2 px-4 rounded-lg flex items-center hover:bg-teal-600"
                                 onClick={handleDownload}
                              >
                                 <span className="mr-2">Загрузить</span>
                                 <FaDownload />
                              </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex-shrink-0 hidden md:block">
               <img 
                  src="/images/chatify.png" 
                  alt="WhatsApp" 
                  className="h-72 md:h-64 lg:h-72"
               />
            </div>
         </div>
         <div className="bg-green-100 w-full h-[600px] md:h-[500px] flex flex-row py-12 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
               <h3 className="text-4xl md:text-6xl font-semibold mb-8 text-black md:text-left">Другие варианты</h3>
               <p className="text-lg mb-8 text-black md:text-left">
                  Оставайтесь на связи с друзьями и родными, даже когда пользуетесь разными устройствами.
               </p>
               <div className="flex mt-4 justify-center md:justify-start">
                  <button
                     onClick={handlePrev}
                     className={`w-12 h-12 rounded-full mr-5 border-2 flex items-center justify-center ${
                        currentColumn === 0 ? "border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none" : "border-teal-500 text-teal-500"
                     }`}
                     disabled={currentColumn === 0}
                  >
                     <IoIosArrowBack size={32} />
                  </button>
                  <button
                     onClick={handleNext}
                     className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        currentColumn === columns.length - 1 ? "border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none" : "border-teal-500 text-teal-500"
                     }`}
                     disabled={currentColumn === columns.length - 1}
                  >
                     <IoIosArrowForward size={32} className="ml-1" />
                  </button>
               </div>
            </div>
            <div className="flex flex-col ml-8 mt-10 w-full max-w-lg md:max-w-lg lg:max-w-xl">
               <div className="mx-4 px-6 py-4 rounded-lg shadow-lg bg-gray-100">
                  <p className="text-xl text-black">{columns[currentColumn].title}</p>
                  <h3 className="text-2xl mb-4  text-black">{columns[currentColumn].subtitle}</h3>
                  <p className="text-lg mb-8 text-black">{columns[currentColumn].content}</p>
                  <p className="flex mt-4 text-xl items-center justify-center md:justify-start group cursor-pointer">
                     {currentColumn === 2 ? (
                        <button className="relative overflow-hidden border-2 border-teal-500 text-teal-500 hover:text-white rounded-lg px-4 py-2 group">
                           <span className="relative z-10 ">Войти</span>
                           <span className="absolute left-0 bottom-0 w-full h-0 bg-teal-500 transition-all duration-300 group-hover:h-full"></span>
                        </button>
                     ) : (
                        <span 
                           className="relative"
                           onClick={handleDownload}
                        >
                           <span className="group-hover:text-teal-500 text-black">
                              Скачать
                           </span>
                           <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </span>
                     )}
                     {currentColumn !== 2 && (
                        <IoIosArrowForward className="ml-2 mt-1 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-teal-500 text-black" />
                     )}
                  </p>
               </div>
            </div>
         </div>
         <div className="bg-blue-100 w-full h-[700px] md:h-[600px] flex flex-row py-12 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h3 className="text-4xl md:text-6xl font-semibold mb-8 text-black">Уже скачали?</h3>
               <p className="text-lg mb-8 text-black">
                  Узнайте больше о возможностях Chatify.
               </p>
               <div className="flex mt-4">
                  <button
                     onClick={handlePrevImage}
                     className={`w-12 h-12 rounded-full mr-5 border-2 flex items-center justify-center ${
                        currentImage === 0 ? "border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none" : "border-teal-500 text-teal-500"
                     }`}
                     disabled={currentImage === 0}
                  >
                     <IoIosArrowBack size={32} />
                  </button>
                  <button
                     onClick={handleNextImage}
                     className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        currentImage === columnsImage.length - 1 ? "border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none" : "border-teal-500 text-teal-500"
                     }`}
                     disabled={currentImage === columnsImage.length - 1}
                  >
                     <IoIosArrowForward size={32} className="ml-1" />
                  </button>
               </div>
            </div>
            <div className="flex flex-col ml-8 mt-10 w-[550px]">
               <div className="mx-4 px-6 py-4">
                  <img
                     src={columnsImage[currentImage]?.image}
                     alt={columnsImage[currentImage]?.title}
                     className="rounded-3xl w-62 h-auto mb-4"
                  />
                  <p className="text-2xl md:text-3xl text-black">{columnsImage[currentImage].title}</p>
                  <p className="flex mt-4 text-xl items-center group cursor-pointer">
                     <span className="relative">
                        <span className="group-hover:text-teal-500 text-black">
                           Подробнее
                        </span>
                        <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                     </span>
                        <IoIosArrowForward className="ml-2 mt-1 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-teal-500 text-black" />
                  </p>
               </div>
            </div>
         </div>
         {downloadComplete && (
            <div 
               className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
               onClick={handleOverlayClick}
            >
               <div 
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border-dialog border-gray-700"
                  onClick={handleModalClick}
               >
                  <h2 className="text-2xl font-semibold text-center mb-4">Загрузка завершена!</h2>
                  <p className="text-center mb-6">Файл успешно загружен.</p>
                  <div className="flex justify-center">
                     <button className="relative overflow-hidden border-2 border-teal-500 text-teal-500 hover:text-white rounded-lg px-4 py-2 group" onClick={closeModal}>
                        <span className="relative z-10 ">Закрыть</span>
                        <span className="absolute left-0 bottom-0 w-full h-0 bg-teal-500 transition-all duration-300 group-hover:h-full"></span>
                     </button>
                     
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
