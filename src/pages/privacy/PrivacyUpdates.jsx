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
            <title>{t("privacy:log_of_changes")}</title>
         </Helmet>
         <p className="text-4xl pt-14 font-semibold w-[850px]">
            {t("privacy:log_of_changes")}
         </p>
         <p className="mt-8">
            <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
               {t("privacy:back_privacy_statement")}
            </Link>
         </p>
         <div className="mt-16">
            <p className="text-2xl font-semibold">{t("privacy:data_september_2024")}</p>
            <ul className="list-disc pl-12 mt-8 space-y-3">
               <li dangerouslySetInnerHTML={{ __html: t("privacy:personal_data_we_collect_section") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:personal_data_we_collect_section_reasons") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:we_updated_cookies_and_similar") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:data_privacy_russian_regions") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:data_privacy_russian_federation") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:added_new_launcher") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:added_information_interaction_devices") }}></li>
            </ul>
         </div>
         <div className="mt-12">
            <p className="text-2xl font-semibold">{t("privacy:data_august_2024")}</p>
            <ul className="list-disc pl-12 mt-8 mb-16 space-y-3">
               <li dangerouslySetInnerHTML={{ __html: t("privacy:we_updated_use_personal_data") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:we_have_further_clarified_purposes") }}></li>
               <li dangerouslySetInnerHTML={{ __html: t("privacy:we_have_enhanced") }}></li>
            </ul>
         </div>
      </div>
   );
}
