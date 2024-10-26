import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function QuantumEngine() {
   const { t } = useTranslation();

   return (
      <div className="flex flex-col items-center justify-center h-screen mt-[60px]">
         <Helmet>
            <title>{t("home_title")}</title>
            <link rel="icon" type="image/png" href="/icons/quantum-engine/favicon.ico" />
         </Helmet>
      </div>
   );
}
