import { useTranslation } from 'react-i18next';

export default function About() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="max-w-2xl mx-auto p-3 text-center">
            <div>
               <h1 className="text-3xl font font-semibold text-center my-7">{t("about")}</h1>
               <div className="text-md text-gray-500 flex flex-col gap-6">
                  <p>{t("about_blog")}</p>
                  <p>{t("about_search")}</p>
                  <p>{t("about_description")}</p>
               </div>
            </div>
         </div>
      </div>
   );
}
