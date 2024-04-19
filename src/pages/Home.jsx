import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";
import ScrollToTopButton from '../components/button/ScrollToTopButton';
import CookieConsentNotification from "../notifications/CookieConsentNotification";
import { BiLogoFigma } from "react-icons/bi";

export default function Home() {
   const [posts, setPosts] = useState([]);
   const [showScroll, setShowScroll] = useState(false);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   useEffect(() => {
      const fetchPosts = async () => {
         const res = await fetch(`${SERVER_URL}/api/post/getPosts`);
         const data = await res.json();
         setPosts(data.posts);
      };
      fetchPosts();
   }, []);

   const slides = [
      {
         url: ""
      }
   ];

   return (
      <div>
         <div className="relative">
            <img src="https://i.ibb.co/D83Qdg7/home.jpg" alt="welcome" className="w-full max-h-[450px] h-auto" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white">
               <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
               <p className="text-xs sm:text-sm mt-5">Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.</p>
               <Link
                  to="/search"
                  className="text-xs sm:text-sm mt-5 text-teal-500 font-bold hover:underline"
               >
                  View all posts
               </Link>
            </div>
         </div>
         <div className="p-3 mt-20 bg-amber-100 dark:bg-slate-700">
            <CallToAction />
         </div>
         <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
            {posts && posts.length > 0 && (
               <div className="flex flex-col gap-6 item-center">
                  <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                     {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                     ))}
                  </div>
                  <Link
                     to={'/search'}
                     className="text-lg text-teal-500 hover:underline text-center"
                  >
                     View all posts
                  </Link>
               </div>
            )}
         </div>
         <div className="ml-20 mb-20 flex gap-4 sm:mt-0 mt-4">
            <p className="flex justify-center">Subscribe to Input Studios news</p>
            <Footer.Icon href="https://vk.com/inputstudios" icon={SlSocialVkontakte} />
            <Footer.Icon href="https://www.youtube.com/@input.studios" icon={BsYoutube} />
            <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" icon={BiLogoFigma} />
            <Footer.Icon href="https://github.com/inputstudios" icon={BsGithub} />
            <Footer.Icon href="https://dribbble.com/inputstudios" icon={BsDribbble} />
         </div>
         <CookieConsentNotification />
         <ScrollToTopButton />
      </div>
   );
}
