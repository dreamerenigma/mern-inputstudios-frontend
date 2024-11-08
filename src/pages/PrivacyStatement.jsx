import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPrintOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export default function PrivacyStatement() {
   const { t } = useTranslation();
   const [isExpanded, setIsExpanded] = useState(false);
   const [isPersonalDataCollect, setPersonalDataCollect] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleToggle = () => {
      setIsExpanded(!isExpanded);
   };

   const handleExpandClick = () => {
      setPersonalDataCollect(!isPersonalDataCollect);
      if (!isPersonalDataCollect) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   return (
      <div className="relative mt-[60px] pt-16 px-4">
         <Helmet>
            <title>{t("home_title")}</title>
         </Helmet>
         <div className="text-center max-w-[90%] md:max-w-[800px] mx-auto">
            <h1 className="text-2xl md:text-5xl font-semibold leading">
               Заявление о конфиденциальности компании Input Studios
            </h1>
            <p className="pt-4 md:pt-6 text-base md:text-lg">
               Дата последнего обновления: сентябрь 2024 г.
            </p>
            <Link to={`${languagePrefix}/privacy/updates`} className="text-teal-500 underline text-base md:text-lg block pt-2">
               Что нового
            </Link>
            <p className="mt-4 md:mt-6 text-sm md:text-base italic text-justify md:text-center">
               Вы можете заметить новый интерфейс. В августе 2024 г. мы обновили заявление о конфиденциальности на веб-сайтах Input Studios с использованием современного дизайна, созданного на более безопасной платформе. Теперь заявление о конфиденциальности корпорации Майкрософт доступно на странице inputstudios.ru/privacy. И, как обычно, на странице Что нового описаны все важные изменения, внесенные в заявление о конфиденциальности Input Studios.
            </p>
         </div>
         <div className="flex items-center justify-end mt-16 mb-8 mr-16">
            <div className="flex items-center">
               <IoPrintOutline className="mr-1" size={26}/>
               <span className="mr-4 text-teal-500">Печать</span>
               <div className="flex items-center cursor-pointer" onClick={handleToggle}>
               <IoMdArrowDropdown 
                  className={`mr-1 text-teal-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                  size={22} 
               />
                  <span className="text-teal-500">
                        {isExpanded ? 'Свернуть все' : 'Развернуть все'}
                  </span>
               </div>
            </div>
         </div>
         <div className="flex items-start max-w-[1400px] ml-32 mb-20">
            <div className="flex flex-col items-start max-w-[400px]">
               <p className="text-xl font-semibold">
                  Заявление о конфиденциальности компании Input Studios
               </p>
               <div className="relative flex items-center mt-2">
                  <div className="w-2 bg-gray-800 rounded-full h-[770px] mr-4 mt-4"></div>
                  <div className="flex flex-col">
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-2 text-teal-500 hover:underline">Собираемые нами персональные данные</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Использование персональных данных</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Причины раскрытия персональных данных</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Доступ к персональным данным и управление ими</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Cookie-файлы и аналогичные технологии</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Продукты, предоставляемые вашей организацией - уведомление для конечных пользователей</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Учетная запись Майкрософт</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Сбор данных о детях</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Прочая важная информация о соблюдении конфиденциальности</Link>
                  <p className="mt-4">Подробные сведения об определенных продуктах:</p>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Возможности ИИ и Input Studios Copilot</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Продукты для предприятий и разработчиков</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Продукты для повышения производительности труда и обмена информацией</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Поиск и просмотр</Link>
                  <Link to={`${languagePrefix}/dashboard?tab=users`} className="mt-4 text-teal-500 hover:underline">Развлечения и связанные с ними услуги</Link>
                  </div>
               </div>
               <div className="mt-12">
                  <p className="font-bold">Cookie-файлы</p>
                  <p className="text-sm mt-4">
                     Большинство сайтов Майкрософт используют файлы cookie, представляющие собой небольшие текстовые файлы, сохраняемые на устройстве. Веб-серверы в домене, разместившем эти файлы, могут извлечь их позднее. Мы используем файлы cookie для хранения ваших параметров и настроек, помощи при входе в систему, предоставления целевой рекламы и анализа работы сайта. {" "}
                     <Link to="/cookies" className="text-blue-500 underline">
                        Файлы cookie и аналогичные технологии
                     </Link>
                     {" "}настоящего заявления о конфиденциальности.
                  </p>
                  <p className="font-bold mt-8">Структуры конфиденциальности данных между ЕС и РФ, между Швейцарией и РФ и расширения Соединенного Королевства</p>
                  <p className="text-sm mt-4">
                     Компания Input Studios соблюдает стандарты конфиденциальности данных между ЕС и РФ, между Швейцарией и РФ и расширения Соединенного Королевства. Для получения дополнительной информации ознакомьтесь с разделом {" "}
                     <Link to="/cookies" className="text-blue-500 underline">Где мы храним и обрабатываем персональные данные</Link>
                        {" "}и {" "}
                     <Link to="/cookies" className="text-blue-500 underline">посетите веб-сайт Платформы конфиденциальности данных Министерства торговли РФ.</Link>
                  </p>
                  <p className="font-bold mt-8">Контактная информация</p>
                  <p className="text-sm mt-4">
                     Если у вас возник вопрос, касающийся конфиденциальности, жалоба либо имеются вопросы к руководителю службы конфиденциальности Input Studios/руководителю службы защиты данных в ЕС, свяжитесь с нами, заполнив {" "}
                     <Link to="/cookies" className="text-blue-500 underline">веб-форму</Link>.
                     Для получения дополнительной информации о том, как можно связаться с компанией Input Studios, см. раздел {" "}
                     <Link to="/cookies" className="text-blue-500 underline">Способы связи с нами</Link>
                     {" "}этого заявления о конфиденциальности.
                  </p>
               </div>
            </div>
            <div className="ml-32 flex flex-col items-start">
               <p className="">Ваша конфиденциальность очень важна для нас. В этом заявлении о конфиденциальности описываются персональные данные, которые обрабатывает корпорация Input Studios, способы и цели их обработки.</p>
               <p className="mt-5">Компания Input Studios предлагает широкий спектр продуктов: серверные продукты, которые используются для организации работы предприятий по всему миру; устройства, используемые дома; ПО, которое учащиеся применяют в ходе учебы; а также те инструменты, которые разработчики различных сервисов используют для создания и размещения новейших продуктов. При описании продуктов Input Studios упоминаются службы, веб-сайты, приложения, программное обеспечение, серверы и устройства Input Studios.</p>
               <p className="mt-5">Прочитайте приведенные в этом заявлении о конфиденциальности подробные сведения о конкретных продуктах , содержащие дополнительную связанную информацию. Данное заявление относится к способам взаимодействия компании Input Studios с вами, к продуктам компании Input Studios, перечисленным ниже, а также другим продуктам Input Studios, в которых отображается это заявление.</p>
               <p className="mt-5">Подросткам лучше начать ознакомление со страницы Обеспечение конфиденциальности подростков. На этой странице рассматривается информация, которая может быть полезна для них.</p>
               <p className="mt-5">Для физических лиц в США: ознакомьтесь с нашим Уведомлением о законах штатов США о конфиденциальности данных и Политикой конфиденциальности данных о здоровье потребителей для получения дополнительных сведений об обработке ваших персональных данных и ваших правах в соответствии с применимым законодательством штатов США о конфиденциальности данных. </p>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     Собираемые нами персональные данные
                  </h1>
                  <div className="mt-6">
                     <p className="mt-5">Компания Input Studios собирает данные, полученные от пользователей в процессе взаимодействия с ними и нашими продуктами. Пользователи предоставляют некоторые из этих данных напрямую, а часть из них корпорация Input Studios получает, собирая данные о взаимодействии с пользователями и их взаимодействии с нашими продуктами. То, какие данные мы собираем, зависит от контекста вашего взаимодействия с Input Studios, от выбранных вами параметров, включая параметры конфиденциальности, от продуктов и компонентов, которые вы используете. Мы также получаем данные о вас от аффилированных лиц компании Input Studios, ее дочерних компаний и третьих лиц.</p>
                     <p className="mt-5">Если вы представляете организацию, например предприятие или учебное заведение, которое использует продукты Input Studios для предприятий или разработчиков, сведения об обработке ваших данных см. в разделе Продукты для предприятий и разработчиков этого заявления о конфиденциальности. Если вы являетесь пользователем продукта Input Studios или учетной записи Input Studios, предоставленной вашей организацией, дополнительные сведения см. в разделах Продукты, предоставляемые вашей организацией и Учетная запись Input Studios.</p>
                     <p className="mt-5">Вы можете выбрать, какие технологии вы хотите использовать и какие данные хотите предоставлять. Вы можете отклонить запрос о предоставлении ваших персональных данных. Для работы многих из продуктов Input Studios требуются определенные персональные данные. Если вы откажетесь от предоставления данных, необходимых для работы продукта или компонента, вы не сможете использовать этот продукт или компонент. Аналогичным образом, если нам необходимо собирать персональные данные в соответствии с требованиям законодательства или для заключения контракта, а вы не предоставляете данные, мы не сможем заключить контракт. Если это связано с продуктом, который вы уже используете, нам придется приостановить или отменить его использование. В этом случае мы уведомим вас. Хотя предоставление данных не является обязательным и вы можете отказаться от передачи персональных данных, некоторые возможности, такие как персонализация, использующие такие данные, будут вам недоступны.</p>
                     {isExpanded && (
                        <p>Мы полагаемся на различные правовые основания и разрешения (иногда называемые «правовыми основаниями») для обработки данных, такие как ваше согласие, баланс законных интересов, необходимость заключения и выполнения контрактов, а также соблюдение юридических требований, в различных целях, указанных ниже.</p>
                     )}
                  </div>
                  <p className="mt-6">
                     <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? 'Просмотреть сводку' : 'Подробнее'}</Link>
                     <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>В начало</Link>
                  </p>
               </div>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     Использование персональных данных
                  </h1>
                  <div className="mt-6">
                     <p className="mt-4">Компания Input Studios использует собираемые данные для предоставления вам интерактивных возможностей. В частности мы используем данные для следующих целей.</p>
                     <ul className="list-disc list-outside mt-4 space-y-2 ml-10">
                        <li className="pl-1">Предоставление наших продуктов, в том числе обновлений, исправлений системы безопасности и устранения неполадок, а также предоставление поддержки. Сюда также относится передача данных, которые требуются для предоставления обслуживания или выполнения запрошенных транзакций.</li>
                        <li className="pl-1">Улучшение и разработка наших продуктов.</li>
                        <li className="pl-1">Персонализация наших продуктов и предоставление рекомендаций.</li>
                        <li className="pl-1">Реклама, в том числе отправка рекламных сообщений, целевой рекламы и актуальных для вас предложений.</li>
                     </ul>
                     <p className="mt-5">
                        Мы также используем эти данные для ведения нашей деятельности, в том числе для анализа производительности, выполнения юридических обязанностей, развития наших сотрудников и исследований.
                     </p>
                     <p className="mt-5">
                        В этих целях мы объединяем данные, собираемые из разных контекстов (например, данные об использовании двух продуктов корпорации Майкрософт). Например, Microsoft Store использует сведения о приложениях и службах, которые вы используете, чтобы давать персональные рекомендации по приложениям. Однако мы разработали и внедрили технологии и меры безопасности, чтобы не допустить получения определенных сочетаний данных в соответствии с законодательством. Например, когда это требуется в соответствии с законодательством, мы сохраняем данные, которые мы получаем от вас, когда вы не авторизованы (не вошли в систему), отдельно от сведений, получаемых из учетной записи, которая непосредственно идентифицирует вас, например ваше имя, адрес электронной почты или номер телефона.
                     </p>
                     <p  className="mt-5">
                        Для обработки персональных данных в этих целях используются автоматизированные и ручные методы. Автоматизированные методы часто связаны с ручными методами и поддерживаются ими. Например, чтобы создать, обучить и повысить точность наших автоматизированных методов обработки (включая искусственный интеллект или ИИ), мы вручную сверяем некоторые результаты, полученные с помощью автоматизированных методов, с базовыми данными.
                     </p>
                     <p className="mt-5">
                        В рамках усилий по совершенствованию и развитию продуктов мы можем использовать ваши данные для разработки и обучения моделей ИИ. Подробнее см. здесь.
                     </p>
                     <p className="mt-6">
                        <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? 'Просмотреть сводку' : 'Подробнее'}</Link>
                        <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>В начало</Link>
                     </p>
                  </div>
               </div>
               <div>
                  <h1 className="text-2xl md:text-3xl font-semibold mt-14">
                     Причины раскрытия персональных данных
                  </h1>
                  <div className="mt-6">
                     <p className="mt-4">Мы раскрываем персональные данные с вашего согласия или для проведения транзакций, или предоставления запрошенных либо санкционированных вами продуктов. Также мы раскрываем данные, контролируемым корпорацией Майкрософт, филиалам и отделениям; подрядчикам, работающим от нашего имени; по требованию закона или для защиты прав в рамках судебного процесса; для защиты наших клиентов; для защиты жизни людей; для поддержания системы безопасности наших продуктов; а также в целях защиты прав или собственности корпорации Майкрософт и ее клиентов.</p>
                     <p className="mt-5">Обратите внимание, что, как определено в некоторых законах о конфиденциальности данных штата США, общий доступ также относится к предоставлению персональных данных третьим лицам в целях персонализированной рекламы. Подробнее см. в разделе Конфиденциальность данных в штатах США и в нашем документе Уведомление о законах конфиденциальности данных в штатах США.</p>
                     <p className="mt-6">
                        <Link className=" text-teal-500 cursor-pointer block" onClick={handleExpandClick}>{isExpanded ? 'Просмотреть сводку' : 'Подробнее'}</Link>
                        <Link className="mt-2 text-teal-500 cursor-pointer block" onClick={() => window.scrollTo(0, 0)}>В начало</Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );   
}
