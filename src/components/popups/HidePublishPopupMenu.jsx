import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function HiddenPublishPopupMenu({ isOpen, onClose, t }) {
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
         className="absolute top-14 left-0 bg-gray-700 text-white rounded-lg shadow-lg w-[218px] z-50"
      >
         <button
            type="button"
            onClick={() => alert("Complain action")}
            className="flex items-center text-center justify-center text-sm text-gray-400 hover:text-teal-500 hover:bg-gray-600/70 w-full px-4 py-3 transition-all duration-200 rounded-lg hover:rounded-xl"
         >
            {t("comments:hide_publish_author")}
         </button>
      </div>
   );
}

HiddenPublishPopupMenu.propTypes = {
   isOpen: PropTypes.bool.isRequired,  
   onClose: PropTypes.func.isRequired,  
   t: PropTypes.func.isRequired,
};
