import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
   const location = useLocation();
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user);
   const [tab, setTab] = useState('');
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const { theme } = useSelector((state) => state.theme);
   
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
      <div className="w-full h-full md:w-56">
         <div className="h-full overflow-y-auto overflow-x-hidden px-4 py-4 rounded bg-gray-100 dark:bg-gray-900 flex flex-col justify-between">
            <div className="flex items-center mb-5">
               <Avatar alt='user' img={currentUser.profilePicture} rounded />
               <div className="ml-2">
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
               </div>
            </div>
            <div className="flex-grow"> 
               {currentUser && currentUser.isAdmin && (
                  <Link to={"/dashboard?tab=dash"}>
                     <div className="py-1">
                        <div 
                           className={`py-2 px-1 ${tab === "dash" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                        >
                        <HiChartPie 
                           size={28}
                           className={`text-${tab === 'dash' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                        <span className="ml-4">Dashboard</span> 
                        </div>
                     </div>
                  </Link>
               )}
               <Link to="/dashboard?tab=profile">
                  <div className="py-1">
                     <div className={`py-2 px-1 ${tab === "profile" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                        <HiUser
                           size={28}
                           className={`text-${tab === 'profile' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                           <span className="ml-4">Profile</span>
                           {currentUser.isAdmin && (
                              <div className="ml-10 bg-gray-700 px-2 py-0.2 rounded">
                                 <span className="text-xs text-white">Admin</span>
                              </div>
                           )}
                     </div>
                  </div>
               </Link>
               {currentUser.isAdmin && (
                  <Link to="/dashboard?tab=posts">
                     <div className="py-1">
                        <div className={`py-2 px-1 ${tab === "posts" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                           <HiDocumentText 
                              size={28}
                              className={`text-${tab === 'posts' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                           <span className="ml-4">Posts</span>
                        </div>
                     </div>
                  </Link>
               )}
               {currentUser.isAdmin && (
                  <>
                     <Link to="/dashboard?tab=users">
                        <div className="py-1">
                           <div className={`py-2 px-1 ${tab === "users" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                              <HiOutlineUserGroup 
                                 size={28}
                                 className={`text-${tab === 'users' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                                 <span className="ml-4">Users</span>
                           </div>
                        </div>
                     </Link>
                     <Link to="/dashboard?tab=comments">
                        <div className="py-1">
                           <div className={`py-2 px-1 ${tab === "comments" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                              <HiAnnotation 
                                 size={28}
                                 className={`text-${tab === 'comments' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                                 <span className="ml-4">Comments</span>
                           </div>
                        </div>
                     </Link>
                  </>
               )}
               <div className={`py-2 px-1 ${tab === "signout" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`} onClick={handleSignout}>
                  <HiArrowSmRight 
                     size={28}
                     className={`text-${tab === 'signout' || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                  />
                  <span className="ml-4">Sign Out</span>
               </div>
            </div>
         </div>
      </div>
   );
}
