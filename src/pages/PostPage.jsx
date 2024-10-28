import { Button, Spinner, Footer } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import VideoPlayer from '../components/VideoPlayer';
import { useSelector } from "react-redux";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";
import { BiLogoFigma } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFigma } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

export default function PostPage() {
   const { t } = useTranslation();
   const { postSlug } = useParams();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [post, setPost] = useState(null);
   const [recentPosts, setRecentPosts] = useState(null);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const fetchPost = async () => {
         try {
            setLoading(true);
            const res = await fetch(`${SERVER_URL}/api/post/getposts/?slug=${postSlug}`);
            const data = await res.json();
            if (!res.ok) {
               setError(true);
               setLoading(false);
               return;
            }
            if (res.ok) {
               setPost(data.posts[0]);
               setLoading(false);
               setError(false);
            }
         } catch (error) {
            setError(true);
            setLoading(false);
         }
      };
      fetchPost();
   }, [SERVER_URL, postSlug]);

   useEffect(() => {
      try {
         const fetchRecentPosts = async () => {
            const res = await fetch(`${SERVER_URL}/api/post/getposts?limit=3`);
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
      <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen">
         <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
         </h1>
         <Link to={`${languagePrefix}/search?category=${post && post.category}`} className="self-center mt-5">
            <Button color="gray" pill size="xs">
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
            className="mt-10 p-3 max-h-[300px] w-full object-cover"
         ></img>
         <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">{post && (post.content.length / 1000).toFixed(0)}{t("posts:mins_reed")}</span>
         </div>
         <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
         ></div>
         <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
         </div>
         <CommentSection postId={post._id} />
         <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-12">{t("posts:recent_articles")}</h1>
            <div className="flex flex-wrap mt-12 justify-center">
               {recentPosts && 
                  recentPosts.map((post) => (
                     <div key={post._id} className="max-w-[300px] w-full md:max-w-[400px] lg:max-w-[330px]">
                        <PostCard post={post} />
                     </div>
                  ))
               }
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
      </main>
   );
}
