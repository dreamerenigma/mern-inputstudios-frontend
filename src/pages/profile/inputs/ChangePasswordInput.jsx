import { useState } from "react";
import { useSelector } from "react-redux";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PropTypes from "prop-types";

export default function ChangePasswordInput({ labelText, placeholderText, value, onChange }) {
   const { theme } = useSelector((state) => state.theme);
   const [passwordVisible, setPasswordVisible] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordVisible((prevVisible) => !prevVisible);
   };

   return (
      <div className="text-left">
         <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
            {labelText}
         </p>
         <div className="relative w-1/3 mt-2">
            <input
               type={passwordVisible ? "text" : "password"}
               placeholder={placeholderText}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className={`pl-3 ${theme === 'dark' ? 'bg-transparent' : 'bg-white'} border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-0 focus:border-teal-500`} 
            />
            {value.length > 0 && (
               <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
               >
                  {passwordVisible ? (
                     <IoEyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                     <IoEye className="w-5 h-5 text-gray-500" />
                  )}
               </button>
            )}
         </div>
      </div>
   );
}

ChangePasswordInput.propTypes = {
   labelText: PropTypes.string.isRequired,
   placeholderText: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
};
