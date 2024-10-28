import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

export default function PrivacyHeader() {
   const { t } = useTranslation();
   const path = useLocation().pathname;   
   const dropdownRef = useRef(null);
   const dropdownProducts = useRef(null);
   const dropdownPrivacy = useRef(null);
   const { theme } = useSelector((state) => state.theme); 
   const [menuOpen, setMenuOpen] = useState(false);
   const [isOpenMore, setOpenMore] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [searchVisible, setSearchVisible] = useState(false);
   const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
   const [isOpenProducts, setIsOpenProducts] = useState(false);
   const [showPrivacySettings, setShowPrivacySettings] = useState(true);
   const [showPrivacyReport, setShowPrivacyReport] = useState(true);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      const element = document.querySelector('.mx-auto.flex.flex-wrap.items-center.justify-between');
      if (element) {
         element.classList.remove('container');
      }

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleClickOutside = useCallback((event) => {
      if (
         (menuOpen && !event.target.closest(".menu") && !event.target.closest(".search-button")) ||
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text")) ||
         (isOpenMore && !event.target.closest(".dropdown") && !event.target.closest(".menu-link")) ||
         (isOpenProducts && !event.target.closest(".dropdown-products") && !event.target.closest(".menu-link-products"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
         setOpenMore(false);
         setIsOpenProducts(false);
      }
   }, [menuOpen, searchVisible, isOpenMore, isOpenProducts]);

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [handleClickOutside]);

   useEffect(() => {
      if (windowWidth < 920) {
         setShowPrivacyReport(false);
         setShowPrivacySettings(false);
      } else if (windowWidth < 1100) {
         setShowPrivacyReport(true);
         setShowPrivacySettings(false);
      } else {
         setShowPrivacyReport(true);
         setShowPrivacySettings(true);
      }
   }, [windowWidth]);

   document.addEventListener("DOMContentLoaded", function() {
      var element = document.querySelector('.mx-auto.flex.flex-wrap.items-center.justify-between');
      if (element) {
         element.classList.remove('container');
      }
   });

   const toggleMenu = (event) => {
      event.stopPropagation();
      setMenuOpen(prev => !prev);
   };

   const handleToggle = () => {
      if (isOpenMore) {
         setOpenMore(false);
      }
      setOpenMore(!isOpenMore);
   };

   const handleToggleProducts = () => {
      if (isOpenProducts) {
         setIsOpenProducts(false);
      }
      setIsOpenProducts(!isOpenProducts);
   };

   const handleTogglePrivacy = () => {
      if (isOpenPrivacy) {
         setIsOpenPrivacy(false);
      }
      setIsOpenPrivacy(!isOpenPrivacy);
   };

   return (
      <div>
         <header className={`fixed top-0 left-0 right-0 shadow-lg z-50 transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="flex items-center">
               {windowWidth < 860 && (
                  <>
                     <div className="home-menu-icon mx-4">
                        {menuOpen ? (
                        <AiOutlineClose className="text-3xl cursor-pointer" onClick={toggleMenu} />
                     ) : (
                        <AiOutlineMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
                        )}
                     </div>
                  </>
               )}
               <div className="flex flex-1 justify-center md:justify-center custom-flex-none py-4 md:ml-10 custom-ml">
                  <Link
                     to="/"
                     className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                  >
                     <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
                        Input Studios
                     </span>
                  </Link>
               </div>
               {windowWidth > 860 && (
                  <>
                     <div className="md:flex md:items-center md:space-x-6 ml-8">
                        <div className={`pb-0.2 text-xl font-semibold border-b-2 ${path === `${languagePrefix}/privacy` ? "border-current" : "border-transparent"} hover:border-current`}>
                           <Link to={`${languagePrefix}/privacy`} onClick={() => setMenuOpen(false)}>{t("headers:privacy")}</Link>
                        </div>
                        <div className={`pb-0.2 text-base border-b-2 ${path === `${languagePrefix}/dashboard?tab=privacy` ? "border-current" : "border-transparent"} hover:border-current`}>
                           <Link to={`${languagePrefix}/dashboard?tab=privacy`} className="flex flex-row items-center">Privacy dashboard</Link>
                        </div>
                        {showPrivacyReport && (
                           <div className={`pb-0.2 text-base border-b-2 ${path === `${languagePrefix}/privacy/privacy-report` ? "border-current" : "border-transparent"} hover:border-current`}>
                              <Link to={`${languagePrefix}/privacy/privacy-report`} onClick={() => setMenuOpen(false)}>{t("headers:privacy_report")}</Link>
                           </div>
                        )}
                        {showPrivacySettings && (
                           <div className={`pb-0.2 text-base border-b-2 ${path === `${languagePrefix}/topic` ? "border-current" : "border-transparent"} hover:border-current`}>
                              <Link to={`${languagePrefix}/topic`} className="flex flex-row items-center">{t("headers:privacy_settings")}</Link>
                           </div>
                        )}
                        <div
                           onClick={handleToggle}
                           ref={dropdownRef}
                           className={`relative pb-0.2 border-b-2 text-base ml-3 ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} hover:border-current`}
                        >
                           <Link className="flex flex-row items-center menu-link" onClick={handleToggle}>
                              Ещё
                              <IoIosArrowDown className={`ml-2 mt-1 transform transition-transform duration-500 ${isOpenMore ? "rotate-180" : "rotate-0"}`} />
                           </Link>
                           {isOpenMore && (
                              <ul className="absolute left-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown">
                                 <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md hover:underline">
                                    <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                       Заявление о конфиденциальности
                                    </Link>
                                 </li>
                              </ul>
                           )}
                        </div>
                     </div>
                     <div className="ml-auto mr-20 flex items-center">
                        <div
                           onClick={handleToggleProducts}
                           ref={dropdownProducts}
                           className={`relative pb-0.2 border-b-2 ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} hover:border-current`}
                        >
                           <Link className="flex flex-row items-center menu-link-products" onClick={handleToggleProducts}>
                              Продукты Input Studios
                              <IoIosArrowDown className={`ml-2 mt-1 transform transition-transform duration-500 ${isOpenProducts ? "rotate-180" : "rotate-0"}`} />
                           </Link>
                           {isOpenProducts && (
                              <ul className="absolute w-[900px] right-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 grid grid-cols-4 gap-6 p-4">
                                 <div className="space-y-2">
                                    <p className="py-2 px-2 mb-2 font-bold">ПО</p>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Приложения для Windows
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          ИИ
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Chatify
                                       </Link>
                                    </li>
                                 </div>
                                 <div className="space-y-2">
                                    <p className="py-2 px-2 mb-2 font-bold">Развлечения</p>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Компьютерные игры
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Игры для Windows
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Игры для смартфонов
                                       </Link>
                                    </li>
                                 </div>
                                 <div className="space-y-2">
                                    <p className="py-2 px-2 mb-2 font-bold">Для бизнеса</p>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Input Studios Cloud
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Input Studios Workspace для бизнеса
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Input Studios Security
                                       </Link>
                                    </li>
                                 </div>
                                 <div className="space-y-2">
                                    <p className="py-2 px-2 mb-2 font-bold">Другое</p>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Бесплатная загрузка и средства безопасности
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Образование
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="text-left block text-sm">
                                          Лицензирование
                                       </Link>
                                    </li>
                                 </div>
                              </ul>
                           )}
                        </div>
                     </div>
                  </>
               )}
            </div>
            <div className={`flex flex-col md:hidden ${menuOpen ? 'flex' : 'hidden'}`}>
               <div className={`border-b-2 ${path === "/" ? "border-current" : "border-gray-800"}`}></div>
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Input Studios Workspace</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Chatify</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Поддержка</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>ПО</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Развлечения</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Для бизнеса</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                     <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Другое</Link>
                  </div>
               <hr className="border-t border-black dark:border-white" />
            </div>
            {windowWidth < 860 && (
               <div className="ml-auto items-center">
                  <div
                     onClick={handleTogglePrivacy}
                     ref={dropdownPrivacy}
                     className={`relative pb-0.2 ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} hover:border-current`}
                  >
                     <Link className="flex items-center menu-link-products px-5 pb-2 font-semibold" onClick={handleTogglePrivacy}>
                        Конфиденциальность
                        <IoIosArrowDown 
                           className={`ml-2 transform transition-transform duration-500 ${isOpenPrivacy ? "rotate-180" : "rotate-0"}`} 
                        />
                     </Link>
                     {isOpenPrivacy && (
                        <>
                           <div className="flex flex-col">
                              <div className={`border-b-2 ${path === "/" ? "border-current" : "border-gray-800"}`}></div>
                              <div className={`py-3 px-5 pb-0.2 hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                                 <Link to={`${languagePrefix}/wave`} onClick={() => setIsOpenPrivacy(false)}>Главная</Link>
                              </div>
                              <hr className="border-t border-gray-700" />
                              <div className={`py-3 px-5 pb-0.2 hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                                 <Link to={`${languagePrefix}/wave`} onClick={() => setIsOpenPrivacy(false)}>Панель мониторинга конфиденциальности</Link>
                              </div>
                              <hr className="border-t border-gray-700" />
                              <div className={`py-3 px-5 pb-0.2 hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                                 <Link to={`${languagePrefix}/wave`} onClick={() => setIsOpenPrivacy(false)}>Отчет о конфиденциальности</Link>
                              </div>
                              <hr className="border-t border-gray-700" />
                              <div className={`py-3 px-5 pb-0.2 hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                                 <Link to={`${languagePrefix}/wave`} onClick={() => setIsOpenPrivacy(false)}>Параметры конфиденциальности</Link>
                              </div>
                              <hr className="border-t border-gray-700" />
                              <div className={`py-3 px-5 pb-0.2 hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/wave` ? "border-current" : "border-transparent"} hover:border-current`}>
                                 <Link to={`${languagePrefix}/wave`} onClick={() => setIsOpenPrivacy(false)}>Заявление о конфиденциальности</Link>
                              </div>
                           </div>
                           <hr className="border-t border-black dark:border-white" />
                        </>
                     )}
                  </div>
               </div>
            )}
         </header>
      </div>
   );
}
