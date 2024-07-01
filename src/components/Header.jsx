import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { IoCameraOutline } from 'react-icons/io5';
import CustomTextInput from "./textinput/CustomTextInput";
import { useTranslation } from "react-i18next";

export default function Header() {
   const { t } = useTranslation();
   const path = useLocation().pathname;
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user);
   const { theme } = useSelector((state) => state.theme); 
   const [searchTerm, setSearchTerm] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const isAdmin = currentUser && currentUser.isAdmin;
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [searchVisible, setSearchVisible] = useState(false);

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
            console.log(data.messsage);
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleClickOutside = (event) => {
      if (
         (menuOpen && !event.target.closest(".menu") && !event.target.closest(".search-button")) ||
         (searchVisible && !event.target.closest(".search-wrapper") && !event.target.closest(".search-button") && !event.target.closest(".search-button-text"))
      ) {
         setMenuOpen(false);
         setSearchVisible(false);
      }
   };

   const handleButtonClick = (event) => {
      event.stopPropagation();
      setMenuOpen(!menuOpen);
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [menuOpen, searchVisible]);

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
            {!searchVisible && window.innerWidth < 860 && (
               <Button
                  className="w-12 h-10 flex items-center justify-center search-button-text border-none focus:outline-none focus:ring-0 mr-3"
                  color="gray"
                  pill
                  onClick={() => setSearchVisible((prevVisible) => !prevVisible)}
               >
                  <div className="flex items-center search-button-content">
                     <span className="mr-2">{t("header_search")}</span>
                     <AiOutlineSearch size={24} style={{ transform: 'rotate(90deg)' }} />
                  </div>
               </Button>
            )}
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
            <div className="flex items-center" onClick={() => dispatch(toggleTheme())}>
               <Button
                  className="w-12 h-10 flex items-center justify-center border-none focus:outline-none focus:ring-0"
                  color="gray"
                  pill
                  style={{ backgroundColor: 'transparent' }}
               >
                  <div className="flex items-center justify-center cursor-pointer group lg:mr-10">
                     <span 
                        className="font-semibold mr-2 text-sm theme-text text-[#111827] dark:text-[#9CA3AF] group-hover:text-[#0E7490] dark:group-hover:text-white"
                     >
                        {t("header_themes")}
                     </span>
                     {theme === "light" ? 
                        <FaMoon size={20} className="group-hover:text-[#0E7490]" /> : 
                        <FaSun size={20} className="group-hover:text-white" style={{ color: '#ffc600' }} />
                     }
                  </div>
               </Button>
            </div>
            {currentUser ? (
               <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                     <div className="flex items-center group">
                        <span 
                           className="font-semibold mr-3 text-sm username-text text-[#111827] dark:text-[#9CA3AF] group-hover:text-[#0E7490] dark:group-hover:text-white">
                           {currentUser.username}
                        </span>
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
                        <Link to="/dashboard?tab=profile">
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
                        <Link to={"/dashboard?tab=dash"}>
                           <Dropdown.Item className={`py-3 ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("header_dashboard")}</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider className="m-0 p-0" />
                     </>
                  )}
                  <Link to={"/dashboard?tab=profile"}>
                     <Dropdown.Item className={`py-3 rounded-dropdown-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>{t("header_profile")}</Dropdown.Item>
                  </Link>
               </Dropdown>
            ) : (
               <Link to="/sign-in">
                  <Button outline className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500">
                     {t("header_sign_in")}
                  </Button>
               </Link>
            )}
         </div>
         <Navbar.Collapse className={`${menuOpen ? "block" : "hidden"} hidden-in-range`}>
            <Navbar.Link active={path === "/"} as={"div"}>
               <Link to="/" onClick={() => setMenuOpen(false)}>{t("header_home")}</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
               <Link to="/about" onClick={() => setMenuOpen(false)}>{t("header_about")}</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={"div"}>
               <Link to="/projects" onClick={() => setMenuOpen(false)}>{t("header_projects")}</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/blogs"} as={"div"}>
               <Link to="/blogs" onClick={() => setMenuOpen(false)}>{t("header_blogs")}</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/contacts"} as={"div"}>
               <Link to="/contacts" onClick={() => setMenuOpen(false)}>{t("header_contacts")}</Link>
            </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
   );
}
