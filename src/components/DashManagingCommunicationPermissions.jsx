import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashManagingCommunicationPermissions() {
   const { t } = useTranslation();
   const [isChecked, setIsChecked] = useState({ chatify: false, communicationsPartners: false, information: false });
   const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      setIsChecked({
         chatify: true,
         communicationsPartners: true,
         information: false,
      });
   }, []);

   const handleCheckboxChange = (id) => {
      setIsChecked(prevState => {
         const newState = { ...prevState };

         if (id === "information") {
            if (newState.information) {
               for (let key in newState) {
                  if (key !== "information") {
                     newState[key] = true;
                  }
               }
               newState["information"] = false;
            } else {
               newState["information"] = true;
               for (let key in newState) {
                  if (key !== "information") {
                     newState[key] = false;
                  }
               }
            }
         } else {
            newState[id] = !newState[id];
         }
         setIsSaveButtonActive(Object.values(newState).includes(false));
         return newState;
      });
   };

   return (
      <div className="min-h-screen mb-20 my-7">
         <Helmet>
            <title>{t("privacy:title")}</title>
            <link rel="icon" type="image/png" href="/icons/favicon.ico" />
         </Helmet>
         <div className="flex items-center mx-[198px] space-x-2">
            <Link 
               to={`${languagePrefix}/dashboard?tab=privacy`} 
               className="text-2xl text-gray-400 hover:bg-gray-400/10 hover:rounded-lg transition px-2 py-1"
            >
               Профиль
            </Link>
            <IoIosArrowForward size={24} className="ml-auto mt-1" />
            <span 
               className="text-2xl font-semibold flex-1" 
               style={{ flexShrink: 0 }}
            >
               Управление разрешениями связи
            </span>
         </div>
         <div className="flex flex-col items-start mt-12 mx-52">
            <p className="font-semibold pb-4">Для электронного адреса Hitmanki@yandex.ru</p>
            <p className="text-[15px]">Чтобы прекратить получение сообщений по темам, указанным ниже, снимите флажки для всех соответствующих тем и нажмите <b>Сохранить</b></p>
         </div>
         <div className="flex flex-col items-start mt-12 mx-52 space-y-4">
            <div className="flex flex-col items-start pb-4">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="chatify"
                     className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                     checked={isChecked.chatify}
                     onChange={() => handleCheckboxChange("chatify")}
                  />
                  <label htmlFor="chatify" className="text-gray-700 dark:text-gray-200 font-semibold">
                     Chatify
                  </label>
               </div>
               <p className="text-gray-400 ml-9">
                  Inform me about new products, features and special offers
               </p>
            </div>
            <div className="flex flex-col items-start pb-4">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="communications-partners"
                     className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                     checked={isChecked.communicationsPartners}
                     onChange={() => handleCheckboxChange("communicationsPartners")}
                  />
                  <label htmlFor="communications-partners" className="text-gray-700 dark:text-gray-200 font-semibold">
                     Communications from Input Studios Partners
                  </label>
               </div>
               <p className="text-gray-400 ml-9">
                  I would like to hear from Input Studios Partners, or Input Studios on their behalf, about their products, services, and events. Share or use my details with Input Studios Partners.
               </p>
            </div>
            <div className="flex flex-col items-start pb-4">
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     id="information"
                     className="appearance-none h-5 w-5 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 mr-4 cursor-pointer"
                     checked={isChecked.information}
                     onChange={() => handleCheckboxChange("information")}
                  />
                  <label htmlFor="information" className="text-gray-700 dark:text-gray-200 font-semibold">
                     Не отправлять рекламные письма или информационные бюллетени.
                  </label>
               </div>
               <p className="text-gray-400 ml-9">
                  Вы по-прежнему будете получать периодические счета, уведомления о безопасности и письма, которые являются частью службы или программы.
               </p>
            </div>
            <div>
               <button 
                  className={`py-1.5 px-4 rounded-md shadow-md 
                     ${isSaveButtonActive ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-700'}`} 
                  disabled={!isSaveButtonActive}
               >
                  Сохранить
               </button>
            </div>
         </div>
      </div>
   );
}
