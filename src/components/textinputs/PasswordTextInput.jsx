import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PropTypes from "prop-types";

export default function PasswordTextInput({
   type = "text",
   placeholder = "",
   value,
   onChange,
   icon,
   isPassword = false,
   iconPosition = "right",
   placeholderColor = "text-gray-500",
   ...props
}) {
   const [passwordVisible, setPasswordVisible] = useState(false);

   const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible);
   };

   return (
      <div className="relative w-full">
         <input
            type={isPassword ? (passwordVisible ? "text" : "password") : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className={`w-full h-11 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg text-base pr-10 ${placeholderColor} focus:border-teal-400 dark:focus:ring-2 focus:ring-teal-400`}
            {...props}
         />
         {iconPosition === "right" && value.length > 0 && (
            <button
               type="button"
               onClick={isPassword ? handleTogglePassword : undefined}
               className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
            >
               {isPassword ? (
                  passwordVisible ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />
               ) : (
                  icon
               )}
            </button>
         )}
      </div>
   );
}

PasswordTextInput.propTypes = {
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   icon: PropTypes.element,
   isPassword: PropTypes.bool,
   iconPosition: PropTypes.oneOf(["right", "left"]),
   placeholderColor: PropTypes.string,
};

PasswordTextInput.defaultProps = {
   type: "text",
   placeholder: "",
   icon: null,
   isPassword: false,
   iconPosition: "right",
   placeholderColor: "text-gray-500",
};
