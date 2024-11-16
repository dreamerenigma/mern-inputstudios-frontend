import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ManageSignInService() {
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="mt-[60px] flex flex-col items-center  min-h-screen">
         <div className="mx-24">
            <p className="text-4xl">Управление входом в службы Input Studios</p>
            <p className="mt-8">
               Псевдоним учетной записи — это адрес электронной почты, номер телефона или имя Chatify, которые используются для входа в учетную запись Input Studios. У вас может быть несколько псевдонимов для использования в службах Input Studios, таких как Outlook.com, Skype, FlareDrive, Workspace, Gamebox и многих других.
            </p>
            <p className="mt-6">
               Основной псевдоним вашей учетной записи отображается на устройствах Input Studios (таких как компьютер с Windows, Gamebox или Windows Phone), и вы можете в любое время выбрать в качестве основного другой псевдоним. {" "}
               <Link to={`${languagePrefix}/names/manage`} className="text-teal-500 hover:underline">Дополнительные сведения о псевдонимах учетной записи.</Link>
            </p>
            <div className="mt-12">
               <p className="text-xl">Псевдоним учетной записи</p>
               <hr className="my-4 border-gray-800" />
               <div className="flex items-center space-x-52">
                  <p>Hitmanki@yandex.ru (основной псевдоним)</p>
                  <button className="text-teal-500">Удалить</button>
               </div>
               <div className="mt-4 space-y-2">
                  <p  className="mb-6">hitmanki</p>
                  <p>
                     <Link className="text-teal-500">Добавить адрес электронной почты</Link>
                  </p>
                  <p>
                     <Link className="text-teal-500">Добавить номер телефона</Link>
                  </p>
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
                     <Link className="text-teal-500">Изменить параметры входа</Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
