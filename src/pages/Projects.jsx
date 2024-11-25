import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFigma } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BsDribbble } from "react-icons/bs";

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
            <title>{t("projects:projects_company_title")}</title>
         </Helmet>
         <div className="mx-auto">
            <div className="px-4 padding-card lg:px-16">
               <div className="mx-auto w-full lg:max-w-4xl text-center mb-8 text-left-860">
                  <h1 className="text-3xl font-semibold md:text-5xl lg:text-5xl">{t("projects:projects_company_title")}</h1>
                  <p className="text-lg font-semibold mt-5">{t("projects:all_company_projects")}</p>
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
                  {t("projects:develop_your_own_games")}
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewEngine ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 }}
               >
                  {t("projects:create_unique_games")}
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
                  <img src="/images/apps/quantum-engine/bg_quantum_engine.png" alt="Quantum Engine" className="w-full h-auto rounded-xl shadow-md" />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">{t("projects:quantum_engine_game_engine")}</h2>
                  <p className="text-md mb-4">
                     {t("projects:modern_game_engine")}
                  </p>
                  <Link to={`${languagePrefix}/quantum-engine`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        {t("projects:learn_more")}
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
                  {t("projects:chat_in_modern_messenger_chatify")}
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewChatify ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 }}
               >
                  {t("projects:chat_quickly_and_conveniently")}
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
                  <h2 className="text-3xl font-semibold mb-4">{t("projects:chatify_messenger")}</h2>
                  <p className="text-md mb-4">
                     {t("projects:chatify_modern_messenger")}
                  </p>
                  <Link to={`${languagePrefix}/chatify`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        {t("projects:learn_more")}
                     </button>
                  </Link>
               </div>
               <div className="relative w-full md:w-1/2 mb-6 md:mb-0 order-1 md:order-2">
                  <img src="/images/apps/chatify/chatify.png" alt="Chatify" className="w-full h-auto rounded-xl shadow-md" />
                  <div className="absolute top-0 left-0 flex flex-col gap-4 p-4">
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
                        <img src="/images/apps/chatify/sticker.png" alt="Sticker" className="w-24 h-auto rounded-md ml-auto sticker-img" />
                     </motion.div>
                     <motion.div
                        ref={refAudioMessage}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewAudioMessage ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 3 }}
                        className="hidden sm:block hide-on-medium-screen"
                     >
                        <img src="/images/apps/chatify/audio_message.png" alt="Audio Message" className="w-80 h-auto rounded-md" />
                     </motion.div>
                     <motion.div
                        ref={refRecipientMessage}
                        initial={{ opacity: 0, y: 60 }}
                        animate={inViewRecipientMessage ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 4 }}
                        className="hidden sm:block hide-on-medium-screen"
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
                  {t("projects:find_information_browser")}
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewWave ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 }}
               >
                  {t("projects:wave_fast_secure_browser")}
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
               <img src="/images/apps/wave/wave_browser.png" alt="Wave Browser" className="w-full h-auto rounded-xl shadow-md" />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">{t("projects:wave_browser")}</h2>
                  <p className="text-md mb-4">
                     {t("projects:wave_browser_offers_unique")}
                  </p>
                  <Link to={`${languagePrefix}/wave`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        {t("projects:learn_more")}
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
                  {t("projects:document_creation_tools")}
               </motion.h1>
               <motion.p
                  className="text-md flex flex-col gap-6 max-width mx-auto leading-7"
                  initial={{ opacity: 0.5, y: 60 }}
                  animate={inViewWorkspace ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 }}
               >
                  {t("projects:suite_offers_essential_tools")}
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
               <img src="/images/apps/workspace/workspace.avif" alt="Workspace" className="w-full h-auto rounded-xl shadow-md" />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">{t("projects:workspace_office_suite")}</h2>
                  <p className="text-md mb-4">
                     {t("projects:suite_includes_document_creation")}
                  </p>
                  <Link to={`${languagePrefix}/workspace`}>
                     <button className="w-[60%] md:w-[200px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                        {t("projects:learn_more")}
                     </button>
                  </Link>
               </div>
            </motion.div>
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
