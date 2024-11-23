import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function CustomSelect({ t, setFormData, formData }) {
   const dropdownRef = useRef(null);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(t("posts:select_category"));
   const [isActive, setIsActive] = useState(false);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const handleSelect = (category) => {
      setSelectedCategory(category);
      setFormData({ ...formData, category: category });
      setIsOpen(false);
   };

   const handleBlur = () => {
      if (!isOpen) {
         setIsActive(false);
      }
   };

   const handleFocus = () => {
      setIsActive(true);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsActive(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div className="relative inline-block" ref={dropdownRef}>
         <div
            className={`border border-gray-300 dark:border-gray-700 bg-gray-300 dark:bg-gray-800 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer 
               ${isOpen || isActive ? 'border-teal-500 dark:border-teal-500 text-white' : ''}`}
            onClick={toggleDropdown}
            onBlur={handleBlur}
            onFocus={handleFocus}
            tabIndex={0}
         >
            <span>{selectedCategory}</span>
            <IoIosArrowDown
               className={`ml-6 transition-transform duration-300 transform ${isOpen ? "rotate-180" : ""}`}
               size={16}
            />
         </div>
         {isOpen && (
            <ul className="absolute left-0 mt-2 w-full bg-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
               <li>
                  <button
                     className="block px-4 py-2 text-gray-800 dark:text-gray-200 w-full text-left opacity-50"
                     onClick={() => handleSelect(t("posts:select_category"))}
                     disabled
                  >
                     {t("posts:select_category")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect(t("posts:category_artificial_intelligence"))}
                  >
                     {t("posts:category_artificial_intelligence")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect("Android")}
                  >
                     Android
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect(t("posts:category_cosmos"))}
                  >
                     {t("posts:category_cosmos")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect(t("posts:category_database"))}
                  >
                     {t("posts:category_database")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect(t("posts:category_game_dev"))}
                  >
                     {t("posts:category_game_dev")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect("JavaScript")}
                  >
                     JavaScript
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect("Next.js")}
                  >
                     Next.js
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect("React.js")}
                  >
                     React.js
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full"
                     onClick={() => handleSelect(t("posts:category_science"))}
                  >
                     {t("posts:category_science")}
                  </button>
               </li>
               <li>
                  <button
                     className="text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700/60 w-full rounded-b-md"
                     onClick={() => handleSelect("Unreal Engine")}
                  >
                     Unreal Engine
                  </button>
               </li>
            </ul>
         )}
      </div>
   );
}

CustomSelect.propTypes = {
   formData: PropTypes.string.isRequired,
   setFormData: PropTypes.func.isRequired,
   t: PropTypes.func.isRequired,
};
