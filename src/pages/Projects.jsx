import { Helmet } from "react-helmet";
import CallToAction from "../components/CallToAction";
import { useTranslation } from "react-i18next";

export default function Projects() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 pt-3">
         <Helmet>
            <title>{t("projects_company_title")}</title>
         </Helmet>
         <h1 className="text-3xl font-semibold">Projects</h1>
         <p className="text-md text-gray-500">Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
         <CallToAction />
      </div>
   );
}
