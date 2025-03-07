import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { getCountriesIndex } from "../../../redux/countryIndex";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

export default function AddPhoneDialog({ isOpen, onClose }) {
   const [selectedCountry, setSelectedCountry] = useState('+7');
   const [phoneNumber, setPhoneNumber] = useState("");
   const [error, setError] = useState("");
   const countriesIndex = getCountriesIndex('ru');
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef(null);
   const dialogRef = useRef(null);
   
   useEffect(() => {
      const savedCountry = localStorage.getItem('selectedCountry');
      if (savedCountry) {
         setSelectedCountry(savedCountry);
      }
   }, []);

   useEffect(() => {
      if (selectedCountry) {
         localStorage.setItem('selectedCountry', selectedCountry);
      }
   }, [selectedCountry]);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            onClose();
         } 
         else if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
         }
      };
   
      document.addEventListener('mousedown', handleClickOutside);
   
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [onClose]);

   const toggleDropdown = (event) => {
      event.stopPropagation();
      setIsDropdownOpen(!isDropdownOpen);
   };
   
   const handleSelect = (value, event) => {
      event.stopPropagation();
      setSelectedCountry(value);
      setIsDropdownOpen(false);
   };

   const handleNext = () => {
      if (!phoneNumber) {
         setError("Эти сведения обязательны");
      } else {
         setError("");
         console.log("Номер телефона:", selectedCountry + phoneNumber);
         onClose();
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div
            ref={dialogRef}
            className="border border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-[550px] relative shadow-md"
         >
            <div className="flex justify-between items-center mb-4 px-4">
               <p className="text-xl font-semibold py-4 px-2">Добавление номера телефона</p>
               <button onClick={onClose} className="p-1 hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600 rounded-md">
                  <AiOutlineClose size={20} />
               </button>
            </div>
            <div className="relative w-full px-6 flex flex-col">
               <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Выберите страну
               </label>
               <div
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer flex items-center justify-between"
                  onClick={toggleDropdown} 
               >
                  <span>
                     {countriesIndex.find((country) => country.value === selectedCountry)?.label} ({selectedCountry})
                  </span>
                  <FaChevronDown
                     className={`text-gray-500 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
               </div>
               {isDropdownOpen && (
                  <div
                     ref={dropdownRef}
                     className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 custom-scrollbar mt-2"
                  >
                     {countriesIndex.map((country) => (
                        <div
                           key={country.value}
                           className="px-4 py-2 hover:bg-gray-500/60 hover:text-white cursor-pointer"
                           onClick={(event) => handleSelect(country.value, event)}
                        >
                           {country.label} ({country.value})
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <div className="px-6 mb-6 mt-6">
               <label htmlFor="phoneNumber" className="block text-sm font-medium">Номер телефона</label>
               <div className="flex items-center mt-2">
                  <input
                     id="phoneNumber"
                     type="text"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     placeholder="Введите номер"
                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex justify-between px-6 py-4 gap-2">
               <button onClick={handleNext} className="w-full px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                  Далее
               </button>
               <button
                  onClick={onClose}
                  className="w-full px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
               >
                  Отмена
               </button>
            </div>
         </div>
      </div>
   );
}

AddPhoneDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};
