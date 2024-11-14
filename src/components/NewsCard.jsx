import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaMessage } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

export default function NewsCard({ post }) {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const formatDate = (date) => {
      const formattedDate = new Intl.DateTimeFormat(currentLanguage, {
         day: '2-digit',
         month: 'short',
         hour: '2-digit',
         minute: '2-digit',
      }).format(new Date(date));
      const dateParts = formattedDate.split(', ');
      const dateWithoutDot = dateParts[0].replace(/(\w{3})\./, '$1');
      const cleanDate = dateWithoutDot.replace(/(\s[а-я]{3})\./, '$1');
      const time = dateParts[1];
      return `${cleanDate} в ${time}`;
   };

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
                     <span>27</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-500">
                     <FaMessage size={14} />
                     <span>1</span>
                  </div>
               </div>
            </div>
         </div>
         <hr className="mt-2 border-t border-gray-300 dark:border-gray-600" />
      </div>
   );
}

NewsCard.propTypes = {
   post: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
   }).isRequired,
};
