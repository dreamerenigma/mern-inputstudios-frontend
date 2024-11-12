import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPrintOutline } from "react-icons/io5";
import { IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export default function PrivacyStatement() {
   const { t } = useTranslation();
   const [isExpanded, setIsExpanded] = useState(false);
   const [isPersonalDataCollect, setPersonalDataCollect] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
   const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
   const [isEntertainmentDropdownOpen, setIsEntertainmentDropdownOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleToggle = () => {
      setIsExpanded(!isExpanded);
   };

   const handleExpandClick = () => {
      setPersonalDataCollect(!isPersonalDataCollect);
      if (!isPersonalDataCollect) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
   };

   const toggleSearchDropdown = () => {
      setIsSearchDropdownOpen((prev) => !prev);
   };

   const toggleProductsDropdown = () => {
      setIsProductsDropdownOpen((prev) => !prev);
   };

   const toggleEntertainmentDropdown = () => {
      setIsEntertainmentDropdownOpen((prev) => !prev);
   };

   return (
      <div className="relative mt-[60px] pt-16 px-4">
         <Helmet>
            <title>{t("privacy:title_privacystatement")}</title>
         </Helmet>
         <div className="text-center max-w-[90%] md:max-w-[800px] mx-auto">
            <h1 className="text-2xl md:text-5xl font-semibold leading">
               {t("privacy:company_privacy_statement")}
            </h1>
            <p className="pt-4 md:pt-6 text-base md:text-lg">
               {t("privacy:last_updated")}
            </p>
            <Link to={`${languagePrefix}/privacy/updates`} className="text-teal-500 underline text-base md:text-lg">
               {t("privacy:whats_new")}
            </Link>
            <p className="mt-4 md:mt-6 text-sm md:text-base italic text-justify md:text-center">
               {t("privacy:notice_new_look")}
            </p>
         </div>
         <div className="flex items-center justify-end mt-16 mb-8 mr-16">
            <div className="flex items-center">
               <IoPrintOutline className="mr-1" size={26}/>
               <span className="mr-4 text-teal-500">{t("privacy:print")}</span>
               <div className="flex items-center cursor-pointer" onClick={handleToggle}>
               <IoMdArrowDropdown 
                  className={`mr-1 text-teal-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                  size={22} 
               />
                  <span className="text-teal-500 hover:underline">
                     {isExpanded ? t("privacy:collapse_all") : t("privacy:expand_all")}
                  </span>
               </div>
            </div>
         </div>
         <div className="flex items-start max-w-[1400px] ml-32 mb-20">
            <div className="flex flex-col items-start max-w-[400px]">
               <p className="text-xl font-semibold">
                  {t("privacy:company_privacy_statement")}
               </p>
               <div className="relative flex items-center mt-2">
                  <div className="w-1 bg-gray-800 rounded-full h-full absolute mt-4"></div>
                  <div className="flex flex-col ml-6">
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-2 text-teal-500 hover:underline">{t("privacy:personal_data_we_collect")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:use_personal_data")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:reasons_disclosure")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:access_and_management")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:cookies_similar_technologies")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:products_provided")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:input_studios_account")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:collection_about_children")}</Link>
                     <div className="relative inline-block">
                        <div className="flex items-center mt-4 text-teal-500">
                           <span className="flex items-center">
                              <Link
                                 to={`${languagePrefix}/dashboard?tab=users`}
                                 className="hover:underline flex-nowrap"
                              >
                                 {t("privacy:important_privacy_information")}
                              </Link>
                              <IoIosArrowForward
                                 className={`ml-2 cursor-pointer text-teal-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}
                                 onClick={toggleDropdown}
                              />
                           </span>
                        </div>
                        {isDropdownOpen && (
                           <div className="mt-2 mx-2">
                              <ul>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Защита персональных данных</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Где мы храним и обрабатываем персональные данные</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Как мы храним персональные данные</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Конфиденциальность данных США</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Реклама</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Технологии распознавания речи</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Ознакомительные и бесплатные версии</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Изменения в заявлении о конфиденциальности</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Способы связи с нами</li>
                              </ul>
                           </div>
                        )}
                     </div>
                     <p className="mt-4">{t("privacy:detailed_information")}</p>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:ai_capabilities")}</Link>
                     <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">{t("privacy:products_enterprises")}</Link>
                     <div className="relative inline-block">
                        <div className="flex items-center mt-4 text-teal-500">
                           <span className="flex items-center flex-wrap whitespace-normal">
                              <Link
                                 to={`${languagePrefix}/dashboard?tab=users`}
                                 className="hover:underline flex-nowrap"
                              >
                                 {t("privacy:products_improve")}
                              </Link>
                           </span>
                           <IoIosArrowForward
                              className={`ml-2 cursor-pointer text-teal-500 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}
                              onClick={toggleProductsDropdown}
                           />
                        </div>
                        {isProductsDropdownOpen && (
                           <div className="mt-2 mx-2">
                              <ul>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Workspace и другие приложения для повышения производительности</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Семья учетных записей Input Studios</li>
                              </ul>
                           </div>
                        )}
                     </div>
                     <div className="relative inline-block">
                        <div className="flex items-center mt-4 text-teal-500">
                           <span className="flex items-center whitespace-nowrap">
                              <Link
                                 to={`${languagePrefix}/dashboard?tab=users`}
                                 className="hover:underline flex-nowrap"
                              >
                                 {t("privacy:search_and_view")}
                              </Link>
                              <IoIosArrowForward
                                 className={`ml-2 cursor-pointer text-teal-500 transition-transform duration-300 ${isSearchDropdownOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}
                                 onClick={toggleSearchDropdown}
                              />
                           </span>
                        </div>
                        {isSearchDropdownOpen && (
                           <div className="mt-2 mx-2">
                              <ul>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Clever</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Браузер Input Studios Wave</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Translator</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">SwiftKey</li>
                              </ul>
                           </div>
                        )}
                     </div>
                     <div className="relative inline-block">
                        <div className="flex items-center mt-4 text-teal-500">
                           <span className="flex items-center whitespace-nowrap">
                              <Link
                                 to={`${languagePrefix}/dashboard?tab=users`}
                                 className="hover:underline flex-nowrap"
                              >
                                 {t("privacy:entertainment_related_services")}
                              </Link>
                              <IoIosArrowForward
                                 className={`ml-2 cursor-pointer text-teal-500 transition-transform duration-300 ${isEntertainmentDropdownOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}
                                 onClick={toggleEntertainmentDropdown}
                              />
                           </span>
                        </div>
                        {isEntertainmentDropdownOpen && (
                           <div className="mt-2 mx-2">
                              <ul>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Store</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Start</li>
                                 <li className="px-4 py-2 hover:underline cursor-pointer text-teal-500">Input Studios Mixed Reality</li>
                              </ul>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="mt-12">
                  <p className="font-bold">{t("privacy:cookies")}</p>
                  <p className="text-sm mt-4">
                     {t("privacy:sites_use_cookies")}{" "}
                     <Link to="/cookies" className="text-teal-500 underline">
                        {t("privacy:cookies_and_similar_technologies")}
                     </Link>
                     {" "}{t("privacy:this_privacy_statement")}
                  </p>
                  <p className="font-bold mt-8">{t("privacy:data_privacy_frameworks")}</p>
                  <p className="text-sm mt-4">
                     {t("privacy:complies_with")}{" "}
                     <Link to="/cookies" className="text-teal-500 underline">{t("privacy:process_personal_data")}</Link>
                        {" "}{t("privacy:and")}{" "}
                     <Link to="/cookies" className="text-teal-500 underline">{t("privacy:visit_website")}</Link>
                  </p>
                  <p className="font-bold mt-8">{t("privacy:contact_information")}</p>
                  <p className="text-sm mt-4">
                     {t("privacy:privacy_question")}{" "}
                     <Link to={`${languagePrefix}/privacy/privacy-support-requests`} className="text-teal-500 underline">{t("privacy:web_form")}</Link>.{" "}
                        {t("privacy:for_more_information")}{" "}
                     <Link to="/cookies" className="text-teal-500 underline">{t("privacy:ways_contact_us")}</Link>
                     {" "}{t("privacy:of_this_privacy_statement")}
                  </p>
               </div>
            </div>
            <div className="ml-32 flex flex-col items-start">
               <p className="">{t("privacy:privacy_important_us")}</p>
               <p className="mt-5">{t("privacy:offers_wide_range")}</p>
               <p className="mt-5">{t("privacy:please_read")}</p>
               <p className="mt-5">{t("privacy:teens_should_start")}</p>
               <p className="mt-5">{t("privacy:for_individuals")}</p>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     {t("privacy:personal_data_we_collect")}
                  </h1>
                  <div className="mt-6">
                     <p className="mt-5">{t("privacy:collects_data_users_through")}</p>
                     <p className="mt-5">{t("privacy:represent_organization")}</p>
                     <p className="mt-5">{t("privacy:choose_which_technologies")}</p>
                     {isExpanded && (
                        <p>{t("privacy:various_legal_bases")}</p>
                     )}
                  </div>
                  <p className="mt-6">
                     <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? t("privacy:view_summary") : t("privacy:read_more")}</Link>
                     <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>{t("privacy:to_beginning")}</Link>
                  </p>
               </div>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     {t("privacy:use_personal_data")}
                  </h1>
                  <div className="mt-6">
                     <p className="mt-4">{t("privacy:uses_data_we_collect")}</p>
                     <ul className="list-disc list-outside mt-4 space-y-2 ml-10">
                        <li className="pl-1">{t("privacy:providing_our_products")}</li>
                        <li className="pl-1">{t("privacy:improving_developing_our_products")}</li>
                        <li className="pl-1">{t("privacy:personalizing_our_products")}</li>
                        <li className="pl-1">{t("privacy:advertising")}</li>
                     </ul>
                     <p className="mt-5">
                        {t("privacy:data_operate")}
                     </p>
                     <p className="mt-5">
                        {t("privacy:we_combine_data")}
                     </p>
                     <p  className="mt-5">
                        {t("privacy:use_automated_manual_methods")}
                     </p>
                     <p className="mt-5">
                        {t("privacy:part_our_efforts")}
                     </p>
                     <p className="mt-6">
                        <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? t("privacy:view_summary") : t("privacy:read_more")}</Link>
                        <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>{t("privacy:to_beginning")}</Link>
                     </p>
                  </div>
               </div>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     {t("privacy:reasons_disclosure")}
                  </h1>
                  <div className="mt-6">
                     <p className="mt-4">{t("privacy:disclose_personal_information")}</p>
                     <p className="mt-5">{t("privacy:please_note_that")}</p>
                     <p className="mt-6">
                        <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? t("privacy:view_summary") : t("privacy:read_more")}</Link>
                        <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>{t("privacy:to_beginning")}</Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );   
}
