import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";

export default function DashComments() {
   const { t } = useTranslation();
   const { currentUser } = useSelector((state) => state.user);
   const [comments, setComments] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [commentIdToDelete, setCommentIdToDelete] = useState("");
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/comment/getcomments`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            const data = await res.json();
            if (res.ok) {
               setComments(data.comments);
               if (data.comments.length < 9) {
                  setShowMore(false);
               }
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      if (currentUser.isAdmin) {
         fetchComments();
      }
   }, [SERVER_URL, currentUser._id, currentUser.isAdmin]);   

   const handleShowMore = async () => {
      const startIndex = comments.length;
      try {
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/comment/getcomments?startIndex=${startIndex}`, {
            method: 'GET',
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
         const data = await res.json();
         if (res.ok) {
            setComments((prev) => [...prev, ...data.comments]);
            if (data.comments.length < 9) {
               setShowMore(false);
            }
         } else {
            console.log(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleDeleteComment = async () => {
      setShowModal(false);
      try {
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/comment/deleteComment/${commentIdToDelete}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
   
         const data = await res.json();
         if (res.ok) {
            setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
            setShowModal(false);
         } else {
            console.log(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div className="table-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 overflow-x-auto">
         {currentUser.isAdmin && comments.length > 0 ? (
            <>
               <Table hoverable className="shadow-md">
                  <Table.Head>
                     <Table.HeadCell>{t("comment_id")}</Table.HeadCell>
                     <Table.HeadCell>{t("date_updated")}</Table.HeadCell>
                     <Table.HeadCell>{t("comment_content")}</Table.HeadCell>
                     <Table.HeadCell>{t("number_of_likes")}</Table.HeadCell>
                     <Table.HeadCell>{t("user_id")}</Table.HeadCell>
                     <Table.HeadCell>{t("delete")}</Table.HeadCell>
                  </Table.Head>
                  {comments.map((comment) => (
                     <Table.Body className="divide-y" key={comment._id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell>{comment.postId}</Table.Cell>
                           <Table.Cell>
                              {new Date(comment.updatedAt).toLocaleDateString()}
                           </Table.Cell>
                           <Table.Cell>{comment.content}</Table.Cell>
                           <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                           <Table.Cell>{comment.userId}</Table.Cell>
                           <Table.Cell>
                              <span
                                 onClick={() => {
                                    setShowModal(true);
                                    setCommentIdToDelete(comment._id);
                                 }}
                                 className="font-medium text-red-500 hover:underline cursor-pointer"
                              >
                                 {t("delete")}
                              </span>
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
                  src="/images/profile/no_data.png"
                  alt="No comments"
                  className="mb-4 w-56 h-52"
               />
               <p>{t("you_have_no_comments")}</p>
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
                     {t("sure_you_delete_comment")}
                  </h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" onClick={handleDeleteComment}>
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
