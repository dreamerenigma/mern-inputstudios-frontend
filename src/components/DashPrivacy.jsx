import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { TbWorldSearch } from "react-icons/tb";
import { IoAppsSharp, IoPeopleOutline } from "react-icons/io5";
import { GoBook, GoShieldLock } from "react-icons/go";
import { BsPatchCheck } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function DashPrivacy() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)]">
         <Helmet>
            <title>{t("privacy:title")}</title>
         </Helmet>
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-2 mx-auto px-4">
            <h1 className="my-7 text-left font-semibold text-3xl overflow-hidden text-ellipsis whitespace-nowrap">{t("privacy:privacy")}</h1>
            <p className="max-w-full md:max-w-[700px]">
               {t("privacy:privacy_starts_with_putting")}
            </p>
            <Link
               to={`${languagePrefix}/privacy`}
               className=" text-teal-500 underline hover:underline mt-4 hover:text-teal-700" 
            >
               {t("privacy:learn_more_about")}
            </Link>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-8 "> 
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-700">
                  <div className="col-span-2 p-10 justify-between">
                     <p className="font-semibold text-xl mt-4 mb-4">{t("privacy:make_sure_you")}</p>
                     <p className="mb-4">{t("privacy:review_your_account")}</p>
                     <Button className="text-sm sm:text-sm focus:outline-none shadow-md">
                        {t("privacy:get_started")}
                     </Button>
                  </div>
                  <div className="p-10 flex items-center justify-center">
                     <img src="/images/img_safety_checker.webp" alt="JavaScript Image" className="w-full h-auto max-w-md" />
                  </div>
               </div>
            </div>
            <div>
               <h1 className="mt-14 py-2 text-left font-semibold text-2xl">{t("privacy:empower_your_productivity")}</h1>
               <p>
                  {t("privacy:your_personal_data")}
                  <Link to={`${languagePrefix}/privacy/privacy-support-requests`} className="text-teal-500 underline hover:text-teal-700">
                     {t("privacy:contact_privacy_team")}
                  </Link>
                  <a>.</a>
               </p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-6">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-700">
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-top-only ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <CiLocationOn className="text-2xl" />
                           <span className="pl-2">{t("privacy:location")}</span>
                        </div>
                        <span className="pl-10 text-xs">{t("privacy:give_me_directions_other")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">{t("privacy:no_data")}</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <TbWorldSearch className="text-2xl" />
                           <span className="pl-2">{t("privacy:browsing_search")}</span>
                        </div>
                        <span className="pl-10 text-xs">{t("privacy:relevant_suggestions")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">{t("privacy:activities")}</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoAppsSharp className="text-xl" />
                           <span className="pl-2">{t("privacy:apps_services")}</span>
                        </div>
                        <span className="pl-9 text-xs">{t("privacy:help_improve_products")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">{t("privacy:activities")}</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <GoBook className="text-xl" />
                           <span className="pl-2">{t("privacy:spelling_and_text")}</span>
                        </div>
                        <span className="pl-9 text-xs">{t("privacy:typing_suggestions_and_handwriting")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">{t("privacy:activities")}</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <GoShieldLock className="text-xl" />
                           <span className="pl-2">{t("privacy:app_access")}</span>
                        </div>
                        <span className="pl-9 text-xs">{t("privacy:access_my_info")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">{t("privacy:apps")}</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoPeopleOutline className="text-xl" />
                           <span className="pl-2">{t("privacy:people_suggestions")}</span>
                        </div>
                        <span className="pl-9 text-xs">{t("privacy:suggestions_including_people")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoIosSearch className="text-xl" />
                           <span className="pl-2">{t("privacy:search_news_personalization")}</span>
                        </div>
                        <span className="pl-9 text-xs">{t("privacy:viewing_search_results")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-2">
               <p className="text-gray-400">{t("privacy:not_displayed")} 
                  <a href="/concern/privacy" className="text-teal-500 underline hover:text-teal-700">
                     {t("privacy:about_viewing_data")}
                  </a>
               </p>
            </div>
            <div>
               <h1 className="mt-14 mb-2 text-left font-semibold text-2xl">{t("privacy:manage_ads")}</h1>
               <p>{t("privacy:view_change_settings")}</p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-6 mb-14">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-700">
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-top-only ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <Link to={`${languagePrefix}/dashboard?tab=privacy/ad-settings`}>
                           <div className="flex items-center space-x-2">
                              <BsPatchCheck className="text-xl" />
                              <span className="pl-2">{t("privacy:personalized_ad_settings")}</span>
                           </div>
                           <span className="pl-9 text-xs">{t("privacy:preferences_viewing_ads")}</span>
                        </Link>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <Link to={`${languagePrefix}/dashboard?tab=profile/communications`}>
                           <div className="flex items-center space-x-2">
                              <CiMail className="text-xl" />
                              <span className="pl-2">{t("privacy:promotional_communications")}</span>
                           </div>
                           <span className="pl-9 text-xs">{t("privacy:send_promotional_material")}</span>
                        </Link>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <h1 className="mt-6 mb-2 text-left font-semibold text-2xl">{t("privacy:finding_privacy_settings")}</h1>
               <p>{t("privacy:select_product_manage")}</p>
               <a href="/topic" className="text-teal-500 underline hover:text-teal-700">
                  {t("privacy:find_privacy_settings_products")}
               </a>
            </div>
            <div className="w-full mx-auto max-w-5xl flex items-center mt-6 mb-14">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 p-6 border border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-12">
                     <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                        <img src="/images/apps/quantum-engine/quantum_engine.png" className="text-4xl text-gray-600 dark:text-gray-300 w-16 h-16" alt="Quantum Engine"/>
                        <span className="mt-2 text-gray-700 dark:text-gray-400">Quantum Engine</span>
                     </div>
                     <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                        <img src="/images/apps/chatify/chatify_logo.png" className="text-4xl text-gray-600 dark:text-gray-300 w-16 h-16" alt="Chatify"/>
                        <span className="mt-2 text-gray-700 dark:text-gray-400">Chatify</span>
                     </div>
                     <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                        <img src="/images/apps/workspace/workspace.png" className="text-4xl text-gray-600 dark:text-gray-300 w-16 h-16" alt="Workspace" />
                        <span className="mt-2 text-gray-700 dark:text-gray-400">Workspace</span>
                     </div>
                     <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                        <img src="/images/apps/wave/wave_logo.png" className="text-4xl text-gray-600 dark:text-gray-300 w-16 h-16" alt="Wave" />
                        <span className="mt-2 text-gray-700 dark:text-gray-400">Wave</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
