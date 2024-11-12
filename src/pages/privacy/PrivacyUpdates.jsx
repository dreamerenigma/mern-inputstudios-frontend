import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function PrivacyUpdates() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="mx-28 mt-[60px]">
         <Helmet>
            <title>{t("privacy:")}Журнал изменений в Заявлении о конфиденциальности корпорации Input Studios</title>
         </Helmet>
         <p className="text-4xl pt-14 font-semibold w-[850px]">
            {t("privacy:")}Журнал изменений в Заявлении о конфиденциальности компании Input Studios
         </p>
         <p className="mt-8">
            <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
               {t("privacy:")}Вернуться к заявлению о конфиденциальности
            </Link>
         </p>
         <div className="mt-16">
         <p className="text-2xl font-semibold">{t("privacy:")}Сентябрь 2024 г.</p>
         <ul className="list-disc pl-12 mt-8">
            <li>
               {t("privacy:")}В разделе <strong>Персональные данные, которые мы собираем</strong> мы уточнили, что можем получать данные от аффилированных лиц и дочерних компаний Input Studios.
            </li>
            <li>
               {t("privacy:")}В разделы &quot;Персональные данные, которые мы собираем&quot;, &quot;Причины, по которым мы делимся персональными данными&quot;, &quot;Конфиденциальность данных в областях РФ&quot; и &quot;Реклама&quot;; добавлены формулировки, разъясняющие наши методы рекламы и причины, по которым мы можем делиться информацией для этих целей.
            </li>
            <li>
               {t("privacy:")}Мы обновили раздел <strong>Файлы cookie и аналогичные технологии</strong>, чтобы включить туда упоминание дополнительных файлов cookie сеансов, которые могут использоваться для балансировки нагрузки.
            </li>
            <li>
               {t("privacy:")}В раздел <strong>Конфиденциальность данных в областях РФ</strong> добавлена информация, уточняющая, что мы не занимаемся &quot;профилированием&quot;, то есть не используем персональные данные для автоматического принятия решений, которое приводит к юридическим или аналогичным значительным последствиям.
            </li>
            <li>
               {t("privacy:")}В разделе <strong>Конфиденциальность данных в областях РФ</strong> мы уточнили, что можем получать данные о подписке и лицензировании от сторонних магазинов и платформ, на которых приобретены наши продукты, и уточнили цели обработки этих данных.
            </li>
            <li>
               {t("privacy:")}Добавлен новый раздел <strong>Input Studios Launcher</strong> с описанием данных, используемых некоторыми функциями Input Studios Launcher.
            </li>
            <li>
               {t("privacy:")}Добавлены сведения в раздел <strong>Взаимодействие с устройствами в разделе Windows</strong>, объясняющие, как получить доступ к файлам мобильного устройства в проводнике.
            </li>
         </ul>
         </div>
         <div className="mt-12">
         <p className="text-2xl font-semibold">{t("privacy:")}Август 2024 г.</p>
         <ul className="list-disc pl-12 mt-8 mb-16">
            <li>
               {t("privacy:")}Мы обновили раздел <strong>Как мы используем персональные данные</strong>, чтобы уточнить, что мы можем использовать данные для разработки и обучения наших моделей искусственного интеллекта.
            </li>
            <li>
               {t("privacy:")}Далее мы уточнили цели и правовые основания обработки персональных данных в разделе <strong>Как мы используем персональные данные</strong>.
            </li>
            <li>
               {t("privacy:")}Мы усовершенствовали раздел <strong>Конфиденциальность данных области РФ</strong> для дальнейшего разъяснения ваших прав в соответствии с соответствующими законами области РФ о конфиденциальности данных, а также того, как вы можете воспользоваться правами, связанными с вашими данными, у нас.
            </li>
         </ul>
         </div>
      </div>
   );
}
