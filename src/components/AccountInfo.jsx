import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import DeletePhoneDialog from "../pages/profile/dialogs/DeletePhoneDialog";

export default function AccountInfo() {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleOpenDialog = () => {
      setIsDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setIsDialogOpen(false);
   };

   const handleDelete = () => {
      handleCloseDialog();
   };

   return (
      <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
         <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
            <div className="flex items-center">
               <div className="flex flex-row items-center justify-between w-full pl-4 pt-3">
                  <div>
                     <span className="text-md font-semibold">Сведения о счете</span>
                  </div>
                  <div className="ml-auto">
                     <Link to={`${languagePrefix}/names/manage`} className="text-right mr-4 cursor-pointer text-teal-500 hover:text-teal-700 hover:underline">Изменить данные учетной записи</Link>
                  </div>
               </div>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4">
               <span>Адрес электронной почты</span>
               <span className="font-semibold">Hitmanki@yandex.ru</span>
               <span className="mx-2 w-[300px]">Адрес электронной почты, используемый для входа в учетную запись Майкрософт</span>
               <span className="ml-auto pr-2 text-teal-500 hover:text-teal-700 hover:underline cursor-pointer">Настройки общения</span>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="grid grid-cols-[250px_auto_1fr] items-start w-full pl-4 py-2 responsive-grid">
               <span className="inline-block text-left">Номер телефона</span>
               <span className="text-left">Нет</span>
               <div className="flex items-center justify-end w-full hide-below-1030px">
                  <span className="whitespace-normal text-left w-[300px]">
                     Ваш номер телефона используется для входа в учетную запись Input Studios
                  </span>
               </div>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div>
               <div className="grid grid-cols-[250px_auto_1fr] items-center w-full pl-4 py-2 responsive-grid">
                  <span className="inline-block text-left">Телефон подключен к компьютеру</span>
                  <span className="text-left font-semibold">+7 999 194-03-98</span>
                  <span className="mx-4 flex items-center justify-end text-left cursor-pointer" onClick={handleOpenDialog}>
                     <RiDeleteBin5Line size={24} className="mr-2 text-teal-500 " />
                     <span className="text-teal-500 hide-below-1030px">&quot;Удалить&quot;</span>
                  </span>
               </div>
               <DeletePhoneDialog
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                  onDelete={handleDelete}
               />
            </div>
            <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4 p-5">
               <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                     <Link to={`${languagePrefix}/names/manage`} className="text-teal-500 hover:underline hover:text-teal-700 text-left">
                        Предпочтения для входа
                     </Link>
                     <Link to={`${languagePrefix}/account-billing/how-to-close-your-input-studios-account`} className="pl-5 text-teal-500 hover:underline hover:text-teal-700 text-left">
                        Закрыть учетную запись
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
