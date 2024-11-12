import { useState } from 'react';
import { FaCheck } from "react-icons/fa6";

const CustomCheckbox = () => {
   const [isChecked, setIsChecked] = useState(false);
   const [isHovered, setIsHovered] = useState(false);

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   return (
      <div className="flex items-center mb-4">
         <input
            type="checkbox"
            id="exampleCheckbox"
            className="hidden"
            checked={isChecked}
            onChange={handleCheckboxChange}
         />
         <span
            onClick={handleCheckboxChange}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ${
               isChecked ? 'bg-teal-500 border-teal-500' : 'bg-white border-gray-400'
            } flex-shrink-0`}
         >
            {(isChecked || (isHovered && !isChecked)) && (
               <FaCheck className={`text-white transition-opacity duration-200 ${isChecked || isHovered ? 'opacity-100' : 'opacity-0'}`} />
            )}
         </span>
         <label htmlFor="exampleCheckbox" className="text-gray-700 dark:text-gray-300 ml-3">
            Уведомлять меня при размещении ответов на публикацию
         </label>
      </div>
   );
};

export default CustomCheckbox;
