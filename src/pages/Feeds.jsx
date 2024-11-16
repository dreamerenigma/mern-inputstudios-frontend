import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoPlayer from '../components/VideoPlayer';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaRegClock, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaRegEye, FaMessage } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { IoIosShareAlt } from "react-icons/io";
import NewsCard from "../components/NewsCard";
import { formatDate } from "../utils/dateUtils";

export default function Feeds() {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const { feedSlug } = useParams();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [post, setPost] = useState(null);
   const [recentPosts, setRecentPosts] = useState(null);
   const [views, setViews] = useState(0);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const fetchPost = async () => {
         if (!feedSlug) return;

         try {
            setLoading(true);
            const res = await fetch(`${SERVER_URL}/api/feed/getfeeds/?slug=${feedSlug}`);
            const data = await res.json();

            console.log(data);

            if (!res.ok) {
               setError(true);
               setLoading(false);
               return;
            }

            if (data.posts && data.posts.length > 0) {
               setPost(data.posts[0]);
               setViews(data.posts[0].views || 0);
            }
            setLoading(false);
            setError(false);
         } catch (error) {
            setError(true);
            setLoading(false);
         }
      };

      fetchPost();
   }, [feedSlug, SERVER_URL]);

   useEffect(() => {
      try {
         const fetchRecentPosts = async () => {
            const res = await fetch(`${SERVER_URL}/api/feed/getfeeds?limit=10`);
            const data = await res.json();
            if (res.ok) {
               setRecentPosts(data.posts);
            }
         };
         fetchRecentPosts();
      } catch (error) {
         console.log(error.message);
      }
   }, [SERVER_URL])

   useEffect(() => {
      const incrementViews = async () => {
         if (post && post._id) {
            const token = localStorage.getItem('token');
            console.log("Token being sent:", token);
            console.log("Post ID being sent:", post._id);

            try {
               const response = await fetch(`${SERVER_URL}/api/posts/${post._id}/incrementViews`, {
                  method: "PUT",
                  headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                  },
               });
               if (response.ok) {
                  const data = await response.json();
                  setViews(data.views);
               } else {
                  console.error('Error incrementing views:', response.status);
               }
            } catch (error) {
               console.error("Failed to increment views:", error.message);
            }
         }
      };
      if (post) {
         incrementViews();
      }
   }, [post, SERVER_URL]);

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500">{t("posts:error_occurred_post")}</p>
         </div>
      );
   }

   return (
      <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen mt-[60px]">
         <Helmet>
            <title>{post?.title || "Новости IT - Главные новости технологий"}</title>
         </Helmet>
         <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto">
            <div className="mb-3 border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg lg:w-3/4 overflow-hidden">
               <div className="p-4">
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
                  <h1 className="text-xl mt-2 font-semibold lg:text-2xl">
                     {post && post.title}
                  </h1>
                  <Link to={`${languagePrefix}/search?category=${post && post.category}`} className="self-center mt-5">
                     <Button color="gray" pill size="xs" className="mt-6">
                        {post && post.category}
                     </Button>
                  </Link>
                  <VideoPlayer
                     url={post && post.video}
                     previewImage={post && post.image}
                     alt={post && post.title}
                     className="mt-10 p-3 max-h-[300px] w-full object-cover"
                  />
                  <img
                     src={post && post.image}
                     alt={post && post.title}
                     className="mt-4 py-3 w-full h-auto object-contain"
                  />
                  <div className="flex justify-between py-2 border-b border-slate-500 text-md">
                     <span>{post && formatDate(post.createdAt)}</span>
                     <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-1">
                           <FaRegClock size={18} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">
                              {post && (post.content.length / 1000).toFixed(0)} {t("posts:mins_read")}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           <FaRegEye size={18} className="text-gray-400" />
                           <span className="text-gray-400 pl-1">{views}</span>
                        </div>
                     </div>
                  </div>
                  <div
                     className="py-3 post-content break-words text-left"
                     dangerouslySetInnerHTML={{ __html: post && post.content }}>
                  </div>
                  <div>
                     <button className="px-4 py-1 my-4 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-800">
                        Источник
                     </button>
                  </div>
                  <div>
                     <p>Теги:</p>
                  </div>
               </div>
               <div className="mb-3">
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex gap-6 mt-4 px-5">
                     <div className="flex items-center gap-2 text-teal-500">
                        <FaThumbsUp size={16} />
                        <span>1</span>
                     </div>
                     <div className="flex items-center gap-2 text-teal-500">
                        <FaThumbsDown size={16} />
                        <span>0</span>
                     </div>
                     <div className="flex items-center gap-2 text-teal-500">
                        <IoIosShareAlt size={24} />
                        <span>2</span>
                     </div>
                     <div className="flex items-center gap-2 text-teal-500">
                        <FaMessage size={16} />
                        <span>1</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="border border-gray-700 p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg lg:w-1/4 overflow-hidden">
               <p>НОВОСТИ</p>
               <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />
               {recentPosts && 
                  recentPosts.slice(0, 7).map((post) => (
                     <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[330px] mt-5">
                        <NewsCard post={post} />
                     </div>
                  ))
               }
            </div>
         </div>
      </main>
   );
}
