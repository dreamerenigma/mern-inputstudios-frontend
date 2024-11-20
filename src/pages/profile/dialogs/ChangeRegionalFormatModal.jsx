import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function ChangeRegionalFormatModal({
   isOpen,
   onClose,
   initialLanguage,
   initialDateFormat,
   initialTimeFormat,
}) {
   const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
   const [selectedDateFormat, setSelectedDateFormat] = useState(initialDateFormat);
   const [selectedTimeFormat, setSelectedTimeFormat] = useState(initialTimeFormat);
   const [isChanged, setIsChanged] = useState(false);

   useEffect(() => {
      if (isOpen) {
         setSelectedLanguage(localStorage.getItem('selectedLanguage') || initialLanguage);
         setSelectedDateFormat(localStorage.getItem('selectedDateFormat') || initialDateFormat);
         setSelectedTimeFormat(localStorage.getItem('selectedTimeFormat') || initialTimeFormat);
         setIsChanged(false);
      }
   }, [isOpen, initialLanguage, initialDateFormat, initialTimeFormat]);

   const handleSelectionChange = () => {
      setIsChanged(true);
   };

   const handleLanguageChange = (e) => {
      const value = e.target.value;
      setSelectedLanguage(value);
      handleSelectionChange();
   };

   const handleDateFormatChange = (e) => {
      const value = e.target.value;
      setSelectedDateFormat(value);
      handleSelectionChange();
   };

   const handleTimeFormatChange = (e) => {
      const value = e.target.value;
      setSelectedTimeFormat(value);
      handleSelectionChange();
   };

   const handleSave = () => {
      localStorage.setItem('selectedLanguage', selectedLanguage);
      localStorage.setItem('selectedDateFormat', selectedDateFormat);
      localStorage.setItem('selectedTimeFormat', selectedTimeFormat);
      onClose();
   };

   if (!isOpen) return null;

   return (
      <>
         <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white dark:bg-gray-800 border border-gray-700 p-4 shadow-lg z-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold px-2">Изменение регионального формата</h2>
               <button onClick={onClose} className="px-2 hover:translate-y-[-3px] transition-transform duration-200">
                  <AiOutlineClose size={20} />
               </button>
            </div>
            <div className="px-2">
               <p className="text-base pt-4 mb-6">
                  На некоторых веб-сайтах Input Studios дата и время будут отформатированы в соответствии с региональными предпочтениями.
               </p>
               <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Язык</label>
                  <select
                     value={selectedLanguage}
                     onChange={handleLanguageChange}
                     className="w-full p-2 border border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                     <option>русский (Россия)</option>
                     <option>английский (РФ)</option>
                     <option>испанский (Испания)</option>
                  </select>
               </div>
               <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Формат даты</label>
                  <select
                     value={selectedDateFormat}
                     onChange={handleDateFormatChange}
                     className="w-full p-2 border rounded-md border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                     <option>31.08.2000</option>
                     <option>31.08.00</option>
                     <option>31.8.00</option>
                     <option>31-08-2000</option>
                  </select>
               </div>
               <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Формат времени</label>
                  <select
                     value={selectedTimeFormat}
                     onChange={handleTimeFormatChange}
                     className="w-full p-2 border rounded-md border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                     <option>1:01 - 23:59</option>
                     <option>01:01 - 23:59</option>
                  </select>
               </div>
               <div className="flex justify-end mt-8 mb-2">
                  <button
                     onClick={handleSave}
                     disabled={!isChanged}
                     className={`px-4 py-2 font-semibold rounded-md transition-colors ${
                        isChanged
                           ? 'bg-transparent text-white hover:bg-gray-700 cursor-pointer border border-gray-600'
                           : 'bg-transparent text-gray-600  border border-gray-600'
                     }`}
                  >
                     Готово
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

ChangeRegionalFormatModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   initialLanguage: PropTypes.string.isRequired,
   initialDateFormat: PropTypes.string.isRequired,
   initialTimeFormat: PropTypes.string.isRequired,
};
