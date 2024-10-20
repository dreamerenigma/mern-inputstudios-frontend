import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { IoCameraOutline } from 'react-icons/io5';
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

export default function CommunityHeader() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user);
   const { theme } = useSelector((state) => state.theme); 
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenProducts, setIsOpenProducts] = useState(false);
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

   return (
      <Navbar className="border-b-2">
         <Link to="/" className={`self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ${windowWidth >= 1080 ? 'mx-8' : 'mx-0'}`}>
            <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-lg text-white">
               Input Studios
            </span>
         </Link>
         <div className={`flex gap-3 md:order-2 ${windowWidth >= 1080 ? 'mx-8' : 'mx-0'}`}>
            <div className="flex items-center" onClick={() => dispatch(toggleTheme())}>
               <Button className="w-12 h-10 flex items-center justify-center border-none focus:outline-none focus:ring-0" color="gray" pill style={{ backgroundColor: 'transparent' }}>
                  <div className="flex items-center justify-center cursor-pointer group lg:mr-10">
                     <span className="font-semibold mr-2 text-sm theme-text text-[#111827] dark:text-[#9CA3AF] group-hover:text-[#0E7490] dark:group-hover:text-white">
                        {t("header_themes")}
                     </span>
                     {theme === "light" ? <FaMoon size={20} className="group-hover:text-[#0E7490]" /> : <FaSun size={20} className="group-hover:text-white" style={{ color: '#ffc600' }} />}
                  </div>
               </Button>
            </div>
            {currentUser ? (
               <Dropdown arrowIcon={false} inline label={<div className="flex items-center group"><span className="font-semibold mr-3 text-sm username-text text-[#111827] dark:text-[#9CA3AF] group-hover:text-[#0E7490] dark:group-hover:text-white">{currentUser.username}</span><Avatar alt="user" img={currentUser.profilePicture} rounded /></div>}>
                  <div className="flex items-center justify-between">
                     <img src="https://i.ibb.co/jbNDftv/logo-Input-Studios-grey.png" alt="" width="90" height="90" className="mt-2 ml-2 mb-5" />
                     <span onClick={handleSignout} className="hover:bg-gray-200 hover:text-gray-700 cursor-pointer text-xs p-2.5 mb-3">{t("header_sign_out")}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 pb-4">
                     <div className="relative">
                        <Avatar alt="user" img={currentUser.profilePicture} rounded />
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
                           <Dropdown.Item className={`py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("header_dashboard")}</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider className="m-0 p-0" />
                     </>
                  )}
                  <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                     <Dropdown.Item className={`py-3 rounded-dropdown-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("header_profile")}</Dropdown.Item>
                  </Link>
               </Dropdown>
            ) : (
               <Link to={`${languagePrefix}/sign-in`}>
                  <Button outline className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500">{t("header_sign_in")}</Button>
               </Link>
            )}
         </div>
         <Navbar.Collapse>
            <div className={`pb-1 border-b-2 ${path === `${languagePrefix}/forum` ? "border-current" : "border-transparent"} hover:border-current`}>
               <Link to={`${languagePrefix}/forum`}>{t("header_forum")}</Link>
            </div>
            <div 
               onClick={handleToggleProducts} 
               ref={dropdownRefProducts}
               className={`pb-0.2 border-b-2 ${path === "/" ? "border-current" : "border-transparent"} hover:border-current`}
            >
               <Link className="flex flex-row items-center">{t("header_products")}<IoIosArrowDown className="ml-2" /></Link>
               {isOpenProducts && (
                  <ul className="absolute mt-2 bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap">
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md">
                        <Link to={`${languagePrefix}/chatify`} className="w-full text-left block">
                           Chatify
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <Link to={`${languagePrefix}/easy-shoppin`} className="w-full text-left block">
                           Easy Shoppin
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <Link to={`${languagePrefix}/quantum-engine`} className="w-full text-left block">
                           Quantum Engine
                        </Link>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <Link to={`${languagePrefix}/wave`} className="w-full text-left block">
                           Input Studios Wave
                        </Link>
                     </li>
                  </ul>
               )}
            </div>
            <div
               onClick={handleToggle} 
               ref={dropdownRef}
               className={`pb-0.2 border-b-2 ${path === "/" ? "border-current" : "border-transparent"} hover:border-current`}
            >
               <Link className="flex flex-row items-center">{t("header_get_started")}<IoIosArrowDown className="ml-2" /></Link>
               {isOpen && (
                  <ul className="absolute mt-2 bg-white dark:bg-gray-600 shadow-md rounded-md z-10 whitespace-nowrap">
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-t-md">
                        <button className="w-full text-left cursor-pointer hover:underline">{t("ask_question")}</button>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <button className="w-full text-left cursor-pointer hover:underline">{t("tips_beginners")}</button>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <button className="w-full text-left cursor-pointer hover:underline">{t("questions_answers")}</button>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400">
                        <button className="w-full text-left cursor-pointer hover:underline">{t("rules_conduct_community")}</button>
                     </li>
                     <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-b-md">
                        <button className="w-full text-left cursor-pointer hover:underline">{t("visit_community_center")}</button>
                     </li>
                  </ul>
               )}
            </div>
         </Navbar.Collapse>
      </Navbar>
   );
}
