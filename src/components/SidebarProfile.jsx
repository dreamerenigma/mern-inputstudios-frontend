import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { 
   HiUser, 
   HiArrowSmRight, 
   HiDocumentText, 
   HiOutlineUserGroup, 
   HiAnnotation, 
   HiChartPie, 
   HiShieldCheck, 
   HiMenu,
   HiX,
   HiHome,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";

export default function SidebarProfile() {
   const location = useLocation();
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user);
   const [tab, setTab] = useState('');
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const { theme } = useSelector((state) => state.theme);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   
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
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return ( 
      <div className="flex flex-col h-full md:w-56">
      <div 
         className={`flex items-center justify-between pl-6 p-2 xl:hidden ${isClicked ? 'bg-gray-300 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`}
         onClick={toggleSidebar}
      >
         <button>
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
         </button>
      </div>
      <div className={`h-full overflow-y-auto overflow-x-hidden pl-3 py-4 rounded bg-gray-100 dark:bg-gray-900 flex flex-col justify-between transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${!isMenuOpen ? 'w-full md:w-auto' : 'md:w-56'}`}>
         <div className="flex items-center mb-5 ml-2">
            <Avatar alt='user' img={currentUser.profilePicture} rounded />
            <div className="ml-4 hidden xl:block">
               <span className="block text-sm">{currentUser.username}</span>
               <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </div>
         </div>
            <div className="flex-grow">
               <Link to="/dashboard?tab=account">
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "account" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                        <HiHome
                           size={28}
                           className={`text-${tab === "account" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Account</span>
                           {currentUser.isAdmin && (
                              <div className={`ml-9 bg-gray-700 px-2 py-0.2 rounded ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>
                                 <span className="text-xs text-white xl:inline">Admin</span>
                              </div>
                           )}
                     </div>
                  </div>
               </Link>
               {currentUser && currentUser.isAdmin && (
                  <Link to={"/dashboard?tab=dash"}>
                     <div className="py-1">
                        <div 
                           className={`py-2 px-3 ${tab === "dash" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}
                        >
                        <HiChartPie 
                           size={28}
                           className={`text-${tab === "dash" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Dashboard</span> 
                        </div>
                     </div>
                  </Link>
               )}
               <Link to="/dashboard?tab=profile">
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "profile" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                        <HiUser
                           size={28}
                           className={`text-${tab === "profile" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Profile</span>
                     </div>
                  </div>
               </Link>
               <Link to="/dashboard?tab=privacy">
                  <div className="py-1">
                  <div className={`py-2 px-3 ${tab === "privacy" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                        <HiShieldCheck
                           size={28}
                           className={`text-${tab === "privacy" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Privacy</span>
                     </div>
                  </div>
               </Link>
               {currentUser.isAdmin && (
                  <Link to="/dashboard?tab=posts">
                     <div className="py-1">
                        <div className={`py-2 px-3 ${tab === "posts" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                           <HiDocumentText 
                              size={28}
                              className={`text-${tab === "posts" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Posts</span>
                        </div>
                     </div>
                  </Link>
               )}
               {currentUser.isAdmin && (
                  <>
                     <Link to="/dashboard?tab=users">
                        <div className="py-1">
                           <div className={`py-2 px-3 ${tab === "users" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                              <HiOutlineUserGroup 
                                 size={28}
                                 className={`text-${tab === "users" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                                 <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Users</span>
                           </div>
                        </div>
                     </Link>
                     <Link to="/dashboard?tab=comments">
                        <div className="py-1">
                           <div className={`py-2 px-3 ${tab === "comments" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`}>
                              <HiAnnotation 
                                 size={28}
                                 className={`text-${tab === "comments" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                                 <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Comments</span>
                           </div>
                        </div>
                     </Link>
                  </>
               )}
               <Link to="/dashboard?tab=signout">
                  <div 
                     className={`py-2 px-3 ${tab === "signout" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'}`} 
                     onClick={handleSignout}
                     >
                     <HiArrowSmRight 
                        size={28}
                        className={`text-${tab === "signout" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                     />
                     <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>Sign Out</span>
                  </div>
               </Link>
            </div>
         </div>
         <span className="px-4 py-2 text-xs">Version 0.0.0.14</span>
      </div>
   );
}
