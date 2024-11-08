import { useState } from 'react';
import PropTypes from "prop-types";

const InsertLinkDialog = ({ onClose, onInsert }) => {
   const [url, setUrl] = useState('');
   const [text, setText] = useState('');

   const handleInsert = () => {
      if (url && text) {
         onInsert(url, text);
         onClose();
      }
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white dark:bg-gray-800 rounded-lg py-3 px-5 shadow-lg w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Вставить гиперссылку</h2>
            <div className="mb-4 flex items-center">
               <label className="block w-[120px] mb-1 ml-12 text-right pr-8">Веб-адрес</label>
               <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-2/3 border border-gray-600 bg-gray-700 rounded focus:outline-none focus:ring-0 focus:border-teal-500 transition duration-200" 
               />
            </div>
            <div className="mb-4 flex items-center">
               <label className="block w-[120px] mb-1 ml-12 text-right pr-8">Текст</label>
               <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-2/3 border border-gray-600 bg-gray-700 rounded focus:outline-none focus:ring-0 focus:border-teal-500 transition duration-200"
               />
            </div>
            <div className="flex justify-between w-full">
               <button 
                  className="w-full bg-gray-600 text-gray-200 hover:bg-gray-700 py-2 rounded-md mr-2 shadow-md" 
                  onClick={onClose}
               >
                  Отмена
               </button>
               <button
                  onClick={handleInsert}
                  className="px-4 py-2 bg-teal-500 text-white hover:bg-teal-700 w-full ml-2 rounded-md shadow-md"
               >
                  Вставить
               </button>
            </div>
         </div>
      </div>
   );
};

InsertLinkDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   onInsert: PropTypes.func.isRequired,
};

export default InsertLinkDialog;
