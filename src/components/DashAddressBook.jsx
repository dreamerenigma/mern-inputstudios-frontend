import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SelectEmailDialog from "./dialogs/SelectEmailDialog";
import AddAddressDialog from "./dialogs/AddAddressDialog";

export default function DashAddressBook() {
   const [isSelectEmailDialogOpen, setIsSelectEmailDialogOpen] = useState(false);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [dialogType, setDialogType] = useState('');
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleOpenSelectEmailDialog = () => {
      setIsSelectEmailDialogOpen(true);
   };

   const handleCloseSelectEmailDialog = () => {
      setIsSelectEmailDialogOpen(false);
   };

   const handleOpenAddAddressDialog = (type) => {
      setDialogType(type);
      setDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setDialogOpen(false);
      setDialogType('');
   };

   const handleSaveAddress = () => {
      console.log("Адрес сохранен");
      handleCloseDialog();
   };

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)]">
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto">
            <div className="flex justify-between items-center mb-7">
               <h1 className="font-semibold text-3xl">Адресная книга</h1>
            </div>
            <div className="flex space-x-6">
               <div className="w-1/2">
                  <p className="font-bold text-lg">
                     Основные сведения о выставлении счетов
                  </p>
                  <p className="text-sm">
                     Лучший вариант для связи с вами по вопросам выставления счетов
                  </p>
                  <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md border border-gray-700">
                     <div className="flex space-x-6">
                        <div className="flex flex-col space-y-1 w-1/2 px-6 py-4">
                           <div className="text-base font-bold mb-2">Адрес</div>
                           <div className="text-sm">Андрей Трепалин</div>
                           <div className="text-sm">ул.Отрадная д.14 к.1 кв.13</div>
                           <div className="text-sm">Ульяновск</div>
                           <div className="text-sm">Ульяновская Область</div>
                           <div className="text-sm">Россия</div>
                           <div className="text-sm">432073</div>
                           <div className="text-sm">8991940398</div>
                        </div>
                        <div className="flex flex-col space-y-1 w-1/2 px-6 py-4">
                           <div className="text-base font-bold">Электронный адрес</div>
                           <div className="text-sm">Hitmanki@yandex.ru</div>
                           <div className="text-sm text-teal-500 hover:underline cursor-pointer" onClick={handleOpenSelectEmailDialog}>
                              Смена электронной почты
                           </div>
                           <SelectEmailDialog
                              isOpen={isSelectEmailDialogOpen}
                              onClose={handleCloseSelectEmailDialog}
                              onSave={handleSaveAddress}
                           />
                        </div>
                     </div>
                     <div className="mt-6 border-t border-gray-700"></div>
                     <div className="flex justify-between px-6 py-4">
                        <p 
                           className="text-sm text-teal-500 hover:underline cursor-pointer w-[200px]"
                           onClick={() => handleOpenAddAddressDialog('edit')}
                        >
                           Изменить адрес выставления счетов
                        </p>
                        <Link to={`${languagePrefix}/dashboard?tab=profile`} className="text-sm text-teal-500 hover:underline cursor-pointer w-[200px]">Управление адресами электронной почты</Link>
                     </div>
                  </div>
               </div>
               <div className="w-1/2">
                  <p className="font-bold text-lg">
                     Основной адрес доставки
                  </p>
                  <p className="text-sm">
                     Мы будем использовать этот адрес, если вы не выберете другой
                  </p>
                  <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md border border-gray-700">
                     <div className="flex space-x-6">
                        <div className="flex flex-col space-y-1 w-1/2 px-6 py-4">
                           <div className="text-base font-bold mb-2">Адрес</div>
                           <div className="text-sm">Андрей Трепалин</div>
                           <div className="text-sm">ул.Отрадная д.14 к.1 кв.13</div>
                           <div className="text-sm">Ульяновск</div>
                           <div className="text-sm">Ульяновская Область</div>
                           <div className="text-sm">Россия</div>
                           <div className="text-sm">432073</div>
                           <div className="text-sm">8991940398</div>
                        </div>
                     </div>
                     <div className="mt-6 border-t border-gray-700"></div>
                     <div className="flex justify-between px-6 py-4">
                        <div className="text-sm text-teal-500 hover:underline cursor-pointer w-[150px]">Изменить адрес доставки</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex justify-between items-center mt-12">
               <h1 className="font-semibold text-xl">Все адреса</h1>
               <div className="flex items-center text-teal-500">
                  <HiPlus size={22} />
                  <p className="text-xl ml-2 hover:underline cursor-pointer" onClick={() => handleOpenAddAddressDialog('add')}>
                     Добавить новый адрес
                  </p>
               </div>
               <AddAddressDialog
                  dialogType={dialogType}
                  setDialogType={setDialogType}
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                  onSave={handleSaveAddress}
               />
            </div>
            <div className="mt-6 border-t border-gray-800"></div>
            <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md max-w-lg mb-20 border border-gray-700">
               <div className="flex space-x-6">
                  <div className="flex flex-col space-y-1 w-1/2 px-6 py-4">
                     <div className="text-base font-bold mb-2">Адрес</div>
                     <div className="text-sm">Андрей Трепалин</div>
                     <div className="text-sm">ул.Отрадная д.14 к.1 кв.13</div>
                     <div className="text-sm">Ульяновск</div>
                     <div className="text-sm">Ульяновская Область</div>
                     <div className="text-sm">Россия</div>
                     <div className="text-sm">432073</div>
                     <div className="text-sm">8991940398</div>
                  </div>
               </div>
               <div className="mt-6 border-t border-gray-700"></div>
               <div className="flex justify-between px-6 py-4">
                  <div className="text-sm text-teal-500 hover:underline cursor-pointer">Изменить адрес</div>
                  <div className="text-sm text-teal-500 hover:underline cursor-pointer">Удалить адрес</div>
                  <div className="text-sm text-teal-500 hover:underline cursor-pointer">Сделать основным адресом</div>
               </div>
            </div>
         </div>
      </div>
   );
}
