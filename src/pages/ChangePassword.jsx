import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ChangePasswordInput from "./profile/inputs/ChangePasswordInput";

export default function ChangePassword() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [reenterPassword, setReenterPassword] = useState("");
   const [isChanged, setIsChanged] = useState(false);
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';


   const handleCancelClick = () => {
      navigate(`${languagePrefix}/dashboard?tab=security`);
   };

   useEffect(() => {
      const isAnyFieldFilled =
         currentPassword.trim() !== "" || 
         newPassword.trim() !== "" || 
         reenterPassword.trim() !== "";
      setIsChanged(isAnyFieldFilled);
   }, [currentPassword, newPassword, reenterPassword]);

   const handlePasswordChange = async () => {
      if (newPassword !== reenterPassword) {
         alert(t("profile:passwords_do_not_match"));
         return;
      }
      try {
         const res = await fetch(`${SERVER_URL}/api/password/change`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPassword, newPassword })
         });
         const data = await res.json();
         if (res.ok && data.success) {
            alert(t("profile:password_updated_successfully"));
            navigate(`${languagePrefix}/dashboard?tab=security`);
         } else {
            alert(data.message || t("profile:password_update_failed"));
         }
      } catch (error) {
         console.error(error);
         alert(t("profile:password_update_failed"));
      }
   };

   return (
      <div className="ml-6 mt-[60px]">
         <div className="ml-6 pt-6">
            <p className="text-3xl mb-6">{t("profile:change_your_password")}</p>
            <p className="text-md">{t("profile:strong_password_helps")}</p>
         </div>
         <div className="ml-6">
            <div className="text-left mb-4 mt-6">
               <ChangePasswordInput 
                  labelText={t("profile:current_password")}
                  placeholderText={t("profile:current_password")}
                  value={currentPassword}
                  onChange={setCurrentPassword}
               />
               <Link to="/password/reset" className="text-teal-500 block">
                  {t("profile:forgot_your_password")}
               </Link>
            </div>
         </div>
         <div className="text-left mb-4 ml-6">
            <ChangePasswordInput 
               labelText={t("profile:new_password")}
               placeholderText={t("profile:new_password")}
               value={newPassword}
               onChange={setNewPassword}
            />
            <p className="text-sm">{t("profile:character_minimum")}</p>
         </div>
         <div className="ml-6">
            <div className="text-left mb-2">
               <ChangePasswordInput 
                  labelText={t("profile:reenter_password")}
                  placeholderText={t("profile:reenter_password")}
                  value={reenterPassword}
                  onChange={setReenterPassword}
               />
            </div>
            <div className="flex items-center mt-8">
               <input
                  type="checkbox"
                  id="change-password"
                  className="appearance-none h-5 w-5 border border-gray-500 rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-2 cursor-pointer"
               />
               <label htmlFor="change-password" className="font-semibold text-gray-700 dark:text-gray-200">
                  {t("profile:make_me_change_password")}
               </label>
               </div>
         </div>
         <div className="flex justify-left gap-2 ml-6 mt-16 mb-20">
            <button
               className={`${
                  isChanged
                     ? "bg-teal-500 hover:bg-teal-700"
                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
               } text-white py-2 px-4 rounded-md`}
               disabled={!isChanged}
               onClick={handlePasswordChange}
            >
               {t("profile:save")}
            </button>
            <button 
               className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-7 rounded-md"
               onClick={handleCancelClick}
            >
               {t("profile:cancel")}
            </button>
         </div>
      </div>
   );
}
