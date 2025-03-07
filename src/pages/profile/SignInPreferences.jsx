import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function SignInPreferences() {
   const [isEmailChecked, setIsEmailChecked] = useState(false);
   const [isPhoneChecked, setIsPhoneChecked] = useState(false);

   useEffect(() => {
      const savedEmailChecked = JSON.parse(localStorage.getItem('isEmailChecked')) || false;
      const savedPhoneChecked = JSON.parse(localStorage.getItem('isPhoneChecked')) || false;

      setIsEmailChecked(savedEmailChecked);
      setIsPhoneChecked(savedPhoneChecked);
   }, []);

   const handleCheckboxChange = (e, type) => {
      const { checked } = e.target;
      if (type === 'email') {
         setIsEmailChecked(checked);
         localStorage.setItem('isEmailChecked', JSON.stringify(checked));
      } else if (type === 'phone') {
         setIsPhoneChecked(checked);
         localStorage.setItem('isPhoneChecked', JSON.stringify(checked));
      }
   };

   return (
      <div className="flex flex-col items-center min-h-screen mt-[50px] py-8">
         <Helmet>
            <title>Параметры входа</title>
         </Helmet>
         <div className="mx-8 md:mx-24">
            <p className="text-4xl">Параметры входа</p>
            <p className="mt-8">
               Выберите псевдонимы, которым разрешен вход в вашу учетную запись. Для повышения безопасности разрешите вход только с тех почтовых ящиков, номеров телефонов или имен Chatify, которые вы отслеживаете.
            </p>
            <div className="mt-6 space-y-4">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="email"
                     checked={true}
                     disabled
                     className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                  />
                  <label htmlFor="email" className="text-base cursor-pointer text-gray-500">Hitmanki@yandex.ru (основной псевдоним)</label>
               </div>
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="phone"
                     checked={isPhoneChecked}
                     onChange={(e) => handleCheckboxChange(e, 'phone')}
                     className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                  />
                  <label htmlFor="phone" className="text-base cursor-pointer">hitmanki</label>
               </div>
            </div>
            <div className="mt-12 flex space-x-4">
               <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                  Сохранить
               </button>
               <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                  Отмена
               </button>
            </div>
         </div>
      </div>
   );
}
