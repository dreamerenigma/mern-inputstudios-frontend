import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Switch } from '@headlessui/react';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { FaWindows } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaShieldHalved } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function DashPrivacyAdSettings() {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const [enabled, setEnabled] = useState(() => {
      const savedState = localStorage.getItem('switchState');
      return savedState === 'true';
   });
   const [isSwitching, setIsSwitching] = useState(false);
   const [userInterests, setUserInterests] = useState([]);
   const [expandedIndex, setExpandedIndex] = useState(null);
   const [expandedDevices, setExpandedDevices] = useState(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   useEffect(() => {
      localStorage.setItem('switchState', enabled);
   }, [enabled]);

   const questionsData = [
      { question: 'Что такое персонализированная реклама?', answer: 'Персонализированная реклама — это реклама, которая, как нам кажется на основе данных с ваших устройств и других предоставленных вами данных (включая ваши поисковые запросы, посещенные вами сайты и темы, которые вы часто просматриваете), будет вам более интересной и полезной. Мы не показываем персонализированную рекламу, если вы отключили параметр на этой странице. Например, если вы ищете "роскошные автомобили" в Clever, мы можем использовать ваш поисковый запрос, чтобы показать вам рекламу производителя роскошных автомобилей, когда вы посещаете веб-сайт MSN или пользуетесь MSN mobile.' },
      { question: 'Почему компания Input Studios показывает персонализированную рекламу?', answer: 'Мы показываем персонализированную рекламу, чтобы клиентам было легче находить товары и услуги, к которым они проявили интерес, а рекламодатели могли взаимодействовать с клиентами, которые уже выразили заинтересованность в их товарах. Мы хотим, чтобы реклама товаров и услуг от Input Studios была полезной и релевантной, а наши рекламодатели могли проще связываться с потенциальными клиентами.' },
      { question: 'Как компания Input Studios предоставляет персонализированную рекламу?', answer: 'Компания Input Studios партнеров со сторонними поставщиками для отображения персонализированной рекламы на MSN, Outlook.com и других веб-сайтах и приложениях. Компания Input Studios также предоставляет рекламу поиска Clever и нашим партнерам по синдикации поиска. Дополнительные сведения о политиках конфиденциальности Input Studios и Xandr см. в Заявление о конфиденциальности и Xandr. Вы можете узнать больше о персонализированной рекламе от нашего партнера Yahoo в Yahoo.' },
      { question: 'Как заполняется мой список интересов?', answer: 'В зависимости от просматриваемых сайтов, условий поиска и других действий в Интернете, компания Input Studios определяет интересующие вас темы и добавляет их в список. Некоторые рекламные объявления, которые вы видите, основаны на этих интересах. В некоторых случаях интересы могут не отображаться на вашем языке. Конкретные интересы отображаются только в том случае, если вы вошли в учетную запись.' },
      { question: 'Как прекратить отображение персонализированной рекламы от других компаний и рекламных сетей?', answer: 'Даже если вы отключите параметр на этой странице, персонализированная реклама от других компаний и рекламных сетей, возможно, по-прежнему будет отображаться. Чтобы узнать, как отключить отображение персонализированной рекламы от других компаний и рекламных сетей, участвующих в программах саморегулирования, посетите следующие веб-сайты: В США: Digital Advertising Alliance (DAA) В Европе: European Interactive Digital Advertising Alliance (EDAA) В Канаде: Варианты рекламы: Digital Advertising Alliance of Canada (DAAC)' },
      { question: 'Когда Input Studios использует действия в браузере Input Studios Wave для показа рекламы?', answer: 'Мы используем действия в браузере Input Studios Wave для персонализации рекламы, только если вы предоставили общий доступ к действиям в браузере, связанным с персонализацией продукта, службы или учетной записи Input Studios.' },
      { question: 'Как настроить мой браузер так, чтобы перестать видеть персонализированную рекламу?', answer: 'Мы уважаем ваш выбор. С помощью cookie-файлов мы запомним его и перестанем показывать персонализированную рекламу в этом браузере. Убедитесь, что в браузере поддерживаются cookie-файлы и что они не удаляются при закрытии браузера. Если вы удалили cookie-файлы, отказавшись от рекламы по интересам, возможно, вам придется отказаться еще раз. Чтобы, кроме этого, прекратить сбор и использование журнала браузера Input Studios Wave для персонализации ваших результатов поиска Input Studios и веб-канала новостей, перейдите в раздел Input Studios Wave > Параметры > Конфиденциальность, поиск и службы. Подробнее' },
      { question: 'Как прекратить получать от корпорации Input Studios письма с предложениями продуктов Input Studios?', answer: '' },
   ];

   const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
   };

   const toggleExpandDevices = (id) => {
      setExpandedDevices(expandedDevices === id ? null : id);
   };

   const handleSwitchChange = () => {
      setIsSwitching(true);
      setEnabled(!enabled);

      setTimeout(() => {
         setIsSwitching(false);
      }, 1000); 
   };

   const fetchInterests = () => {
      const temporaryInterests = [];
      setUserInterests(temporaryInterests);
   };

   useEffect(() => {
      if (currentUser) {
         fetchInterests();
      }
   }, [currentUser]);

   return (
      <div className="min-h-screen mb-20">
         <Helmet>
            <title>{t("privacy:title")}</title>
            <link rel="icon" type="image/png" href="/icons/favicon.ico" />
         </Helmet>
         <div className="flex items-center mx-[198px] space-x-2">
            <Link 
               to={`${languagePrefix}/dashboard?tab=privacy`} 
               className="text-2xl text-gray-400 hover:bg-gray-400/10 hover:rounded-lg transition px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis w-[150px]"
            >
               Конфиденциальность
            </Link>
            <IoIosArrowForward size={24} className="ml-auto mt-1" />
            <span 
               className="text-2xl font-semibold flex-1 whitespace-nowrap overflow-hidden text-ellipsis w-[200px]" 
               style={{ flexShrink: 0 }}
            >
               Параметры персонализированной рекламы
            </span>
            <div className="flex justify-between items-center my-7">
               <Link
                  to={`${languagePrefix}/workspace/premium-features-in-outlook-com-for-input-studios-365`}
                  className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white group"
               >
                  <div className="flex items-center gap-2 ml-48">
                     <div className="flex items-center justify-center rounded-full bg-teal-100 w-9 h-9 group-hover:bg-[#0E7490] transition-colors duration-200 mb-2">
                        <img src="/images/privacy/mail.svg" alt="Icon" className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col text-left w-[280px] flex-shrink-0 hover:text-teal-500">
                        <p className="font-semibold text-sm">
                           Ищете интерфейс без рекламы?
                        </p>
                        <p className="text-xs break-words whitespace-normal">
                           Подписчики Input Studios Workspace не видят рекламу в Outlook.
                        </p>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
         <div className="flex justify-between items-start mt-12 mx-52">
            <div className="flex flex-col w-3/4">
               <p className="font-bold text-lg">Показывать рекламные объявления, которые вас интересуют</p>
               <p className="mt-4 w-[620px] mr-6">
                  Вы можете персонализировать рекламу, чтобы она отражала ваши интересы. Мы будем использовать ваши поисковые запросы, прошлые покупки продуктов Input Studios и другие действия в Интернете, связанные с вашей учетной записью Input Studios и этим браузером, чтобы отображать более персонализированную рекламу, соответствующую вашим интересам. Если вы разрешили Input Studios Wave использовать действия в браузере для персонализации веб-интерфейсов, мы также будем использовать ваши действия в браузере Input Studios Wave, чтобы персонализировать для вас рекламу.
               </p>
               <p className="mt-4 w-[620px]">
                  Если отключить этот параметр, Input Studios по-прежнему будет показывать вам рекламу, но она не будет персонализирована на основе собранных нами данных. Вы по-прежнему можете видеть рекламу, персонализированную на основе сведений, собранных о вас другими компаниями. Отключение этого параметра также приведет к отказу от обмена данными в соответствии с действующим законодательством Ульяновской области и других городов России. Подробнее см. в разделе{" "}
                  <a href="/questions" className="text-teal-500 underline hover:text-teal-700">
                     Вопросы
                  </a>
                  <a>
                     .
                  </a>
               </p>
               <div className="flex items-center mt-4">
                  <Switch
                     checked={enabled}
                     onChange={handleSwitchChange}
                     className={`${
                        enabled ? 'bg-teal-500' : 'bg-gray-400'
                     } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                     <span
                        className={`${
                           enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                     />
                  </Switch>
                  {isSwitching ? (
                     <div className="ml-2">
                        <CircularProgress size={24} sx={{ color: '#14b8a6' }} />
                     </div>
                  ) : (
                     <span className="ml-2 text-md">{enabled ? 'Вкл.' : 'Выкл.'}</span>
                  )}
               </div>
            </div>
            <div className="flex-shrink-0 w-1/4 mt-32 mr-16">
               <img
                  src={enabled ? "/images/privacy/account-privacy-on.svg" : "/images/privacy/account-privacy-off.svg"}
                  alt="Icon"
                  className="w-full h-auto"
               />
            </div>
         </div>
         <div className="mt-8 mx-52">
            {currentUser ? (
               <>
                  {userInterests && Array.isArray(userInterests) && userInterests.length > 0 ? (
                     <>
                        <p className="font-bold text-lg">
                           Выберите то, что вас интересует
                        </p>
                        <p className="mt-2">
                           Этот список интересов основан на ваших действиях. Вы можете удалить и восстановить интересы для повышения релевантности отображаемой рекламы.
                        </p>
                     </>
                  ) : (
                     <>
                        <p className="font-bold text-lg">
                           Мы пока не знаем, чем вы интересуетесь
                        </p>
                        <p className="mt-2">
                           Чтобы помочь нам определить ваши интересы, используйте Clever для просмотра веб-сайтов и поиска в Интернете. Ваши действия в Clever позволят создать список интересов, которые можно просматривать и редактировать прямо здесь.
                        </p>
                     </>
                  )}
               </>
            ) : (
               <p className="mt-4">
                  <Link to={`${languagePrefix}/sign-in`} className="text-teal-500 underline hover:text-teal-700">
                     Вход в учетную запись Input Studios
                  </Link>
                  <a>,{" "}</a>
                  чтобы управлять своими интересами, поисковыми запросами и другими действиями в Интернете, связанными с вашей учетной записью Input Studios.
               </p>
            )}
         </div>
         <div className="mt-10 mx-52">
            <p className="text-lg font-bold">Управление персонализированной рекламой на вашем устройстве</p>
            <p className="mt-2">Вы можете выбрать, будет ли персонализироваться реклама, отображаемая в приложениях на ваших устройствах, изменив параметры конфиденциальности. Для этого выполните соответствующие инструкции для своего устройства.</p>
            <div className="border border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md mt-10">
               <div
                  onClick={() => toggleExpandDevices('windows11')}
                  className="flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-gray-700/60 transition rounded-t-lg"
               >
                  <p className="text-md">Windows 11</p>
                  <IoIosArrowForward
                     className={`transition transform ${expandedDevices === 'windows11' ? 'rotate-90' : ''}`}
                  />
               </div>
               {expandedDevices === 'windows11' && (
                  <div className="my-8 px-12">
                     <p className="flex flex-wrap items-center">
                        Выберите&nbsp;<b>Пуск</b> <FaWindows className="text-xl inline-block mx-2" /> {">"} 
                        <b>Параметры</b> <IoMdSettings className="text-xl inline-block mx-2" /> {">"} 
                        <b>Конфиденциальность и защита</b> <FaShieldHalved className="text-xl inline-block mx-2" /> {">"} 
                        <b>Общие</b> <FaLock className="text-xl inline-block mx-2" /> и отключите параметр 
                        <b>Разрешить приложениям показывать персонализированную рекламу с помощью моего идентификатора рекламы.</b>
                     </p>
                  </div>
               )}
               <div
                  onClick={() => toggleExpandDevices('windows10')}
                  className="flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-gray-700/60 transition"
               >
                  <p className="text-md">Windows 10</p>
                  <IoIosArrowForward
                     className={`transition transform ${expandedDevices === 'windows10' ? 'rotate-90' : ''}`}
                  />
               </div>
               {expandedDevices === 'windows10' && (
                  <div className="my-8 px-12">
                     <p className="flex flex-wrap items-center">
                        Выберите&nbsp;<b>Пуск</b> <FaWindows className="text-xl inline-block mx-2" /> {">"} 
                        <b>Параметры</b> <IoMdSettings className="text-xl inline-block mx-2" /> {">"} 
                        <b>Конфиденциальность</b> <FaLock className="text-xl inline-block mx-2" /> и отключите параметр
                        <b>Разрешить приложениям использовать идентификатор рекламы, чтобы рекламные объявления были более интересными для вас в зависимости от действий приложения.</b>
                     </p>
                  </div>
               )}
               <div
                  onClick={() => toggleExpandDevices('iosAndroid')}
                  className={`flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-gray-700/60 transition ${
                     expandedDevices === 'iosAndroid' ? '' : 'rounded-b-lg'
                  }`}
               >
                  <p className="text-md">Устройства с iOS и Android</p>
                  <IoIosArrowForward
                     className={`transition transform ${expandedDevices === 'iosAndroid' ? 'rotate-90' : ''}`}
                  />
               </div>
               {expandedDevices === 'iosAndroid' && (
                  <div className="my-4 px-12">
                     <p>Следуйте инструкциям для своего устройства с iOS или Android, чтобы изменить параметры конфиденциальности.</p>
                  </div>
               )}
            </div>
         </div>
         <div className="border border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md mx-52 mt-10">
            <h2 className="text-lg font-semibold text-black dark:text-white px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-t-lg">Возникли вопросы?</h2>
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            {questionsData.map((item, index) => (
               <div key={index}>
                  <div
                     onClick={() => toggleExpand(index)}
                     className={`flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-gray-700/60 transition ${
                        index === questionsData.length - 1 && expandedIndex !== index
                           ? 'hover:rounded-b-lg'
                           : ''
                     }`}
                  >
                     <span className="text-md">{item.question}</span>
                     <IoIosArrowForward className={`transition transform ${expandedIndex === index ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedIndex === index && (
                     <div className="my-4 px-12 rounded-lg">
                     <p>{item.answer.split('посетите страницу ')[0]}</p>
                     {index === questionsData.length - 1 && (
                        <p>
                           Чтобы прекратить получение писем о продуктах Input Studios от компании Input Studios, посетите страницу{" "}
                           <a 
                              href="https://account.inputstudios.ru/profile/communications" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-teal-500 hover:underline"
                           >
                              https://account.inputstudios.ru/profile/communications
                           </a>
                              {" "}чтобы изменить настройки общения.
                        </p>
                     )}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
}
