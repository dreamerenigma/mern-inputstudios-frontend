import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function DeletePhoneDialog({ isOpen, onClose, onDelete }) {
   const [isChecked, setIsChecked] = useState(false);
   const { theme } = useSelector((state) => state.theme);

   const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
   };

   const handleTextClick = () => {
      setIsChecked(!isChecked);
   };

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   if (!isOpen) return null;

   return (
      <div 
         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
         onClick={handleOverlayClick}
      >
         <div className="border border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-[550px] relative shadow-md">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold px-6 py-4">Удалить ваш номер телефона</h2>
               <button onClick={onClose} className="p-4">
                  <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600"/>
               </button>
            </div>
            <p className="px-6">
               Вы точно хотите удалить этот номер телефона? Если вы захотите чтобы мы
               отправили вам ссылку на скачивание приложения через SMS, вам придется
               добавить свой номер мобильного телефона повторно.
            </p>
            <div className="flex items-center p-6">
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-2 cursor-pointer"
               />
               <span className={`cursor-pointer ${theme === 'dark' ? isChecked ? 'text-teal-500' : 'text-white' : 'text-black'}`}onClick={handleTextClick}>
                  Да удалить этот номер телефона
               </span>
            </div>
            <div className="flex justify-end space-x-4 p-6">
               <button
                  onClick={onDelete}
                  disabled={!isChecked}
                  className={`px-4 py-2 font-semibold rounded-md transition-colors ${
                     isChecked
                        ? 'bg-gray-600 text-white hover:bg-gray-700 cursor-pointer border border-gray-600'
                        : 'bg-transparent text-gray-600  border border-gray-600'
                  }`}
               >
                  Удалить
               </button>
               <button
                  onClick={onClose}
                  className="bg-transparent border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
               >
                  Отмена
               </button>
            </div>
         </div>
      </div>
   );
}

DeletePhoneDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
};
