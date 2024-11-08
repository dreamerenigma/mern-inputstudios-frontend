import { Button, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import CustomTextInput from "../textinputs/CustomTextInput";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Header() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const location = useLocation();
   const navigate = useNavigate(); 
   const [searchTerm, setSearchTerm] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [searchVisible, setSearchVisible] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get("searchTerm");
      if (searchTermFromUrl) {
         setSearchTerm(searchTermFromUrl);
      }
   }, [location.search]);

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

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleClickOutside = useCallback((event) => {
      if (
         (menuOpen && !event.target.closest(".menu") && !event.target.closest(".search-button")) ||
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
      }
   }, [menuOpen, searchVisible]);

   const handleButtonClick = (event) => {
      event.stopPropagation();
      setMenuOpen(!menuOpen);
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [handleClickOutside, menuOpen, searchVisible]);

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
         <div className="flex gap-2">
            <Button
               className="w-12 h-10 lg:hidden flex items-center justify-center menu-button border-none"
               color="gray"
               pill
               onClick={handleButtonClick}
            >
               {menuOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
            </Button>
            {searchVisible && (
            <div className="search-wrapper">
               <form onSubmit={handleSubmit} className="lg:flex-grow">
                  <CustomTextInput
                     type="text"
                     placeholder={t("header_search_site")}
                     leftIcon={<AiOutlineSearch size={22} style={{ transform: 'rotate(90deg)' }} />}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </form>
            </div>
            )}
         </div>
         <div className={`flex gap-3 md:order-2 ${windowWidth >= 1080 ? 'mx-8' : 'mx-0'}`}>
            {!searchVisible && window.innerWidth > 860 && (
               <Button
                  className="w-12 h-10 flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0 mr-5"
                  color="gray"
                  pill
                  onClick={() => setSearchVisible((prevVisible) => !prevVisible)}
                  style={{ backgroundColor: 'transparent' }}
               >
                  <div className="flex items-center search-button-content lg:mr-14">
                     <span className="mr-2">{t("header_search")}</span>
                     <AiOutlineSearch size={24} style={{ transform: 'rotate(90deg)' }} />
                  </div>
               </Button>
            )}
         </div>
         <Navbar.Collapse className={`${menuOpen ? "block" : "hidden"} hidden-in-range`}>
            <Navbar.Link 
               active={path === `${languagePrefix}/wave`} 
               as={"div"}
               className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave`} onClick={() => setMenuOpen(false)}>Wave</Link>
            </Navbar.Link>
            <Navbar.Link 
               active={path === `${languagePrefix}/business`} 
               as={"div"}
               className={`pb-1 border-b-2 ${path === `${languagePrefix}/business`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">Для бизнеса
                  <IoIosArrowDown className="ml-2"/>
               </Link>
            </Navbar.Link>
            <Navbar.Link 
               active={path === `${languagePrefix}/wave/features`} 
               as={"div"}
               className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave/features`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave/features`} onClick={() => setMenuOpen(false)}>Возможности и советы</Link>
            </Navbar.Link>
            <Navbar.Link 
               active={path === `${languagePrefix}/blogs`} 
               as={"div"}
               className={`pb-1 border-b-2 ${path === `${languagePrefix}/blogs`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link className="flex flex-row items-center">Ресурсы
                  <IoIosArrowDown className="ml-2"/>
               </Link>
            </Navbar.Link>
            <Navbar.Link 
               active={path === `${languagePrefix}/wave/download`} 
               as={"div"}
               className={`pb-1 border-b-2 ${path === `${languagePrefix}/wave/download`} ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/wave/download`} onClick={() => setMenuOpen(false)}>Загрузки</Link>
            </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
   );
}
