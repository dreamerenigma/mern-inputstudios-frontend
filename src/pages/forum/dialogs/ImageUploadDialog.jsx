import { IoClose, IoCheckmarkSharp } from 'react-icons/io5';
import PropTypes from "prop-types";
import { useRef, useState } from 'react';
import { CiCircleInfo } from "react-icons/ci";
import { FaSpinner } from 'react-icons/fa';
import { BsFileEarmarkImage } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

const ImageUploadDialog = ({ onClose, onImageUpload }) => {
   const fileInputRef = useRef(null);
   const [fileName, setFileName] = useState(null);
   const [uploadStatus, setUploadStatus] = useState('');
   const [progress, setProgress] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [uploadSuccess, setUploadSuccess] = useState(false);

   const handleInsert = (file) => {
      if (file) {
         setFileName(file.name);
         simulateUpload();

         const interval = setInterval(() => {
            setProgress((prev) => {
               if (prev >= 100) {
                  clearInterval(interval);
                  setIsLoading(false);
                  return 100;
               }
               return prev + 10;
            });
         }, 200);
      }
   };

   const simulateUpload = () => {
      setUploadStatus('Uploading...');
      setProgress(0);
      setIsLoading(true);
      setUploadSuccess(false);

      const interval = setInterval(() => {
         setProgress((prevProgress) => {
            if (prevProgress >= 100) {
               clearInterval(interval);
               const isSuccess = Math.random() > 0.3;
               if (isSuccess) {
                  setUploadStatus('File(s) successfully uploaded.');
                  setUploadSuccess(true);
               } else {
                  setUploadStatus('File(s) failed to upload.');
               }
               setTimeout(() => {
                  setProgress(0);
               }, 1000);
               return 100;
            }
            return prevProgress + 10;
         });
      }, 200);
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         handleInsert(file);
      }
   };

   const handleDragOver = (event) => {
      event.preventDefault();
   };

   const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
         handleInsert(file);
      }
   };

   const handleClickOutside = (event) => {
      if (event.target === event.currentTarget) {
         onClose();
      }
   };

   const handleImageUpload = () => {
      if (fileInputRef.current.files[0]) {
         const file = fileInputRef.current.files[0];
         onImageUpload(file);
         onClose();
      }
   };

   return (
      <div 
         className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
         onClick={handleClickOutside}
      >
         <div className="bg-gray-800 border border-gray-600 rounded-md w-[480px] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
               <span className="text-gray-200">Вставить изображение</span>
               <button onClick={onClose}>
                  <IoClose className="w-5 h-5 text-gray-200 hover:text-gray-100" />
               </button>
            </div>
            <div className="border border-gray-600 rounded-md p-4 mb-4">
               <div 
                  className="flex items-center justify-between text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
               >
                  <input 
                     type="file" 
                     accept="image/*"
                     onChange={handleFileChange}
                     ref={fileInputRef}
                     className="hidden"
                  />
                  <button 
                     className="border border-gray-600 bg-gray-700 text-gray-200 py-2 px-4 rounded-md"
                     onClick={() => fileInputRef.current.click()}
                  >
                     Отправить
                  </button>
                  
                  {fileName ? (
                     isLoading ? (
                        <div className="flex items-center ml-auto">
                           <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                           <span>Отправка...</span>
                        </div>
                     ) : uploadSuccess ? (
                        <div className="flex items-center ml-auto">
                           <IoCheckmarkSharp className="w-5 h-5 mr-2" />
                           <span>Готово</span>
                        </div>
                     ) : (
                        <div className="flex items-center ml-auto">
                           <CiCircleInfo className="w-5 h-5 mr-2" />
                           <span>Не удалось загрузить</span>
                        </div>
                     )
                  ) : (
                     <span className="text-gray-400 ml-4">Перетащите сюда файл для отправки</span>
                  )}
               </div>
               {fileName && <div className="border-t border-gray-600 my-4"></div>}
               {fileName && (
                  <div className="flex items-center justify-between mt-4">
                     <div className="flex items-center">
                        <BsFileEarmarkImage className="w-10 h-10 text-gray-200 mr-3" />
                        <div>
                           <p className="text-gray-200">{fileName}</p>
                           <p className="text-sm">{uploadStatus}</p>
                        </div>
                     </div>
                     {!uploadSuccess && !isLoading && (
                        <div className="flex space-x-2">
                           <RxReload className="w-[16px] h-[16px] cursor-pointer" />
                           <IoClose className="w-5 h-5 cursor-pointer" onClick={() => setFileName(null)} />
                        </div>
                     )}
                  </div>
               )}
               {progress > 0 && progress < 100 && (
                  <div className="relative w-full bg-gray-600 rounded-full h-[10px] mt-4">
                     <div
                        className="absolute top-0 left-0 h-[10px] bg-teal-500 rounded-full text-center text-xs text-white flex items-center justify-center"
                        style={{ width: `${progress}%` }}
                     >
                        {`${progress}%`}
                     </div>
                  </div>
               )}
            </div>
            <div className="flex justify-between mt-4">
               <button 
                  className="w-full bg-gray-600 text-gray-200 hover:bg-gray-700 py-2 rounded-md mr-2 shadow-md" 
                  onClick={onClose}
               >
                  Отмена
               </button>
               <button 
                  className="w-full bg-teal-500 text-gray-200 hover:bg-teal-700 py-2 rounded-md ml-2 shadow-md" 
                  onClick={handleImageUpload}
                  disabled={!uploadSuccess}
               >
                  Вставить
               </button>
            </div>
         </div>
      </div>
   );
};

ImageUploadDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploadDialog;
