import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import links from "../../data/privacyLinksData";

export default function PrivacySupportRequests() {
   const { t } = useTranslation();
   const [isWorkStudyOpen, setIsWorkStudyOpen] = useState(false);
   const [isTeenPrivacyOpen, setIsTeenPrivacyOpen] = useState(false);
   const [isAdvertisementsOpen, setIsAdvertisementsOpen] = useState(false);
   const [isRequestDataOpen, setIsRequestDataOpen] = useState(false);
   const [isPrivacyTeamOpen, setIsPrivacyTeamOpen] = useState(false);
   const [isAccountHelpOpen, setIsAccountHelpOpen] = useState(false);
   const toggleWorkStudy = () => setIsWorkStudyOpen(prevState => !prevState);
   const toggleTeenPrivacy = () => setIsTeenPrivacyOpen(prevState => !prevState);
   const toggleAdvertisements = () => setIsAdvertisementsOpen(prevState => !prevState);
   const toggleRequestData = () => setIsRequestDataOpen(prevState => !prevState);
   const togglePrivacyTeam = () => setIsPrivacyTeamOpen(prevState => !prevState);
   const toggleAccountHelp = () => setIsAccountHelpOpen(prevState => !prevState);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="mx-28 mt-[60px] mb-20">
         <Helmet>
            <title>{t("privacy:")}Поддержка и запросы, связанные с конфиденциальностью</title>
         </Helmet>
         <p className="text-4xl pt-14 font-semibold w-[850px]">
            {t("privacy:")}Поддержка и запросы, связанные с конфиденциальностью
         </p>
         <p className="mt-8 mb-14">
            Мы предлагаем вам различные варианты управления вашими персональными данными, полученными корпорацией Input Studios, и осуществления ваших прав на защиту данных. Обратите внимание, что такое содержимое, как сообщения электронной почты, контакты и чаты, доступно через интерфейс продукта. Дополнительные сведения о данных, которыми вы можете управлять в продуктах Input Studios, можно найти в разделе{" "}
            <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
               {t("privacy:")}Часто задаваемые вопросы о конфиденциальности (FAQ)
            </Link>
            .
         </p>
         <div className="border-t border-gray-300 mb-4"></div> 
         <div className="flex flex-col">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleWorkStudy}>
               <span className={`transform transition-transform duration-300 ${isWorkStudyOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">Рабочая или учебная запись</p>
         </div>
         {isWorkStudyOpen && (
            <ul className="ml-8 pl-6">
               <li>
                  В большинстве случаев данными, собранными во время использования рабочей или учебной учетной записи, владеет и управляет ваша организация или учебное заведение. По вопросам, связанным с этими данными, следует обращаться к вашему ИТ-администратору. Дополнительные сведения можно найти в разделах &quot;Продукты, предоставляемые этой организацией — уведомление для конечных пользователей&quot; и &quot;Продукты для предприятий и разработчиков&quot;{" "}
                  <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">заявления о конфиденциальности компании Input Studios.</Link>
               </li>
               <li className="mt-6">
                  Если вы являетесь ИТ-администратором организации, у которой есть контракт на поддержку Premier или Единую поддержку с корпорацией Input Studios, обратитесь к менеджеру по работе с клиентами Input Studios или торговому посреднику партнера, чтобы обсудить все соответствующие положения вашего контракта. Если у вас нет менеджера по работе с клиентами или торгового посредника,{" "}
                  <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">отправьте запрос в службу поддержки</Link>
                  {" "}на портале администрирования Input Studios для получения дополнительной помощи.
               </li>
               <ul className="list-disc pl-12 mt-4 mb-6">
                  {links.map((link, index) => (
                     <li key={index}>
                        <Link to={link.url} className="text-teal-500 underline">
                           {link.textUrl}
                        </Link>
                           {link.text}
                     </li>
                  ))}
                  <li>
                     Контактное лицо клиента или ИТ-администратор организации — {" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">     
                        отправьте запрос
                     </Link>
                     {" "}о ваших персональных данных, которые могли быть собраны для предоставления поддержки и других предложений Профессиональных услуг, где компания Input Studios является управляющим данными.
                  </li>
               </ul>
            </ul>
         )}
         </div>
         <div className="border-t border-gray-300 my-4"></div> 
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleTeenPrivacy}>
            <span className={`transform transition-transform duration-300 ${isTeenPrivacyOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
               </span>
               <p className="text-lg font-semibold">Обеспечение конфиденциальности подростков</p>
            </div>
            {isTeenPrivacyOpen && (
               <ul className="pl-6 ml-8">
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Узнайте о методах Input Studios по обеспечению конфиденциальности
                     </Link>
                     {" "}, а также ознакомьтесь с использованием наших продуктов способами, которые защищают конфиденциальность.</li>
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Управление согласием родителей и учетными записями Input Studios для детей
                     </Link>
                  </li>
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Посетите страницу Input Studios Family Safety
                     </Link>
                     {" "}, чтобы отфильтровать определенное содержимое, установить ограничения на использование устройств и управлять общим доступом.</li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Войдите в учетную запись Input Studios
                     </Link>, чтобы управлять данными и параметрами конфиденциальности.</li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div> 
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleAdvertisements}>
            <span className={`transform transition-transform duration-300 ${isAdvertisementsOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">Объявления и рекламные письма</p>
            </div>
            {isAdvertisementsOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Управляйте своими разрешениями на коммуникацию для таких элементов
                     </Link>
                     {" "}, как рекламные сообщения электронной почты и информационные бюллетени.</li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Персонализируйте рекламу
                     </Link>
                     {" "}, которая вам демонстрируется, чтобы она отражала ваши интересы.
                  </li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleRequestData}>
               <span className={`transform transition-transform duration-300 ${isRequestDataOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
                  <IoIosArrowForward className="mx-4 text-xl" />
               </span>
               <p className="text-lg font-semibold">Создание запроса о своих пресональных данных</p>
            </div>
            {isRequestDataOpen && (
               <ul className="pl-6 ml-8">
                  <p className="mt-8">
                     В компании Input Studios мы считаем, что в основе конфиденциальности лежит предоставление пользователям возможности управления их данными. {" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:")}Панель мониторинга конфиденциальности {" "}
                     </Link>
                     — это место, где можно просматривать и удалять данные, которые Input Studios сохраняет в облаке. К этим данным относятся журнал браузера, журнал Поиска Clever, данные о местоположении, действия в приложениях и службах и многое другое.
                  </p>
                  <p className="mt-6">
                     Если вы хотите просмотреть и обновить профиль, контакты и сведения для защиты, вы можете войти в свою {" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:")}учетную запись Input Studios
                     </Link>
                     .
                  </p>
                  <p className="mt-6 mb-4">
                     Если у вас есть личное содержимое, которое нужно просмотреть или загрузить из продуктов Input Studios, соответствующие инструменты можно найти в этих продуктах.
                  </p>
                  <ul className="list-disc pl-6 ml-8">
                     <li className="">
                        <strong>Журнал поиска Clever. Просматривайте и экспортируйте журнал поиска на{" "}</strong>
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           панели мониторинга конфиденциальности
                        </Link>
                        {" "}или в {" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           настройках Clever
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>FlareDrive</strong>. Просматривайте и скачивайте файлы в {" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           FlareDrive
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>Outlook.com</strong>. Экспортируйте свои электронные письма, календарь и контакты в {" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           Outlook.com
                        </Link>
                        {"\"Настройки\""}{" > "}{"\"Общие\""}{" > "}{"\"Конфиденциальность и данные\""}.
                        Подробнее: {" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           Импорт и экспорт сообщений, контактов и календаря Outlook
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>Chatify</strong>.{" "} 
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           Экспортируйте журнал чата Chatify и файлы
                        </Link>
                     </li>
                  </ul>
                  <p className="mt-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:")}Создание запроса, связанного с личной учетной записью Input Studios
                     </Link>
                     .
                  </p>
                  <p className="mt-6 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:")}Создание запроса, не связанного с личной учетной записью Input Studios
                     </Link>
                     .
                  </p>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={togglePrivacyTeam}>
            <span className={`transform transition-transform duration-300 ${isPrivacyTeamOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">Обращение в команду по конфиденциальности Input Studios или к специалисту по защите данных Input Studios</p>
            </div>
            {isPrivacyTeamOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Создание запроса, связанного с личной учетной записью Input Studios
                     </Link>
                  </li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Создание запроса, не связанного с личной учетной записью Input Studios
                     </Link>
                  </li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleAccountHelp}>
            <span className={`transform transition-transform duration-300 ${isAccountHelpOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">Справка по учетной записи Input Studios</p>
            </div>
            {isAccountHelpOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        Справка по учетной записи Input Studios 
                     </Link>
                     {" "}— помощь со входом, заблокированными или скомпрометированными учетными записями, с восстановлением пароля и т. д.
                  </li>
               </ul>
            )}
         </div>
      </div>
   );
}
