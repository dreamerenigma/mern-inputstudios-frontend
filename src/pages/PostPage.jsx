import { Button, Spinner, Footer, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import VideoPlayer from '../components/VideoPlayer';
import { useSelector } from "react-redux";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFigma, FaRegClock, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaRegEye, FaMessage } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { IoIosShareAlt } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import NewsCard from "../components/NewsCard";
import { formatDate } from "../utils/dateUtils";
import RecentPostCard from "../components/RecentPostCard";
import ReactDOM from 'react-dom';

export default function PostPage({ postId }) {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [user, setUser] = useState({});
   const { currentUser } = useSelector(state => state.user);
   const { postSlug } = useParams();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [post, setPost] = useState(null);
   const [recentPosts, setRecentPosts] = useState(null);
   const [views, setViews] = useState(0);
   const [visiblePosts, setVisiblePosts] = useState(8);
   const [shareCount, setShareCount] = useState(null);
   const [comments, setComments] = useState([]);
   const [showTooltip, setShowTooltip] = useState(false);
   const [tooltipText, setTooltipText] = useState('');
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const getUser = async () => {
         const userId = post?.userId;
         if (userId) {
            try {
               const res = await fetch(`${SERVER_URL}/api/user/${userId}`);
               const data = await res.json();
               if (res.ok) {
                  setUser(data);
               }
            } catch (error) {
               console.log(error.message);
            }
         }
      };
      getUser();
   }, [SERVER_URL, post]);

   useEffect(() => {
      const fetchPost = async () => {
         if (!postSlug) return;

         try {
            setLoading(true);
            const res = await fetch(`${SERVER_URL}/api/post/getposts/?slug=${postSlug}`);
            const data = await res.json();

            if (!res.ok) {
               setError(true);
               setLoading(false);
               return;
            }

            if (data.posts && data.posts.length > 0) {
               setPost(data.posts[0]);
               setViews(data.posts[0].views || 0);
               setShareCount(data.posts[0].shareCount || 0);
            }
            setLoading(false);
            setError(false);
         } catch (error) {
            setError(true);
            setLoading(false);
         }
      };
      fetchPost();
   }, [postSlug, SERVER_URL]);

   useEffect(() => {
      try {
         const fetchRecentPosts = async () => {
            const res = await fetch(`${SERVER_URL}/api/post/getposts`);
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

   const handleShowMore = () => {
      setVisiblePosts((prev) => Math.min(prev + 4, recentPosts.length));
   };

   const handleLike = async (postId) => {
      try {
         if (!currentUser) {
            navigate("/sign-in");
            return;
         }
   
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/post/likePost/${postId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
   
         if (res.ok) {
            const data = await res.json();
   
            setPost((prevPost) => ({
               ...prevPost,
               likes: data.likes,
               numberOfLikes: data.numberOfLikes,
            }));
         } else {
            const errorData = await res.json();
            console.error("Error liking post:", errorData.message);
         }
      } catch (error) {
         console.error("Error liking post:", error.message);
      }
   };

   const handleDislike = async (postId) => {
      try {
         if (!currentUser) {
            navigate("/sign-in");
            return;
         }
   
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/post/dislikePost/${postId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
   
         if (res.ok) {
            const data = await res.json();
   
            setPost((prevPost) => ({
               ...prevPost,
               likes: data.likes,
               numberOfLikes: data.numberOfLikes,
               dislikes: data.dislikes,
               numberOfDislikes: data.numberOfDislikes,
            }));
         } else {
            const errorData = await res.json();
            console.error("Error disliking post:", errorData.message);
         }
      } catch (error) {
         console.error("Error disliking post:", error.message);
      }
   };

   const handleBookmarks = async (postId) => {
      try {
         if (!currentUser) {
            return;
         }

         const token = localStorage.getItem('token');

         const res = await fetch(`${SERVER_URL}/api/post/bookmark/${postId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
      } catch (error) {
         console.error('Ошибка при попытке сделать закладку:', error);
      }
   };

   const handleShare = async (postId) => {
      try {
         if (navigator.share) {
            await navigator.share({
               title: 'Заголовок страницы',
               text: 'Описание для общего контента',
               url: window.location.href,
            });
   
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token);
   
            const response = await fetch(`${SERVER_URL}/api/post/${postId}/share`, {
               method: 'PUT',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
   
            if (response.ok) {
               const data = await response.json();
               setShareCount(data.shareCount);
               setShowTooltip(true);
               setTooltipText("Вы уже поделились этим постом");
               setTimeout(() => setShowTooltip(false), 5000);
            } else {
               const errorData = await response.json();
               alert(errorData.message);
               console.log('Публикация успешно опубликована:', errorData);
            }
         } else {
            alert('Ваш браузер не поддерживает функцию Share API.');
         }
      } catch (error) {
         console.error('Ошибка при попытке поделиться:', error);
      }
   };

   useEffect(() => {
      const getComments = async () => {
         try {
            const res = await fetch(`${SERVER_URL}/api/comment/getPostComments/${postId}`);
            
            if (res.ok) {
               const data = await res.json();
               console.log("Received comments data:", data);
               setComments(data || []); 
            } else {
               console.log("Failed to fetch comments:", res.status);
            }
         } catch (error) {
            console.log("Error fetching comments:", error.message);
         }
      };
   
      getComments();
   }, [SERVER_URL, postId]);
   
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

   if (!post) {
      return <div>Загрузка...</div>;
   }

   return (
      <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen mt-[60px]">
         <Helmet>
            <title>{post?.title || "Новости IT - Главные новости технологий"}</title>
         </Helmet>
         <div className="flex gap-4 justify-center">
            {/* Левая колонка */}
            <div className="w-[1200px] flex flex-col max-w-[780px] responsive-container">
               <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 shadow-md">
                  <div className="p-4">
                     {currentUser ? (
                        <Link
                           to={`${languagePrefix}/user/${user.username}`}
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
                     <h1 className="text-xl mt-2 font-semibold lg:text-2xl">
                        {post && post.title}
                     </h1>
                     <Link to={`${languagePrefix}/search?category=${post && post.category || "uncategorized"}`} className="self-center mt-5">
                        <Button color="gray" pill size="xs" className="mt-6">
                           {post && post.category ? post.category : t("posts:uncategorized")}
                        </Button>
                     </Link>
                     <>
                        {post?.video && (
                           <VideoPlayer
                              url={post.video}
                              previewImage={post.image}
                              alt={post.title}
                              className="mt-10 p-3 max-h-[300px] w-full object-cover"
                           />
                        )}
                        {post?.image && (!post.video || post.video) && (
                           <img
                              src={post.image}
                              alt={post.title}
                              className="mt-4 py-3 w-full h-auto object-contain"
                           />
                        )}
                     </>
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
                        <p>Теги:</p>
                     </div>
                  </div>
                  <div className="mb-3">
                     <hr className="border-t border-gray-300 dark:border-gray-600" />
                     <div className="flex gap-6 mt-4 px-5">
                        <div className="flex items-center gap-2 text-teal-500">
                           <button
                              type="button"
                              onClick={() => handleLike(post?._id)}
                              className={`text-gray-400 hover:text-blue-500 ${
                                 currentUser && post?.likes?.includes(currentUser._id) ? "!text-teal-500" : "text-gray-500"
                              }`}
                           >
                              <FaThumbsUp
                                 className={`text-lg ${
                                    currentUser && post?.likes?.includes(currentUser._id) ? "text-teal-500" : "text-gray-500"
                                 } hover:text-teal-500`}
                              />
                           </button>
                           <p className="text-gray-400">
                              {post.numberOfLikes > 0 &&
                                 post.numberOfLikes +
                                    " " +
                                    (post.numberOfLikes === 1 ? t("post:like") : t("post:likes")
                                 )
                              }
                           </p>
                        </div>
                        <div className="flex items-center gap-2 ml-1 text-teal-500">
                           <button
                              type="button"
                              onClick={() => handleDislike(post?._id)}
                              className={`text-gray-400 hover:text-blue-500 ${
                                 currentUser && post?.dislikes?.includes(currentUser._id) ? "!text-teal-500" : "text-gray-500"
                              }`}
                           >
                              <FaThumbsDown
                                 className={`text-lg ${
                                    currentUser && post?.dislikes?.includes(currentUser._id) ? "text-teal-500" : "text-gray-500"
                                 } hover:text-teal-500`}
                              />
                           </button>
                           <p className="text-gray-400">
                              {post.numberOfDislikes > 0 &&
                                 post.numberOfDislikes +
                                    " " +
                                    (post.numberOfDislikes === 1 ? t("post:dislike") : t("post:dislikes")
                                 )
                              }
                           </p>
                        </div>
                        <div className="flex items-center gap-2 ml-1 text-teal-500">
                           <button
                              type="button"
                              onClick={() => handleBookmarks()}
                              className=""
                           >
                              <FaBookmark />
                           </button>
                        </div>
                        <div className={`flex items-center gap-2 ${shareCount > 0 ? 'text-teal-500' : 'text-gray-500'}`} onClick={() => handleShare(post._id)}>
                           <button>
                              <IoIosShareAlt size={26} className="hover:text-teal-500"/>
                           </button>
                           {shareCount > 0 && <span>{shareCount}</span>}
                           {showTooltip && ReactDOM.createPortal(<Tooltip showTooltip={showTooltip} text={tooltipText} />, document.body)}
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                           <Link 
                              to={`${languagePrefix}/post/${postSlug}/comments`} 
                              className={`flex items-center gap-2 ${
                                 comments && comments.length > 0 ? "text-teal-500" : "text-gray-500"
                              }`}
                           >
                              <FaMessage size={16} className="hover:text-teal-500"/>
                              {comments ? comments.length : 0}
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Нижний контент */}
               <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto">
                  <div className="flex-1">
                     <div className="max-w-5xl mx-auto w-full ">
                        <CallToAction />
                     </div>
                     <CommentSection postId={post._id} />
                  </div>
               </div>
               <div className="flex flex-col lg:flex-row gap-4 mx-auto mt-3 responsive-container">
                  <div className="mb-3 border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden pb-5">
                     <h1 className="text-xl mt-2 text-left px-6">{t("posts:recent_articles")}</h1>
                     <div className="flex flex-wrap justify-center px-6">
                        {recentPosts &&
                           recentPosts.slice(0, visiblePosts).map((post) => (
                           <div key={post._id} className="w-full mt-4">
                              <RecentPostCard post={post} />
                           </div>
                        ))}
                     </div>
                     {recentPosts && visiblePosts < recentPosts.length && (
                        <div className="flex justify-center mt-4">
                           <Button outline gradientDuoTone="purpleToBlue" type="submit" onClick={handleShowMore}>
                              {t("posts:show_more")}
                           </Button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            {/* Правая колонка */}
            <div className="custom-hide flex flex-col">
               <div className="border border-gray-700 p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p>{t("posts:news")}</p>
                  <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />
                  {recentPosts && 
                     recentPosts.slice(0, 10).map((post, index, arr) => (
                        <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[280px] mt-5">
                           <NewsCard post={post} isLast={index === arr.length - 1} />
                        </div>
                     ))
                  }
               </div>
               <div className="w-full mt-8 lg:mt-0">
                  <div className="border border-gray-700 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg h-full">
                     <p className="font-semibold text-lg">{t("posts:other_news")}</p>
                     <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                     {recentPosts && 
                        recentPosts.slice(0, 3).map((post, index, arr) => (
                           <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[280px] mt-5">
                              <NewsCard post={post} isLast={index === arr.length - 1} />
                           </div>
                        ))
                     }
                  </div>
               </div>
               <div className="border border-gray-700 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-3">
                  <p>{t("posts:events")}</p>
                  <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />
                  {recentPosts && 
                     recentPosts.slice(0, 3).map((post, index, arr) => (
                        <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[280px] mt-5">
                           <NewsCard post={post} isLast={index === arr.length - 1} />
                        </div>
                     ))
                  }
               </div>
               <div className="border border-gray-700 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-3">
                  <p>{t("posts:additional_block")}</p>
                  <hr className="my-3 border-t border-gray-300 dark:border-gray-600" />
                  {recentPosts && 
                     recentPosts.slice(0, 3).map((post, index, arr) => (
                        <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[280px] mt-5">
                           <NewsCard post={post} isLast={index === arr.length - 1} />
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 mt-10 mb-10 mx-4">
            <p>{t("home_subscribe_news")}</p>
            <div className="flex flex-wrap gap-4">
               <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
               <Footer.Icon href="https://discord.com/inputstudios" target="_blank" icon={RxDiscordLogo} />
               <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={AiOutlineYoutube} />
               <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={FaFigma} />
               <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={FiGithub} />
               <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
            </div>
         </div>
      </div>
   );
}
