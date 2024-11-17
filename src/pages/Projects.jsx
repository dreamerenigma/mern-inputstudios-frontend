import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Projects() {
   const { t } = useTranslation();
   const [refEngine, inViewEngine] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refChatify, inViewChatify] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refWave, inViewWave] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refWorkspace, inViewWorkspace] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refMessage, inViewMessage] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refSticker, inViewSticker] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refAudioMessage, inViewAudioMessage] = useInView({ triggerOnce: true, threshold: 0.2 });
   const [refRecipientMessage, inViewRecipientMessage] = useInView({ triggerOnce: true, threshold: 0.2 });
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="min-h-screen items-center justify-center mt-[60px] pt-16 pb-16">
         <Helmet>
            <title>{t("projects_company_title")}</title>
         </Helmet>
         <div className="mx-auto">
            <div className="px-4 padding-card lg:px-16">
               <div className="mx-auto w-full lg:max-w-4xl text-center mb-8 text-left-860">
                  <h1 className="text-3xl font-semibold md:text-5xl lg:text-5xl">Проекты компании Input Studios</h1>
                  <p className="text-lg font-semibold mt-5">Все проекты компании</p>
               </div>
               <Link to={`${languagePrefix}/search`} className="block w-full mx-auto mb-8">
                  <img className="w-full h-auto" src="/images/projects/projects.avif" alt="privacy" />
               </Link>
            </div>
            <div ref={refEngine} className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <motion.h1
                  className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 60 }}
                  animate={inViewEngine ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9 }}
               >
                  Разрабатывайте собственные игры в Quantum Engine
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewEngine ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 }}
               >
                  Создавайте уникальные игры в Quantum Engine — в самой мощной платформе для разработки игр, позволяющая вам и вашей команде создавать развлекательные проекты мирового уровня.
               </motion.p>
            </div>
            <motion.div
               ref={refEngine}
               className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-16 py-10"
               initial={{ opacity: 0, y: 60 }}
               animate={inViewEngine ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.9 }}
            >
               <div className="w-full md:w-1/2 mb-6 md:mb-0">
               <img
                  src="/images/apps/quantum-engine/bg_quantum_engine.png"
                  alt="Description"
                  className="w-full h-auto rounded-xl shadow-md"
               />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">Игровой движок Quantum Engine</h2>
                  <p className="text-md mb-4">
                     Quantum Engine — современный игровой движок, предоставляющий разработчикам полный набор инструментов для создания уникальных и высококачественных игр. Движок оптимизирован для высокой производительности и поддерживает передовые технологии графики и физики, что позволяет создавать реалистичные игровые миры и захватывающий геймплей. Quantum Engine включает в себя инструменты для работы с 2D и 3D графикой, систему анимации, обработку звука и поддержку сетевой игры. С его помощью можно реализовать как небольшие инди-проекты, так и крупные коммерческие игры с высокой степенью интерактивности.
                  </p>
                  <Link to={`${languagePrefix}/quantum-engine`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        Узнать подробнее
                     </button>
                  </Link>
               </div>
            </motion.div>
            <div ref={refChatify} className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <motion.h1
                  className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 60 }}
                  animate={inViewChatify ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9 }}
               >
                  Общайтесь в современном мессенджере Chatify
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewChatify ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 }}
               >
                  Общайтесь быстро и удобно в современном мессенджере Chatify — обмен сообщениями, видеозвонки и многое другое в одном приложении!
               </motion.p>
            </div>
            <motion.div
               ref={refChatify}
               className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-16 py-10"
               initial={{ opacity: 0, y: 60 }}
               animate={inViewChatify ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.9 }}
            >
               <div className="w-full md:w-1/2 flex flex-col justify-center md:mr-12 order-2 md:order-1">
                  <h2 className="text-3xl font-semibold mb-4">Мессенджер Chatify</h2>
                  <p className="text-md mb-4">
                     Chatify — это современный мессенджер, который объединяет все необходимые функции для комфортного общения. С помощью Chatify вы можете обмениваться текстовыми сообщениями, совершать видеозвонки в высоком качестве и делиться мультимедиа файлами. Удобный интерфейс, быстрый доступ к контактам и поддержка групповых чатов делают общение еще проще и доступнее. Chatify также обеспечивает надежную защиту данных, чтобы каждый разговор оставался конфиденциальным.
                  </p>
                  <Link to={`${languagePrefix}/chatify`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        Узнать подробнее
                     </button>
                  </Link>
               </div>
               <div className="relative w-full md:w-1/2 mb-6 md:mb-0 order-1 md:order-2">
                  <img src="/images/apps/chatify/chatify.png" alt="Description" className="w-full h-auto rounded-xl shadow-md" />
                  <div className="absolute top-0 left-0 flex flex-col gap-4 p-4 mt-8">
                     <motion.div
                        ref={refMessage}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewMessage ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 1 }}
                     >
                        <img src="/images/apps/chatify/message.png" alt="Message" className="w-80 h-auto rounded-md" />
                     </motion.div>
                     <motion.div
                        ref={refSticker}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewSticker ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 2 }}
                     >
                        <img src="/images/apps/chatify/sticker.png" alt="Sticker" className="w-24 h-auto rounded-md ml-56" />
                     </motion.div>
                     <motion.div
                        ref={refAudioMessage}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewAudioMessage ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 3 }}
                     >
                        <img src="/images/apps/chatify/audio_message.png" alt="Audio Message" className="w-80 h-auto rounded-md" />
                     </motion.div>
                     <motion.div
                        ref={refRecipientMessage}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewRecipientMessage ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 4 }}
                     >
                        <img src="/images/apps/chatify/recipient_message.png" alt="Recipient Message" className="w-full h-auto rounded-md" />
                     </motion.div>
                  </div>
               </div>
            </motion.div>
            <div ref={refWave} className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <motion.h1
                  className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 60 }}
                  animate={inViewWave ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9 }}
               >
                  Поиск нужной информации в браузере Wave
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewWave ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 }}
               >
                  Wave быстрый и безопасный браузер для комфортного серфинга в интернете. Конфиденциальность ваших сведений гарантированна
               </motion.p>
            </div>
            <motion.div
               ref={refWave}
               className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-16 py-10"
               initial={{ opacity: 0, y: 60 }}
               animate={inViewWave ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.9 }}
            >
               <div className="w-full md:w-1/2 mb-6 md:mb-0">
               <img
                  src="/images/apps/wave/wave_browser.png"
                  alt="Description"
                  className="w-full h-auto rounded-xl shadow-md"
               />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">Браузер Wave</h2>
                  <p className="text-md mb-4">
                     Браузер Wave предлагает уникальные функции, такие как встроенная защита от отслеживания, поддержка расширений и интуитивно понятный интерфейс. Благодаря оптимизированной работе с ресурсами, вы сможете наслаждаться стабильной работой даже на старых устройствах. Приложение доступно на всех популярных платформах и обеспечивает синхронизацию ваших данных между устройствами.
                  </p>
                  <Link to={`${languagePrefix}/wave`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        Узнать подробнее
                     </button>
                  </Link>
               </div>
            </motion.div>
            <div ref={refWorkspace} className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <motion.h1
                  className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 60 }}
                  animate={inViewWorkspace ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9 }}
               >
                  Инструменты для создания документа в пакете Workspace
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewWorkspace ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 }}
               >
                  Пакет Workspace предлагает основные инструменты для создания и редактирования документов.
               </motion.p>
            </div>
            <motion.div
               ref={refWorkspace}
               className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-16 py-10"
               initial={{ opacity: 0, y: 60 }}
               animate={inViewWorkspace ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.9 }}
            >
               <div className="w-full md:w-1/2 mb-6 md:mb-0">
               <img
                  src="/images/apps/workspace/workspace.avif"
                  alt="Description"
                  className="w-full h-auto rounded-xl shadow-md"
               />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">Офисный пакет Workspace</h2>
                  <p className="text-md mb-4">
                     Пакет Workspace включает в себя приложения для создания документов, такие как Google Документы, Таблицы и Презентации. Эти инструменты позволяют пользователям создавать, редактировать и совместно работать с документами, таблицами и презентациями в режиме реального времени, с поддержкой облачного хранения и синхронизации данных. Workspace предоставляет интеграцию с другими сервисами и продвинутые функции для эффективной работы.
                  </p>
                  <Link to={`${languagePrefix}/workspace`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        Узнать подробнее
                     </button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </div>
   );
}
