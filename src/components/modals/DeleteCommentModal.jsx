import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

export default function DeleteCommentModal({ setShowModal, handleDeleteComment }) {
   const { t } = useTranslation();

   return (
      <div
         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
         onClick={() => setShowModal(false)}
      >
         <div
            className="relative border border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-[400px] w-full"
            onClick={(e) => e.stopPropagation()}
         >
            <button
               className="absolute top-3 right-3 text-3xl hover:bg-gray-500 rounded text-gray-500 dark:text-gray-300 transition-transform transform hover:translate-y-[-4px]"
               onClick={() => setShowModal(false)}
            >
               <RiCloseLine className="h-6 w-6" />
            </button>
            <div className="text-center">
               <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
               <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  {t("sure_you_delete_comment")}
               </h3>
               <div className="mt-6 flex flex-col md:flex-row justify-between w-full space-y-2 md:space-y-0">
                  <button
                     className="px-4 py-2 bg-red-600 hover:bg-red-800 shadow-md rounded-lg flex-grow md:mr-2"
                     onClick={() => handleDeleteComment(false)}
                  >
                     {t("yes_sure")}
                  </button>
                  <button
                     className="px-4 py-2 bg-gray-600 hover:bg-gray-700 shadow-md text-white rounded-lg flex-grow md:ml-2"
                     onClick={() => setShowModal(false)}
                  >
                     {t("no_cancel")}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

DeleteCommentModal.propTypes = {
   setShowModal: PropTypes.bool.isRequired,
   handleDeleteComment: PropTypes.func.isRequired,
};
