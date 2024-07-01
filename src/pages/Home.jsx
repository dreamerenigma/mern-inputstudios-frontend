import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button, Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";
import ScrollToTopButton from '../components/button/ScrollToTopButton';
import CookieConsentNotification from "../notifications/CookieConsentNotification";
import { BiLogoFigma } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import DownloadCard from "../components/DownloadCard"

export default function Home() {
   const { t } = useTranslation();
   const [posts, setPosts] = useState([]);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      const fetchPosts = async () => {
         const res = await fetch(`${SERVER_URL}/api/post/getPosts`);
         const data = await res.json();
         setPosts(data.posts);
      };
      fetchPosts();
   }, []);

   useEffect(() => {
      const handleResize = () => {
      setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
      window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <div>
         <div className="relative">
            <Link to="/search" className="block w-full max-h-[450px] h-auto">
               <img src="https://i.ibb.co/D83Qdg7/home.jpg" alt="welcome" className="w-full max-h-[450px] h-auto" />
            </Link>
            {windowWidth >= 1080 ? (
               <Link to="/search">
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white">
                     <h1 className="text-3xl font-bold lg:text-6xl xs:text-4xl sm:text-5xl md:text-5xl xl:text-7xl">
                        {t("home_welcome")}
                     </h1>
                     <p className="text-xs sm:text-sm mt-5">
                        {t("home_welcome_description")}
                     </p>
                     <Button 
                        className="text-xs sm:text-sm mt-5 font-bold focus:outline-none"
                        >
                        {t("home_view_all_posts")}
                     </Button>
                  </div>
               </Link>
            ) : (
               <Link 
                  to="/search" 
                  className="w-full h-[250px] bg-white dark:bg-[rgb(16,23,42)] shadow-md dark:shadow-lg flex flex-col justify-center items-center text-center text-black dark:text-white no-underline welcome welcome-height" 
               >
                  <div>
                     <h1 className="text-3xl font-bold xs:text-4xl sm:text-5xl md:text-5xl welcome-padding">
                        {t("home_welcome")}
                     </h1>
                     <p className="text-xs sm:text-sm mt-5 mr-2 ml-2">
                        {t("home_welcome_description")}
                     </p>
                     <div className="flex justify-center mt-5">
                        <Button className="text-xs sm:text-sm font-bold focus:outline-none">
                           {t("home_view_all_posts")}
                        </Button>
                     </div>
                  </div>
               </Link>
            )}
         </div>
         <DownloadCard />
         <div className="p-3 mx-10 custom-margin mt-20 rounded-lg bg-gray-200 dark:bg-slate-700 shadow-md">
            <CallToAction />
         </div>
         <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
            {posts && posts.length > 0 && (
               <div className="flex flex-col gap-6 item-center">
                  <h2 className="text-2xl font-semibold text-center">{t("home_recent_posts")}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center items-center">
                     {posts.map((post) => (
                        <div key={post._id} className="flex justify-center">
                           <PostCard post={post} />
                        </div>
                     ))}
                  </div>
                  <Link
                     to={'/search'}
                     className="text-lg text-teal-500 hover:underline text-center"
                  >
                     {t("home_view_all_posts")}
                  </Link>
               </div>
            )}
            <div className="flex gap-4 sm:mt-5 mb-20">
               <p className="sm:ml-10">{t("home_subscribe_news")}</p>
               <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
               <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={BsYoutube} />
               <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={BiLogoFigma} />
               <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={BsGithub} />
               <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
            </div>
         </div>
         <CookieConsentNotification />
         <ScrollToTopButton />
      </div>
   );
}
