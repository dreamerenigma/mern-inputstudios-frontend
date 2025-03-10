import { Avatar, Dropdown } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { IoCameraOutline, IoArrowBack } from 'react-icons/io5';
import CustomTextInput from "../textinputs/CustomTextInput";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useCallback } from 'react';

export default function Header() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const dropdownRef = useRef(null);
   const dropdownProducts = useRef(null);
   const dropdownTools = useRef(null);
   const theme = useSelector((state) => state.theme.theme);
   const isDarkMode = theme === "dark";
   const { currentUser } = useSelector(state => state.user);
   const [searchTerm, setSearchTerm] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [searchVisible, setSearchVisible] = useState(false);
   const [isOpenAbout, setIsOpenAbout] = useState(false);
   const [isOpenProducts, setIsOpenProducts] = useState(false);
   const [isOpenTools, setIsOpenTools] = useState(false);
   const [showTools, setShowTools] = useState(true);
   const [showAbout, setShowAbout] = useState(true);
   const [showForum, setShowForum] = useState(true);
   const [showNews, setShowNews] = useState(true);
   const [showProjects, setShowProjects] = useState(true);
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get("searchTerm");
      if (searchTermFromUrl) {
         setSearchTerm(searchTermFromUrl);
      }
   }, [location.search]);

   const handleSignout = async () => {
      try {
         const res = await fetch(`${SERVER_URL}/api/user/signout`, {
            method: "POST",
         });
         const data = await res.json();
         if (!res.ok) {
            console.log(data.message);
         } else {
            dispatch(signoutSuccess());
         }
      } catch (error) {
         console.log(error.message);
      }
   };

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

   useEffect(() => {
      if (windowWidth < 880) {
         setShowNews(false);
      } else if (windowWidth < 1005) {
         setShowTools(true);
         setShowNews(false);
         setShowForum(false);
         setShowAbout(false);
      } else if (windowWidth < 1120) {
         setShowProjects(false);
         setShowTools(true);
         setShowForum(false);
      } else if (windowWidth < 1190) {
         setShowNews(true);
         setShowForum(false);
         setShowAbout(false);
      } else if (windowWidth < 1270) {
         setShowNews(true);
         setShowForum(true);
         setShowAbout(false);
      } else {
         setShowProjects(true);
         setShowTools(true);
         setShowNews(true);
         setShowForum(true);
         setShowAbout(true);
      }
   }, [windowWidth]);

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
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text")) ||
         (isOpenTools && !event.target.closest(".dropdown-tools") && !event.target.closest(".menu-link-tools")) ||
         (isOpenAbout && !event.target.closest(".dropdown") && !event.target.closest(".menu-link")) ||
         (isOpenProducts && !event.target.closest(".dropdown-products") && !event.target.closest(".menu-link-products"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
         setIsOpenTools(false);
         setIsOpenAbout(false);
         setIsOpenProducts(false);
      }
   }, [menuOpen, searchVisible, isOpenTools, isOpenAbout, isOpenProducts]);

   const handleToggle = () => {
      if (isOpenAbout) {
         setIsOpenAbout(false);
      }
      setIsOpenAbout(!isOpenAbout);
   };

   const handleToggleProducts = () => {
      if (isOpenProducts) {
         setIsOpenProducts(false);
      }
      setIsOpenProducts(!isOpenProducts);
   };

   const handleToggleTools = () => {
      if (isOpenTools) {
         setIsOpenTools(false);
      }
      setIsOpenTools(!isOpenTools);
   };
   
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

   const toggleMenu = (event) => {
      event.stopPropagation();
      setMenuOpen(prev => !prev);
   };

   const handleToggleMenu = (e) => {
      e.stopPropagation();
      setIsOpenAbout(prevState => !prevState);
   };

   const handleToggleToolsMenu = (e) => {
      e.stopPropagation();
      setIsOpenTools(prevState => !prevState);
   };

   const menuData = [
      {
         title: "ПО",
         items: [
            { label: "Приложения для Windows", link: "/about-company" },
            { label: "ИИ", link: "/about-company" },
            { label: "Chatify", link: "/about-company" }
         ]
      },
      {
         title: "Развлечения",
         items: [
            { label: "Компьютерные игры", link: "/about-company" },
            { label: "Игры для Windows", link: "/about-company" },
            { label: "Игры для смартфонов", link: "/about-company" }
         ]
      },
      {
         title: "Для бизнеса",
         items: [
            { label: "Input Studios Cloud", link: "/about-company" },
            { label: "Input Studios Workspace для бизнеса", link: "/about-company" },
            { label: "Input Studios Security", link: "/about-company" }
         ]
      },
      {
         title: "Другое",
         items: [
            { label: "Бесплатная загрузка и средства безопасности", link: "/about-company" },
            { label: "Образование", link: "/about-company" },
            { label: "Лицензирование", link: "/about-company" }
         ]
      }
   ];

   const toolsData = [
      {
         title: "Конвертер",
         items: [
            { label: "Конвертер архивных файлов", link: "/about-company" },
            { label: "Аудио-конвертер", link: "/about-company" },
            { label: "Конвертер документов", link: "/about-company" },
            { label: "Конвертер эл. книг", link: "/about-company" },
         ]
      },
      {
         title: "Сжатие изображений",
         items: [
            { label: "Приложения для Windows", link: "/about-company" },
            { label: "ИИ", link: "/about-company" },
            { label: "Chatify", link: "/about-company" }
         ]
      },
   ];

   return (
      <div>
         <header className={`fixed top-0 left-0 right-0 shadow-lg z-50 transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="flex items-center">
               {!searchVisible && windowWidth < 860 && (
                  <>
                     <div className="home-menu-icon mx-4">
                        {menuOpen ? (
                        <AiOutlineClose className="text-[26px] cursor-pointer" onClick={toggleMenu} />
                     ) : (
                        <AiOutlineMenu className="text-[26px] cursor-pointer" onClick={toggleMenu} />
                        )}
                     </div>
                     <button
                        className="w-10 h-10 flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0 pr-4"
                        color="gray"
                        onClick={() => setSearchVisible((prevVisible) => !prevVisible)}
                     >
                        <div className="flex items-center search-button-content">
                           <span className="mr-2">{t("headers:header_search")}</span>
                           <AiOutlineSearch size={27} className="text-black dark:text-white transform rotate-90" />
                        </div>
                     </button>
                  </>
               )}
               {(windowWidth >= 860 || !searchVisible) && (
                  <div className={`flex flex-1 justify-center custom-flex-none py-4 ${windowWidth > 1080 ? "md:ml-20" : (windowWidth < 860 ? "ml-0" : "ml-10")}`}>
                     <Link
                        to="/"
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                     >
                        <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
                           Input Studios
                        </span>
                     </Link>
                  </div>
               )}
               {searchVisible && (
                  <div className={`search-wrapper flex items-center mr-4 my-[9px] ml-${windowWidth < 860 ? '6' : '12'} w-full`}>
                     {windowWidth < 860 && (
                        <button
                           className="mr-2 hover:text-gray-700"
                           onClick={() => setSearchVisible(false)}
                        >
                           <IoArrowBack size={28} />
                        </button>
                     )}
                     <form onSubmit={handleSubmit} className="lg:flex-grow flex items-center w-full">
                        <CustomTextInput
                           type="text"
                           placeholder={t("headers:header_search_site")}
                           leftIcon={<AiOutlineSearch size={22} className="transform rotate-90 text-gray-500" />}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full"
                        />
                     </form>
                     {windowWidth >= 860 && (
                        <button
                           className="ml-2 border border-black dark:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 py-2 px-4 rounded-md border-button mr-10 custom-mr"
                           onClick={() => setSearchVisible(false)}
                        >
                           {t("headers:cancel")}
                        </button>
                     )}
                  </div>
               )}
               {!searchVisible && windowWidth > 860 && (
                  <>
                     <div className="custom-hidden md:flex md:items-center md:space-x-6 ml-8">
                        <div className="group">
                           <div className={`pb-0.2 border-b-2 group ${path === "/" ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]`}>
                              <Link
                                 to={`${languagePrefix}/`}
                                 onClick={() => setMenuOpen(false)}
                                 className="text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]"
                              >
                                 {t("headers:header_home")}
                              </Link>
                           </div>
                        </div>
                        {showProjects && (
                           <div className="group">
                              <div className={`pb-0.2 border-b-2 group ${path === `${languagePrefix}/projects` ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]`}>
                                 <Link
                                    to={`${languagePrefix}/projects`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]"
                                 >
                                    {t("headers:header_projects")}
                                 </Link>
                              </div>
                           </div>
                        )}
                        {showTools && (
                           <div className="group">
                              <div
                                 onClick={handleToggleTools}
                                 ref={dropdownTools}
                                 className="relative hover:border-current"
                              >
                                 <Link className="flex flex-row items-center menu-link-tools group relative" onClick={handleToggleTools}>
                                    <span 
                                       className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/tools` ? "border-current" : "border-transparent"}  group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF] transition duration-200`}
                                    >
                                       Инструменты
                                    </span>
                                    <IoIosArrowDown 
                                       className={`ml-2 transform transition-transform duration-500  ${isOpenTools ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                                    />
                                 </Link>
                                 {isOpenTools && (
                                    <ul className="absolute w-[900px] left-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 grid grid-cols-4 gap-6 p-4">
                                       {toolsData.map((section) => (
                                          <div key={section.title} className="space-y-2">
                                             <p className="py-2 px-2 mb-2 font-bold">{section.title}</p>
                                             {section.items.map((item) => (
                                                <li key={item.label} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                                   <Link
                                                      to={`${languagePrefix}${item.link}`}
                                                      onClick={() => setMenuOpen(false)}
                                                      className="text-left block text-sm"
                                                   >
                                                      {item.label}
                                                   </Link>
                                                </li>
                                             ))}
                                          </div>
                                       ))}
                                    </ul>
                                 )}
                              </div>
                           </div>
                        )}
                        {showNews && (
                           <div className="group">
                              <div className={`pb-0.2 border-b-2 group ${path === `${languagePrefix}/feed` ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]`}>
                                 <Link
                                    to={`${languagePrefix}/feed`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]"
                                 >
                                    {t("headers:header_blogs")}
                                 </Link>
                              </div>
                           </div>
                        )}
                        {showForum && (
                           <div className="group">
                              <div className={`pb-0.2 border-b-2 group ${path === `${languagePrefix}/forum` ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]`}>
                                 <Link
                                    to={`${languagePrefix}/forum`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]"
                                 >
                                    {t("headers:header_forum")}
                                 </Link>
                              </div>
                           </div>
                        )}
                        {showAbout && (
                           <div
                              onClick={handleToggle}
                              ref={dropdownRef}
                              className="relative hover:border-current"
                           >
                              <Link className="flex flex-row items-center menu-link group relative" onClick={handleToggle}>
                                 <span 
                                    className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"}  group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]  transition duration-200`}
                                 >
                                    {t("headers:header_about")}
                                 </span>
                                 <IoIosArrowDown 
                                    className={`ml-2 transform transition-transform duration-500  ${isOpenAbout ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                                 />
                              </Link>
                              {isOpenAbout && (
                                 <ul className="absolute left-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown">
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500/60 rounded-t-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                          {t("headers:about_company")}
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500/60 hover:underline">
                                       <Link to={`${languagePrefix}/our-history`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                          {t("headers:our_history")}
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500/60 rounded-b-md hover:underline">
                                       <Link to={`${languagePrefix}/contactus`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                          {t("headers:header_contacts")}
                                       </Link>
                                    </li>
                                 </ul>
                              )}
                           </div>
                        )}
                     </div>
                  </>
               )}
               {(windowWidth < 860 || !searchVisible) && (
                  <div className="ml-auto flex items-center gap-5 gap-390">
                     {!searchVisible && windowWidth > 860 && (
                        <>
                           <div
                              onClick={handleToggleProducts}
                              ref={dropdownProducts}
                              className="relative hover:border-current"
                           >
                              <Link className="flex flex-row items-center menu-link-products group relative" onClick={handleToggleProducts}>
                                 <span 
                                    className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"}  group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]  transition duration-200`}
                                 >
                                    Продукты Input Studios
                                 </span>
                                 <IoIosArrowDown 
                                    className={`ml-2 transform transition-transform duration-500  ${isOpenProducts ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                                 />
                              </Link>
                              {isOpenProducts && (
                                 <ul className="absolute w-[900px] right-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 grid grid-cols-4 gap-6 p-4">
                                    {menuData.map((section) => (
                                       <div key={section.title} className="space-y-2">
                                          <p className="py-2 px-2 mb-2 font-bold">{section.title}</p>
                                          {section.items.map((item) => (
                                             <li key={item.label} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md hover:underline">
                                                <Link
                                                   to={`${languagePrefix}${item.link}`}
                                                   onClick={() => setMenuOpen(false)}
                                                   className="text-left block text-sm"
                                                >
                                                   {item.label}
                                                </Link>
                                             </li>
                                          ))}
                                       </div>
                                    ))}
                                 </ul>
                              )}
                           </div>
                           <button
                              className="flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0"
                              color="gray"
                              onClick={() => setSearchVisible((prevVisible) => !prevVisible)}
                              style={{ backgroundColor: 'transparent' }}
                           >
                              <div>
                                 <div className={`flex items-center relative hover:border-current group`}>
                                    <span className={`search-button-content pb-0.2 border-b-2 dark:text-white dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/whats-new` ? "border-current" : "border-transparent"} hover:border-current`}>
                                       {t("headers:header_search")}
                                    </span>
                                    <AiOutlineSearch size={24} className="ml-2 relative dark:text-white dark:group-hover:text-[#9CA3AF]" style={{ transform: 'rotate(90deg)' }} />
                                 </div>
                              </div>
                           </button>
                        </>
                     )}
                     {!searchVisible && (
                        <>
                           <div className="flex items-center ml-2-350" onClick={() => dispatch(toggleTheme())}>
                              <button
                                 className="flex items-center justify-center border-none focus:outline-none focus:ring-0 padding-390"
                                 color="gray"
                                 style={{ backgroundColor: 'transparent' }}
                              >
                                 <div className="flex items-center justify-center cursor-pointer group">
                                    <span className="font-semibold mr-2 text-sm theme-text text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] border-b-2 border-transparent group-hover:border-current">
                                       {t("headers:header_themes")}
                                    </span>
                                    {theme === "light" ?
                                       <FaMoon size={20} className="group-hover:text-[#0E7490]" /> :
                                       <FaSun size={20} className="group-hover:text-white" style={{ color: '#ffc600' }} />
                                    }
                                 </div>
                              </button>
                           </div>
                           {currentUser ? (
                              <div className="mr-20-768-1080">
                                 <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                       <div className="flex items-center group margin-header margin-right mr-4-860">
                                          <span
                                             className="font-semibold mr-3 text-sm username-text text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]">
                                             {currentUser.username}
                                          </span>
                                          <div className="relative w-9 h-9 rounded-full overflow-hidden avatar-small">
                                             <img
                                                src={currentUser.profilePicture}
                                                alt="User Avatar"
                                                className="w-full h-full object-cover"
                                             />
                                          </div>
                                       </div>
                                    }
                                    className="border border-gray-600 rounded-lg shadow-xl custom-dropdown"
                                 >
                                    <div className="flex items-center justify-between">
                                       <img
                                          src="https://i.ibb.co/jbNDftv/logo-Input-Studios-grey.png"
                                          alt=""
                                          width="90"
                                          height="90"
                                          className="mt-2 ml-2 mb-5" />
                                       <span
                                          onClick={handleSignout}
                                          className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-tr-md cursor-pointer text-xs p-2.5 mb-3"
                                       >
                                          {t("headers:header_sign_out")}
                                       </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 pb-4">
                                       <div className="relative">
                                          <Avatar alt="user" img={currentUser.profilePicture} rounded/>
                                          <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                                             <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full">
                                                <IoCameraOutline className="text-white text-lg" />
                                             </div>
                                          </Link>
                                       </div>
                                       <div>
                                          <span className="block text-sm">{currentUser.username}</span>
                                          <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                                       </div>
                                    </div>
                                    <Dropdown.Divider className="m-0 p-0" />
                                    {isAdmin && (
                                       <>
                                          <Link to={`${languagePrefix}/dashboard?tab=dash`}>
                                             <Dropdown.Item className={`flex items-center py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                                <img src="/images/header/control_panel.svg" alt="Control panel" className="w-6 h-6 mr-3" />
                                                {t("headers:header_dashboard")}
                                             </Dropdown.Item>
                                          </Link>
                                          <Dropdown.Divider className="m-0 p-0" />
                                       </>
                                    )}
                                    <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                                       <Dropdown.Item className={`flex items-center py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                          <img src="/images/header/profile.svg" alt="Profile" className="w-6 h-6 mr-3" />
                                          {t("headers:header_profile")}
                                       </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Divider className="m-0 p-0" />
                                    <Link to={`${languagePrefix}/dashboard?tab=settings`}>
                                       <Dropdown.Item className={`flex items-center py-3 rounded-b-lg ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                          <img src="/images/header/settings.svg" alt="Settings" className="w-6 h-6 mr-3" />
                                          {t("headers:header_settings")}
                                       </Dropdown.Item>
                                    </Link>
                                 </Dropdown>
                              </div>
                           ) : (
                              <div className="mr-20-768-1080">
                                 <Link to={`${languagePrefix}/sign-in`} className="flex items-center margin-header margin-right mr-4-860">
                                    <span className="text-sm text-[#111827] dark:text-white mr-3 username-text">{t("headers:header_sign_in")}</span>
                                    <div className="w-9 h-9 flex items-center justify-center border border-black dark:border-white rounded-full">
                                       <img
                                          src={isDarkMode ? "/images/header/sign_in_light.svg" : "/images/header/sign_in_dark.svg"}
                                          alt="user"
                                          className="w-5 h-5"
                                       />
                                    </div>
                                 </Link>
                              </div>
                           )}
                        </>
                     )}
                  </div>
               )}
            </div>
            <div className={`flex flex-col md:hidden ${menuOpen ? 'flex' : 'hidden'}`}>
               <div className={`border-b-2 ${path === "/" ? "border-current" : "border-gray-800"}`}></div>
               <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-300/70 dark:hover:bg-gray-700/60 ${path === "/" ? "border-current" : "border-gray-800"}`}>
                  <Link to="/" onClick={() => setMenuOpen(false)}>{t("headers:header_home")}</Link>
               </div>
               <hr className="border-t border-gray-700" />
               <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-700/60 ${path === `${languagePrefix}/projects` ? "border-current" : "border-gray-800"}`}>
                  <Link to={`${languagePrefix}/projects`} onClick={() => setMenuOpen(false)}>
                     {t("headers:header_projects")}
                  </Link>
               </div>
               <hr className="border-t border-gray-700" />
               <div 
                  ref={dropdownTools}
                  className={`relative py-3 px-5 pb-0.2 text-xl ${path === `/${languagePrefix}/about` ? "border-current" : "border-gray-800"} ${!isOpenTools ? "hover:bg-gray-300/70 dark:hover:bg-gray-700/60" : ""}`}
               >
                  <div className="flex items-center justify-between" onClick={handleToggleToolsMenu}>
                     <Link className="menu-link-products">
                        {t("headers:header_tools")}
                     </Link>
                     <IoIosArrowDown className={`ml-auto transform transition-transform duration-500 ${isOpenTools ? "rotate-180" : "rotate-0"}`} />
                  </div>
                  {isOpenTools && (
                     <ul className="mt-2 rounded-md z-10 whitespace-nowrap">
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/about-company`}
                              className={`w-full text-left ${!isOpenTools ? "" : ""}`}
                           >
                              Конвертер
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/our-history`}
                              className={`w-full text-left ${!isOpenTools ? "" : ""}`}
                           >
                              Сжатие изображений
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/contactus`}
                              className={`w-full text-left ${!isOpenTools ? "" : ""}`}
                           >
                              Инструменты ИИ
                           </Link>
                        </li>
                     </ul>
                  )}
               </div>
               <hr className="border-t border-gray-700" />
               <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-700/60 ${path === `${languagePrefix}/feed` ? "border-current" : "border-gray-800"}`}>
                  <Link to={`${languagePrefix}/feed`} onClick={() => setMenuOpen(false)}>
                     {t("headers:header_blogs")}
                  </Link>
               </div>
               <hr className="border-t border-gray-700" />
               <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-700/60 ${path === `${languagePrefix}/forum` ? "border-current" : "border-gray-800"}`}>
                  <Link to={`${languagePrefix}/forum`} onClick={() => setMenuOpen(false)}>
                     {t("headers:header_forum")}
                  </Link>
               </div>
               <hr className="border-t border-gray-700" />
               <div
                  ref={dropdownRef}
                  className={`relative py-3 px-5 pb-0.2 text-xl ${path === `/${languagePrefix}/about` ? "border-current" : "border-gray-800"} ${!isOpenAbout ? "hover:bg-gray-300/70 dark:hover:bg-gray-700/60" : ""}`}
               >
                  <div className="flex items-center justify-between" onClick={handleToggleMenu}>
                     <Link className="menu-link">
                        {t("headers:header_about")}
                     </Link>
                     <IoIosArrowDown className={`ml-auto transform transition-transform duration-500 ${isOpenAbout ? "rotate-180" : "rotate-0"}`} />
                  </div>
                  {isOpenAbout && (
                     <ul className="mt-2 rounded-md z-10 whitespace-nowrap">
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/about-company`}
                              className={`w-full text-left ${!isOpenAbout ? "" : ""}`}
                           >
                              {t("headers:about_company")}
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/our-history`}
                              className={`w-full text-left ${!isOpenAbout ? "" : ""}`}
                           >
                              {t("headers:our_history")}
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="ml-8 py-3 px-5 rounded-md hover:underline hover:bg-gray-300/70 dark:hover:bg-gray-700/60">
                           <Link
                              to={`${languagePrefix}/contactus`}
                              className={`w-full text-left ${!isOpenAbout ? "" : ""}`}
                           >
                              {t("headers:header_contacts")}
                           </Link>
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </header>
      </div>
   );
}
