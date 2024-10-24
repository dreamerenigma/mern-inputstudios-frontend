import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from './Comment';
import PropTypes from 'prop-types';
import DeleteCommentDialog from './dialogs/DeleteCommentDialog';
import { useTranslation } from "react-i18next";

export default function CommentSection({ postId }) {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const [comment, setComment] = useState("");
   const [commentError, setCommentError] = useState(null);
   const [comments, setComments] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [commentToDelete, setCommentToDelete] = useState(null);
   const navigate = useNavigate();
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

   return (
      <div className="max-w-2xl mx-auto w-full p-3">
         {currentUser ? (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
               <p className="pr-2">{t("comments:signed_in_as")}</p>
               <img
                  className="h-5 w-5 object-cover rounded-full"
                  src={currentUser.profilePicture}
                  alt="Profile picture"
               />
               <Link
                  to={`${languagePrefix}/dashboard?tab=profile`}
                  className="text-xs text-cyan-600 hover:underline"
               >
                  @{currentUser.username}
               </Link>
            </div>
         ) : (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
               {t("comments:signed_in_comment")}
               <Link className="text-blue-500 hover:underline" to={`${languagePrefix}/sign-in`}>
                  {t("comments:sign_in")}
               </Link>
            </div>
         )}
         {currentUser && (
            <form
               onSubmit={handleSubmit}
               className="border border-teal-500 rounded-md p-3"
            >
               <Textarea
                  placeholder={t("comments:add_comment")}
                  rows="3"
                  maxLength="200"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
               />
               <div className="flex justify-between items-center mt-5">
                  <p className="text-gray-500 text-xs">
                     {200 - comment.length} {t("comments:characters_remaining")}</p>
                  <Button
                     outline
                     gradientDuoTone="purpleToBlue"
                     type="submit"
                  >
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
         {comments.length === 0 ? (
            <p className="text-sm my-5">{t("comments:no_comments_yet")}</p>
         ) : (
            <>
               <div className="text-sm my-5 flex items-center gap-1">
                  <p>{t("comments:comments")}</p>   
                  <div className="border border-gray-400 py-1 px-2 rounded-sm">
                     <p>{comments.length}</p>
                  </div>
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
