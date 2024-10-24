import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function DashPosts() {
   const { t } = useTranslation();
   const { currentUser } = useSelector((state) => state.user);
   const [userPosts, setUserPosts] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [postIdToDelete, setPostIdToDelete] = useState("");
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${SERVER_URL}/api/post/getposts?userId=${currentUser._id}`, {
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
      if (currentUser.isAdmin) {
         fetchPosts();
      }
   }, [SERVER_URL, currentUser._id, currentUser.isAdmin]);

   const handleShowMore = async () => {
      const startIndex = userPosts.length;
      try {
         const token = localStorage.getItem('token');
         const res = await fetch(`${SERVER_URL}/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`, {
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
      <div className="table-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
         {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
               <Table hoverable className="shadow-md">
                  <Table.Head>
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
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell>
                              {new Date(post.updatedAt).toLocaleDateString()}
                           </Table.Cell>
                           <Table.Cell>
                              <Link to={`/post/${post.slug}`}>
                                 <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-20 h-10 object-cover bg-gray-500"
                                 />
                              </Link>
                           </Table.Cell>
                           <Table.Cell>
                              <Link
                                 className="font-medium text-gray-900 dark:text-white"
                                 to={`/post/${post.slug}`}
                              >
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
                                 to={`/update-post/${post._id}`}
                              >
                                 <span>{t("edit")}</span>
                              </Link>
                           </Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))}
               </Table>
               {showMore && (
                  <button
                     onClick={handleShowMore}
                     className="w-full text-teal-500 self-center text-sm py-7"
                  >
                     {t("show_more")}
                  </button>
               )}
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-screen">
               <img 
                  src="/images/profile/no_users.png"
                  alt={t("no_comments")}
                  className="mb-4 w-56 h-52"
               />
               <p>{t("you_have_no_posts")}</p>
            </div>
         )}
         <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
         >
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-fray-400">
                     {t("sure_you_delete_post")}
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" onClick={handleDeletePost}>
                        {t("yes_sure")}
                     </Button>
                     <Button color="gray" onClick={() => setShowModal(false)}>
                        {t("no_cancel")}
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
}
