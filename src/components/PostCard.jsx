import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

export default function PostCard({ post }) {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[90%] transition-all shadow-md">
         <Link to={`${languagePrefix}/post/${post.slug}`}>
            <img src={post.image} alt="post cover" className="h-[60%] w-full object-cover group-hover:h-[50%] transition-all duration-300 z-20" />
         </Link>
         <div className="p-3 flex flex-col gap-2">
            <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
            <span className="italic text-sm">{post.category}</span>
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
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
   }).isRequired,
};
