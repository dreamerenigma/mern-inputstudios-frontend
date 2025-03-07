import { Footer } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsDribbble } from "react-icons/bs";
import { FaFigma, FaRss } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { RxDiscordLogo } from "react-icons/rx";
import { SlSocialVkontakte } from "react-icons/sl";
import data from "../../data/companyNewsData";
import projectsData from "../../data/projectsNewsData";
import { Helmet } from "react-helmet";
import { IoIosArrowForward } from "react-icons/io";

export default function CompanyNews() {
   const { t } = useTranslation();
   const companyNewsData = data.companyNewsData;
   const { projectsNewsData } = projectsData;

   return (
      <div className="min-h-screen mt-[60px] flex flex-col justify-between">
         <Helmet>
            <title>Input Studios | Информация для прессы</title>
         </Helmet>
         <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 mb-4">
            {/* Первая колонка */}
            <div className="relative h-[700px] shadow-md">
               <img 
                  src="/images/news/1.jpg" 
                  alt="Tall Image" 
                  className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 cursor-pointer">
                  <p className="text-white text-xl">
                     Input Studios Chatify отмечает годовщину
                     <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                  </p>
               </div>
            </div>
            {/* Вторая колонка */}
            <div className="relative flex flex-col space-y-4 h-full">
               <div className="relative w-full shadow-md">
                  <img 
                     src="/images/news/2.jpg" 
                     alt="Medium Image" 
                     className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 cursor-pointer">
                     <p className="text-white text-xl font-semibold">
                        Поиски Немо с воздуха
                        <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                     </p>
                  </div>
               </div>
               <div className="relative w-full shadow-md">
                  <img 
                     src="/images/news/3.jpg" 
                     alt="Medium Image" 
                     className="w-full h-[284px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 cursor-pointer">
                     <p className="text-white text-xl font-semibold">
                        Новая эра ПК
                        <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                     </p>
                  </div>
               </div>
            </div>
            {/* Третья колонка */}
            <div className="relative flex flex-col space-y-4 h-full">
               <div className="relative w-full shadow-md">
                  <img 
                     src="/images/news/4.jpg" 
                     alt="Small Image" 
                     className="w-full h-[284px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 cursor-pointer">
                     <p className="text-white text-xl font-semibold">
                        Борьба с пищевыми отходами: от фермы до вилки
                        <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                     </p>
                  </div>
               </div>
               <div className="relative w-full shadow-md">
                  <img 
                     src="/images/news/5.jpg" 
                     alt="Tall Image"
                     className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 cursor-pointer">
                     <p className="text-white text-xl font-semibold">
                        Азбука безопасности
                        <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="mx-auto px-4 xl:px-20 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Первая колонка */}
               <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Лента</h2>
                  <div className="space-y-4">
                     {companyNewsData.map((item, index) => (
                        <div
                           key={index}
                           className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
                        >
                           <div className="text-base cursor-pointer hover:underline p-2">
                              <span className="cursor-pointer group-hover:underline">
                                 {item.text}
                                 <IoIosArrowForward size={20} className="mx-[2px] inline-flex items-center cursor-pointer group-hover:underline" />
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               {/* Вторая колонка */}
               <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Проекты</h2>
                  <div className="space-y-4">
                     {projectsNewsData.map((project) => (
                        <div
                           key={project.id}
                           className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
                        >
                           <img
                              src={project.image}
                              alt={project.text}
                              className="w-full h-52 object-cover rounded-t-lg cursor-pointer"
                           />
                           <div className="text-base text-left px-6 py-4 w-full flex items-center space-x-2 group">
                              <span className="cursor-pointer group-hover:underline">
                                 {project.text}
                                 <IoIosArrowForward size={28} className="pl-2 inline-flex items-center cursor-pointer group-hover:underline" />
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               {/* Третья колонка */}
               <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Для СМИ</h2>
                  <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
                     <p className="text-base font-semibold">Информация о компании</p>
                     <p className="my-5">Миссия компании Input Studios – дать возможность каждому человеку и организации на планете достичь большего.</p>
                     <p className="mb-5">Input Studios обеспечивает условия для цифровой трансформации в эпоху «интеллектуального облака» и «интеллектуальных технологий».</p>
                     <p className="my-5 text-base font-semibold">Контактная информация для СМИ:</p>
                     <p className="mb-5">Представители СМИ могут получить дополнительную информацию в IS TEAM D.O.O по адресу press@is-team.ru или по телефону +79991940398.</p>
                     <p>Обращаем внимание, что какие-либо другие обращения, не относящиеся к запросам от СМИ, отправленные по указанному адресу, LBS TEAM D.O.O не рассматриваются.</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full bg-gray-800 text-white py-4 mt-20">
            <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4">
               <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <p className="text-lg">Подписывайтесь на нас:</p>
                  <button>
                     <FaRss className="text-gray-500 text-xl" />
                  </button>
               </div>
               <div className="flex flex-col md:flex-row gap-4 pr-4 lg:px-32 transition-opacity duration-300">
                  <p>{t("home_subscribe_news")}</p>
                  <div className="flex flex-wrap gap-4">
                     <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
                     <Footer.Icon href="https://discord.com/inputstudios" target="_blank" icon={RxDiscordLogo} />
                     <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={AiOutlineYoutube} />
                     <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={FaFigma} />
                     <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={FiGithub} />
                     <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
