import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import colors from "../utils/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Contacts() {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const path = useLocation().pathname;
   const [isExpanded, setIsExpanded] = useState(false);
   const [isOpenProducts, setIsOpenProducts] = useState(false);
   const [isOpenSupport, setIsOpenSupport] = useState(false);
   const dropdownRefProducts = useRef(null);
   const dropdownRefSupport = useRef(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleToggleText = () => {
      setIsExpanded(!isExpanded);
   };

   const handleToggleProducts = () => {
      if (isOpenProducts) {
         setIsOpenProducts(false);
      }
      setIsOpenProducts(!isOpenProducts);
   };

   const handleToggleSupport = () => {
      if (isOpenSupport) {
         setIsOpenSupport(false);
      }
      setIsOpenSupport(!isOpenSupport);
   };


   const handleClickOutside = (event) => {
      if (dropdownRefProducts.current && !dropdownRefProducts.current.contains(event.target)) {
         setIsOpenProducts(false);
      }
      if (dropdownRefSupport.current && !dropdownRefSupport.current.contains(event.target)) {
         setIsOpenSupport(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isOpenProducts]);

   return (
      <div className="flex flex-col min-h-screen">
         <div className="w-full h-12 bg-gray-200 dark:bg-gray-500 flex items-center gap-10">
            <div
               onClick={handleToggleProducts}
               ref={dropdownRefProducts}
               className={`relative pb-0.2 border-b-2 ml-12 ${path === `/${languagePrefix}/products` ? "border-current" : "border-transparent"} hover:border-current`}
            >
               <Link className="flex flex-row items-center">{t("header_products")}<IoIosArrowDown className="ml-2" /></Link>
               {isOpenProducts && (
                  <ul className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown-products">
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md hover:underline">
                        <Link to={`${languagePrefix}/postigo`} className="w-full text-left block">
                           Postigo
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 hover:underline">
                        <Link to={`${languagePrefix}/chatify`} className="w-full text-left block">
                           Chatify
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                        <Link to={`${languagePrefix}/wave`} className="w-full text-left block">
                           Input Studios Wave
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                        <Link to={`${languagePrefix}/workspace`} className="w-full text-left block">
                           Input Studios Workspace
                        </Link>
                     </li>
                  </ul>
               )}
            </div>
            <div className={`relative pb-0.2 border-b-2 ${path === `/${languagePrefix}/whats-new` ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">
                  {t("new_opportunities")}
               </Link>
            </div>
            <div className={`relative pb-0.2 border-b-2 ${path === `/${languagePrefix}/create` ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">
                  {t("templates")}
               </Link>
            </div>
            <div
               onClick={handleToggleSupport}
               ref={dropdownRefSupport}
               className={`relative pb-0.2 border-b-2 ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} hover:border-current`}
            >
               <Link className="flex flex-row items-center">{t("additional_support")}<IoIosArrowDown className="ml-2" /></Link>
               {isOpenSupport && (
                  <ul className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown-devices">
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md hover:underline">
                        <Link to={`${languagePrefix}/about-company`} className="w-full text-left block">
                           Форумы сообщества
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 hover:underline">
                        <Link to={`${languagePrefix}/our-history`} className="w-full text-left block">
                           Портал для малого бизнеса
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                        <Link to={`${languagePrefix}/contactus`} className="w-full text-left block">
                           Разработчик
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                        <Link to={`${languagePrefix}/contactus`} className="w-full text-left block">
                           Образование
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                        <Link to={`${languagePrefix}/contactus`} className="w-full text-left block">
                           Сообщить о мошеничестве с имитацией службы поддержки
                        </Link>
                     </li>
                  </ul>
               )}
            </div>
         </div>
         <div className="w-full h-60 bg-blue-500 flex flex-col items-center justify-center">
            <h1 className="text-white text-5xl font-bold">{t("contact_us")}</h1>
            {currentUser ? (
               <p className="text-white mt-6">
                  {t("thanks_signin")} {currentUser.username}. {t("support_faster")}
               </p>
            ) : (
               <>
                  <p className="text-white mt-2">{t("help_and_support")}</p>
                  <button className="mt-4 px-6 py-2 bg-white text-blue-500 font-bold rounded-full">
                     <Link className="text-blue-500 hover:underline" to={`${languagePrefix}/sign-in`}>
                        {t("signin")}
                     </Link>
                  </button>
               </>
            )}
         </div>
         <p className="mt-12 text-lg font-bold mx-56"> {t("select_need_help")}</p>
         <p className="text-base mx-56">
            {t("show_self_help")}
         </p>
         <div className="image-container mx-56 mt-16 flex flex-wrap justify-start gap-16">
         <div className="image-item text-center m-2 rounded-lg p-4 shadow-none hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition duration-200">
               <img src="../logos/logo_chatify.png" alt="Chatify" className="w-[80px] rounded-md" />
               <p className="text-sm mt-2">Chatify</p>
            </div>
            <div className="image-item text-center m-2 rounded-lg p-4 shadow-none hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition duration-200">
               <img src="../logos/logo_easyshoppin_black.png" alt="Easy Shoppin" className="w-[80px] rounded-md mx-auto" />
               <p className="text-sm mt-2">Easy Shoppin</p>
            </div>
            <div className="image-item text-center m-2 rounded-lg p-4 shadow-none hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition duration-200">
               <img src="../logos/logo_quantum_engine.png" alt="Quantum Engine" className="w-[80px] rounded-md mx-auto" />
               <p className="text-sm mt-2">Quantum Engine</p>
            </div>
            <div className="image-item text-center m-2 rounded-lg p-4 shadow-none hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition duration-200">
               <img src="../logos/logo_wave.png" alt="Wave" className="w-[80px] rounded-md mx-auto" />
               <p className="text-sm mt-2">Wave</p>
            </div>
         </div>

         <p className="mt-4 text-base font-bold mx-56">
            <a
               href="#!"
               onClick={handleToggleText}
               className="text-blue-500 hover:underline focus:underline"
            >
               {isExpanded ? t("hide_expanded_list") : t("show_expanded_list")}
            </a>
         </p>
         
         <p className="mt-28 mb-4 text-xl font-bold mx-56">{t("additional_support_options")}</p>
         <div className="flex justify-between mt-4">
            <div className="ml-56 mr-12 flex-1 text-left">
               <p className="font-bold text-blue-500 hover:underline focus:underline">{t("business_assist")}</p>
               <p>{t("sign_up_business_assist")}
                  {!currentUser && (
                     <a href={`${languagePrefix}/sign-in`} className="text-blue-500 hover:underline focus:underline">{t("sign_in")}</a>
                  )}
               </p>
            </div>
            <div className="mr-12 flex-1 text-left">
               <p className="font-bold text-blue-500 hover:underline focus:underline">{t("help_business_admin")}</p>
               <p>{t("service_request")}</p>
            </div>
            <div className="mr-56 flex-1 text-left">
               <p className="font-bold text-blue-500 hover:underline focus:underline">{t("store_support")}</p>
               <p>{t("store_suget_help_support_purchasepport")}</p>
            </div>
         </div>

         <div className="mt-28 mb-6 flex items-center justify-center">
            <p className="mr-4"> {t("information_helpful")}</p>
            <button
               className="px-6 py-2 text-black rounded mr-2"
               style={{ backgroundColor: colors.light }}
            >
               {t("yes")}
            </button>
            <button
               className="px-6 py-2 text-black rounded"
               style={{ backgroundColor: colors.light }}
            >
               {t("no")}
            </button>
         </div>
      </div>
   );
}
