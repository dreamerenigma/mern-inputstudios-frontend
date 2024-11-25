import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { FaFigma, FaWindows } from "react-icons/fa";
import QuantumEngineCard from "../../components/cards/QuantumEngineCard";
import { cardsData } from "../../redux/cardsData";
import 'react-tooltip/dist/react-tooltip.css'
import { IoIosArrowForward } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { PiSpeakerHigh } from "react-icons/pi";
import VideoPlayer from "../../components/VideoPlayer";
import { Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { BsDribbble } from "react-icons/bs";
import { LuRotate3D } from "react-icons/lu";
import { GiAtom } from "react-icons/gi";
import { BsWindowSidebar } from "react-icons/bs";
import { contentData } from "../../data/appsLinksData";
import { Link } from "react-router-dom";

export default function QuantumEngine() {
   const { t } = useTranslation();

   return (
      <div className="flex-col items-center justify-center min-h-screen mt-[60px] relative pb-16">
         <Helmet>
            <title>{t("home_title")}</title>
            <link rel="icon" type="image/png" href="/icons/quantum-engine/favicon.ico" />
         </Helmet>
         <div className="relative w-full h-[100vh]">
            <video
               className="w-full h-full object-cover"
               autoPlay
               muted
               loop
               playsInline
            >
               <source src="/videos/quantum-engine/quantum_engine.mp4" type="video/mp4" />
               Ваш браузер не поддерживает тег видео.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-center text-white px-60">
               <h1 className="text-7xl font-bold mb-8 text-left w-[700px]">Достигните своего видения</h1>
               <p className="text-2xl mb-8 text-left w-[700px]">
                  Самая мощная платформа для разработки игр, позволяющая вам и вашей команде создавать развлекательные проекты мирового уровня.
               </p>
               <div className="flex space-x-4 pt-4">
                  <button className="flex items-center px-7 py-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700">
                     <Link to="https://github.com/InputStudios/QuantumEngine" className="flex">
                        <FaWindows size={22} />
                        <p className="pl-3">Загрузить на PC</p>
                     </Link>
                  </button>
                  <button className="px-14 py-4 border hover:border-gray-600 border-gray-700 text-white rounded-lg hover:bg-transparent hover:text-white transition">
                     Узнать больше
                  </button>
               </div>
               <p className="pt-6 text-gray-500">Полный исходный код • Все функции движка • Доступ ко всем платформам</p>
            </div>
         </div>
         <div className="">
            <div className="flex justify-between w-full px-12 gap-6">
               <div className="flex-1 relative shadow-lg -mt-[45px] overflow-hidden pt-3 min-h-[300px]">
                  <img
                     src="/images/apps/quantum-engine/neon_noir.jpg"
                     alt="Neon Noir"
                     className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
                  />
               </div>
               <div className="flex flex-row justify-start gap-6 -mt-[30px]">
                  {cardsData.slice(0, 2).map((card) => (
                     <QuantumEngineCard key={card.id} {...card} />
                  ))}
               </div>
            </div>
            <div className="flex justify-start w-full p-12 gap-6">
               <div className="flex flex-row justify-start gap-6">
                  {cardsData.slice(0, 2).map((card) => (
                     <QuantumEngineCard key={card.id} {...card} />
                  ))}
               </div>
               <div className="flex-1 relative -mt-[15px] overflow-hidden pt-3 min-h-[300px]">
                  <img
                     src="/images/apps/quantum-engine/last_chance.jpg"
                     alt="Last Chance"
                     className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
                  />
               </div>
            </div>
         </div>
         <div className="justify-start w-full px-52 py-12">
            <div className="inline-block bg-teal-500 p-1 text-white rounded-md mb-6">
               <h2 className="text-sm font-bold">НОВОЕ В 0.0.24-BETA</h2>
            </div>
            <div className="w-[800px]">
               <p className="text-5xl font-bold mb-14">Ваш рабочий процесс стал быстрее</p>
               <p className="text-xl">
                  Quantum Engine 0.0.2-beta поставляется со значительными улучшениями. Новые инструменты и улучшения делают процесс разработки игр более интуитивным, чем когда-либо прежде.
               </p>
            </div>
            <div className="flex mt-6">
               <div className="flex items-center space-x-2 cursor-pointer group">
                  <span className="text-lg text-teal-500">Просмотреть заметки о выпуске</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <div className="flex items-center space-x-2 cursor-pointer pl-12 group">
                  <span className="text-lg text-teal-500">Все функции</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <Tooltip effect="solid" />
            </div>
         </div>
         <div className="justify-start w-full px-52 pt-8">
            <VideoPlayer
               url="https://rutube.ru/video/e0ad11e164af1c95d3da32a80af1e388/?playlist=272955"
               previewImage="/images/apps/quantum-engine/last_chance.jpg"
               alt="Video preview"
               className="mt-10 p-3 h-[700px] w-full object-contain"
            />
         </div>
         <div className="flex gap-6 justify-start w-full px-52 pt-12">
            <div className="">
               <div className="flex items-start gap-4 my-4">
                  <div className="flex-shrink-0">
                     <BsWindowSidebar size={24} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">Песочница</h3>
                     <p className="w-[500px]">
                        Что видите, то и получаете: Sandbox позволяет создавать бесшовные миры без запекания. Создайте свой мир и экспортируйте в игру так, как вы видите его в редакторе.
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-4 my-16">
                  <div className="flex-shrink-0">
                     <LuRotate3D size={24} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">Рендеринг</h3>
                     <p className="w-[500px]">
                        Полностью динамическое глобальное освещение в реальном времени с полностью PBR-рабочим процессом позволяет создавать сверхреалистичные среды, используя привычные вам инструменты.
                     </p>
                  </div>
               </div>
            </div>
            <div className="mx-20">
               <div className="flex items-start gap-4 my-4">
                  <div className="flex-shrink-0">
                     <GiAtom size={24} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">Физика</h3>
                     <p className="w-[500px]">
                        Физическое моделирование, реалистично учитывающее физические свойства реального мира, позволяет создавать легко настраиваемые и динамичные сцены.
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-4 my-16">
                  <div className="flex-shrink-0">
                     <PiSpeakerHigh size={24} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">Аудио</h3>
                     <p className="w-[500px]">
                        Используйте эксклюзивный слой аудиотрансляции Quantum Engine, который позволяет вам выбирать промежуточное программное обеспечение, которое вам нужно, когда вам нужно. Позволяет создавать рабочие процессы, которые работают для вас.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="container mx-auto mt-8">
            <div className="grid grid-cols-4 gap-8">
               {contentData.map((card, index) => (
                  <div
                     key={index}
                     className={`rounded-lg shadow-lg ${card.id === 0 || card.id === 5 ? 'col-span-2' : ''}`}
                  >
                  <div className="relative rounded-lg overflow-hidden">
                     <img
                        src={card.image}
                        alt={card.title}
                        className={`w-full object-cover rounded-md ${card.id === 0 || card.id === 5 ? 'h-[450px]' : 'h-[450px]'}`}
                     />
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 ">{card.title}</h3>
                        <p className="text-gray-200">{card.description}</p>
                     </div>
                  </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="justify-start w-full px-52 py-12">
            <div className="inline-block bg-teal-500 p-1 text-white rounded-md mb-6">
               <h2 className="text-sm font-bold">Достигнуто с помощью Quantum Engine</h2>
            </div>
            <div className="w-[800px]">
               <p className="text-5xl font-bold mb-14">Поддержка удивительных проектов</p>
               <p className="text-xl">
                  Получите доступ к последней версии движка, стоящего за визуальными бенчмарками, таким как Quantum Solaris. Используйте те же инструменты, что и наши внутренние команды.
               </p>
            </div>
            <div className="flex mt-6">
               <div className="flex items-center space-x-2 cursor-pointer group">
                  <span className="text-lg text-teal-500">Посмотреть презентацию</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <div className="flex items-center space-x-2 cursor-pointer pl-12 group">
                  <span className="text-lg text-teal-500">Узнать больше</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <Tooltip effect="solid" />
            </div>
         </div>
         <div className="relative w-full h-[600px]">
            <img 
               src="/images/apps/quantum-engine/quantum_engine_forest.png" 
               alt="Forest" 
               className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 flex flex-col justify-center mx-52">
               <div className="flex items-center w-full">
                  <div className="text-left">
                     <h1 className="text-5xl font-bold text-white mb-6">
                        Готовы начать?
                     </h1>
                     <p className="text-2xl text-gray-200 w-[550px]">
                        Используйте Quantum Engine бесплатно. 5% роялти применяется при отправке вашего проекта. Ваш первый годовой доход в размере 1 миллиона рублей  за проект не облагается роялти.
                     </p>
                     <div className="flex mt-6">
                        <div className="flex items-center space-x-2 cursor-pointer group">
                           <span className="text-lg text-teal-500">Посмотреть презентацию</span>
                           <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer pl-6 group">
                           <span className="text-lg text-teal-500">Узнать больше</span>
                           <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
                        </div>
                        <Tooltip effect="solid" />
                     </div>
                  </div>
                  <div className="flex space-x-4 pt-4 ml-20">
                     <button className="flex items-center px-7 py-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700">
                        <Link to="https://github.com/InputStudios/QuantumEngine" className="flex">
                           <FaWindows size={22} />
                           <p className="pl-3">Загрузить на PC</p>
                        </Link>
                     </button>
                     <button className="px-14 py-4 border hover:border-gray-600 border-gray-700 text-white rounded-lg hover:bg-transparent hover:text-white transition">
                        Узнать больше
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-row gap-4 mt-10 px-4 lg:px-16 transition-opacity duration-300">
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
   );
}
