import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table} from "flowbite-react";
import { useTranslation } from "react-i18next";
import DeletePostModal from "./modals/DeletePostModal";

export default function DashPosts() {
   const { t } = useTranslation();
   const { currentUser } = useSelector((state) => state.user);
   const [userPosts, setUserPosts] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [postIdToDelete, setPostIdToDelete] = useState("");
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const token = localStorage.getItem('token');
            const userIdQuery = currentUser.isAdmin ? '' : `userId=${currentUser._id}`;
            const res = await fetch(`${SERVER_URL}/api/post/getposts?${userIdQuery}&limit=9`, {
               headers: {
                  "Authorization": `Bearer ${token}`
               }
            });
            const data = await res.json();
            if (res.ok) {
               setUserPosts(data.posts);
               if (data.posts.length < 9) {
                  setShowMore(false);
               }
            } else {
               console.error(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };

      fetchPosts();
   }, [SERVER_URL, currentUser._id, currentUser.isAdmin]);

   const handleShowMore = async () => {
      const startIndex = userPosts.length;
      try {
         const token = localStorage.getItem('token');
         const userIdQuery = currentUser.isAdmin ? '' : `userId=${currentUser._id}`;
         const res = await fetch(`${SERVER_URL}/api/post/getposts?userId=${userIdQuery}&startIndex=${startIndex}&limit=9`, {
            headers: {
               "Authorization": `Bearer ${token}`
            }
         });
         const data = await res.json();
         if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if (data.posts.length < 9) {
               setShowMore(false);
            }
         } else {
            console.error(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleDeletePost = async () => {
      setShowModal(false);
      try {
         const token = localStorage.getItem('token');
         const res = await fetch(`${SERVER_URL}/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
            method: "DELETE",
            headers: {
               "Authorization": `Bearer ${token}`
            }
         });
         const data = await res.json();
         if (!res.ok) {
            console.error(data.message);
         } else {
            setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div
         className={`table-auto md:mx-auto pt-3 px-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ${
            !showMore ? 'mb-2' : ''
         }`}
      >
         {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
               <div className="overflow-hidden border border-gray-700 rounded-lg">
                  <Table hoverable className="shadow-md">
                     <Table.Head>
                        <Table.HeadCell>{t("post_id")}</Table.HeadCell>
                        <Table.HeadCell>{t("date_updated")}</Table.HeadCell>
                        <Table.HeadCell>{t("post_image")}</Table.HeadCell>
                        <Table.HeadCell>{t("post_title")}</Table.HeadCell>
                        <Table.HeadCell>{t("post_category")}</Table.HeadCell>
                        <Table.HeadCell>{t("delete")}</Table.HeadCell>
                        <Table.HeadCell>
                           <span>{t("edit")}</span>
                        </Table.HeadCell>
                     </Table.Head>
                     {userPosts.map((post) => (
                        <Table.Body className="divide-y" key={post._id}>
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/80">
                              <Table.Cell>{post._id}</Table.Cell>
                              <Table.Cell>
                                 {new Date(post.updatedAt).toLocaleDateString()}
                              </Table.Cell>
                              <Table.Cell>
                                 <Link to={`${languagePrefix}/post/${post.slug}`}>
                                    <img
                                       src={post.image}
                                       alt={post.title}
                                       className="w-20 h-10 object-cover bg-gray-500 rounded-md"
                                    />
                                 </Link>
                              </Table.Cell>
                              <Table.Cell>
                                 <Link className="font-medium text-gray-900 dark:text-white" to={`${languagePrefix}/post/${post.slug}`}>
                                    {post.title}
                                 </Link>
                              </Table.Cell>
                              <Table.Cell>{post.category}</Table.Cell>
                              <Table.Cell>
                                 <span
                                    onClick={() => {
                                       setShowModal(true);
                                       setPostIdToDelete(post._id);
                                    }}
                                    className="font-medium text-red-500 hover:underline cursor-pointer"
                                 >
                                    {t("delete")}
                                 </span>
                              </Table.Cell>
                              <Table.Cell>
                                 <Link
                                    className="text-teal-500 hover:underline"
                                    to={`${languagePrefix}/update-post/${post._id}`}
                                 >
                                    <span>{t("edit")}</span>
                                 </Link>
                              </Table.Cell>
                           </Table.Row>
                        </Table.Body>
                     ))}
                  </Table>
               </div>
               {showMore && (
                  <div className="flex justify-center my-6">
                     <button
                        onClick={handleShowMore}
                        className="text-teal-500 text-sm py-2 px-4 border border-teal-500 rounded hover:bg-teal-100 dark:hover:bg-teal-800"
                     >
                        {t("show_more")}
                     </button>
                  </div>
               )}
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-screen">
               <img 
                  src="/images/profile/no_posts.png"
                  alt={t("no_comments")}
                  className="mb-4 w-56 h-52"
               />
               <p>{t("you_have_no_posts")}</p>
            </div>
         )}
         {showModal && (
            <DeletePostModal 
               setShowModal={setShowModal}
               handleDeletePost={handleDeletePost}
            />
         )}
      </div>
   );
}
