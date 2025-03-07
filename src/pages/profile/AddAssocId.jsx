import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AddAssocId() {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const [selectedAliasType, setSelectedAliasType] = useState('newEmail');

   const handleRadioChange = (event) => {
      setSelectedAliasType(event.target.value);
   };
   
   return (
      <div className="flex flex-col items-center min-h-screen mt-[50px] py-8">
         <Helmet>
            <title>Добавление псевдонима</title>
         </Helmet>
         <div className="mx-8 md:mx-24">
            <p className="text-4xl">Добавление псевдонима</p>
            <p className="mt-8">
               Ваша учетная запись может иметь несколько псевдонимов, каждый из которых позволяет входить на все устройства и во все службы, использующие учетную запись Input Studios. Ваши псевдонимы используют один общий пароль, и вы можете отправлять и получать почту при помощи каждого из псевдонимов.{" "}
               <Link to={`${languagePrefix}/account-billing/`} className="text-teal-500">
                  Подробности о псевдонимах учетной записи
               </Link>.
            </p>
            <div className="mt-4">
               <div className="flex items-center mb-4">
                  <input
                     type="radio"
                     id="newEmail"
                     name="aliasType"
                     value="newEmail"
                     checked={selectedAliasType === 'newEmail'}
                     onChange={handleRadioChange}
                     className="h-5 w-5 text-teal-500 border border-teal-500 focus:ring-0 mr-4"
                  />
                  <label htmlFor="newEmail" className="text-base">
                     Создать новый адрес электронной почты и добавить его как псевдоним
                  </label>
               </div>
               <div className="flex items-center mb-6">
                  <input
                     type="text"
                     className="w-[250px] py-2 px-4 border border-gray-300 dark:border-gray-600 bg-gray-500 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     placeholder="Введите новый адрес"
                  />
                  <span className="ml-2 text-gray-500">@inputstudios.ru</span>
               </div>
               <div className="flex items-center mb-4">
               <input
                     type="radio"
                     id="existingEmail"
                     name="aliasType"
                     value="existingEmail"
                     checked={selectedAliasType === 'existingEmail'}
                     onChange={handleRadioChange}
                     className="h-5 w-5 text-teal-500 border border-teal-500 focus:ring-0 mr-4"
                  />
                  <label htmlFor="existingEmail" className="text-base">
                     Добавить существующий адрес электронной почты как псевдоним учетной записи Input Studios
                  </label>
               </div>
               <div className="flex items-center mb-6">
                  <input
                     type="email"
                     className="w-[400px] py-2 px-4 border border-gray-300 dark:border-gray-600 bg-gray-500 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     placeholder="Введите существующий адрес"
                  />
               </div>
               <div className="mt-12 flex space-x-4">
                  <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                     Добавить псевдоним
                  </button>
                  <Link to={`${languagePrefix}/names/manage`}>
                     <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                        Отмена
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
