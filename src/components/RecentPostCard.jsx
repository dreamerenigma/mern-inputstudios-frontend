import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/dateUtils";
import { FaRegClock, FaRegEye } from "react-icons/fa";

export default function RecentPostCard({ post }) {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="group relative w-full border border-teal-500 overflow-hidden rounded-lg sm:w-[90%] transition-all shadow-md">
         <div className="px-4 pt-4">
            {currentUser ? (
               <Link
                  to={`${languagePrefix}/dashboard?tab=profile`}
                  className="flex items-center gap-2 text-gray-500 text-sm max-w-max"
               >
                  <img
                     className="h-8 w-8 object-cover rounded-full"
                     src={currentUser.profilePicture}
                     alt="Profile picture"
                  />
                  <span className="text-sm text-teal-500 hover:underline">@{currentUser.username}</span>
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
            <Link to={`${languagePrefix}/post/${post.slug}`} className="flex">
               <img
                  src={post.image}
                  alt="post cover"
                  className="h-[150px] w-[200px] object-cover rounded-lg duration-300 z-20"
               />
               <div className="p-3 flex flex-col gap-2 w-full">
                  <div className="px-2">
                     <p className="text-lg font-semibold line-clamp-2 pb-2">{post.title}</p>
                     <span className="italic text-sm border border-teal-500 rounded-lg px-2 py-1 inline-block max-w-max">
                        {post.category}
                     </span>
                  </div>
                  <div className="px-2 flex justify-between items-center">
                     <span>{post && formatDate(post.createdAt)}</span>
                     <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-1">
                           <FaRegClock size={16} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">
                           {post && (post.content.length / 1000).toFixed(0)} {t("posts:mins_read")}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           <FaRegEye size={16} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">{post.views}</span>
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
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
   }).isRequired,
};
