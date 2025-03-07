import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { FaFigma, FaWindows } from "react-icons/fa";
import QuantumEngineCard from "../../components/cards/QuantumEngineCard";
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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function QuantumEngine() {
   const { t } = useTranslation();
   const [previewImage, setPreviewImage] = useState("/images/apps/quantum-engine/last_chance.png");

   useEffect(() => {
      const savedPreview = localStorage.getItem('videoPreviewImage');

      if (savedPreview) {
         setPreviewImage(savedPreview);
      } else {
         console.log("Preview image not found in localStorage, using default.");
      }
   }, []);

   const updatePreviewImage = (image) => {
      setPreviewImage(image);
   };

   const cardsData = [
      {
         id: 0,
         image: "/images/apps/quantum-engine/quantum_engine_service_update.png",
         title: t("apps:update"),
         subtitle: t("apps:documentation_available"),
         description: t("apps:public_documentation"),
         date: "13.09.2024",
         comments: 2,
      },
      {
         id: 1,
         image: "/images/apps/quantum-engine/quantum_solaris.png",
         title: t("apps:games"),
         subtitle: t("apps:quantum_solaris_releases_steam"),
         description: t("apps:we_talked_Matthias"),
         date: "24.11.2024",
         comments: 7,
      },
      {
         id: 2,
         image: "/images/apps/quantum-engine/quantum_engine_git_hub.png",
         title: t("apps:announcement"),
         subtitle: t("apps:new_convenience_features"),
         description: t("apps:public_user_profile"),
         date: "05.09.2024",
         comments: 5,
      },
      {
         id: 3,
         image: "/images/apps/quantum-engine/quantum_engine_launcher.png",
         title: t("apps:announcement"),
         subtitle: t("apps:launcher_update"),
         description: t("apps:launcher_has_been_updated"),
         date: "05.09.2024",
         comments: 10,
      }
   ]

   const contentData = [
      {
         id: 0,
         image: "/images/apps/quantum-engine/realtime_lighting.png",
         title: 'Освещение в реальном времени',
         description: 'Достигайте фотореализма в огромных открытых мировых средах с полностью оптимизированным потоком для дизайна уровней. Немедленно проверяйте освещение в реальном времени — запекание не требуется.',
      },
      {
         id: 1,
         image: "/images/apps/quantum-engine/dynamic_destruction.png",
         title: 'Динамическое разрушение',
         description: 'Quantum Engine предлагает полное решение физики из коробки. Получите полный контроль над физикой, чтобы оживить свой мир и игровой процесс.',
      },
      {
         id: 2,
         image: "/images/apps/quantum-engine/powerful_particles.png",
         title: 'Мощные частицы',
         description: 'Легко управляйте сложными и дорогими эффектами. Создавайте потрясающие миры для исследования геймерами с непревзойденной производительностью.',
      },
      {
         id: 3,
         image: "/images/apps/quantum-engine/animations.png",
         title: 'Потрясающая анимация',
         description: 'Объединение самых масштабируемых, технически совершенных систем анимации и рендеринга для получения реалистичных результатов в реальном времени.',
      },
      {
         id: 4,
         image: "/images/apps/quantum-engine/access_all_platforms.png",
         title: 'Доступ ко всем платформам',
         description: 'Поддержка всех современных высокопроизводительных платформ. Разработка для ПК, Xbox, Playstation, Oculus и многих других.',
      },
      {
         id: 5,
         image: "/images/apps/quantum-engine/editor.png",
         title: 'Полнофункциональный редактор',
         description: 'Редактор-песочница Quantum Engine — это полный набор инструментов. Универсальная платформа, которая позволяет создавать потрясающие впечатления прямо у вас под рукой.',
      },
   ];

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
               {t("apps:not_support_video_tag")}
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-center text-white px-4 lg:px-60 sm:px-6 overflow-hidden">
               <h1 className="text-5xl xl:text-7xl font-bold mb-2 sm:mb-6 text-left max-w-full">{t("apps:achieve_your_vision")}</h1>
               <p className="text-2xl mb-2 sm:mb-6 text-left max-w-full">{t("apps:powerful_game_development_platform")}</p>
               <div className="flex gap-6 pt-4 buttons-container-580">
                  <button className="flex items-center px-7 py-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700">
                     <Link to="https://github.com/InputStudios/QuantumEngine" className="flex">
                        <FaWindows size={22} />
                        <p className="pl-3">{t("apps:download_on_pc")}</p>
                     </Link>
                  </button>
                  <button className="px-14 py-4 border hover:border-gray-600 border-gray-700 text-white rounded-lg hover:bg-transparent hover:text-white transition">
                     {t("apps:learn_more")}
                  </button>
               </div>
               <p className="pt-6 text-gray-400">{t("apps:full_source_code_engine_features")}</p>
            </div>
         </div>
         <div className="mx-4 sm:mx-12">
            <div className="grid grid-cols-4 custom-grid-1280 gap-8 -mt-[30px]">
               <div className="flex col-span-2 items-stretch">
                  <div className="relative w-full min-h-[300px]">
                     <img
                        src="/images/apps/quantum-engine/neon_noir.png"
                        alt="Neon Noir"
                        className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
                     />
                  </div>
               </div>
               <div className="flex flex-row justify-start gap-8 col-span-2 items-stretch">
                  {cardsData.slice(0, 2).map((card) => (
                     <QuantumEngineCard key={card.id} {...card} className="w-full h-full" />
                  ))}
               </div>
               <div className="flex flex-row justify-start gap-8 col-span-2 items-stretch">
                  {cardsData.slice(2, 4).map((card) => (
                     <QuantumEngineCard key={card.id} {...card} className="w-full h-full" />
                  ))}
               </div>
               <div className="flex col-span-2 items-stretch">
                  <div className="relative w-full min-h-[300px]">
                     <img
                        src="/images/apps/quantum-engine/last_chance.png"
                        alt="Last Chance"
                        className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="justify-start w-full px-4 lg:px-52 md:px-12 sm:px-8 py-12">
            <div className="inline-block bg-teal-500 p-1 text-white rounded-md mb-6">
               <h2 className="text-sm font-bold">{t("apps:new_in")}</h2>
            </div>
            <div className="flex flex-col">
               <p className="text-4xl md:text-5xl font-bold mb-14">{t("apps:your_workflow_just_got_faster")}</p>
               <p className="text-xl">
                  {t("apps:significant_improvements")}
               </p>
            </div>
            <div className="flex flex-col-580 mt-6">
               <div className="flex items-center space-x-2 cursor-pointer group">
                  <span className="text-lg text-teal-500">{t("apps:view_release_notes")}</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <div className="flex items-center space-x-2 cursor-pointer pl-12 padding-580 group">
                  <span className="text-lg text-teal-500">{t("apps:all_features")}</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <Tooltip effect="solid" />
            </div>
         </div>
         <div className="justify-start w-full px-4 lg:px-52 md:px-12 sm:px-8 pt-8">
            <VideoPlayer
               url="https://rutube.ru/video/e0ad11e164af1c95d3da32a80af1e388/?playlist=272955"
               previewImage={previewImage}
               updatePreviewImage={updatePreviewImage}
               alt="Video preview"
               className="mt-10 p-3 h-[700px] w-full object-contain"
               poster={previewImage}
            />
         </div>
         <div className="flex flex-col md:flex-row gap-6 justify-start w-full px-4 lg:px-52 md:px-12 sm:px-8 pt-12">
            <div className="">
               <div className="flex items-start gap-4 my-4">
                  <div className="flex-shrink-0">
                     <BsWindowSidebar size={24} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col ml-1">
                     <h3 className="text-xl font-bold mb-4">{t("apps:sandbox")}</h3>
                     <p className="flex">
                        {t("apps:what_you_see_what_you_get")}
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-4 mt-12 md:my-16">
                  <div className="flex-shrink-0">
                     <LuRotate3D size={28} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">{t("apps:rendering")}</h3>
                     <p className="flex">
                        {t("apps:global_illumination")}
                     </p>
                  </div>
               </div>
            </div>
            <div className="md:mx-20">
               <div className="flex items-start gap-4 my-4">
                  <div className="flex-shrink-0">
                     <GiAtom size={26} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">{t("apps:physics")}</h3>
                     <p className="flex">
                        {t("apps:realistically_accounts")}
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-4 my-12">
                  <div className="flex-shrink-0">
                     <PiSpeakerHigh size={26} className="mt-1 text-teal-500" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-xl font-bold mb-4">{t("apps:audio")}</h3>
                     <p className="flex">
                        {t("apps:exclusive_audio_translation")}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="mx-4 mt-8 sm:px-8 pt-12">
            <div className="grid grid-cols-4 gap-8 custom-grid-1280 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
               {contentData.map((card, index) => (
                  <div
                     key={index}
                     className={`rounded-lg shadow-lg overflow-hidden ${card.id === 0 || card.id === 5 ? 'col-span-2' : ''}`}
                  >
                     <div className="relative rounded-lg overflow-hidden group">
                        <img
                           src={card.image}
                           alt={card.title}
                           className={`w-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105 ${
                              card.id === 0 || card.id === 5 ? 'h-[450px]' : 'h-[450px]'
                           }`}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-8 rounded-lg">
                           <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                           <p className="text-gray-200">{card.description}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="justify-start w-full px-4 lg:px-32 md:px-16 sm:px-8 py-12">
            <div className="inline-block bg-teal-500 p-1 text-white rounded-md mb-6">
               <h2 className="text-sm font-bold">{t("apps:achieved_with_quantum_engine")}</h2>
            </div>
            <div className="flex flex-col">
               <p className="text-4xl md:text-5xl font-bold mb-14">{t("apps:support_amazing_projects")}</p>
               <p className="text-xl">
                  {t("apps:get_access_latest_version")}
               </p>
            </div>
            <div className="flex mt-6">
               <div className="flex items-center space-x-2 cursor-pointer group">
                  <span className="text-lg text-teal-500">{t("apps:watch_presentation")}</span>
                  <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
               </div>
               <div className="flex items-center space-x-2 cursor-pointer pl-12 group">
                  <span className="text-lg text-teal-500">{t("apps:learn_more")}</span>
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
            <div className="absolute inset-0 flex flex-col justify-center mx-4 sm:mx-8 md:mx-16 xl:mx-32 lg:mx-56">
               <div className="flex flex-col-980 w-full">
                  <div className="text-left">
                     <h1 className="text-5xl font-bold text-white mb-6">Готовы начать?</h1>
                     <p className="text-2xl text-gray-200 w-[550px] text-full-980">{t("apps:use_quantum_engine_free")}</p>
                     <div className="flex mt-6">
                        <div className="flex items-center space-x-2 cursor-pointer group">
                           <span className="text-lg text-teal-500">{t("apps:watch_presentation")}</span>
                           <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer pl-6 group">
                           <span className="text-lg text-teal-500">{t("apps:learn_more")}</span>
                           <IoIosArrowForward className="text-teal-500 ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[3px]" />
                        </div>
                        <Tooltip effect="solid" />
                     </div>
                  </div>
                  <div className="buttons-wrapper flex gap-6 pt-4 ml-20 buttons-container">
                     <button className="flex items-center px-7 py-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700">
                        <Link to="https://github.com/InputStudios/QuantumEngine" className="flex">
                           <FaWindows size={22} />
                           <p className="pl-3">{t("apps:download_on_pc")}</p>
                        </Link>
                     </button>
                     <button className="px-12 py-4 border hover:border-gray-600 border-gray-700 text-white rounded-lg hover:bg-transparent hover:text-white transition">
                        {t("apps:learn_more")}
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
