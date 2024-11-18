import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Conversations() {
   const [user, setUser] = useState({});
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const navigate = useNavigate();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const getUser = async () => {
         if (user.userId) {
            try {
               const res = await fetch(`${SERVER_URL}/api/user/${user.userId}`);
               const data = await res.json();
               if (res.ok) {
                  setUser(data);
               }
            } catch (error) {
               console.log(error.message);
            }
         }
      };
      getUser();
   }, [SERVER_URL, user.userId]);

   const handleBackClick = () => {
      navigate(-1);
   };

   return (
      <div className="pt-3 mb-20 min-h-screen mt-[60px] flex flex-col items-center justify-start">
         <Helmet>
            <title>{`Диалог с @${user.username || 'Пользователь'} - Input Studios`}</title>
         </Helmet>
         <div className="flex flex-col lg:flex-row gap-4 w-full max-w-5xl justify-center">
            <div className="mb-3 border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg lg:w-3/4 overflow-hidden">
               <div className="flex items-center px-4 py-2">
                  <IoArrowBackOutline className="text-gray-600 dark:text-gray-400 cursor-pointer" size={24} onClick={handleBackClick} />
                  <div className="flex items-center gap-2 ml-4">
                     <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover"
                     />
                     <div>
                        <p className="text-lg font-semibold dark:text-gray-100 text-teal-500">
                           @{user.username}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                        </p>
                     </div>
                  </div>
               </div>
               <hr className="border-t border-gray-300 dark:border-gray-600" />
               <div className="text-center py-4 space-y-2 h-[600px] flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                     Здесь пока нет сообщений
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex justify-center items-center gap-1">
                     <p>Защита от спама reCAPTCHA.</p>
                     <Link to={`${languagePrefix}/privacy`} className="text-teal-500 hover:underline">Политика конфиденциальности.</Link>
                     <Link to={`${languagePrefix}/terms-of-use`} className="text-teal-500 hover:underline">Условия использования.</Link>
                  </div>
               </div>
               <hr className="border-t border-gray-300 dark:border-gray-600" />
               <div className="flex items-end mt-2 mb-4 ml-1 mr-4">
                  <textarea
                     placeholder="Ваше сообщение"
                     className="w-full border-none bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-0 focus:border-teal-500 resize-none custom-scrollbar"
                     rows="3"
                  />
                  <button
                     className="rounded-lg bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 hover:bg-gradient-to-r hover:from-blue-600 hover:via-green-600 hover:to-teal-600 transition-colors duration-300 p-2"
                  >
                     Отправить
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
