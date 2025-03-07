import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function SelectNicknameDialog({ isOpen, onClose }) {
   const dialogRef = useRef(null);

   useEffect(() => {
         const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
               onClose();
            } 
         };
      
         document.addEventListener('mousedown', handleClickOutside);
      
         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };
      }, [onClose]);
   
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div
            ref={dialogRef}
            className="border border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-[650px] relative shadow-md mx-4"
         >
            <div className="flex justify-between items-center mb-4 px-4">
               <p className="text-xl font-semibold py-4 px-2">Выберите другой основной псевдоним</p>
               <button 
                  onClick={onClose} 
                  className="p-1 hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600 rounded-md"
               >
                  <AiOutlineClose size={20} />
               </button>
            </div>
            <div className="px-6">
               <p className="mb-4">Hitmanki@yandex.ru</p>
               <p>Вы пытаетесь удалить единственный псевдоним своей учетной записи. Если этот псевдоним вам не нравится, добавьте новый и сделайте его основным. Затем вы сможете прекратить использование этого псевдонима или удалить его из своей учетной записи.</p>
            </div>
            <div className="flex justify-end px-6 py-4">
               <button 
                  onClick={onClose} 
                  className="px-20 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 ml-auto"
               >
                  ОК
               </button>
            </div>
         </div>
      </div>
   );   
}

SelectNicknameDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};
