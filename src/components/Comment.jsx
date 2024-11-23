import { useEffect, useState } from "react";
import moment from "moment";
import { FaEllipsisH, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CustomBottomSheetDialog from "./dialogs/CustomBottomSheetDialog";
import CommentPopupMenu from "./popups/CommentPopupMenu";
import { Link } from "react-router-dom";

export default function Comment({ comment, onLike, onEdit, onDelete, onReply }) {
   const { t } = useTranslation();
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const [editedContent, setEditedContent] = useState(comment.content);
   const [isReplying, setIsReplying] = useState(false);
   const [replyContent, setReplyContent] = useState("");
   const { currentUser } = useSelector((state) => state.user);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
   const [isMobileView, setIsMobileView] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   
   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await fetch(`${SERVER_URL}/api/user/${comment.userId}`);
            const data = await res.json();
            if (res.ok) {
               setUser(data);
            }
         } catch (error) {
            console.log(error.message);
         }
      }
      getUser();
   }, [SERVER_URL, comment]);

   useEffect(() => {
      const checkScreenSize = () => {
         setIsMobileView(window.innerWidth <= 768);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => {
         window.removeEventListener("resize", checkScreenSize);
      };
   }, []);

   const handleEdit = () => {
      setIsEditing(true);
      setEditedContent(comment.content);
   };

   const handleSave = async () => {
      try {
         const token = localStorage.getItem('token');
         const res = await fetch(`${SERVER_URL}/api/comment/editComment/${comment._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               content: editedContent,
            }),
         });
         
         if (res.ok) {
            setIsEditing(false);
            onEdit(comment, editedContent);
         } else {
            console.log(`Failed to edit comment: ${res.statusText}`);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleReply = () => {
      setIsReplying(!isReplying);
   };

   const submitReply = async () => {
      if (!replyContent.trim()) return;
      try {
         const token = localStorage.getItem('token');
         const commentId = comment._id;
         console.log("Posting reply to comment:", commentId);
         const res = await fetch(`${SERVER_URL}/api/comment/reply/${commentId}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
               content: replyContent,
            }),
         });
         
         if (res.ok) {
            const newReply = await res.json();
            onReply(newReply);
            setIsReplying(false);
            setReplyContent("");
         } else {
            console.log(`Failed to reply: ${res.statusText}`);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleOpenDialog = () => {
      setIsBottomSheetOpen(true);
   };

   const handleCloseDialog = () => {
      setIsBottomSheetOpen(false);
   };

   return (
      <div className="flex py-4 text-sm">
         <Link 
            to={
            currentUser && currentUser.username === user.username
               ? `${languagePrefix}/dashboard?tab=profile`
               : `${languagePrefix}/user/${user.username}`
            }
            className="text-base text-cyan-600 hover:underline"
         >
            <div className="flex-shrink-0 mr-3">
               <img
                  className="w-10 h-10 rounded-full bg-gray-200"
                  src={user.profilePicture}
                  alt={user.username}
               />
            </div>
         </Link>
         <div className="flex-1">
               <div className="flex items-center mb-1">
                  <Link 
                     to={
                        currentUser && currentUser.username === user.username
                           ? `${languagePrefix}/dashboard?tab=profile`
                           : `${languagePrefix}/user/${user.username}`
                     }
                     className="text-base text-cyan-600 hover:underline"
                  >
                     <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.username}` : "anonymous user"}
                     </span>
                  </Link>
                  <span className="text-gray-400 text-xs">
                     {moment(comment.createdAt).fromNow()}
                  </span>
               </div>
            {isEditing ? (
               <>
                  <Textarea
                     className="mb-2"
                     value={editedContent}
                     onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 text-xs">
                     <Button type="button" size="sm" gradientDuoTone="purpleToBlue" onClick={handleSave}>
                        {t("comments:save")}
                     </Button>
                     <Button type="button" size="sm" gradientDuoTone="purpleToBlue" outline onClick={() => setIsEditing(false)}>
                        {t("comments:cancel")}
                     </Button>
                  </div>
               </>
            ) : (
               <>
                  <p className="text-gray-400 pb-2">{comment.content}</p>
                  <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                     <button
                        type="button"
                        onClick={() => onLike(comment._id)}
                        className={`text-gray-400 hover:text-blue-500 ${
                           currentUser && comment.likes.includes(currentUser._id) ? "!text-teal-500" : "text-gray-500"
                        }`}
                     >
                        <FaThumbsUp
                           className={`text-sm ${currentUser && comment.likes.includes(currentUser._id) ? "text-teal-500" : "text-gray-500"} hover:text-teal-500`}
                        />
                     </button>
                     <p className="text-gray-400">
                        {comment.numberOfLikes > 0 &&
                           (comment.numberOfLikes > 10
                              ? `${comment.numberOfLikes}\u00A0${t("comments:many_likes")}`
                              : `${comment.numberOfLikes}\u00A0${
                                 comment.numberOfLikes === 1 ? t("comments:like") : t("comments:likes")
                              }`
                           )
                        }
                     </p>
                     {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                        <>
                           <button
                              type="button"
                              onClick={handleReply}
                              className="text-gray-400 hover:text-teal-500"
                           >
                              {t("comments:reply")}
                           </button>
                           <button
                              type="button"
                              onClick={handleEdit}
                              className="flex items-center text-gray-400 hover:text-teal-500 hidden-sm"
                           >
                              {t("comments:edit")}
                           </button>
                           <button
                              type="button"
                              onClick={() => onDelete(comment._id)}
                              className="flex items-center text-gray-400 hover:text-red-500 w-full hidden-sm"
                           >
                              {t("comments:delete")}
                           </button>
                           <div className="relative inline-block">
                              <button
                                 type="button"
                                 onClick={handleOpenDialog}
                                 className="text-gray-400 hover:text-teal-500 mr-2"
                              >
                                 <FaEllipsisH className="text-base mt-1" />
                              </button>
                              {isMobileView ? (
                                 <CustomBottomSheetDialog
                                    isOpen={isBottomSheetOpen}
                                    onClose={handleCloseDialog}
                                    handleEdit={handleEdit}
                                    onDelete={onDelete}
                                    t={t}
                                    comment={comment}
                                 />
                              ) : (
                                 <CommentPopupMenu
                                    isOpen={isBottomSheetOpen}
                                    onClose={handleCloseDialog}
                                    t={t}
                                    comment={comment}
                                 />
                              )}
                           </div>
                        </>
                     )}
                  </div>
                  {isReplying && (
                     <div className="mt-2">
                        <textarea
                           value={replyContent}
                           onChange={(e) => setReplyContent(e.target.value)}
                           placeholder={t("posts:write_reply")}
                           className="w-full border border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500 resize-none overflow-hidden"
                           rows="2"
                        />
                        <div className="flex justify-end gap-2 text-xs mt-2">
                           <Button
                              type="button"
                              size="sm"
                              gradientDuoTone="purpleToBlue"
                              onClick={submitReply}
                           >
                              {t("posts:reply")}
                           </Button>
                           <Button
                              type="button"
                              size="sm"
                              gradientDuoTone="purpleToBlue"
                              outline
                              onClick={() => setIsReplying(false)}
                           >
                              {t("posts:cancel")}
                           </Button>
                        </div>
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
}

Comment.propTypes = {
   comment: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      likes: PropTypes.arrayOf(PropTypes.string).isRequired,
      numberOfLikes: PropTypes.number.isRequired,
   }).isRequired,
   onLike: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   onReply: PropTypes.func.isRequired,
};
