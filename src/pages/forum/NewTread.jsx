import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function NewTread() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="mt-[60px]">
         <Helmet>
            <title>{t("home_title")}</title>
         </Helmet>
         <div>
            New Tread
         </div>
      </div>
   );
}
