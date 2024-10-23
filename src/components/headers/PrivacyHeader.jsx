import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function PrivacyHeader() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const [menuOpen, setMenuOpen] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [searchVisible, setSearchVisible] = useState(false);
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
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
      }
   }, [menuOpen, searchVisible]);

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [handleClickOutside]);

   document.addEventListener("DOMContentLoaded", function() {
      var element = document.querySelector('.mx-auto.flex.flex-wrap.items-center.justify-between');
      if (element) {
         element.classList.remove('container');
      }
   });
   
   return (
      <Navbar className="border-b-2">
         <Link
            to="/"
            className={`self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ${windowWidth >= 1080 ? 'mx-8' : 'mx-0'}`}
         >
            <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
               Input Studios
            </span>
         </Link>
         <Navbar.Collapse className={`${menuOpen ? "block" : "hidden"} hidden-in-range`}>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>{t("header:privacy")}</Link>
            </div>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/business`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">Privacy dashboard</Link>
            </div>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave/features`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave/features`} onClick={() => setMenuOpen(false)}>{t("header:privacy_report")}</Link>
            </div>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/blogs`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">{t("header:privacy_settings")}</Link>
            </div>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave/download`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave/download`} onClick={() => setMenuOpen(false)}>{t("header:privacy_statements")}</Link>
            </div>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave/download`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave/download`} onClick={() => setMenuOpen(false)}>{t("header:health_data_privacy_policy")}</Link>
            </div>
         </Navbar.Collapse>
      </Navbar>
   );
}
