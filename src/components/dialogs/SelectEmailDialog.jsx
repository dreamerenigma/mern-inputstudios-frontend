import PropTypes from 'prop-types';
import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function SelectEmailDialog({ isOpen, onClose, onSave }) {
   const [email, setEmail] = useState('');
   const [isSave, setIsSave] = useState(false);

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   const handleInputChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      setIsSave(value.trim() !== '');
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOverlayClick}>
         <div className="relative border border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-[500px] shadow-md">
            <div className="flex justify-between items-center ">
               <div className="flex-1">
                  <h2 className="text-xl font-semibold px-6 py-4">Адрес электронной почты для выставления счетов</h2>
               </div>
               <div className="flex-none mb-6">
                  <button onClick={onClose} className="p-4">
                     <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
                  </button>
               </div>
            </div>
            <p className="px-6 mt-2">На этот адрес мы будем отправлять только сведения о выставлении счетов</p>
            <div className="px-6">
               <input
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  className="border border-gray-600 p-2 mt-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-0 focus:border-teal-500 placeholder:text-gray-500 dark:placeholder:text-gray-500"
               />
            </div>
            <div className="px-6 py-4 flex justify-end space-x-2">
               <button
                  onClick={onSave}
                  disabled={!isSave}
                  className={`px-4 py-2 font-semibold rounded-md transition-colors shadow-md ${
                     isSave
                        ? 'bg-gray-600 text-white hover:bg-gray-700 cursor-pointer border border-gray-600'
                        : 'bg-transparent text-gray-600  border border-gray-600'
                  }`}
               >
                  Сохранить
               </button>
               <button
                  onClick={onClose}
                  className="bg-transparent border border-gray-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-700"
               >
                  Отмена
               </button>
            </div>
         </div>
      </div>
   );
}

SelectEmailDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onSave: PropTypes.func.isRequired,
};
