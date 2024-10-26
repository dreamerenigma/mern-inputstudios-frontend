import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";

export default function Search() {
   const { t } = useTranslation();
   const [sidebarData, setSidebarData] = useState({ searchTerm: "", sort: "desc", category: "uncategorized" });
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get("searchTerm");
      const sortFromUrl = urlParams.get("sort");
      const categoryFromUrl = urlParams.get("category");
      if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
         setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl,
         });
      }

      const fetchPosts = async () => {
         setLoading(true);
         const searchQuery = urlParams.toString();
         const res = await fetch(`${SERVER_URL}/api/post/getposts?${searchQuery}`);
         if (!res.ok) {
            setLoading(false);
            return;
         }
         if (res.ok) {
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            if (data.posts.length === 9) {
               setShowMore(true);
            } else {
               setShowMore(false);
            }
         }
      };
      fetchPosts();
   }, [SERVER_URL, location.search, sidebarData]);

   const handleChange = (e) => {
      if (e.target.id === "searchTerm") {
         setSidebarData({ ...sidebarData, searchTerm: e.target.value });
      }
      if (e.target.id === "sort") {
         const order = e.target.value || "desc";
         setSidebarData({ ...sidebarData, sort: order });
      }
      if (e.target.id === "category") {
         const category = e.target.value || "uncategorized";
         setSidebarData({ ...sidebarData, category });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", sidebarData.searchTerm);
      urlParams.set("sort", sidebarData.sort);
      urlParams.set("category", sidebarData.category);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
   };

   const handleShowMore = async () => {
      const numberOfPosts = posts.length;
      const startIndex = numberOfPosts;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${SERVER_URL}/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
         return;
      }
      if (res.ok) {
         const data = await res.json();
         setPosts([...posts, ...data.posts]);
         if (data.posts.length === 9) {
            setShowMore(true);
         } else {
            setShowMore(false);
         }
      }
   };

   return (
      <div className="flex flex-col md:flex-row mt-[60px]">
         <div className="p-7 md:min-h-screen">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
               <div className="flex items-center gap-2">
                  <label className="whitespace-nowrap font-semibold">
                     {t("posts:search_term")}</label>
                  <TextInput
                     placeholder={t("posts:search")}
                     id='searchTerm'
                     type='text'
                     value={sidebarData.searchTerm}
                     onChange={handleChange}
                  />
               </div>
               <div className="flex items-center gap-2">
                  <label className="font-semibold">{t("posts:sort")}</label>
                  <Select
                     onChange={handleChange}
                     value={sidebarData.sort}
                     id="sort"
                  >
                     <option value="desc">{t("posts:latest")}</option>
                     <option value="desc">{t("posts:oldest")}</option>
                  </Select>
               </div>
               <div className="flex items-center gap-2">
                  <label className="font-semibold">{t("posts:category")}</label>
                  <Select
                     onChange={handleChange}
                     value={sidebarData.category}
                     id="category"
                  >
                     <option value="uncategorized">{t("posts:category")}</option>
                     <option value="android">Android</option>
                     <option value="reactjs">React.js</option>
                     <option value="nextjs">Next.js</option>
                     <option value="javascript">JavaScript</option>
                     <option value="python">Python</option>
                     <option value="cpp">C++</option>
                  </Select>
               </div>
               <Button type="submit" outline gradientDuoTone="purpleToPink">
                  {t("posts:apply_filters")}
               </Button>
            </form>
         </div>
         <div className="w-full">
            <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
               {t("posts:posts_results")}
            </h1>
            <div className="p-7 flex flex-wrap gap-4">
               {!loading && posts.length === 0 && (
                  <p className="text-xl text-gray-500">{t("posts:no_posts_found")}</p>
               )}
               {loading && <p className="text-xl text-gray-500">{t("posts:loading")}</p>}
               {!loading &&
                  posts &&
                  posts.map((post) => <PostCard key={post._id} post={post} />)}
               {showMore && (
                  <button
                     onClick={handleShowMore}
                     className="text-teal-500 text-lg hover:underline p-7 w-full"
                  >
                     {t("posts:show_more")}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}
