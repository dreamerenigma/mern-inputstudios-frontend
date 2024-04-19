import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { changeLanguage } from '../redux/language/languageSlice';
import { Switch } from '@mui/material';
import { IoCameraOutline } from 'react-icons/io5';

export default function Header({ languages }) {
   const path = useLocation().pathname;
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user);
   const { theme } = useSelector((state) => state.theme); 
   const [searchTerm, setSearchTerm] = useState("");
   const isAdmin = currentUser && currentUser.isAdmin;
   const { currentLanguage } = useSelector((state) => state.language);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

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

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleLanguageChange = (newLanguage) => {
      dispatch(changeLanguage(newLanguage));
   };

   return (
      <Navbar className="border-b-2">
         <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
         >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
               Input Studios
               </span>
         </Link>
         <form onSubmit={handleSubmit}> 
            <TextInput
               type="text"
               placeholder="Search..."
               rightIcon={AiOutlineSearch}
               className="hidden lg:inline"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </form>
         <Button className="w-12 h-10 lg:hidden flex items-center justify-center" color='gray' pill>
            <AiOutlineSearch />
         </Button>
         <div className="flex gap-2 md:order-2">
            <div className="flex items-center">
               <Switch
                  className="relative"
                  checked={currentLanguage === 'en'}
                  onChange={(event) => handleLanguageChange(event.target.checked ? 'en' : 'ru')}
                  sx={{
                     '& .MuiSwitch-switchBase.Mui-checked': {
                        '& .flag-image': {
                           backgroundImage: 'url(https://i.ibb.co/LtPNm0n/US.png)',
                        }
                     },
                     '& .MuiSwitch-switchBase': {
                        '& .flag-image': {
                           backgroundImage: 'url(https://i.ibb.co/489wXn1/RU.png)',
                        }
                     },
                  }}
               />
               <span className="flag-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full overflow-hidden"></span>
            </div>
            <Button
               className="w-12 h-10 hidden sm:inline"
               color="gray"
               pill
               onClick={() => dispatch(toggleTheme())}
            >
               {theme === "light" ? <FaMoon /> : <FaSun /> }
            </Button>
            {currentUser ? (
               <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                     <Avatar alt='user' img={currentUser.profilePicture} rounded />
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
                        Sign out
                     </span>
                  </div>
                  <Dropdown.Header className="flex items-center gap-2">
                     <div className="relative">
                        <Avatar alt='user' img={currentUser.profilePicture} rounded />
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
                  </Dropdown.Header>
                  {isAdmin && (
                     <>
                        <Link to={"/dashboard?tab=dash"}>
                           <Dropdown.Item>Dashboard</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                     </>
                  )}
                  <Link to={"/dashboard?tab=profile"}>
                     <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
               </Dropdown>
            ) : (
               <Link to="/sign-in">
                  <Button gradientDuoTone="purpleToBlue" outline>
                     Sign In
                  </Button>
               </Link>
            )}
            <Navbar.Toggle />
         </div>
         <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={"div"}>
               <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
               <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={"div"}>
               <Link to="/projects">Projects</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/contacts"} as={"div"}>
               <Link to="/contacts">Contacts</Link>
            </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
   );
}
