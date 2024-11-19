import { RiCloseLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function CustomBottomSheetDialog({ isOpen, onClose, handleEdit, onDelete, t, comment }) {

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'auto';
      }

      return () => {
         document.body.style.overflow = 'auto';
      };
   }, [isOpen]);

   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end" onClick={handleBackdropClick}>
         <div className="bg-white dark:bg-gray-700 rounded-t-lg shadow-lg w-full relative pt-9 pb-2">
            <button
               type="button"
               onClick={onClose}
               className="absolute top-3 right-3 text-gray-400 hover:text-teal-500"
            >
               <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
            </button>
            <div className="flex flex-col w-full">
               <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center text-gray-400 hover:text-teal-500 text-base hover:bg-gray-600 w-full text-left px-5 py-3"
               >
                  <RiEditLine size={20} className="mr-2" />
                  {t("comments:edit")}
               </button>
               <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="flex items-center text-red-500 hover:text-red-500 text-base hover:bg-gray-600 w-full text-left px-5 py-3"
               >
                  <RiDeleteBinLine size={20} className="mr-3 text-red-500" />
                  {t("comments:delete")}
               </button>
            </div>
         </div>
      </div>
   );
}

CustomBottomSheetDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   handleEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   t: PropTypes.func.isRequired,
   comment: PropTypes.shape({
      _id: PropTypes.string.isRequired,
   }).isRequired,
};
