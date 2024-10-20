import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export default function AboutCompany() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>{t("about_company_title")}</title>
      </Helmet>
      <div className="relative w-full mx-4 mb-8">
        <img 
          src="/images/about_company.jpg" 
          alt={t("about_company_image_alt")} 
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute top-0 left-0 p-4 text-white bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-2xl font-bold">{t("about_company_heading")}</h1>
          <p className="text-2xl font-bold">{t("about_company_heading_title")}</p>
        </div>
      </div>
      <div className="text-center max-w-2xl mx-4 p-3">
        <p className="text-md text-gray-500">
          {t("about_company_description")}
        </p>
      </div>
    </div>
  );
}
