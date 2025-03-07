import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/dateUtils";
import { FaRegClock, FaRegEye } from "react-icons/fa";

export default function PostCard({ post }) {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] adaptive-height overflow-hidden rounded-lg transition-all shadow-md">
         <Link to={`${languagePrefix}/post/${post.slug}`}>
            <img 
               src={post.image || "https://i.ibb.co/09wbb3z/blog-post.png"} 
               alt="post cover" 
               className="h-[60%] w-full object-cover group-hover:h-[50%] transition-all duration-300 z-20" 
            />
         </Link>
         <div className="p-3 flex flex-col gap-2">
            <div className="px-2">
            <p className="text-lg font-semibold line-clamp-2 overflow-hidden text-ellipsis">{post.title}</p>
               <span className="italic text-sm border border-teal-500 rounded-lg mt-2 px-2 py-1 inline-block max-w-max">
                  {post.category}
               </span>
            </div>
            <div className="flex justify-between flex-column-440 flex-column-640 px-2">
               <span>{post && formatDate(post.createdAt)}</span>
               <div className="flex gap-3 items-center padding-top-440 padding-top-640">
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
            <Link to={`${languagePrefix}/post/${post.slug}`} className="z-10 group-hover:bottom-0 absolute bottom-[-50%] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md m-2">
               {t("posts:read_articles")}
            </Link>
         </div>
      </div>
   );
}

PostCard.propTypes = {
   post: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
   }).isRequired,
};
