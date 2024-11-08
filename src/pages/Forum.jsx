import { useState, useRef, useEffect } from 'react';
import CustomButton from '../components/buttons/CustomButton';
import { BsPeople, BsCardChecklist } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { TbMessages } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Forum() {
   const { t } = useTranslation();
   const [showDropdown, setShowDropdown] = useState(false);
   const [isFocused, setIsFocused] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);
   const dropdownRef = useRef(null);
   const navigate = useNavigate();
   const [showAllProducts, setShowAllProducts] = useState(false);
   const { currentUser } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const products = [
      { id: 1, src: '../logos/logo_chatify.png', text: 'Chatify', link:`${languagePrefix}/chatify/forum` },
      { id: 2, src: '../logos/logo_easyshoppin.png', text: 'Easy Shoppin', link: `${languagePrefix}/easy-shoppin/forum` },
      { id: 3, src: '../logos/logo_quantum_engine.png', text: 'Quantum Engine', link: `${languagePrefix}/quantum-engine/forum` },
      { id: 4, src: '../logos/logo_wave.png', text: 'Wave', link: `${languagePrefix}/wave/forum` },
   ];

   const handleFocus = () => {
      setShowDropdown(true);
      setIsFocused(true);
   };

   const handleBlur = () => {
      setTimeout(() => {
         if (!isFocused) {
         setShowDropdown(false);
         }
      }, 200);
   };

   const handleSelectOption = (option) => {
      setSelectedOption(option);
      console.log(option);
   };

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setShowDropdown(false);
      }
   };

   const handleToggleShowAllProducts = () => {
      setShowAllProducts(!showAllProducts);
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   const handleSearchClick = () => {
      window.location.reload();
   };

   const handleButtonClick = () => {
      if (currentUser) {
         navigate(`${languagePrefix}/newthreads?threadtype=Questions`);
      } else {
         navigate(`${languagePrefix}/sign-in`);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <Helmet>
            <title>{t("community_title")}</title>
         </Helmet>
         <div className="relative" ref={dropdownRef}>
            <div className={`flex items-center border-2 mt-44 ${isFocused ? 'border-black dark:border-gray-500' : 'border-black dark:border-gray-500'} bg-white w-full md:w-96 lg:max-w-full`}>
               <input
                  type="text"
                  placeholder={t("search_community")}
                  className="pl-2 py-2 w-full border-none focus:outline-none focus:ring-0 bg-white dark:bg-gray-800"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
               />
               <div 
                  className="flex items-center justify-center bg-gray-200 dark:bg-gray-600 p-3 border-l-2 border-black dark:border-gray-500 cursor-pointer"
                  onClick={handleSearchClick}
               >
                  <FaSearch className="text-black dark:text-white" />
               </div>
            </div>
            {showDropdown && (
            <ul className={`absolute left-0 right-0 mt-1 bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-md max-h-60 overflow-y-auto`}>
                  <li 
                     className={`px-4 py-2 cursor-pointer hover:underline ${selectedOption === 'Option 1' ? 'bg-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-400'}`} 
                     onClick={() => handleSelectOption('Option 1')}
                  >
                  {t("community_center")}
                  </li>
                  <li 
                     className={`px-4 py-2 cursor-pointer hover:underline 
                        ${selectedOption === 'Option 2' ? 'bg-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-400'}`} 
                     onClick={() => handleSelectOption('Option 2')}
                  >
                     {t("apps")}
                  </li>
                  <li 
                     className={`px-4 py-2 cursor-pointer hover:underline 
                        ${selectedOption === 'Option 3' ? 'bg-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-400'}`} 
                     onClick={() => handleSelectOption('Option 3')}
                  >
                     Input Studios Chatify
                  </li>
                  <li 
                     className={`px-4 py-2 cursor-pointer hover:underline 
                        ${selectedOption === 'Option 4' ? 'bg-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-400'}`} 
                     onClick={() => handleSelectOption('Option 4')}
                  >
                     Input Studios Workspace
                  </li>
                  <li 
                     className={`px-4 py-2 cursor-pointer hover:underline 
                        ${selectedOption === 'Option 5' ? 'bg-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-400'}`} 
                     onClick={() => handleSelectOption('Option 5')}
                  >
                     Input Studios Wave
                  </li>
               </ul>
            )}
         </div>
         <div className="flex justify-center w-full mt-10">
            <div className="custom-flex theme-container browser bg-gray-200 dark:bg-gray-800 p-10 flex flex-col justify-center items-center w-full max-w-screen-2xl px-12">
               <div className="w-4/5 text-center mb-10">
                  <span className="text-3xl mt-2 block">{t("find_answer")}</span>
                  <div className="inline-block mt-10">
                     <CustomButton onClick={handleButtonClick}>{t("ask_new_question")}</CustomButton>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row justify-between w-full gap-y-8">
                  <div className="flex flex-col items-center">
                     <BsPeople className="text-4xl mb-2" />
                     <span className="font-bold">{t("count_visitors")}</span>
                     <span className='mt-4'>{t("average_daily_visitors")}</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <BsCardChecklist className="text-4xl mb-2" />
                     <span className="font-bold">6000</span>
                     <span className='mt-4'>{t("posts_daily")}</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <TbMessages className="text-4xl mb-2" />
                     <span className="font-bold">{t("hour_response_time")}</span>
                     <span className='mt-4'>{t("average_response_time")}</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <CiHeart className="text-4xl mb-2" />
                     <span className="font-bold">{t("count_annually")}</span>
                     <span className='mt-4'>{t("customers_helped_annually")}</span>
                  </div>
               </div>
            </div>
         </div>
         <h1 className='text-3xl'>{t("browse_products")}</h1>
         <div className={`grid my-12 mx-12 gap-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${products.length === 4 ? 'xl:grid-cols-4 2xl:grid-cols-4' : 'xl:grid-cols-5 2xl:grid-cols-6'}`}>
            {products.slice(0, 4).map(product => (
               <Link 
                  to={product.link} 
                  key={product.id} 
                  className="flex flex-col items-center w-[100px] p-2 relative group hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
               >
                  <img src={product.src} alt={product.text} className="w-full h-auto mb-2" />
                  <div className="flex justify-center">
                     <p className="text-center whitespace-nowrap">{product.text}</p>
                  </div>
               </Link>
            ))}
            {showAllProducts && products.slice(4).map(product => (
               <Link to={product.link} key={product.id} className="flex flex-col items-center w-[100px] p-2">
                  <img src={product.src} alt={product.text} className="w-full h-auto mb-2" />
                  <div className="flex justify-center">
                  <p className="text-center whitespace-nowrap">{product.text}</p>
                  </div>
               </Link>
            ))}
         </div>
         {products.length > 4 && (
            <div className="flex flex-row items-center cursor-pointer mb-10" onClick={handleToggleShowAllProducts}>
               <p>{t("view_all_products")}</p>
               <IoIosArrowDown className={`ml-2 transform ${showAllProducts ? 'rotate-180' : 'rotate-0'} transition-transform`} />
            </div>
         )}
      </div>
   );
}
