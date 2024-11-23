import { FiInfo } from "react-icons/fi";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function CommentPopupMenu({ isOpen, onClose, t }) {
   const menuRef = useRef(null);

   useEffect(() => {
      const handleOutsideClick = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener("mousedown", handleOutsideClick);
      }

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <div 
         ref={menuRef}
         className="absolute top-5 left-0 bg-gray-700 text-white rounded-lg shadow-lg w-48 z-50"
      >
         <button
            type="button"
            onClick={() => alert("Complain action")}
            className="flex items-center text-gray-400 hover:text-teal-500 text-base hover:bg-gray-600/70 w-full text-left px-5 py-3 transition-all duration-200 rounded-lg hover:rounded-xl"
         >
            <FiInfo size={20} className="mr-3" />
            {t("comments:complain")}
         </button>
      </div>
   );
}

CommentPopupMenu.propTypes = {
   isOpen: PropTypes.bool.isRequired,  
   onClose: PropTypes.func.isRequired,  
   t: PropTypes.func.isRequired,
};
