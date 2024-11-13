import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import { IoArrowBack } from "react-icons/io5";
import { getLanguages } from '../../../redux/languages';
import { HiPlus } from 'react-icons/hi2';
import { RiMore2Line } from "react-icons/ri";

export default function LanguageSettingsModal({ isOpen, onClose }) {
   const menuDownRef = useRef(null);
   const menuUpRef = useRef(null);
   const dropdownRef = useRef(null);
   const [showLanguageInterface, setShowLanguageInterface] = useState(false);
   const [showPreferredLanguages, setShowPreferredLanguages] = useState(false);
   const [showTranslation, setShowTranslation] = useState(false);
   const [selectedLanguage, setSelectedLanguage] = useState('ru');
   const [isMenuDownOpen, setIsMenuDownOpen] = useState(false);
   const [isMenuUpOpen, setIsMenuUpOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState('option2');
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [isOpenTranslation, setIsOpenTranslation] = useState(false);
   const [selectedTranslationLanguage, setSelectedTranslationLanguage] = useState('Выберите язык');

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            (menuDownRef.current && !menuDownRef.current.contains(event.target)) &&
            isMenuDownOpen
         ) {
            setIsMenuDownOpen(false);
         }

         if (
            (menuUpRef.current && !menuUpRef.current.contains(event.target)) &&
            isMenuUpOpen
         ) {
            setIsMenuUpOpen(false);
         }

         if (
            (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
            isOpenTranslation
         ) {
            setIsOpenTranslation(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isMenuDownOpen, isMenuUpOpen, isOpenTranslation]);

   const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
   };

   const handleOptionChange = (option) => {
      setSelectedOption(option);
      setIsButtonDisabled(false);
   };

   const handleLanguageSelect = (language) => {
      setSelectedTranslationLanguage(language);
      setIsOpenTranslation(false);
   };

   const languages = getLanguages(selectedLanguage);
   const toggleDropdown = () => setIsOpenTranslation(!isOpenTranslation);

   if (!isOpen) return null;

   return (
      <>
         <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 border border-gray-700 bg-white dark:bg-gray-800 py-2 shadow-lg z-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
               <div className="flex flex-row px-4 py-2 items-center">
                  {(showLanguageInterface || showPreferredLanguages || showTranslation) ? (
                     <button onClick={() => {
                        if (showPreferredLanguages) {
                           setShowPreferredLanguages(false);
                        } else if (showLanguageInterface) {
                           setShowLanguageInterface(false);
                        } else {
                           setShowTranslation(false);
                        }
                     }} 
                        className="p-1 rounded-md hover:bg-gray-600 hover:translate-x-[-3px] transition-transform duration-200">
                        <IoArrowBack size={22} />
                     </button>
                  ) : null}
                  {(!showLanguageInterface && !showPreferredLanguages && !showTranslation) && (
                     <img src="/logos/logo_circle_350x350.png" alt="Logo Input Studios" className="w-10 h-10 mr-4" />
                  )}
                  <h2 className="text-xl font-semibold ml-6">
                     {showLanguageInterface
                        ? 'Язык интерфейса'
                        : showPreferredLanguages
                        ? 'Предпочитаемые языки'
                        : showTranslation
                        ? 'Translation (Преобразование)'
                        : 'Ваши языковые параметры'
                     }
                  </h2>
               </div>
               <button onClick={onClose} className="mx-4 p-1 rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600">
                  <AiOutlineClose size={20} />
               </button>
            </div>
            <div className="px-6">
               {showLanguageInterface ? (
                  <p className="text-base">
                     Этот веб-сайт, OneDrive и некоторые веб-приложения Input Studios Workspace будут отображаться на выбранном вами языке.
                  </p>
               ) : showPreferredLanguages ? (
                  <p className="text-base">
                     Добавьте языки, которые вы понимаете, в порядке предпочтения. Вы сможете создавать и править материалы на этих языках. Мы не будем автоматически переводить полученные сообщения на выбранные вами языки.
                  </p>
               ) : showTranslation ? (
                  <p className="text-base">
                     Переведите сообщения, полученные на языках, которые вы не понимаете.
                  </p>
               ) : (
                  <p className="text-base">
                     Выбранные здесь параметры будут синхронизироваться на всех устройствах и в приложениях, в которые вы входите под своей учетной записью Input Studios.
                  </p>
               )}
            </div>
            {showLanguageInterface ? (
               <div className="px-6 py-6 group">
                  <div className="flex items-center border border-gray-600 rounded-lg transition-all duration-200 ease-in-out px-4 group-focus-within:px-0">
                     <IoIosSearch
                        size={26}
                        className="text-gray-500 transition-all duration-200 ease-in-out group-focus-within:hidden transform scale-x-[-1]"
                     />
                     <input
                        type="text"
                        placeholder="Найти язык"
                        className="flex-1 text-base outline-none bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none"
                     />
                  </div>
                  <div className="mt-4 max-h-60 overflow-y-auto">
                     <ul className="space-y-2">
                        {languages.map((lang) => (
                           <li
                              key={lang.value}
                              className={`p-2 cursor-pointer rounded ${
                                 selectedLanguage === lang.value
                                    ? 'border border-teal-700 text-white'
                                    : 'hover:bg-gray-700'
                              }`}
                              onClick={() => setSelectedLanguage(lang.value)}
                           >
                              {lang.label}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="mt-4 flex justify-end">
                     <button
                        className={`py-2 px-6 rounded-lg transition duration-200 ${
                           isButtonDisabled
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                              : 'bg-teal-500 text-white hover:bg-teal-700'
                        }`} 
                        disabled={isButtonDisabled}
                     >
                        Изменение языка интерфейса
                     </button>
                  </div>
               </div>            
            ) : showPreferredLanguages ? (
               <div className="m-6">
                  <div className="border-t border-gray-700 my-4"></div>
                  <div className="flex items-center justify-between space-x-2 ml-3">
                     <p className="text-base font-semibold flex-grow">русский (Россия)</p>
                     <p className="text-sm flex-grow">Язык по умолчанию</p>
                     <button onClick={() => setIsMenuDownOpen((prev) => !prev)} className="p-1 rounded-md hover:bg-gray-600">
                        <RiMore2Line size={24} />
                     </button>
                     {isMenuDownOpen && (
                        <div ref={menuDownRef} className="absolute mt-2 right-6 bottom-16 bg-white dark:bg-gray-600 rounded-lg shadow-lg w-48">
                           <ul className="space-y-1">
                              <li className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 rounded-top-only">Вниз</li>
                              <li className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 rounded-bottom-only">Удалить</li>
                           </ul>
                        </div>
                     )}
                  </div>
                  <div className="border-t border-gray-700 my-4"></div>
                  <div className="flex items-center justify-between space-x-2 ml-3">
                     <p className="text-base">english (United States)</p>
                     <button onClick={() => setIsMenuUpOpen((prev) => !prev)} className="p-1 rounded-md hover:bg-gray-600">
                        <RiMore2Line size={24} />
                     </button>
                     {isMenuUpOpen && (
                        <div ref={menuUpRef} className="absolute mt-2 right-6 bottom-6 bg-white dark:bg-gray-600 rounded-lg shadow-lg w-48">
                           <ul className="space-y-1">
                              <li className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 rounded-top-only">Вверх</li>
                              <li className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 rounded-bottom-only">Удалить</li>
                           </ul>
                        </div>
                     )}
                  </div>
                  <div className="flex items-center justify-start space-x-2 my-6">
                     <HiPlus size={22} className="text-teal-500" />
                     <p className="text-base font-semibold text-teal-500 cursor-pointer">&quot;Добавить язык&quot;</p>
                  </div>
               </div>
            ) : showTranslation ? (
               <div className="mx-6 my-4">
                  <p className="text-md font-semibold mb-4">Выберите, когда нужно переводить сообщения</p>
                  <div className="space-y-4">
                     <div
                        className={`flex items-center cursor-pointer ${selectedOption === 'option1' ? 'text-teal-500' : 'text-white'}`}
                        onClick={() => handleOptionChange('option1')}
                     >
                        <input
                           type="radio"
                           id="option1"
                           name="translationOption"
                           className="mr-2 hidden"
                           checked={selectedOption === 'option1'}
                           onChange={() => handleOptionChange('option1')}
                        />
                        <span
                           className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 
                           ${selectedOption === 'option1' ? 'border-teal-500' : 'border-gray-300'}`}
                        >
                           {selectedOption === 'option1' && (
                           <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                           )}
                        </span>
                        <label htmlFor="option1" className="text-base">Всегда переводить</label>
                     </div>
                     <div
                        className={`flex items-center cursor-pointer ${selectedOption === 'option2' ? 'text-teal-500' : 'text-white'}`}
                        onClick={() => handleOptionChange('option2')}
                     >
                        <input
                           type="radio"
                           id="option2"
                           name="translationOption"
                           className="mr-2 hidden"
                           checked={selectedOption === 'option2'}
                           onChange={() => handleOptionChange('option2')}
                        />
                        <span
                           className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 
                           ${selectedOption === 'option2' ? 'border-teal-500' : 'border-gray-300'}`}
                        >
                           {selectedOption === 'option2' && (
                           <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                           )}
                        </span>
                        <label htmlFor="option2" className="text-base">Запрашивать подтверждение перед переводом</label>
                     </div>
                     <div
                        className={`flex items-center cursor-pointer ${selectedOption === 'option3' ? 'text-teal-500' : 'text-white'}`}
                        onClick={() => handleOptionChange('option3')}
                     >
                        <input
                           type="radio"
                           id="option3"
                           name="translationOption"
                           className="mr-2 hidden"
                           checked={selectedOption === 'option3'}
                           onChange={() => handleOptionChange('option3')}
                        />
                        <span
                           className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 
                           ${selectedOption === 'option3' ? 'border-teal-500' : 'border-gray-300'}`}
                        >
                           {selectedOption === 'option3' && (
                           <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                           )}
                        </span>
                        <label htmlFor="option3" className="text-base">Никогда не переводить</label>
                     </div>
                  </div>
                  <p className="text-base font-semibold mb-2 mt-4">Перевод сообщений на</p>
                  <div className="mb-2">
                     <div className="relative" ref={dropdownRef}>
                     <button
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 flex justify-between items-center"
                        onClick={toggleDropdown}
                     >
                        <span>{selectedTranslationLanguage}</span>
                        <IoIosArrowDown
                           className={`transform transition-transform duration-200 ${isOpenTranslation ? 'rotate-180' : ''}`}
                        />
                     </button>
                     {isOpenTranslation && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                           {languages.map((lang, index) => (
                              <div
                              key={lang.value}
                              onClick={() => handleLanguageSelect(lang.label)}
                              className={`hover:bg-gray-500 px-4 py-2 cursor-pointer ${index === 0 ? 'rounded-t-md' : ''} ${index === languages.length - 1 ? 'rounded-b-md' : ''}`}
                              >
                              {lang.label}
                              </div>
                           ))}
                        </div>
                     )}
                     </div>
                  </div>
                  <p className="text-base mb-12">
                     Сообщения, написанные на предпочитаемых вами языках, не будут переводиться
                  </p>
                  <div className="mt-4 flex justify-end">
                     <button
                        className={`py-2 px-6 rounded-lg transition duration-200 ${
                           isButtonDisabled
                              ? 'bg-gray-700 text-gray-500'
                              : 'bg-teal-500 text-white hover:bg-teal-700'
                        }`} 
                        disabled={isButtonDisabled}
                     >
                        Сохранить
                     </button>
                  </div>
               </div>
            ) : (
               <div className="my-6">
                  <div 
                     className="flex items-center justify-between px-6 py-2 w-full hover:bg-gray-700 group cursor-pointer"
                     onClick={() => setShowLanguageInterface(true)}
                  >
                     <div>
                        <p className="text-sm text-gray-300">Язык интерфейса</p>
                        <p className="text-base font-semibold">русский (Россия)</p>
                     </div>
                     <div className="text-gray-500 transform transition-transform duration-200 group-hover:translate-x-1">
                        <IoIosArrowForward size={24} />
                     </div>
                  </div>
                  <div 
                     className="flex items-center justify-between px-6 py-2 w-full hover:bg-gray-700 group"
                     onClick={() => setShowPreferredLanguages(true)}
                  >
                     <div className="cursor-pointer">
                        <p className="text-sm text-gray-300">Предпочитаемые языки</p>
                        <p className="text-base font-semibold">русский (Россия), english (United States)</p>
                     </div>
                     <div className="text-gray-500 transform transition-transform duration-200 group-hover:translate-x-1">
                        <IoIosArrowForward size={24} />
                     </div>
                  </div>
                  <div 
                     className="flex items-center justify-between px-6 py-2 w-full hover:bg-gray-700 group"
                     onClick={() => setShowTranslation(true)}
                  >
                     <div className="cursor-pointer">
                        <p className="text-sm text-gray-300">Translation (Преобразование)</p>
                        <p className="text-base font-semibold">Запрашивать разрешение перед переводом</p>
                     </div>
                     <div className="text-gray-500 transform transition-transform duration-200 group-hover:translate-x-1">
                        <IoIosArrowForward size={24} />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}

LanguageSettingsModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};
