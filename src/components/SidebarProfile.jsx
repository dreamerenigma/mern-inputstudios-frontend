import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { 
   HiUser, 
   HiDocumentText, 
   HiOutlineUserGroup, 
   HiAnnotation, 
   HiChartPie, 
   HiShieldCheck, 
   HiMenu,
   HiX,
   HiHome,
   HiOutlineLockClosed,
   HiOutlineShieldCheck,
   HiLockClosed,
   HiOutlineDocumentText,
   HiUserGroup,
   HiOutlineAnnotation,
   HiOutlineUser,
   HiOutlineChartPie,
   HiOutlineHome,
} from 'react-icons/hi';
import { IoExit, IoExitOutline, IoLocationOutline, IoLocationSharp, IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";
import { useTranslation } from "react-i18next";

export default function SidebarProfile() {
   const { t } = useTranslation();
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useSelector(state => state.user);
   const [tab, setTab] = useState('');
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const { theme } = useSelector((state) => state.theme);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   
   const toggleSidebar = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsClicked(true);
      setTimeout(() => {
         setIsClicked(false);
      }, 200);
   };

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
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
            setDialogOpen(false);
            navigate("/");
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleSignoutClick = () => {
      setDialogOpen(true);
   };

   return ( 
      <div className="flex flex-col h-full md:w-64">
         <div 
            className={`flex items-center justify-center xl:hidden max-w-max`}
         >
            <button 
               className={`flex items-center justify-center ml-2 p-1 rounded transition-all duration-200
                           ${isClicked ? 'bg-gray-300 dark:bg-gray-800' : 'bg-transparent'}
                           hover:bg-gray-200 dark:hover:bg-gray-700`}
               onClick={toggleSidebar}
            >
               {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
         </div>
         <div 
            className={`h-full overflow-y-auto overflow-x-hidden pl-3 py-8 rounded bg-gray-100 dark:bg-[rgb(16,23,42)] flex flex-col justify-between transition-all duration-300
            ${isMenuOpen ? 'translate-x-0 w-56' : 'translate-x-[-100%] w-0'} 
            md:translate-x-0 md:w-64 
            ${!isMenuOpen ? 'absolute md:relative' : ''}`}
         >
            <div className="flex items-center mb-5 ml-2">
               <Avatar alt="user" img={currentUser.profilePicture} rounded />
               <div className="ml-4 hidden xl:block">
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
               </div>
            </div>
            <div className="flex-grow">
               <Link to={`${languagePrefix}/dashboard?tab=account`}>
                  <div className="py-1">
                     <div
                        className={`py-2 px-3 flex items-center justify-between rounded-xl relative ${
                           tab === "account" || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab === "account" ? "shadow-md" : ""
                           }`}
                     >
                        {tab === "account" && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                           </div>
                        )}
                        <div className="flex items-center">
                           {tab === "account" ? (
                              <HiHome
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineHome
                                 size={28}
                                 className={`text-${tab === "account" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("sidebar_account")}</span>
                        </div>
                        {currentUser.isAdmin && (
                           <div className={`ml-9 bg-gray-700 px-2 py-0.2 rounded ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>
                              <span className="text-xs text-white xl:inline">{t("admin")}</span>
                           </div>
                        )}
                     </div>
                  </div>
               </Link>
               {currentUser && currentUser.isAdmin && (
                  <Link to={`${languagePrefix}/dashboard?tab=dash`}>
                     <div className="py-1">
                        <div 
                           className={`py-2 px-3 flex items-center rounded-xl relative ${
                              tab === "dash" || !tab
                                 ? theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                 : ""
                              } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                                 isMenuOpen ? "w-14" : "w-full"
                              } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                                 tab === "dash" ? "shadow-md" : ""
                              }`}
                        >
                           {tab === "dash" && (
                              <div
                                 className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                              </div>
                           )}
                           {tab === "dash" ? (
                              <HiChartPie
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineChartPie 
                                 size={28}
                                 className={`text-${tab === "dash" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("dashboard")}</span> 
                        </div>
                     </div>
                  </Link>
               )}
               <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                  <div className="py-1">
                     <div 
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           (tab.includes("profile") || !tab)
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab.includes("profile") ? "shadow-md" : ""
                           }`}
                     >
                        {tab.includes("profile") && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}
                           ></div>
                        )}
                        {tab.includes("profile") ? (
                           <HiUser
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineUser
                              size={28}
                              className={`text-${tab.includes("profile") || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>
                           {t("profile")}
                        </span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=privacy`}>
                  <div className="py-1">
                     <div 
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           (tab && tab.includes("privacy")) || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab && tab.includes("privacy") ? "shadow-md" : ""
                           }`}
                     >
                        {tab && tab.includes("privacy") && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${
                                 theme === "dark" ? "bg-teal-500" : "bg-teal-500"
                              }`}>
                           </div>
                        )}
                        {tab && tab.includes("privacy") ? (
                           <HiShieldCheck
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineShieldCheck
                              size={28}
                              className={`text-${tab && tab.includes("privacy") || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("privacy")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=security`}>
                  <div className="py-1">
                     <div 
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           tab === "security" || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab === "security" ? "shadow-md" : ""
                           }`}
                     >
                        {tab === "security" && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                           </div>
                        )}
                        {tab === "security" ? (
                           <HiLockClosed
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineLockClosed
                              size={28}
                              className={`text-${theme === 'dark' ? 'gray-400' : 'gray-500'}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("security")}</span>
                     </div>
                  </div>
               </Link>
               {currentUser.isAdmin && (
                  <Link to={`${languagePrefix}/dashboard?tab=posts`}>
                     <div className="py-1">
                        <div 
                           className={`py-2 px-3 flex items-center rounded-xl relative ${
                              tab === "posts" || !tab
                                 ? theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                 : ""
                              } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                                 isMenuOpen ? "w-14" : "w-full"
                              } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                                 tab === "posts" ? "shadow-md" : ""
                              }`}
                        >
                           {tab === "posts" && (
                              <div
                                 className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                              </div>
                           )}
                           {tab === "posts" ? (
                              <HiDocumentText
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineDocumentText 
                                 size={28}
                                 className={`text-${tab === "posts" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("posts")}</span>
                        </div>
                     </div>
                  </Link>
               )}
               {currentUser.isAdmin && (
                  <>
                     <Link to={`${languagePrefix}/dashboard?tab=users`}>
                        <div className="py-1">
                           <div 
                              className={`py-2 px-3 flex items-center rounded-xl relative ${
                                 tab === "users" || !tab
                                    ? theme === "dark"
                                       ? "bg-gray-800"
                                       : "bg-gray-200"
                                    : ""
                                 } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                                    isMenuOpen ? "w-14" : "w-full"
                                 } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                                    tab === "users" ? "shadow-md" : ""
                                 }`}
                           >
                              {tab === "users" && (
                                 <div
                                    className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                                 </div>
                              )}
                              {tab === "users" ? (
                                 <HiUserGroup
                                    size={28}
                                    className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                                 />
                              ) : (
                                 <HiOutlineUserGroup 
                                    size={28}
                                    className={`text-${tab === "users" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                                 />
                              )}
                              <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("users")}</span>
                           </div>
                        </div>
                     </Link>
                     <Link to={`${languagePrefix}/dashboard?tab=comments`}>
                        <div className="py-1">
                           <div 
                              className={`py-2 px-3 flex items-center rounded-xl relative ${
                                 tab === "comments" || !tab
                                    ? theme === "dark"
                                       ? "bg-gray-800"
                                       : "bg-gray-200"
                                    : ""
                                 } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                                    isMenuOpen ? "w-14" : "w-full"
                                 } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                                    tab === "comments" ? "shadow-md" : ""
                                 }`}
                           >
                              {tab === "comments" && (
                                 <div
                                    className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                                 </div>
                              )}
                              {tab === "comments" ? (
                                 <HiAnnotation
                                    size={28}
                                    className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                                 />
                              ) : (
                                 <HiOutlineAnnotation 
                                    size={28}
                                    className={`text-${tab === "comments" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                                 />
                              )}
                              <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("comments")}</span>
                           </div>
                        </div>
                     </Link>
                  </>
               )}
               <Link to={`${languagePrefix}/dashboard?tab=addresses`}>
                  <div className="py-1">
                     <div 
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           tab === "addresses" || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab === "addresses" ? "shadow-md" : ""
                           }`}
                     >
                        {tab === "addresses" && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                           </div>
                        )}
                        {tab === "addresses" ? (
                           <IoLocationSharp
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <IoLocationOutline 
                              size={28}
                              className={`text-${tab === "addresses" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("address_book")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=settings`}>
                  <div className="py-1">
                     <div
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           tab === "settings" || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab === "settings" ? "shadow-md" : ""
                           }`}
                     >
                        {tab === "settings" && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                           </div>
                        )}
                        {tab === "settings" ? (
                           <IoSettingsSharp
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <IoSettingsOutline 
                              size={28}
                              className={`text-${tab === "settings" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("settings")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=signout`}>
                  <div className="py-1">
                     <div 
                        onClick={handleSignoutClick}
                        className={`py-2 px-3 flex items-center rounded-xl relative ${
                           tab === "signout" || !tab
                              ? theme === "dark"
                                 ? "bg-gray-800"
                                 : "bg-gray-200"
                              : ""
                           } ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} ${
                              isMenuOpen ? "w-14" : "w-full"
                           } xl:w-full ${!isMenuOpen && "xl:w-28"} ${
                              tab === "signout" ? "shadow-md" : ""
                           }`}
                     >
                        {tab === "signout" && (
                           <div
                              className={`absolute rounded-sm left-0 top-3 bottom-3 w-1 ${theme === "dark" ? "bg-teal-500" : "bg-teal-500"}`}>
                           </div>
                        )}
                        {tab === "signout" ? (
                           <IoExit
                              size={28}
                              className={`ml-1 text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <IoExitOutline 
                              size={28}
                              className={`ml-1 text-${tab === "signout" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("sign_out")}</span>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
         {isDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-md h-auto relative flex flex-col mx-4">
                  <button
                     onClick={() => setDialogOpen(false)}
                     className="absolute top-4 right-4 p-[2px] text-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded hover:translate-y-[-3px] transition-transform duration-200"
                  >
                     <AiOutlineClose size={20} />
                  </button>
                  <p className="text-lg md:text-xl mb-2 md:mb-4">{t("profile:are_you_sure_signout")}</p>
                  <p className="text-md md:text-md text-gray-400 mb-4">
                     {t("profile:all_unsaved_data")}
                  </p>
                  <div className="mt-6 flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0">
                     <button
                        onClick={() => setDialogOpen(false)}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 shadow-md rounded-lg flex-grow md:mr-2"
                     >
                        {t("profile:cancel")}
                     </button>
                     <button
                        onClick={handleSignout}
                        className="px-4 py-2 bg-red-600 dark:hover:bg-red-800 hover:bg-red-700 shadow-md text-white rounded-lg flex-grow md:ml-2"
                     >
                        {t("profile:sign_out")}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
