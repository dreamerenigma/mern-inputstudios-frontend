import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../redux/language/languageSlice";
import { useTranslation } from "react-i18next";

export default function FooterCom() {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const { currentLanguage } = useSelector((state) => state.language);

   const handleLanguageChange = (newLanguage) => {
      dispatch(changeLanguage(newLanguage));
   };

   return (
      <Footer container className="border border-t-8 border-teal-500" id="footer">
         <div className="w-full max-w-7xl mx-auto">
            <div className="w-full sm:flex sm:items-center sm:justify-between">
               <div className="flex items-center">
                  <div className="relative">
                     <Switch
                        className="relative"
                        checked={currentLanguage === 'en'}
                        onChange={(event) => handleLanguageChange(event.target.checked ? 'en' : 'ru')}
                        sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                           '& .flag-image': {
                              backgroundImage: 'url(https://i.ibb.co/LtPNm0n/US.png)',
                           },
                        },
                        '& .MuiSwitch-switchBase': {
                           '& .flag-image': {
                              backgroundImage: 'url(https://i.ibb.co/489wXn1/RU.png)',
                           },
                        },
                        }}
                     />
                  </div>
                  <span className="flag-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full overflow-hidden"></span>
                  <span className="w-16 text-center">
                     {currentLanguage === 'en' ? 'English' : 'Русский'}
                  </span>
                  <Link to="/dashboard?tab=privacy" className="dark:text-gray-400 hover:underline">
                     <div className="flex flex-wrap ml-10 items-center">
                        <img src="/images/ic_privacy.webp" alt="Privacy icon" className="w-10" />
                        <span className="text-xs ml-3">{t("custom_footer_privacy_choice")}</span>
                     </div>
                  </Link>
               </div>
               <div className="flex flex-wrap gap-6 sm:mt-0 mt-4 sm:justify-center text-xs">
                  <Link to="/contacts" className="dark:text-gray-400 hover:underline">{t("custom_footer_contacts")}</Link>
                  <Link to="/privacy" className="dark:text-gray-400 hover:underline">{t("custom_footer_privacy")}</Link>
                  <Link to="/terms-of-use" className="dark:text-gray-400 hover:underline">{t("custom_footer_terms")}</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">{t("custom_footer_trademarks")}</Link>
                  <Link to="/contact" className="dark:text-gray-400 hover:underline">{t("custom_footer_about_ads")}</Link>
                  <Footer.Copyright
                     className="text-xs text-black"
                     href="#"
                     by="Input Studios"
                     year={new Date().getFullYear()}
                  />
               </div>
            </div>
         </div>
      </Footer>
   );
}
