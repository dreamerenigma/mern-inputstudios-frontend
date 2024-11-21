import { useState, useEffect, useCallback, useRef } from 'react';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { IoIosStarOutline, IoMdClose } from 'react-icons/io';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from 'react-icons/ri';

export default function FeedbackButton() {
   const { t } = useTranslation();
   const modalRef = useRef(null);
   const [showButton, setShowButton] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);
   const location = useLocation();
   const [showModal, setShowModal] = useState(false);
   const [text, setText] = useState('');
   const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);
   const maxLength = 500;
   const [hoverIndex, setHoverIndex] = useState(null);
   const [isChecked, setIsChecked] = useState(false);
   const [file, setFile] = useState(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleClickOutside = useCallback((event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
         handleCloseModal();
      }
   }, []);

   useEffect(() => {
      if (showModal) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [showModal, handleClickOutside]);

   const handleScroll = useCallback(() => {
      if (window.scrollY < lastScrollY) {
         setShowButton(true);
      } else {
         setShowButton(false);
      }
      setLastScrollY(window.scrollY);
   }, [lastScrollY]);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [handleScroll, lastScrollY]);

   if (!location.pathname.startsWith(`${languagePrefix}/dashboard`)) {
      return null;
   }

   const handleStarClick = (index) => {
      const newSelectedStars = selectedStars.map((_, i) => i <= index);
      setSelectedStars(newSelectedStars);
   };

   const handleChange = (e) => {
      setText(e.target.value);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setText('');
      setSelectedStars([false, false, false, false, false]);
   };

   const handleStarHover = (index) => {
      setHoverIndex(index);
   };

   const handleStarHoverEnd = () => {
      setHoverIndex(null);
   };

   const isSubmitDisabled = !text && !selectedStars.some(star => star);

   const getStarLabel = () => {
      const rating = (hoverIndex !== null ? hoverIndex : selectedStars.filter(Boolean).length) + 1;
      if (rating === 1) return "Не понравилось";
      if (rating === 2) return "Скорее понравилось";
      if (rating === 3) return "Нейтрально";
      if (rating === 4) return "Понравилось";
      if (rating === 5) return "Очень понравилось";
      return "";
   };

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   const handleFileChange = (e) => {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
         setFile(uploadedFile);
      }
   };

   const handleDragOver = (e) => {
      e.preventDefault();
   };

   const handleDrop = (e) => {
      e.preventDefault();
      const uploadedFile = e.dataTransfer.files[0];
      if (uploadedFile) {
         setFile(uploadedFile);
      }
   };

   const handleFileRemove = () => {
      setFile(null);
   };

   return (
      <div>
         {showButton && (
            <button
               className="fixed bottom-0 right-10 p-2 bg-teal-500 text-white rounded shadow-lg flex items-center space-x-2 hover:bg-teal-700"
               onClick={() => setShowModal(true)}
            >
               <BiMessageRoundedDetail className="text-lg" />
               <span>{t("profile:feedback")}</span>
            </button>
         )}
         {showModal && (
            <div className="px-4 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
               <div 
                  ref={modalRef}
                  className="bg-white dark:bg-gray-800 border border-gray-700 rounded-lg py-2 w-full max-w-xl mx-auto relative"
               >
                  <div className="flex justify-between items-center mb-4">
                  <p className="px-6 text-xl font-bold text-gray-700 dark:text-gray-200">Отправить отзыв в Input Studios</p>
                     <button onClick={handleCloseModal} className="p-4">
                        <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600"/>
                     </button>
                  </div>
                  <div className="px-6 text-left mb-5 mt-2">
                     <div className="mt-4">
                        <p className="text-sm font-semibold">
                           {t("profile:how_satisfied")} 
                           <span className="text-red-500">{" "}*</span>
                        </p>
                        <div className="flex items-center pt-2">
                           {selectedStars.map((selected, index) => (
                              <div
                                 key={index}
                                 className="text-gray-500 hover:text-teal-500 transition-colors cursor-pointer"
                                 onClick={() => handleStarClick(index)}
                                 onMouseEnter={() => handleStarHover(index)}
                                 onMouseLeave={handleStarHoverEnd}
                              >
                                 {selected ? <MdOutlineStarPurple500 size={28} /> : <IoIosStarOutline size={28} />}
                              </div>
                           ))}
                           {(hoverIndex !== null) && (
                              <span className="ml-4 text-sm text-gray-700 dark:text-gray-300">{getStarLabel()}</span>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="px-6">
                     <p className="text-sm font-semibold mt-8">
                        {t("profile:things_better")}
                        <span className="text-red-500">{" "}*</span>
                     </p>
                     <textarea
                        placeholder={t("profile:include_personal_info")}
                        rows="3"
                        maxLength={maxLength}
                        value={text}
                        onChange={handleChange}
                        className="w-full h-32 p-2 border border-gray-600 rounded mt-2 bg-white dark:bg-gray-700 resize-none focus:outline-none focus:ring-0 focus:border-teal-500 custom-scrollbar"
                     />
                     <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-xs">
                           {text.length}/{maxLength} {t("profile:maximum_characters")}
                        </p>
                     </div>
                  </div>
                  <div className="px-6">
                     <div className="flex items-center mt-2">
                     <input
                        type="checkbox"
                        id="change-password"
                        className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-2 cursor-pointer"
                        onChange={handleCheckboxChange}
                     />
                     <label htmlFor="change-password" className="text-gray-700 dark:text-gray-200">
                        Отправить файлы
                     </label>
                     </div>
                     {isChecked && (
                        <div>
                           <div className="mt-4">
                              <div className="flex items-center">
                                 <div
                                    className="border-2 border-gray-700 px-4 py-1 rounded-md flex-grow"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                 >
                                    <p className="text-gray-700 dark:text-gray-200">
                                       Перетащите сюда файлы и вставьте их
                                    </p>
                                 </div>
                                 <button
                                    className="ml-2 px-4 py-1 border border-gray-500 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                                    onClick={() => document.getElementById("file-upload").click()}
                                 >
                                    Обзор
                                 </button>
                              </div>
                              <input
                                 id="file-upload"
                                 type="file"
                                 onChange={handleFileChange}
                                 className="hidden"
                              />
                           </div>
                           {file && (
                              <div className="mt-2 flex items-center">
                                 <p className="text-gray-700 dark:text-teal-500 mr-2">
                                    {file.name}
                                 </p>
                                 <button
                                    className="text-teal-500 hover:text-red-500 mt-1"
                                    onClick={handleFileRemove}
                                 >
                                    <IoMdClose size={20} />
                                 </button>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
                  <div className="px-6 pt-6">
                     <p className="text-xs">
                        <Link to={`${languagePrefix}/input-studios/admin/misc/feedback-user-control`} className="text-teal-500 hover:text-teal-700 underline">Подробнее</Link> 
                           {" "}об использовании этих данных и ваших правах. После нажатия кнопки &quot;Отправить&quot; ваш отзыв будет использован для улучшения продуктов и служб Input Studios. {" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 hover:text-teal-700 underline">Заявление о конфиденциальности</Link>.
                     </p>
                  </div>
                  <p className="text-sm pt-4 px-6 ">{t("profile:need_help")} <Link to={`${languagePrefix}/contactus`} className="text-teal-500 hover:underline hover:text-teal-700">{t("profile:contact_us")}</Link></p>
                  <div className="text-center px-6 mt-4 py-4">
                     <div className="flex justify-start gap-4">
                        <button
                           className={`px-4 py-2 rounded ${isSubmitDisabled ? "bg-gray-700 text-gray-500" : "bg-teal-500 text-white"}`}
                           disabled={isSubmitDisabled}
                        >
                           {t("profile:submit")}
                        </button>
                        <button 
                           className="px-4 py-2 rounded bg-gray-600 text-white"
                           onClick={handleCloseModal}
                        >
                           {t("profile:cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
