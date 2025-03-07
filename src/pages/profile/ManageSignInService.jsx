import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPhoneDialog from "./dialogs/AddPhoneNumber";
import { useState } from "react";
import SelectNicknameDialog from "./dialogs/SelectNicknameDialog";

export default function ManageSignInService() {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [isNicknameDialogOpen, setIsNicknameDialogOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleOpenDialog = () => {
      setIsDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setIsDialogOpen(false);
   };

   const handleOpenNicknameDialog = () => {
      setIsNicknameDialogOpen(true);
   };

   const handleCloseNicknameDialog = () => {
      setIsNicknameDialogOpen(false);
   };

   return (
      <div className="flex flex-col items-center min-h-screen mt-[50px] py-8">
         <div className="mx-6 md:mx-24">
            <p className="text-4xl">Управление входом в службы Input Studios</p>
            <p className="mt-8">
               Псевдоним учетной записи — это адрес электронной почты, номер телефона или имя Chatify, которые используются для входа в учетную запись Input Studios. У вас может быть несколько псевдонимов для использования в службах Input Studios, таких как Outlook.com, Skype, FlareDrive, Workspace, Gamebox и многих других.
            </p>
            <p className="mt-4">
               Основной псевдоним вашей учетной записи отображается на устройствах Input Studios (таких как компьютер с Windows, Gamebox или Windows Phone), и вы можете в любое время выбрать в качестве основного другой псевдоним. {" "}
               <Link to={`${languagePrefix}/names/manage`} className="text-teal-500 hover:underline">Дополнительные сведения о псевдонимах учетной записи.</Link>
            </p>
            <div className="mt-12">
               <p className="text-xl">Псевдоним учетной записи</p>
               <hr className="my-4 border-gray-800" />
               <div className="">
                  <div className="flex flex-col md:flex-row">
                     <p>Hitmanki@yandex.ru (основной псевдоним)</p>
                     <p
                        className="text-teal-500 cursor-pointer xl:mt-0 md:ml-32 xl:ml-52"
                        onClick={handleOpenNicknameDialog}
                     >
                        Удалить
                     </p>
                  </div>
                  <SelectNicknameDialog 
                     isOpen={isNicknameDialogOpen} 
                     onClose={handleCloseNicknameDialog} 
                  />
               </div>
               <div className="mt-4 space-y-2">
                  <p  className="mb-6">hitmanki</p>
                  <p>
                     <Link to={`${languagePrefix}/add-assoc-id`} className="text-teal-500">Добавить адрес электронной почты</Link>
                  </p>
                  <div className="">
                     <p className="">
                        <Link className="text-teal-500" onClick={handleOpenDialog}>Добавить номер телефона</Link>
                     </p>
                     <AddPhoneDialog 
                        isOpen={isDialogOpen} 
                        onClose={handleCloseDialog} 
                     />
                  </div>
               </div>
            </div>
            <div className="mt-12">
               <p className="text-xl">Параметры входа</p>
               <hr className="my-4 border-gray-800" />
               <div className="flex items-center space-x-52">
                  <p>Чтобы затруднить несанкционированный доступ к вашей учетной записи, выключите параметры входа для неиспользуемых адресов электронной почты, номеров телефонов и имен Skype.</p>
               </div>
               <div className="mt-4 space-y-2">
                  <p className="mt-6">
                     <Link to={`${languagePrefix}/sign-in-preferences`} className="text-teal-500">Изменить параметры входа</Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
