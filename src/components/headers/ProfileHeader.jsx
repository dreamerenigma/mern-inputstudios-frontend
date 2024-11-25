import { Avatar, Button, Dropdown } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
import { Helmet } from "react-helmet";
import { IoMdCreate } from "react-icons/io";

export default function ProfileHeader() {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const [menuOpen, setMenuOpen] = useState(false);
   const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { theme } = useSelector((state) => state.theme);
   const { currentUser } = useSelector(state => state.user);
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [searchVisible, setSearchVisible] = useState(false);
   const [isHelpful, setIsHelpful] = useState(false);
   const [feedbackText, setFeedbackText] = useState("");
   const [showFeedback, setShowFeedback] = useState(true);
   const [inputValue, setInputValue] = useState('');
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   const isPostsTab = location.pathname === `${languagePrefix}/dashboard` && new URLSearchParams(location.search).get('tab') === 'posts';

   const handleSendFeedback = () => {
      const subject = encodeURIComponent("Отправка отзыва");
      const body = encodeURIComponent(feedbackText);
      const email = "jarekismail@gmail.com";
      
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
   };

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
            navigate("/");
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleClickOutside = useCallback((event) => {
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
   }, [menuOpen, searchVisible, questionMenuOpen, dropdownOpen]);

   const handleQuestionIconClick = () => {
      setQuestionMenuOpen(!questionMenuOpen);
   };

   const handleQuestionMenuClose = () => {
      setQuestionMenuOpen(false);
   };

   const handleMenuIconClick = () => {
      setDropdownOpen(!dropdownOpen);
   };

   const handleFeedbackClick = (isHelpful, event) => {
      event.stopPropagation();
      setIsHelpful(isHelpful);
   };

   const handleInputChange = (event) => {
      setInputValue(event.target.value);
   };

   const clearInput = () => {
      setInputValue('');
   };

   const handleNoThanksClick = (event) => {
      event.stopPropagation();
      setShowFeedback(false);
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [handleClickOutside]);

   useEffect(() => {
      const element = document.querySelector('.mx-auto.flex.flex-wrap.items-center.justify-between');
      if (element) {
         element.classList.remove('container');
      }
   }, []);
   
   useEffect(() => {
      if (!showFeedback) {
         setIsHelpful(null);
         setFeedbackText('');
      }
   }, [showFeedback]);
   
   return (
      <div>
         <Helmet>
            <title>{t("title_account")}</title>
         </Helmet>
         <div className="fixed top-0 left-0 right-0 z-10 shadow-lg bg-white dark:bg-gray-800 ">
            <div className="flex items-center justify-between ">
               <div className="flex items-center">
                  <div 
                     className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 custom-header-padding rounded menu-icon cursor-pointer" 
                     onClick={handleMenuIconClick}
                  >
                     <CgMenuGridR className="text-3xl menu-icon cursor-pointer"/>
                  </div>
                  <Link
                     to={`${languagePrefix}/dashboard?tab=account`}
                     className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 px-0 sm:p-3.5 ml-2 rounded cursor-pointer"
                  >
                     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        <span className="hidden sm:inline">{t("account")}</span>
                        <span className="inline sm:hidden">Учетная запись</span>
                     </span>
                  </Link>
               </div>
               {(currentUser.isAdmin && isPostsTab) || !currentUser.isAdmin ? (
                  <div className="flex justify-end w-full ml-4 mr-0">
                     <Link to={`${languagePrefix}/create-post`}>
                        <button
                           type="button"
                           className="w-full md:w-[120px] max-w-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white p-[6px] rounded-lg"
                        >
                           <span className="sm:hidden">
                              <IoMdCreate size={24} />
                           </span>
                           <span className="hidden sm:inline font-semibold">
                              {t("profile:create_post")}
                           </span>
                        </button>
                     </Link>
                  </div>
               ) : null}
               {currentUser ? (
                  <div className="flex items-center">
                     <div className="dark:hover:bg-gray-700 transition-colors duration-200 ml-2 py-4 px-2 sm:px-4 mr-0 rounded cursor-pointer" onClick={handleQuestionIconClick}>
                        <AiOutlineQuestion className="text-2xl cursor-pointer question-icon" />
                     </div>
                     <div className="dark:hover:bg-gray-700 transition-colors duration-200 p-2 rounded">
                        <Dropdown
                           arrowIcon={false}
                           inline
                           label={
                              <div className="flex items-center group">
                                 <div className="relative w-10 h-10 rounded-full overflow-hidden avatar-small">
                                    <img
                                       src={currentUser.profilePicture}
                                       alt="User Avatar"
                                       className="w-full h-full object-cover"
                                    />
                                 </div>
                              </div>
                           }
                           className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl custom-dropdown"
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
                                 className="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-tr-md cursor-pointer text-xs p-2.5 mb-3"
                              >
                                 {t("headers:header_sign_out")}
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
                           <Dropdown.Divider className="m-0 p-0 bg-gray-300 dark:bg-gray-700"/>
                           {isAdmin && (
                              <>
                                 <Link to={`${languagePrefix}/dashboard?tab=dash`}>
                                    <Dropdown.Item className={`py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                       <img src="/images/header/control_panel.svg" alt="Control panel" className="w-6 h-6 mr-3" />
                                       {t("headers:header_dashboard")}
                                    </Dropdown.Item>
                                 </Link>
                                 <Dropdown.Divider className="m-0 p-0 bg-gray-300 dark:bg-gray-700" />
                              </>
                           )}
                           <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                              <Dropdown.Item className={`py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                 <img src="/images/header/profile.svg" alt="Profile" className="w-6 h-6 mr-3" />
                                 {t("headers:header_profile")}
                              </Dropdown.Item>
                           </Link>
                           <Dropdown.Divider className="m-0 p-0 bg-gray-300 dark:bg-gray-700" />
                           <Link to={`${languagePrefix}/settings`}>
                              <Dropdown.Item className={`flex items-center py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                 <img src="/images/header/settings.svg" alt="Settings" className="w-6 h-6 mr-3" />
                                 {t("headers:header_settings")}
                              </Dropdown.Item>
                           </Link>
                           <Dropdown.Divider className="m-0 p-0 bg-gray-300 dark:bg-gray-700" />
                           <Link to={`${languagePrefix}/`}>
                              <Dropdown.Item className={`flex items-center py-3 rounded-b-lg ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                                 <img src="/images/header/home.svg" alt="Settings" className="w-6 h-6 mr-3" />
                                 {t("headers:header_profile_home")}
                              </Dropdown.Item>
                           </Link>
                        </Dropdown>
                     </div>
                  </div>
               ) : (
                  <Link to={`${languagePrefix}/sign-in`}>
                     <Button outline className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500">
                        {t("header:header_sign_in")}
                     </Button>
                  </Link>
               )}
            </div>
         </div>
         {questionMenuOpen && (
            <div className="bg-white dark:bg-gray-800 shadow-lg top-14 fixed right-0 bottom-0 w-auto question-menu z-10">
               <div className="flex justify-between items-center p-4 mb-4">
                  <span className="text-lg font-semibold">{t("help")}</span>
                  <AiOutlineClose 
                     className="text-xl cursor-pointer" 
                     onClick={handleQuestionMenuClose} 
                  />
               </div>
               <div className="flex items-center p-4">
                  <IoArrowBack className="mr-2 text-2xl text-teal-500" onClick={clearInput} />
                  <IoHomeOutline className="mr-2 text-2xl text-teal-500" onClick={clearInput} />
                  <div className="flex items-center w-full bg-gray-200 dark:bg-gray-700 rounded">
                     <FaSearch className="ml-3 text-gray-400" />
                     <input 
                        type="text" 
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={t("search_help")}
                        className={`w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent border-none dark:placeholder-gray-400 ${theme === 'dark' ? 'placeholder-white' : 'placeholder-gray-500' }`}
                     />
                  </div>
               </div>
               <div className="bg-gray-200 dark:bg-gray-700 p-4 min-h-screen">
                  <span className="font-semibold">{t("feature_help")}</span>
                  <div className="my-4 max-w-xs">
                     <p>{t("select_category_popular_topics")}</p>
                  </div>
                  <div>
                     <ul>
                        <li className="py-2 cursor-pointer text-teal-500 underline">{t("account_profile")}</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">{t("account_security")}</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">{t("account_purchases")}</li>
                        <li className="py-2 cursor-pointer text-teal-500 underline">{t("subscriptions")}</li>
                     </ul>
                  </div>
                  <Link to={`${languagePrefix}/workspace`} className="flex items-center">
                     <p className="py-2 text-sm text-teal-500 hover:underline">{t("read_article_browser")}</p>
                     <PiArrowSquareOutLight className="ml-2 text-teal-500" />
                  </Link>
                  <div>
                     {showFeedback ? (
                        <>
                           {!isHelpful ? (
                              <>
                                 <p>{t("was_this_helpful")}</p>
                                 <div className="flex mt-2">
                                    <button
                                       className="bg-white hover:bg-gray-200 px-8 h-8 rounded shadow-md mr-2 text-black"
                                       onClick={(event) => handleFeedbackClick(true, event)}
                                    >
                                       {t("yes")}
                                    </button>
                                    <button
                                       className="bg-white hover:bg-gray-200 px-8 h-8 rounded shadow-md text-black"
                                       onClick={(event) => handleFeedbackClick(false, event)}
                                    >
                                       {t("no")}
                                    </button>
                                 </div>
                              </>
                           ) : (
                              <>
                              <p>{t("great_any_other_feedback")}</p>
                              <textarea
                                 className="w-full h-32 mt-2 p-2 border rounded text-black bg-gray-100 dark:bg-gray-400 focus:outline-none focus:border-teal-500"
                                 style={{ resize: 'vertical', minHeight: '80px' }}
                                 placeholder={t("type_feedback")}
                                 value={feedbackText}
                                 onChange={(e) => setFeedbackText(e.target.value)}
                              />
                              <p className="mt-1 max-w-xs">
                                 {t("protect_privacy")}{" "}
                                 <a href="/privacy-policy" className="text-teal-500 hover:underline">
                                    {t("privacy_policy")}
                                 </a>
                              </p>
                              <div className="mt-2 flex">
                                 <button
                                    className="bg-white hover:bg-gray-200 px-8 h-8 rounded shadow-md mr-2 text-black"
                                    onClick={handleSendFeedback}
                                 >
                                    {t("send")}
                                 </button>
                                 <button
                                    className="bg-white hover:bg-gray-200 px-8 h-8 rounded shadow-md text-black"
                                    onClick={handleNoThanksClick}
                                 >
                                    {t("no_thanks")}
                                 </button>
                              </div>
                              </>
                           )}
                        </>
                     ) : (
                        <>
                           <p>{t("thank_you_for_your_feedback")}</p>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
         {dropdownOpen && (
            <div className="dropdown-menu bg-white dark:bg-gray-800 shadow-lg fixed top-14 left-0 z-20 p-4 rounded-lg max-w-md w-full">
               <input
                  type="text"
                  placeholder={t("header_search")}
                  className="w-full p-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded"
               />
               <div className="grid grid-cols-4 gap-6">
                  <Link to={`${languagePrefix}/chatify`} className="text-center hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200">
                     <img src="../logos/logo_chatify.png" alt="Chatify" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Chatify</span>
                  </Link>
                  <Link to={`${languagePrefix}/easy-shoppin`} className="text-center hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200">
                     <img src="../logos/logo_easyshoppin_black.png" alt="Easy Shoppin" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Easy Shoppin</span>
                  </Link>
                  <Link to={`${languagePrefix}/quantum-engine`} className="text-center hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200">
                     <img src="../logos/logo_quantum_engine.png" alt="Quantum Engine" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Quantum Engine</span>
                  </Link>
                  <Link to={`${languagePrefix}/wave`} className="text-center hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200">
                     <img src="../logos/logo_wave.png" alt="Input Studios Wave" className="w-[50px] mb-2 rounded-md mx-auto" />
                     <span className="block">Wave</span>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}
