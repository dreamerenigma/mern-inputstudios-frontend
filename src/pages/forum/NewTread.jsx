import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import CustomCheckbox from "./checkboxes/CustomCheckbox";
import CustomInputWithToolbar from "./textinputs/CustomInputWithToolbar";
import { Dialog } from "@mui/material";

export default function NewTread() {
   const { t } = useTranslation();
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const [showDialog, setShowDialog] = useState(false);
   const [inputValue, setInputValue] = useState("Выберите");

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   useEffect(() => {
      const handleBeforeUnload = (event) => {
         event.preventDefault();
         setShowDialog(true);
         event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, []);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleSelect = (value) => {
      setInputValue(value);
      setIsOpen(false);
   };

   const handleConfirmLeave = () => {
      setShowDialog(false);
      window.location.reload();
   };

   return (
      <div className="relative mt-[60px] flex flex-col md:flex-row min-h-screen">
         <Helmet>
            <title>{t("home_title")}</title>
         </Helmet>
         <div className="mx-10 py-8 md:py-16 flex flex-col md:flex-row custom-mx-32 custom-mx-10">
            <div className="flex-1 mr-6">
               <h1 className="text-left text-3xl md:text-4xl font-semibold mb-6">Задать вопрос</h1>
               <p className="text-left mb-4">
                  Нужна справка по техническому вопросу или проблеме с продуктом? 
                  Лучший способ получить помощь от сообщества — задать вопрос.
               </p>
               <div className="md:hidden">
                  <p className="text-left text-3xl md:text-4xl font-semibold my-6 break-words">
                     Или... начните обсуждение!
                  </p>
                  <p className="text-left mb-2 break-words">
                     Обсуждайте новинки и делитесь открытиями, советами и рекомендациями с другими участниками сообщества.
                  </p>
                  <div className="flex items-center text-lg text-teal-500 underline py-2 rounded-md shadow-md group mb-6">
                     Начать обсуждение
                     <IoIosArrowForward className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1" />
                  </div>
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mb-2">Вопрос <span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     className="w-full mt-2 mb-6 p-2 border border-gray-600 dark:bg-gray-800 rounded focus:outline-none focus:ring-0 focus:border-teal-500"
                     placeholder="Введите ваш вопрос"
                  />
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mb-2">Подробности <span className="text-red-500">*</span></label>
               </div>
               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-2">
                  <div className="hidden md:flex justify-between">
                     <div className="flex-1">
                        <p className="mb-2 font-semibold">Задавайте хорошие вопросы:</p>
                        <div className="flex">
                           <ul className="list-disc ml-5 w-1/2">
                              <li>Опишите ситуацию подробно.</li>
                              <li>Обобщите проблему.</li>
                              <li>Вставьте сообщение об ошибке.</li>
                           </ul>
                           <ul className="list-disc ml-12 w-1/2">
                              <li>Добавьте сведения о системе.</li>
                              <li>Расскажите, что вы уже попробовали сделать.</li>
                              <li>Добавьте изображения.</li>
                           </ul>
                        </div>
                     </div>
                     <div className="border-l-2 border-gray-300 dark:border-gray-600 mx-4"></div>
                     <div className="flex-1">
                        <p className="mb-2 font-semibold">Воздерживайтесь от публикации персональных данных, которые могут поставить под угрозу вашу конфиденциальность</p>
                        <div className="flex">
                           <ul className="list-disc ml-5 w-1/2">
                              <li>адрес электронной почты</li>
                              <li>номер телефона</li>
                              <li>ключ продукта</li>
                           </ul>
                           <ul className="list-disc ml-12 w-1/2">
                              <li>пароль</li>
                              <li>номер кредитной карты</li>
                              <li>серийный номер продукта</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="md:hidden">
                     <p className="font-bold">Не следует:</p>
                     <p>Размещать личные сведения, такие как свой адрес электронной почты, номер телефона, ключ продукта, пароль, номер кредитной карты или любые другие сведения, которые могут поставить под угрозу вашу конфиденциальность.</p>
                  </div>
               </div>
               <div className="App mt-6">
                  <CustomInputWithToolbar />
               </div>
               <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mt-8">
                  <p className="text-left">
                     Ниже вы можете выбрать наиболее подходящий продукт и темы, чтобы сделать вашу публикацию заметной для нужных экспертов сообщества.
                  </p>
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mt-6">Продукты <span className="text-red-500">*</span></label>
               </div>
               <div className="relative flex max-w-md mt-4 shadow-md" ref={dropdownRef}>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-1 flex items-center">
                     <div className="flex-grow">
                        <input
                           type="text"
                           className="w-full p-2 bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-transparent rounded-l-md"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           placeholder="Выберите"
                        />
                     </div>
                     <div>
                        <button
                           onClick={handleToggle}
                           className="bg-gray-700 p-2 rounded-md flex items-center justify-center ml-2"
                        >
                           {isOpen ? <IoIosArrowUp className="text-white" /> : <IoIosArrowDown className="text-white" />}
                        </button>
                     </div>
                  </div>
                  {isOpen && (
                     <div className="absolute z-10 bg-white dark:bg-gray-700 rounded-md mt-1 w-full shadow-lg">
                        <ul className="space-y-0 text-sm">
                           {["Input Studios Workspace", "Input Studios Wave", "Chatify", "Quantum Engine", "Центр сообщества"].map((item, index, arr) => (
                              <li
                                 key={item}
                                 className={`px-4 py-2 cursor-pointer hover:bg-gray-500 hover:bg-opacity-70 transition duration-200 ${index === 0 ? 'rounded-t-md' : ''} ${index === arr.length - 1 ? 'rounded-b-md' : ''}`}
                                 onClick={() => handleSelect(item)}
                              >
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
               <div className="py-4 mt-4">
                  <div className="flex items-center space-x-4">
                     <CustomCheckbox
                        id="exampleCheckbox"
                        label="Уведомлять меня при размещении ответов на публикацию"
                        className="flex-none w-auto"
                     />
                  </div>
                  <div className="">
                     <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-md mr-6">
                        Отмена
                     </button>
                     <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-6 rounded-md">
                        Отправить
                     </button>
                  </div>
               </div>
            </div>
            <div>
               <div className="hidden md:block bg-white dark:bg-gray-700 rounded-md p-4 sm:p-6 md:p-8 mx-4 w-full sm:w-[320px] md:w-[190px] lg:w-[320px] xl:w-[320px]">
                  <p className="text-left text-lg font-semibold mb-2 break-words">
                     Или... начните обсуждение!
                  </p>
                  <p className="text-left mb-4 break-words">
                     Обсуждайте новинки и делитесь открытиями, советами и рекомендациями с другими участниками сообщества.
                  </p>
                  <button className="flex flex-col xl:flex-row items-center bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-md shadow-md group text-xs sm:text-sm md:text-base">
                     <span>Начать обсуждение</span>
                     <span className="ml-2 mt-2 md:mt-0 transition-transform duration-200 transform group-hover:translate-x-1">
                        <IoIosArrowForward />
                     </span>
                  </button>
               </div>
               <div className="ml-12 mt-12 md:w-[150px] lg:w-[280px] xl:w-[280px] hidden md:block">
                  <p className="text-2xl font-bold break-words">
                     Другие советы по постановке вопросов:
                  </p>
                  <ul className="list-disc ml-5 mt-1">
                  <li>Следите за уведомлениями по электронной почте или проверяйте свои сообщения, чтобы увидеть ответы (найдите свои сообщения и настройте параметры электронной почты в своем <a href="/profile" className="text-teal-500 hover:underline">профиле</a>).</li>
                     <li>Будьте готовы попробовать предлагаемые решения или предоставить другие сведения, которые могут потребоваться другим участникам сообщества, чтобы помочь вам.</li>
                     <li>Помогите другим участника сообщества узнать, если полученные вами ответы были полезными, используя кнопки Да и Нет под каждым сообщением.</li>
                  </ul>
               </div>
            </div>
         </div>
         <Dialog open={showDialog} onClose={handleConfirmLeave} sx={{backdrop: 'none', '& .MuiBackdrop-root': { backgroundColor: 'transparent' }}}></Dialog>
      </div>
   );
}
