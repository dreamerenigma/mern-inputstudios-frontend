import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/dateUtils";
import { FaRegClock, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function RecentPostCard({ post }) {
   const { t } = useTranslation();
   const [user, setUser] = useState({});
   const [views, setViews] = useState(0);
   const { currentUser } = useSelector(state => state.user);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await fetch(`${SERVER_URL}/api/user/${post.userId}`);
            const data = await res.json();
            if (res.ok) {
               setUser(data);
            }
         } catch (error) {
            console.log(error.message);
         }
      }
      getUser();
   }, [SERVER_URL, post]);

   useEffect(() => {
      const getPostViews = async (postId) => {
         try {
            if (!postId || postId.length !== 24) {
               console.error("Invalid postId format", postId);
               return;
            }
   
            const token = localStorage.getItem('token');
            
            const res = await fetch(`${SERVER_URL}/api/post/${postId}/incrementViews`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
               },
            });
            const data = await res.json();
            if (res.ok) {
               setViews(data.views);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      if (post._id) {
         getPostViews(post._id);
      }
   }, [SERVER_URL, post._id]);
   
   return (
      <div className="group relative w-full border border-teal-500 overflow-hidden rounded-lg transition-all shadow-md">
         <div className="px-4 pt-4">
            {currentUser ? (
               <Link
                  to={
                     currentUser.username === user.username
                        ? `${languagePrefix}/dashboard?tab=profile`
                        : `${languagePrefix}/user/${user.username}`
                  }
                  className="flex items-center gap-2 text-gray-500 text-sm max-w-max"
               >
                  <img
                     className="h-8 w-8 object-cover rounded-full"
                     src={user.profilePicture}
                     alt="Profile picture"
                  />
                  <span className="text-sm text-teal-500 hover:underline">@{user.username}</span>
               </Link>
            ) : (
               <div className="text-sm text-teal-500 my-5 flex gap-1 max-w-max">
                  {t("comments:signed_in_comment")}
                  <Link className="text-blue-500 hover:underline" to={`${languagePrefix}/sign-in`}>
                     {t("comments:sign_in")}
                  </Link>
               </div>
            )}
         </div>
         <div className="p-4">
            <Link to={`${languagePrefix}/post/${post.slug}`} className="flex flex-col sm:flex-row">
               <img
                  src={post.image || "https://i.ibb.co/09wbb3z/blog-post.png"} 
                  alt="post cover"
                  className="h-[150px] w-full object-cover rounded-lg duration-300 z-20 sm:w-[200px] sm:h-[150px] sm:mr-4 sm:mb-0 mb-4"
               />
               <div className="flex flex-col gap-2 w-full">
                  <div className="px-2">
                     <p className="text-lg font-semibold line-clamp-2 pb-2">{post.title}</p>
                     <span className="italic text-sm border border-teal-500 rounded-lg px-2 py-1 inline-block max-w-max">
                        {post.category}
                     </span>
                  </div>
                  <div className="flex justify-between flex-column-440 px-2">
                     <span>{post && formatDate(post.createdAt)}</span>
                     <div className="flex gap-4 items-center padding-top-440">
                        <div className="flex items-center gap-1">
                           <FaRegClock size={16} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">
                              {post && (post.content.length / 1000).toFixed(0)} {t("posts:mins_read")}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           <FaRegEye size={16} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">{views}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </div>
   );
}

RecentPostCard.propTypes = {
   post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      views: PropTypes.number,
   }).isRequired,
};
