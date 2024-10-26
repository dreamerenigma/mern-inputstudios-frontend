import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Switch } from '@headlessui/react';
import { useState } from "react";

export default function PrivacyAdSettings() {
   const { t } = useTranslation();
   const { currentUser } = useSelector(state => state.user);
   const [enabled, setEnabled] = useState(false);
   const [expandedIndex, setExpandedIndex] = useState(null);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const questionsData  = [
      { question: 'Что такое персонализированная реклама?', answer: 'Персонализированная реклама — это реклама, которая, как нам кажется на основе данных с ваших устройств и других предоставленных вами данных (включая ваши поисковые запросы, посещенные вами сайты и темы, которые вы часто просматриваете), будет вам более интересной и полезной. Мы не показываем персонализированную рекламу, если вы отключили параметр на этой странице. Например, если вы ищете "роскошные автомобили" в Bing, мы можем использовать ваш поисковый запрос, чтобы показать вам рекламу производителя роскошных автомобилей, когда вы посещаете веб-сайт MSN или пользуетесь MSN mobile.' },
      { question: 'Почему компания Input Studios показывает персонализированную рекламу?', answer: 'Мы показываем персонализированную рекламу, чтобы клиентам было легче находить товары и услуги, к которым они проявили интерес, а рекламодатели могли взаимодействовать с клиентами, которые уже выразили заинтересованность в их товарах. Мы хотим, чтобы реклама товаров и услуг от Input Studios была полезной и релевантной, а наши рекламодатели могли проще связываться с потенциальными клиентами.' },
      { question: 'Как компания Input Studios предоставляет персонализированную рекламу?', answer: 'Корпорация Майкрософт партнеров со сторонними поставщиками для отображения персонализированной рекламы на MSN, Outlook.com и других веб-сайтах и приложениях. Корпорация Майкрософт также предоставляет рекламу поиска Bing и нашим партнерам по синдикации поиска. Дополнительные сведения о политиках конфиденциальности Майкрософт и Xandr см. в Заявление о конфиденциальности и Xandr. Вы можете узнать больше о персонализированной рекламе от нашего партнера Yahoo в Yahoo.' },
      { question: 'Как заполняется мой список интересов?', answer: 'В зависимости от просматриваемых сайтов, условий поиска и других действий в Интернете, корпорация Майкрософт определяет интересующие вас темы и добавляет их в список. Некоторые рекламные объявления, которые вы видите, основаны на этих интересах. В некоторых случаях интересы могут не отображаться на вашем языке. Конкретные интересы отображаются только в том случае, если вы вошли в учетную запись.' },
      { question: 'Как прекратить отображение персонализированной рекламы от других компаний и рекламных сетей?', answer: 'Даже если вы отключите параметр на этой странице, персонализированная реклама от других компаний и рекламных сетей, возможно, по-прежнему будет отображаться. Чтобы узнать, как отключить отображение персонализированной рекламы от других компаний и рекламных сетей, участвующих в программах саморегулирования, посетите следующие веб-сайты: В США: Digital Advertising Alliance (DAA) В Европе: European Interactive Digital Advertising Alliance (EDAA) В Канаде: Варианты рекламы: Digital Advertising Alliance of Canada (DAAC)' },
      { question: 'Когда Input Studios использует действия в браузере Input Studios Wave для показа рекламы?', answer: 'Мы используем действия в браузере Input Studios Wave для персонализации рекламы, только если вы предоставили общий доступ к действиям в браузере, связанным с персонализацией продукта, службы или учетной записи Майкрософт.' },
      { question: 'Как настроить мой браузер так, чтобы перестать видеть персонализированную рекламу?', answer: 'Мы уважаем ваш выбор. С помощью cookie-файлов мы запомним его и перестанем показывать персонализированную рекламу в этом браузере. Убедитесь, что в браузере поддерживаются cookie-файлы и что они не удаляются при закрытии браузера. Если вы удалили cookie-файлы, отказавшись от рекламы по интересам, возможно, вам придется отказаться еще раз. Чтобы, кроме этого, прекратить сбор и использование журнала браузера Input Studios Wave для персонализации ваших результатов поиска Майкрософт и веб-канала новостей, перейдите в раздел Input Studios Wave > Параметры > Конфиденциальность, поиск и службы. Подробнее' },
      { question: 'Как прекратить получать от корпорации Майкрософт письма с предложениями продуктов Майкрософт?', answer: 'Чтобы прекратить получение писем о продуктах Майкрософт от корпорации Майкрософт, посетите страницу https://account.inputstudios.ru/profile/communications, чтобы изменить настройки общения.' },
   ];

   const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
   };

   return (
      <div className="mt-[60px] px-4 min-h-screen mx-52 py-20">
         <Helmet>
            <title>{t("privacy:title")}</title>
            <link rel="icon" type="image/png" href="/icons/favicon.ico" />
         </Helmet>
         <div className="flex items-center space-x-2">
            <Link 
               to={`${languagePrefix}/account/privacy`} 
               className="text-2xl text-gray-500 hover:bg-gray-400/10 hover:rounded-lg transition py-1"
            >
               Конфиденциальность
            </Link>
            <IoIosArrowForward size={24} className="text-gray-500 ml-auto mt-1"/>
            <span className="text-2xl flex-1">Параметры рекламы</span>
            <div className="flex justify-between items-center my-7">
               <Link
                  to="/password/change"
                  className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white group"
               >
                  <div className="flex items-center gap-2">
                     <div className="flex items-center justify-center rounded-full bg-teal-100 w-9 h-9 group-hover:bg-[#0E7490] transition-colors duration-200 mb-2">
                        <img src="/images/mail.svg" alt="Icon" className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col text-left w-[280px]">
                        <p className="font-semibold text-sm text-teal-500">Ищете интерфейс без рекламы?</p>
                        <p className="text-xs text-teal-500 break-words whitespace-normal">Подписчики Input Studios Workspace не видят рекламу в Outlook.</p>
                     </div>
                  </div>
               </Link>
            </div>
         </div>
         <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col w-3/4">
               <p className="font-bold text-lg">Показывать рекламные объявления, которые вас интересуют</p>
               <p className="mt-4 w-[700px]">
                  Вы можете персонализировать рекламу, чтобы она отражала ваши интересы. Мы будем использовать ваши поисковые запросы, прошлые покупки продуктов Input Studios и другие действия в Интернете, связанные с вашей учетной записью Майкрософт и этим браузером, чтобы отображать более персонализированную рекламу, соответствующую вашим интересам. Если вы разрешили Input Studios Wave использовать действия в браузере для персонализации веб-интерфейсов, мы также будем использовать ваши действия в браузере Input Studios Wave, чтобы персонализировать для вас рекламу.
               </p>
               <p className="mt-4 w-[700px]">
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
                     onChange={setEnabled}
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
                  <span className="ml-2 text-md">{enabled ? 'Вкл.' : 'Выкл.'}</span>
               </div>
            </div>
            <div className="flex-shrink-0 w-1/4 mt-16 mr-16">
               <img
                  src={enabled ? "/images/privacy/account-privacy-on.svg" : "/images/privacy/account-privacy-off.svg"}
                  alt="Icon"
                  className="w-full h-auto"
               />
            </div>
         </div>
         <div className="mt-8">
            {currentUser ? (
               <>
                  <p className="mt-20 font-bold text-lg">
                     Выберите то, что вас интересует
                  </p>
                  <p className="mt-2">
                     Этот список интересов основан на ваших действиях. Вы можете удалить и восстановить интересы для повышения релевантности отображаемой рекламы.
                  </p>
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
         <div className="mt-10">
            <p className="text-lg font-bold">Управление персонализированной рекламой на вашем устройстве</p>
            <p className="mt-2">Вы можете выбрать, будет ли персонализироваться реклама, отображаемая в приложениях на ваших устройствах, изменив параметры конфиденциальности. Для этого выполните соответствующие инструкции для своего устройства.</p>
         </div>
         <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md mt-10">
            <h2 className="text-xl font-bold text-black dark:text-white mx-6 py-4">Возникли вопросы?</h2>
            <div className="">
               {questionsData.map((item, index) => (
                  <div key={index} className="mb-2">
                     <div
                        onClick={() => toggleExpand(index)}
                        className="flex justify-between items-center py-3 mx-6 cursor-pointer hover:bg-gray-600 transition"
                     >
                        <span className="text-lg">{item.question}</span>
                        <IoIosArrowForward className={`transition transform ${expandedIndex === index ? 'rotate-90' : ''}`} />
                     </div>
                     {expandedIndex === index && (
                        <div className="my-4 px-12 rounded-lg">
                           <p>{item.answer}</p>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
