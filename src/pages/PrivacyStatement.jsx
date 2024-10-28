import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PrivacyStatement() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="relative mt-[60px] pt-16 px-4">
         <Helmet>
            <title>{t("home_title")}</title>
         </Helmet>
         <div className="text-center max-w-[90%] md:max-w-[700px] mx-auto">
            <h1 className="text-2xl md:text-4xl font-semibold">
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
      </div>
   );   
}
