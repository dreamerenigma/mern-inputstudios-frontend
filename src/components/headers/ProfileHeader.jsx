import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { AiOutlineQuestion, AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";
import { IoCameraOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import { PiArrowSquareOutLight } from "react-icons/pi";

export default function ProfileHeader() {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const [menuOpen, setMenuOpen] = useState(false);
   const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { theme } = useSelector((state) => state.theme);
   const { currentUser } = useSelector(state => state.user);
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [searchVisible, setSearchVisible] = useState(false);
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

   const handleClickOutside = (event) => {
      if (
         (menuOpen && !event.target.closest(".menu") && !event.target.closest(".search-button")) ||
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text")) ||
         (questionMenuOpen && !event.target.closest(".question-menu") && !event.target.closest(".question-icon") && !event.target.closest(".flex.items-center")) ||
         (dropdownOpen && !event.target.closest(".menu-icon") && !event.target.closest(".dropdown-menu"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
         setQuestionMenuOpen(false);
         setDropdownOpen(false);
      }
   };

   const handleQuestionIconClick = () => {
      setQuestionMenuOpen(!questionMenuOpen);
   };

   const handleQuestionMenuClose = () => {
      setQuestionMenuOpen(false);
   };

   const handleMenuIconClick = () => {
      setDropdownOpen(!dropdownOpen);
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [questionMenuOpen, dropdownOpen]);

   useEffect(() => {
      const element = document.querySelector('.mx-auto.flex.flex-wrap.items-center.justify-between');
      if (element) {
         element.classList.remove('container');
      }
   }, []);

   return (
      <div>
         <Navbar className="fixed top-0 left-0 right-0 z-10 border-b-2">
            <div className="flex items-center">
               <CgMenuGridR 
                  className="text-lg sm:text-3xl mr-2 menu-icon cursor-pointer" 
                  onClick={handleMenuIconClick} 
               />
               <Link
                  to={`${languagePrefix}/dashboard?tab=account`}
                  className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
               >
                  <span className="px-2 py-1 text-lg">
                     Input Studios account
                  </span>
               </Link>
            </div>
            {currentUser ? (
               <div className="flex items-center">
                  <AiOutlineQuestion 
                     className="text-lg sm:text-2xl mr-8 cursor-pointer question-icon" 
                     onClick={handleQuestionIconClick} 
                  />
                  <Dropdown
                     arrowIcon={false}
                     inline
                     label={
                        <div className="flex items-center group">
                           <Avatar alt="user" img={currentUser.profilePicture} rounded />
                        </div>
                     }
                  >
                     <div className="flex items-center justify-between">
                        <img
                           src="https://i.ibb.co/jbNDftv/logo-Input-Studios-grey.png"
                           alt=""
                           width="90"
                           height="90"
                           className="mt-2 ml-2 mb-5"
                        />
                        <span
                           onClick={handleSignout}
                           className="hover:bg-gray-200 hover:text-gray-700 cursor-pointer text-xs p-2.5 mb-3"
                        >
                           {t("header_sign_out")}
                        </span>
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
                     <Dropdown.Divider className="m-0 p-0"/>
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
               </div>
            ) : (
               <Link to={`${languagePrefix}/sign-in`}>
                  <Button outline className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500">
                     {t("header_sign_in")}
                  </Button>
               </Link>
            )}
         </Navbar>
         {questionMenuOpen && (
            <div className="bg-white dark:bg-gray-800 shadow-lg top-14 fixed right-0 bottom-0 w-auto question-menu z-10">
               <div className="flex justify-between items-center p-4 mb-4">
                  <span className="text-lg font-semibold">Help</span>
                  <AiOutlineClose 
                  className="text-xl cursor-pointer" 
                  onClick={handleQuestionMenuClose} 
                  />
               </div>
               <div className="flex items-center p-4">
                  <IoArrowBack className="mr-2 text-2xl" />
                  <IoHomeOutline className="mr-2 text-2xl" />
                  <div className="flex items-center w-full bg-gray-200 dark:bg-gray-600 rounded">
                     <FaSearch className="ml-3" />
                     <input 
                        type="text" 
                        placeholder="Search"
                        className={`w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent border-none ${theme === 'dark' ? 'placeholder-white' : 'placeholder-gray-500'}`}
                     />
                  </div>
               </div>
               <div className="bg-gray-200 dark:bg-gray-600 p-4 min-h-screen">
                  <span className="font-semibold">Featured Help</span>
                  <div className="my-4">
                     <p>Select a category to explore popular help topics.</p>
                  </div>
                  <div>
                     <ul>
                        <li className="py-2 cursor-pointer text-teal-500 underline">Account profile</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">Account security</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">Account purchases</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">Subscriptions</li>
                     </ul>
                  </div>
                  <div className="flex items-center">
                     <p className="py-2 text-teal-500 hover:underline">Read article in browser</p>
                     <PiArrowSquareOutLight className="ml-2 text-teal-500" />
                  </div>
                  <p>Was this helpful?</p>
                  <div className="flex mt-2">
                     <button className="bg-white hover:bg-gray-200 px-8 h-8 rounded border border-black mr-2 text-black">
                        {t("yes")}
                     </button>
                     <button className="bg-white hover:bg-gray-200 px-8 h-8 rounded border border-black text-black">
                        {t("no")}
                     </button>
                  </div>
               </div>
            </div>
         )}
         {dropdownOpen && (
            <div className="dropdown-menu bg-white dark:bg-gray-800 shadow-lg fixed top-14 left-0 z-20 p-4 rounded-lg max-w-md w-full">
               <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded"
               />
               <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                     <img src="../logos/logo_chatify.png" alt="Chatify" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Chatify</span>
                  </div>
                  <div className="text-center">
                     <img src="../logos/logo_easyshoppin_black.png" alt="Easy Shoppin" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Easy Shoppin</span>
                  </div>
                  <div className="text-center">
                     <img src="../logos/logo_quantum_engine.png" alt="Quantum Engine" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Quantum Engine</span>
                  </div>
                  <div className="text-center">
                     <img src="../logos/logo_wave.png" alt="Input Studios Wave" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Wave</span>
                  </div>
               </div>
            </div>
         )}
         <div className="pt-16"></div>
      </div>
   );
}
