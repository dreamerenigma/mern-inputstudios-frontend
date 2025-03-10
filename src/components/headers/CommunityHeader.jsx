import { Avatar, Button, Dropdown } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoCameraOutline } from 'react-icons/io5';
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import CustomTextInput from "../textinputs/CustomTextInput";

export default function CommunityHeader() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const dropdownProducts = useRef(null);
   const { currentUser } = useSelector(state => state.user);
   const { theme } = useSelector((state) => state.theme); 
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [menuOpen, setMenuOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const isDarkMode = theme === "dark";
   const [isOpenAbout, setIsOpenAbout] = useState(false);
   const [searchVisible, setSearchVisible] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenProducts, setIsOpenProducts] = useState(false);
   const [showProducts, setShowProducts] = useState(true);
   const [showParticipateCommunity, setShowParticipateCommunity] = useState(true);
   const dropdownRef = useRef(null);
   const dropdownRefProducts = useRef(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

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
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsOpen(false);
      }
      if (dropdownRefProducts.current && !dropdownRefProducts.current.contains(event.target)) {
         setIsOpenProducts(false);
      }
   };
   
   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);
   
   useEffect(() => {
      if (windowWidth < 880) {
         setShowParticipateCommunity(true);
      } else if (windowWidth < 970) {
         setShowParticipateCommunity(true);
         setShowProducts(false);
      } else if (windowWidth < 1240) {
         setShowParticipateCommunity(true);
      } else {
         setShowProducts(true);
         setShowParticipateCommunity(true);
      }
   }, [windowWidth]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleToggle = () => {
      setIsOpen(!isOpen);
      if (isOpenProducts) {
         setIsOpenProducts(false);
      }
   };

   const handleToggleProducts = () => {
      setIsOpenProducts(!isOpenProducts);
      if (isOpen) {
         setIsOpen(false);
      }
   };

   const toggleMenu = (event) => {
      event.stopPropagation();
      setMenuOpen(prev => !prev);
   };

   const handleToggleMenu = (e) => {
      e.stopPropagation();
      setIsOpenAbout(prevState => !prevState);
   };

   return (
      <div>
         <header className={`fixed top-0 left-0 right-0 shadow-lg z-50 transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="flex items-center">
               {!searchVisible && windowWidth < 860 && (
                  <>
                     <div className="home-menu-icon mx-4">
                        {menuOpen ? (
                        <AiOutlineClose className="text-3xl cursor-pointer" onClick={toggleMenu} />
                     ) : (
                        <AiOutlineMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
                        )}
                     </div>
                     <Button
                        className="w-12 h-10 flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0 mr-3"
                        color="gray"
                        pill
                        onClick={() => setSearchVisible((prevVisible) => !prevVisible)}
                     >
                        <div className="flex items-center search-button-content">
                           <span className="mr-2">{t("headers:header_search")}</span>
                           <AiOutlineSearch size={28} className="text-black dark:text-white transform rotate-90" />
                        </div>
                     </Button>
                  </>
               )}
               {(windowWidth >= 860 || !searchVisible) && (
                  <div className={`flex flex-1 justify-center custom-flex-none py-4 ${windowWidth > 860 ? "md:ml-10" : "ml-0"}`}>
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
                           className="ml-2 hover:bg-gray-700 py-1.5 px-4 rounded-md border-button mr-10 custom-mr"
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
                           <div className={`pb-0.2 border-b-2 group ${path === "/forum" ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]`}>
                              <Link
                                 to={`${languagePrefix}/forum`}
                                 onClick={() => setMenuOpen(false)}
                                 className="text-xl font-semibold text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]"
                              >
                                 Сообщество
                              </Link>
                           </div>
                        </div>
                        {showProducts && (
                           <div
                           onClick={handleToggle}
                           ref={dropdownRef}
                           className="relative hover:border-current"
                        >
                           <Link className="flex flex-row items-center menu-link group relative" onClick={handleToggle}>
                              <span 
                                 className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"}  group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF]  transition duration-200`}
                              >
                                 Продукты
                              </span>
                              <IoIosArrowDown 
                                 className={`ml-2 transform transition-transform duration-500  ${isOpenAbout ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                              />
                           </Link>
                           {isOpenAbout && (
                              <ul className="absolute left-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown">
                                 <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md hover:underline">
                                    <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                       Input Studios Workspace
                                    </Link>
                                 </li>
                                 <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 hover:underline">
                                    <Link to={`${languagePrefix}/our-history`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                       Input Studios Wave
                                    </Link>
                                 </li>
                                 <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
                                    <Link to={`${languagePrefix}/contactus`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                       Chatify
                                    </Link>
                                 </li>
                              </ul>
                           )}
                        </div>
                        )}
                        {showParticipateCommunity && (
                           <div
                              onClick={handleToggle}
                              ref={dropdownRef}
                              className="relative hover:border-current"
                           >
                              <Link className="flex flex-row items-center menu-link group relative" onClick={handleToggle}>
                                 <span 
                                    className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF] transition duration-200`}
                                 >
                                    {windowWidth < 1240 ? "Ещё" : "Учавствовать в сообществе"}
                                 </span>
                                 <IoIosArrowDown 
                                    className={`ml-2 transform transition-transform duration-500 ${isOpenAbout ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                                 />
                              </Link>
                              {isOpenAbout && (
                                 <ul className="absolute left-0 top-full mt-[18px] bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap dropdown">
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md hover:underline">
                                       <Link to={`${languagePrefix}/about-company`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                          {t("headers:about_company")}
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 hover:underline">
                                       <Link to={`${languagePrefix}/our-history`} onClick={() => setMenuOpen(false)} className="w-full text-left block">
                                          {t("headers:our_history")}
                                       </Link>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md hover:underline">
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
                  <div className="ml-auto flex items-center">
                     {!searchVisible && windowWidth > 860 && (
                        <>
                           <div
                              onClick={handleToggleProducts}
                              ref={dropdownProducts}
                              className="relative hover:border-current"
                           >
                              <Link className="flex items-center space-x-2 menu-link-products group relative" onClick={handleToggleProducts}>
                                 <span 
                                    className={`pb-0.2 border-b-2 group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] ${path === `/${languagePrefix}/about` ? "border-current" : "border-transparent"} group-hover:border-[#0E7490] dark:group-hover:border-[#9CA3AF] transition duration-200`}
                                 >
                                    Продукты Input Studios
                                 </span>
                                 <IoIosArrowDown 
                                    className={`transform transition-transform duration-500 ${isOpenProducts ? "rotate-180" : "rotate-0"} group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF]`}
                                 />
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
                           <Button
                              className="flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0"
                              color="gray"
                              pill
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
                           </Button>
                        </>
                     )}
                     {!searchVisible && (
                        <>
                           <div className="flex items-center" onClick={() => dispatch(toggleTheme())}>
                              <Button
                                 className="flex items-center justify-center border-none focus:outline-none focus:ring-0"
                                 color="gray"
                                 pill
                                 style={{ backgroundColor: 'transparent' }}
                              >
                                 <div className="flex items-center justify-center cursor-pointer group">
                                    <span className="font-semibold mr-2 text-sm theme-text text-[#111827] dark:text-white group-hover:text-[#0E7490] dark:group-hover:text-[#9CA3AF] border-b-2 border-transparent group-hover:border-current">
                                       {t("headers:header_themes")}
                                    </span>
                                    {theme === "light" ?
                                       <FaMoon size={20} className="group-hover:text-[#0E7490]" /> :
                                       <FaSun size={20} className="group-hover:text-white" style={{ color: '#ffc600' }} />}
                                 </div>
                              </Button>
                           </div>
                           {currentUser ? (
                              <div className="mr-20-768-1080">
                                 <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                       <div className="flex items-center group margin-header margin-right mr-4">
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
                                          className="hover:bg-gray-200 hover:text-gray-700 cursor-pointer text-xs p-2.5 mb-3"
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
                                             <Dropdown.Item className={`py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("headers:header_dashboard")}</Dropdown.Item>
                                          </Link>
                                          <Dropdown.Divider className="m-0 p-0" />
                                       </>
                                    )}
                                    <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                                       <Dropdown.Item className={`py-3 rounded-dropdown-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("headers:header_profile")}</Dropdown.Item>
                                    </Link>
                                 </Dropdown>
                              </div>
                           ) : (
                              <Link to={`${languagePrefix}/sign-in`} className="flex items-center space-x-2 mr-20">
                                 <span className="text-sm text-[#111827] dark:text-white">{t("headers:header_sign_in")}</span>
                                 <div className="w-9 h-9 flex items-center justify-center border border-white rounded-full">
                                    <img
                                       src={isDarkMode ? "/images/sign_in_light.svg" : "/images/header/sign_in_dark.svg"}
                                       alt="user"
                                       className="w-5 h-5"
                                    />
                                 </div>
                              </Link>
                           )}
                        </>
                     )}
                  </div>
               )}
            </div>
            <div className={`flex flex-col md:hidden ${menuOpen ? 'flex' : 'hidden'}`}>
               <div className={`border-b-2 ${path === "/" ? "border-current" : "border-gray-800"}`}></div>
                  <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === "/" ? "border-current" : "border-gray-800"}`}>
                     <Link to="/" onClick={() => setMenuOpen(false)}>{t("headers:header_home")}</Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/projects` ? "border-current" : "border-gray-800"}`}>
                     <Link to={`${languagePrefix}/projects`} onClick={() => setMenuOpen(false)}>
                        {t("headers:header_projects")}
                     </Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/feed` ? "border-current" : "border-gray-800"}`}>
                     <Link to={`${languagePrefix}/feed`} onClick={() => setMenuOpen(false)}>
                        {t("headers:header_blogs")}
                     </Link>
                  </div>
                  <hr className="border-t border-gray-700" />
                  <div className={`py-3 px-5 pb-0.2 text-xl hover:bg-gray-200/70 dark:hover:bg-gray-400/40 ${path === `${languagePrefix}/forum` ? "border-current" : "border-gray-800"}`}>
                     <Link to={`${languagePrefix}/forum`} onClick={() => setMenuOpen(false)}>
                        {t("headers:header_forum")}
                     </Link>
               </div>
               <hr className="border-t border-gray-700" />
               <div
                  ref={dropdownRef}
                  className={`relative py-3 px-5 pb-0.2 text-xl ${
                     path === `/${languagePrefix}/about` ? "border-current" : "border-gray-800"
                  } ${!isOpenAbout ? "hover:bg-gray-200/70 dark:hover:bg-gray-400/40" : ""}`}
               >
                  <div className="flex items-center justify-between" onClick={handleToggleMenu}>
                     <Link className="menu-link">
                        {t("headers:header_about")}
                     </Link>
                     <IoIosArrowDown
                        className={`ml-auto transform transition-transform duration-500 ${
                           isOpenAbout ? "rotate-180" : "rotate-0"
                        }`}
                     />
                  </div>
                  {isOpenAbout && (
                     <ul className="mt-2 rounded-md z-10 whitespace-nowrap">
                        <li className="pl-12 py-3 px-5 rounded-md hover:underline">
                           <Link
                              to={`${languagePrefix}/about-company`}
                              className={`w-full text-left ${!isOpenAbout ? "hover:bg-gray-200/70 dark:hover:bg-gray-400/40" : ""}`}
                           >
                              {t("headers:about_company")}
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="pl-12 py-3 px-5 rounded-md hover:underline">
                           <Link
                              to={`${languagePrefix}/our-history`}
                              className={`w-full text-left ${!isOpenAbout ? "hover:bg-gray-200/70 dark:hover:bg-gray-400/40" : ""}`}
                           >
                              {t("headers:our_history")}
                           </Link>
                        </li>
                        <hr className="border-t border-gray-700 ml-10 mr-4" />
                        <li className="pl-12 py-3 px-5 rounded-md hover:underline">
                           <Link
                              to={`${languagePrefix}/contactus`}
                              className={`w-full text-left ${!isOpenAbout ? "hover:bg-gray-200/70 dark:hover:bg-gray-400/40" : ""}`}
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
