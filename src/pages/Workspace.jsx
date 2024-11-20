import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function Workspace() {
   const { t } = useTranslation();

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <Helmet>
            <title>{t("projects_company_title")}</title>
         </Helmet>
         <div className="mb-8"></div>
      </div>
   );
}
