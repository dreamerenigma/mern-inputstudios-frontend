import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaMessage } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";

export default function NewsCard({ post, isLast }) {
   const [views, setViews] = useState(0);
   const { postSlug } = useParams();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const incrementViews = async (postId) => {
         if (!postId) return;
   
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/post/${postId}/incrementViews`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
               },
            });
   
            if (res.ok) {
               const data = await res.json();
               setViews(data.views);
            } else {
               console.error('Error incrementing views:', res.status);
            }
         } catch (error) {
            console.error("Failed to increment views:", error.message);
         }
      };
   
      if (post && post._id) {
         incrementViews(post._id);
      }
   }, [post, SERVER_URL]);

   return (
      <div className="group relative w-full h-auto overflow-hidden transition-all">
         <div className="flex flex-col gap-2">
            <span>{post && formatDate(post.createdAt)}</span>
            <Link to={`${languagePrefix}/post/${post.slug}`}>
               <p className="text-base font-semibold line-clamp-2">{post.title}</p>
            </Link>
            <div>
               <div className="mb-2 flex gap-6">
                  <div className="flex items-center gap-2 text-teal-500">
                     <FaRegEye size={16} />
                     <span>{views}</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-500">
                     <Link to={`${languagePrefix}/post/${postSlug}/comments`} className="flex items-center gap-2 text-teal-500">
                        <FaMessage size={16} />
                        <span>{post?.commentsCount || 2}</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         {!isLast && <hr className="mt-2 border-t border-gray-300 dark:border-gray-600" />}
      </div>
   );
}

NewsCard.propTypes = {
   post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      commentsCount: PropTypes.number, 
   }).isRequired,
   isLast: PropTypes.bool,
};

NewsCard.defaultProps = {
   isLast: false,
};
