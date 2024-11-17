import { Footer } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../switchers/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";
import CookieManagementModal from "../modals/CookieManagementModal";

export default function FooterCom() {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const navigate = useNavigate();
   const [showModal, setShowModal] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleAdSettingsClick = (e) => {
      if (!currentUser) {
         e.preventDefault();
         navigate('/sign-in'); 
      }
   };

   const handleDialogClick = () => {
      setShowModal(true);
   };

   const handleCloseModal = () => {
      setShowModal(false);
   };

   return (
      <Footer className="border border-t-8 border-teal-500" id="footer">
         <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1 p-4">
               <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-5 md:justify-items-center">
                  <div className="max-w-full">
                     <Footer.Title title={t("footer:footer_whats_new")} />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href={`${languagePrefix}/wave`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Wave
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/chat-sam`}
                           rel="noopener noreferrer"
                        >
                           AI Chat Sam
                        </Footer.Link>
                        <Footer.Link
                           href={`${languagePrefix}/workspace`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Workspace
                        </Footer.Link>
                        <Footer.Link 
                           href="https://apps.inputstudios.ru/home?hl=ru-ru&gl=RU"
                           rel="noopener noreferrer"
                        >
                           Узнайте больше о продуктах Input Studios
                        </Footer.Link>
                        <Footer.Link 
                           href="https://apps.inputstudios.ru/home?hl=ru-ru&gl=RU"
                           rel="noopener noreferrer"
                        >
                           Input Studios apps
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title="Input Studios Store" />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href={`${languagePrefix}/business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:account_profile")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/chatify`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:download_center")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/small-business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:support")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/small-business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:return_of_goods")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/small-business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:order_tracking")}
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer:footer_projects")} />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href={`${languagePrefix}/workspace`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Workspace
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/weather-api`}
                           rel="noopener noreferrer"
                        >
                           Weather API
                        </Footer.Link>
                        <Footer.Link
                           href={`${languagePrefix}/easy-shoppin`}
                           rel="noopener noreferrer"
                        >
                           Easy Shoppin
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/quantum-engine`}
                           rel="noopener noreferrer"
                        >
                           Quantum Engine
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/clever`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Clever
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer:footer_business")} />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href={`${languagePrefix}/small-business`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Cloud
                        </Footer.Link>
                        <Footer.Link
                           href={`${languagePrefix}/business`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Workspace
                        </Footer.Link>
                        <Footer.Link
                           href={`${languagePrefix}/business`}
                           rel="noopener noreferrer"
                        >
                           Input Studios Advertising
                        </Footer.Link>
                        <Footer.Link
                           href={`${languagePrefix}/business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:footer_business_company")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/chatify`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:footer_chatify")}
                        </Footer.Link>
                        <Footer.Link 
                           href={`${languagePrefix}/small-business`}
                           rel="noopener noreferrer"
                        >
                           {t("footer:footer_small_business")}
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer:footer_company")}/>
                     <Footer.LinkGroup col>
                        <Footer.Link as={Link} to={`${languagePrefix}/news`} >
                           {t("footer:footer_company_news")}
                        </Footer.Link>
                        <Footer.Link as={Link} to={`${languagePrefix}/privacy`}>
                           {t("footer:footer_privacy")}
                        </Footer.Link>
                        <Footer.Link as={Link} to={`${languagePrefix}/investor/default`}>
                           {t("footer:footer_investors")}
                        </Footer.Link>
                        <Footer.Link as={Link} to={`${languagePrefix}/terms-of-use`}>
                           {t("footer:footer_environmental_sustainability")}
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
               </div>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="w-full flex flex-wrap items-center justify-between xl:flex-nowrap">
               <div className="flex items-center mb-4 xl:mb-0 px-2">
                  <LanguageSwitcher />
               </div>
               <div className="w-full px-4">
                  <Link to={`${languagePrefix}/dashboard?tab=privacy`} className="dark:text-gray-400 hover:underline">
                     <div className="flex items-center xl:ml-10">
                        <img src="/images/privacy/ic_privacy.webp" alt="Privacy icon" className="w-10" />
                        <span className="text-xs ml-3">{t("footer:custom_footer_privacy_choice")}</span>
                     </div>
                  </Link>
               </div>
            </div>
            <div className="flex flex-wrap gap-6 my-6 mx-4 sm:mt-4 sm:justify-end text-xs">
               <Link to={`${languagePrefix}/contactus`} className="dark:text-gray-400 hover:underline">{t("footer:custom_footer_contacts")}</Link>
               <Link to="#" className="dark:text-gray-400 hover:underline" onClick={handleDialogClick}>{t("footer:cookie_management")}</Link>
               <Link to={`${languagePrefix}/privacy/privacystatement`} className="dark:text-gray-400 hover:underline">{t("footer:custom_footer_privacy")}</Link>
               <Link to={`${languagePrefix}/terms-of-use`} className="dark:text-gray-400 hover:underline">{t("footer:custom_footer_terms")}</Link>
               <Link to={`${languagePrefix}/trademarks`} className="dark:text-gray-400 hover:underline">{t("footer:custom_footer_trademarks")}</Link>
               <Link 
                  to={currentUser ? "/dashboard?tab=privacy/ad-settings" : "/privacy/ad-settings"}
                  className="dark:text-gray-400 hover:underline" 
                  onClick={handleAdSettingsClick}
               >
                  {t("footer:custom_footer_about_ads")}
               </Link>
               <Footer.Copyright
                  className="text-xs text-black"
                  href="#"
                  by="Input Studios"
                  year={new Date().getFullYear()}
               />
            </div>
            <CookieManagementModal showModal={showModal} handleCloseModal={handleCloseModal} />
         </div>
      </Footer>
   );
}
