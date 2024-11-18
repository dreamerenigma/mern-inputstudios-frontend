import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosMail, IoIosSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function UserView() {
   const [user, setUser] = useState({});
   const { currentUser } = useSelector(state => state.user);
   const [showDialog, setShowDialog] = useState(false);
   const [activeTab, setActiveTab] = useState(0);
   const navigate = useNavigate();
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      const getUser = async () => {
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
      getUser();
   }, [SERVER_URL, user.userId]);

   const handleClick = () => {
      if (!currentUser) {
         setShowDialog(true);
      } else {
         navigate(`${languagePrefix}/conversations/${user.username}`);
      }
   };

   const handleSettings = async () => {

   };

   const tabsContent = [
      <div key="tab-1" className="p-4 mb-3">
         <p className="font-semibold pb-2">Приглашен</p>
         <p className="pb-4">15 ноября 2024</p>
         <p className="font-semibold pb-1">Контактная информация</p>
         <div className="flex py-2">
            <img src="/images/apps/chatify/chatify_logo.png" alt="Chatify logo" className="w-6"/>
            <a href="https://chatify.ru/InputStudios" className="text-[15px] text-teal-500 px-3 hover:text-teal-600 hover:underline">Chatify: @InputStudios</a>
         </div>
         <div className="flex py-2">
            <img src="/images/user/social_vk_icon.png" alt="Vkontakte logo" className="w-6"/>
            <a href="https://vk.com/r3duct" className="text-[15px] text-teal-500 px-3 hover:text-teal-600 hover:underline">Vkontakte: r3duct</a>
         </div>
         <div className="flex py-2">
            <img src="/images/user/social_telegram_icon.png" alt="Telegram logo" className="w-6"/>
            <a href="https://t.me/R3DUCT" className="text-[15px] text-teal-500 px-3 hover:text-teal-600 hover:underline">Telegram: @R3DUCT</a>
         </div>
         <p className="pt-4">Состоит в лентах</p>
      </div>,
      <div key="tab-2" className="p-4 mb-3">
         <p>Контент второй вкладки</p>
      </div>,
      <div key="tab-3" className=" p-4 mb-3">
         <p>Контент третьей вкладки</p>
      </div>,
      <div key="tab-4" className=" p-4 mb-3">
         <p>Контент четвертой вкладки</p>
      </div>,
      <div key="tab-5" className=" p-4 mb-3">
         <p>Контент пятой вкладки</p>
      </div>,
   ];

   return (
      <div className="max-w-[1100px] mx-auto w-full min-h-screen mt-[60px] pt-4 mb-20">
         <Helmet>
            <title>{`${user.username} - Пользователь Input Studios`}</title>
         </Helmet>
         <div className="flex gap-4">
          {/* Левая колонка */}
            <div className="w-[1200px] flex flex-col">
               <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 shadow-md">
                  <div className="relative flex items-center justify-between my-1 text-gray-500 text-sm">
                     <div className="flex flex-col gap-1 text-left">
                        <Link
                        to={
                           currentUser
                              ? currentUser.isAdmin
                              ? `${languagePrefix}/dashboard?tab=profile`
                              : `${languagePrefix}/users/${currentUser.username}`
                              : `${languagePrefix}/users/Гость`
                        }
                        className="cursor-pointer flex items-center space-x-4"
                        >
                        <img
                           className="h-12 w-12 object-cover rounded-full"
                           src={currentUser ? currentUser.profilePicture : "/path/to/default-avatar.png"}
                           alt="Profile picture"
                        />
                        <div className="flex flex-row gap-4">
                           <div className="flex flex-col items-center">
                              <p className="text-lg text-green-500 font-semibold">
                              {currentUser ? 233 : "0"}
                              </p>
                              <p className="text-sm text-gray-400">Карма</p>
                           </div>
                           <div className="flex flex-col items-center">
                              <p className="text-lg text-purple-500 font-semibold">
                              {currentUser ? 9999 : "0"}
                              </p>
                              <p className="text-sm text-gray-400">Рейтинг</p>
                           </div>
                        </div>
                        </Link>
                        <Link
                           to={
                              currentUser
                                 ? currentUser.isAdmin
                                 ? `${languagePrefix}/dashboard?tab=profile`
                                 : `${languagePrefix}/users/${currentUser.username}`
                                 : "#"
                           }
                           className="text-base text-cyan-600 hover:underline"
                        >
                           @{currentUser ? user.username : "Гость"}
                        </Link>
                        <p className="text-base text-gray-400">
                           {currentUser ? (currentUser.isAdmin ? "Админ" : "Пользователь") : "Гость"}
                        </p>
                     </div>
                     <div className="absolute top-0 right-0 flex items-center gap-2">
                        {currentUser && (
                           <button
                              className="rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 transition-colors duration-300 p-2"
                              onClick={handleSettings}
                           >
                              <IoIosSettings size={24} className="text-white" />
                           </button>
                        )}
                        <button
                           className="rounded-lg bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:via-green-700 hover:to-teal-700 transition-colors duration-300 p-2"
                           onClick={handleClick}
                        >
                           <IoIosMail size={24} className="text-white" />
                        </button>
                        <Button outline gradientDuoTone="purpleToBlue" type="submit">
                           Подписаться
                        </Button>
                     </div>
                  </div>
                  {showDialog && !currentUser && (
                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-12 p-6 bg-white rounded-lg shadow-lg max-w-xs text-center">
                        <p className="text-lg font-semibold mb-4">Войдите в Input Studios,</p>
                        <p className="text-gray-500">чтобы отправить сообщение</p>
                     </div>
                  )}
               </div>
               <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 shadow-md">
                  <div className="w-full">
                     <div className="flex border-b border-gray-600 w-full gap-6 pl-4">
                        <button
                           className={`py-2 text-center ${
                              activeTab === 0 ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400"
                           }`}
                           onClick={() => setActiveTab(0)}
                        >
                           Профиль
                        </button>
                        <button
                           className={`py-2 text-center ${
                              activeTab === 1 ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400"
                           }`}
                           onClick={() => setActiveTab(1)}
                        >
                           Публикации
                        </button>
                        <button
                           className={`py-2 text-center ${
                              activeTab === 2 ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400"
                           }`}
                           onClick={() => setActiveTab(2)}
                        >
                           Комментраии
                        </button>
                        <button
                           className={`py-2 text-center ${
                              activeTab === 3 ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400"
                           }`}
                           onClick={() => setActiveTab(3)}
                        >
                           Закладки
                        </button>
                        <button
                           className={`py-2 text-center ${
                              activeTab === 4 ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-400"
                           }`}
                           onClick={() => setActiveTab(4)}
                        >
                           Подписчики
                        </button>
                     </div>
                     <div className="mt-4">
                        {tabsContent[activeTab]}
                     </div>
                  </div>
               </div>
            </div>
            {/* Правая колонка */}
            <div className="flex flex-col">
               <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 w-[330px] shadow-md">
                  <p className="text-sm text-gray-300">ИНФОРМАЦИЯ</p>
                  <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex flex-col gap-4 py-4">
                     <div className="grid grid-cols-2 justify-start text-sm">
                        <p className="font-semibold text-left">В рейтинге</p>
                        <p className="text-left pl-4">532-й</p>
                     </div>
                     <div className="grid grid-cols-2 justify-start text-sm">
                        <p className="font-semibold text-left">Зарегистрирован</p>
                        <p className="text-left pl-4">4 августа 2011</p>
                     </div>
                     <div className="grid grid-cols-2 justify-start text-sm">
                        <p className="font-semibold text-left">Активность</p>
                        <p className="text-left pl-4">сегодня в 22:12</p>
                     </div>
                  </div>
               </div>
               <div className="border border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3 w-[330px] shadow-md">
                  <p className="text-sm text-gray-300">ВКЛАД В INPUT STUDIOS</p>
                  <hr className="my-2 border-t border-gray-300 dark:border-gray-600" />
                  <div className="flex flex-col gap-6 py-4">
                     {[
                        { img: "/images/user/history_it.png", alt: "История IT", label: "История IT", score: 96.2, progress: 80 },
                        { img: "/images/user/smartphone.svg", alt: "Смартфоны", label: "Смартфоны", score: 145.3, progress: 50 },
                        { img: "/images/user/ai.svg", alt: "Искусственный интеллект", label: "Искусственный интеллект", score: 125.7, progress: 70 },
                        { img: "/images/user/it_company.png", alt: "IT-компания", label: "IT-компания", score: 723.1, progress: 35 },
                        { img: "/images/user/science.svg", alt: "Научно-популярное", label: "Научно-популярное", score: 365.4, progress: 90 },
                        { img: "/images/user/old_devices.png", alt: "Старое железо", label: "Старое железо", score: 754.0, progress: 60 },
                        { img: "/images/user/rocket.svg", alt: "Космонавтика", label: "Космонавтика", score: 91.7, progress: 30 },
                     ].map((item, index) => (
                        <div key={index} className="flex flex-col w-full">
                           <div className="flex items-center justify-between text-base w-full">
                              <div className="flex items-center w-full">
                                 <img src={item.img} alt={item.alt} className="w-8" />
                                 <div className="flex flex-col pl-4 w-full">
                                    <div className="flex items-center justify-between w-full">
                                       <p className="font-semibold text-left">{item.label}</p>
                                       <p className="font-semibold text-right text-green-500">{item.score}</p>
                                    </div>
                                    <div className="flex flex-col w-full mt-2">
                                       <div className="relative w-full h-[3px] rounded-full bg-gray-300">
                                          <div className="absolute top-0 left-0 h-[3px] rounded-full bg-gray-700" style={{ width: "100%" }}></div>
                                          <div className="absolute top-0 left-0 h-[3px] rounded-full bg-green-500" style={{ width: `${item.progress}%` }}></div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
