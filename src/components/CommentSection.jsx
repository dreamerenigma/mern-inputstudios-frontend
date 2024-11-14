import { Alert, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from './Comment';
import PropTypes from 'prop-types';
import DeleteCommentDialog from './dialogs/DeleteCommentDialog';
import { useTranslation } from "react-i18next";
import { IoIosMail } from "react-icons/io";
import { FaRss } from "react-icons/fa";
import ReactDOM from 'react-dom';
import PostTooltip from "./tooltips/PostTooltip";

export default function CommentSection({ postId }) {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const [comment, setComment] = useState("");
   const [commentError, setCommentError] = useState(null);
   const [comments, setComments] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [commentToDelete, setCommentToDelete] = useState(null);
   const navigate = useNavigate();
   const [showTooltip, setShowTooltip] = useState(false);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 200) {
         return;
      }
      
      const token = localStorage.getItem('token');
      console.log("Token being sent:", token);
      
      try {
         const res = await fetch(`${SERVER_URL}/api/comment/create`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               content: comment,
               postId,
               userId: currentUser._id
            }),
         });
   
         let data;
         try {
            data = await res.json();
         } catch (jsonError) {
            data = await res.text();
            throw new Error(data);
         }
   
         if (res.ok) {
            setComment("");
            setCommentError(null);
            setComments([data, ...comments]);
         } else {
            console.error("Error response:", data);
            throw new Error(data.message || 'An error occurred');
         }
      } catch (error) {
         console.error("Fetch error:", error.message);
         setCommentError(error.message);
      }
   };

   useEffect(() => {
      const getComments = async () => {
         try {
            const res = await fetch(`${SERVER_URL}/api/comment/getPostComments/${postId}`);
            if (res.ok) {
               const data = await res.json();
               setComments(data);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
      getComments();
   }, [SERVER_URL, postId]);

   const handleLike = async (commentId) => {
      try {
         if (!currentUser) {
            navigate("/sign-in");
            return;
         }
   
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/comment/likeComment/${commentId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
   
         if (res.ok) {
            const data = await res.json();
            setComments(
               comments.map((comment) =>
                  comment._id === commentId
                     ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                     }
                     : comment
               )
            );
         } else {
            const errorData = await res.json();
            console.log(errorData.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleEdit = async (comment, editedContent) => {
      setComments(
         comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
         )
      );
   };

   const handleDelete = async (commentId) => {
      setShowModal(false);
      try {
         if (!currentUser) {
            navigate("/sign-in");
            return;
         }
         const token = localStorage.getItem('token');
         const res = await fetch(`${SERVER_URL}/api/comment/deleteComment/${commentId}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
         });
   
         if (res.ok) {
            setComments(comments.filter((comment) => comment._id !== commentId));
         } else {
            console.log(`Failed to delete comment: ${res.statusText}`);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleCopy = () => {
      navigator.clipboard.writeText("Ссылка скопирована в буфер обмена");
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 8000);
   };

   return (
      <div className="max-w-4xl mx-auto w-full pt-3">
         <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3">
            {currentUser ? (
               <div className="relative flex items-center justify-between my-1 text-gray-500 text-sm">
                  <div className="flex flex-col gap-1 text-left">
                     <Link
                        to={`${languagePrefix}/dashboard?tab=profile`}
                        className="cursor-pointer"
                     >
                        <img
                           className="h-10 w-10 object-cover rounded-full"
                           src={currentUser.profilePicture}
                           alt="Profile picture"
                        />
                     </Link>
                     <Link
                        to={`${languagePrefix}/dashboard?tab=profile`}
                        className="text-base text-cyan-600 hover:underline"
                     >
                        @{currentUser.username}
                     </Link>
                     <p className="text-base text-gray-400">
                        {currentUser.isAdmin ? "Админ" : "Пользователь"}
                     </p>
                  </div>
                  <div className="absolute top-0 right-0 flex items-center gap-2">
                     <button
                        className="rounded-lg bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:via-green-700 hover:to-teal-700 transition-colors duration-300 p-2"
                     >
                        <IoIosMail size={24} className="text-white" />
                     </button>
                     <Button outline gradientDuoTone="purpleToBlue" type="submit">
                        Подписаться
                     </Button>
                  </div>
               </div>
            ) : (
               <div className="text-sm text-teal-500 my-5 flex gap-1">
                  {t("comments:signed_in_comment")}
                  <Link className="text-blue-500 hover:underline" to={`${languagePrefix}/sign-in`}>
                     {t("comments:sign_in")}
                  </Link>
               </div>
            )}
         </div>
         <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-1">
            {comments.length === 0 && (
               <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">{t("comments:comments")}</p>
                  <button className="ml-auto relative" onClick={handleCopy}>
                     <FaRss className="text-gray-500" />
                  </button>
               </div>
            )}
            {comments.length === 0 ? (
               <p className="text-gray-300 text-sm my-5 text-center">{t("comments:no_comments_yet")}</p>
            ) : (
               <>
                  <div className="flex justify-between items-center my-2">
                     <p className="text-sm">{t("comments:comments")}</p>
                     <div className="ml-2 border border-gray-400 py-1 px-2 rounded-sm">
                        <p>{comments.length}</p>
                     </div>
                     <button className="ml-auto" onClick={handleCopy}>
                        <FaRss className="text-gray-500" />
                     </button>
                  </div>
                  {comments.map(comment => (
                     <Comment
                        key={comment._id}
                        comment={comment}
                        onLike={handleLike}
                        onEdit={handleEdit}
                        onDelete={(commentId) => {
                           setShowModal(true);
                           setCommentToDelete(commentId);
                        }}
                     />
                  ))}
               </>
            )}
            {showTooltip && ReactDOM.createPortal(<PostTooltip showTooltip={showTooltip} />, document.body)}
         </div>
         {currentUser && (
            <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3 mt-3">
               <textarea
                  placeholder={t("comments:add_comment")}
                  maxLength="200"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className="w-full border border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500 resize-none overflow-hidden"
                  rows="2"
               />
               <div className="flex justify-between items-center mt-5">
                  <p className="text-gray-500 text-xs">
                     {200 - comment.length} {t("comments:characters_remaining")}
                  </p>
                  <Button outline gradientDuoTone="purpleToBlue" type="submit">
                     {t("comments:submit")}
                  </Button>
               </div>
               {commentError && (
                  <Alert color="failure" className="mt-5">
                     {commentError}
                  </Alert>
               )}
            </form>
         )}
         <DeleteCommentDialog
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => handleDelete(commentToDelete)}
            commentToDelete={commentToDelete}
         />
      </div>
   );
}

CommentSection.propTypes = {
   postId: PropTypes.string.isRequired,
};
