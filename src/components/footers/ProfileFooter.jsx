import { Footer } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../switchers/LanguageSwitcher";
import { useSelector } from "react-redux";
import { useState } from "react";
import CookieManagementModal from "../modals/CookieManagementModal";

export default function ProfileFooter() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const { currentUser } = useSelector(state => state.user);
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
            <div className="w-full justify-between pt-4">
               <div className="w-full flex flex-wrap items-center justify-between xl:flex-nowrap">
                  <div className="flex items-center mb-4 xl:mb-0 px-2">
                     <LanguageSwitcher />
                  </div>
                  <div className="w-full px-4">
                     <Link to={`${languagePrefix}/dashboard?tab=privacy`} className="dark:text-gray-400 hover:underline">
                        <div className="flex items-center xl:ml-10">
                           <img src="/images/ic_privacy.webp" alt="Privacy icon" className="w-10" />
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
         </div>
      </Footer>
   );
}
