import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { IoIosArrowForward } from 'react-icons/io';

export default function About() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="min-h-screen items-center justify-center mt-[60px] pt-16">
         <Helmet>
            <title>{t("privacy")}</title>
         </Helmet>
         <div className="mx-auto">
            <div className="px-4 padding-card lg:px-16">
               <div className="mx-auto w-full lg:max-w-4xl text-center mb-8 text-left-860">
                  <h1 className="text-3xl font-semibold md:text-5xl lg:text-5xl">{t("privacy:privacy_policy")}</h1>
                  <p className="text-lg font-semibold mt-5">{t("privacy:data_stays_private_work")}</p>
               </div>
               <Link to={`${languagePrefix}/search`} className="block w-full mx-auto mb-8">
                  <img className="w-full h-auto" src="/images/privacy_landing_main.avif" alt="privacy" />
               </Link>
               <div className="text-center max-width mx-auto my-7 text-left-860">
                  <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold">{t("privacy:privacy_protection_measures")}</h1>
                  <p className="text-md mt-4 leading-7">{t("privacy:base_privacy_commitments")}</p>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 px-4 padding-card custom-grid">
               {[
                  {
                     imgSrc: "/images/privacy/privacy_your_information.avif",
                     title: t("privacy:control_your_information"),
                     description: t("privacy:give_you_control_over"),
                  },
                  {
                     imgSrc: "/images/privacy/privacy_your_data.avif",
                     title: t("privacy:your_data_is_protected"),
                     description: t("privacy:systematically_protect_your_data"),
                  },
                  {
                     imgSrc: "/images/privacy/privacy_by_design.avif",
                     title: t("privacy:privacy_definition"),
                     description: t("privacy:develop_our_products"),
                  },
                  {
                     imgSrc: "/images/privacy/privacy_insights.avif",
                     title: t("privacy:defend_your_rights"),
                     description: t("privacy:fight_stronger_privacy"),
                  }
               ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 shadow-md rounded-xl flex flex-col">
                        <img 
                           src={item.imgSrc} 
                           alt={`Description ${index + 1}`} 
                           className="w-full h-auto rounded-t-xl object-cover" 
                        />
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 px-4 sm:px-6">{item.title}</h2>
                        <p className="px-4 sm:px-6 pb-4 flex-grow text-sm sm:text-base">{item.description}</p>
                  </div>
               ))}
            </div>
            <div className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">{t("privacy:discover_and_manage_your")}</h1>
               <p className="text-md flex flex-col gap-6 max-width mx-auto leading-7">
                  {t("privacy:privacy_core_build_products")}
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 px-4 md:px-16 padding-card">
               {[
                  {
                        imgSrc: "/images/privacy/privacy_dashboard_card.avif",
                        title: t("privacy:visit_privacy_dashboard"),
                        description: t("privacy:privacy_dashboard_lets_manage"),
                        linkText: t("privacy:go_privacy_dashboard"),
                        linkPath: `${languagePrefix}/account/privacy`
                  },
                  {
                        imgSrc: "/images/privacy/privacy_account_checkup_card.avif",
                        title: t("privacy:account_verification"),
                        description: t("privacy:account_verification_wizard"),
                        linkText: t("privacy:perform_account_verification"),
                        linkPath: `${languagePrefix}/account/privacy`
                  },
                  {
                        imgSrc: "/images/privacy/privacy_controls_card.avif",
                        title: t("privacy:finding_privacy_controls"),
                        description: t("privacy:fight_stronger_privacy"),
                        linkText: t("privacy:additional_privacy_controls"),
                        linkPath: `${languagePrefix}/account/privacy`
                  }
               ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 shadow-md rounded-xl flex flex-col overflow-hidden">
                        <img 
                           src={item.imgSrc} 
                           alt={`Description ${index + 1}`} 
                           className="w-full h-auto rounded-t-xl object-cover" 
                        />
                        <h2 className="text-lg md:text-xl lg:text-2xl text-card font-semibold mt-2 p-4 px-6">{item.title}</h2>
                        <p className="px-6 pb-4 flex-grow text-sm md:text-base">{item.description}</p>
                        <div className="pb-6 group">
                           <Link to={item.linkPath} className="flex items-center px-6 text-teal-500">
                              <span className="mr-2 hover:underline">{item.linkText}</span>
                              <IoIosArrowForward size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                           </Link>
                        </div>
                  </div>
               ))}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-20 py-10">
               <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <img src="/images/privacy/privacy_data_protection.avif" alt="Description" className="w-full h-auto rounded-xl" />
               </div>
               <div className="w-full md:w-1/2 flex flex-col justify-center md:ml-12">
                  <h2 className="text-3xl font-semibold mb-4">{t("privacy:data_protection_business")}</h2>
                  <p className="text-md mb-4">
                     {t("privacy:enterprise_business_customers")}
                  </p>
                  <button className="w-[60%] md:w-[400px] mt-2 px-4 py-2 bg-teal-500 text-white shadow-md rounded-lg hover:bg-teal-600 text-left md:text-center">
                     {t("privacy:security_control_center")}
                  </button>
               </div>
            </div>
            <div className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">{t("privacy:learn_more_about_privacy")}</h1>
               <p className="text-md flex flex-col gap-6 max-width mx-auto leading-7">
                  {t("privacy:more_information_about_privacy")}
               </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-6 px-4 md:px-16 padding-card w-full">
               {[
                  {
                        title: t("privacy:privacy_statement"),
                        description: t("privacy:privacy_very_important"),
                        link: "/privacystatement"
                  },
                  {
                        title: t("privacy:privacy_young_people"),
                        description: t("privacy:privacy_young_about_and_understand"),
                        link: "/young-people"
                  },
                  {
                        title: t("privacy:report_privacy_statement"),
                        description: t("privacy:privacy_report_contains"),
                        link: "/privacy-report"
                  },
                  {
                        title: t("privacy:answers_frequently_asked"),
                        description: t("privacy:have_questions_about_privacy"),
                        link: "/faq"
                  },
                  {
                        title: t("privacy:corporate_social_responsibility"),
                        description: t("privacy:approach_creating_more"),
                        link: "/corporate-responsibility"
                  },
                  {
                        title: t("privacy:data_privacy_notice"),
                        description: t("privacy:located_data_privacy_notice"),
                        link: "/ccpa"
                  }
               ].map((item, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 flex flex-col">
                        <div className="bg-white dark:bg-gray-700 shadow-md rounded-xl flex flex-col flex-grow p-4">
                           <Link to={item.link} className="text-lg sm:text-xl font-semibold text-teal-500 underline hover:text-teal-700">{item.title}</Link>
                           <p className="mt-2 text-sm sm:text-base">{item.description}</p>
                        </div>
                  </div>
               ))}
            </div>
            <div className="pt-8 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">{t("privacy:whats_new")}</h1>
               <p className="text-md flex flex-col gap-6 max-width mx-auto leading-7">
                  {t("privacy:check_out_latest_articles")}
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 px-4 md:px-16 padding-card">
               {[
                  {
                        img: "/images/privacy/gdpr_and_generative_ai_a_guide_for_the_public_sector.avif",
                        title: t("privacy:gdpr_and_generative_ai"),
                        description: t("privacy:paper_provides_practical"),
                  },
                  {
                        img: "/images/privacy/protecting_the_data_of_our_commercial_and_public_sector_customers_in_the_ai_era.avif",
                        title: t("privacy:protecting_commercial_public_sector"),
                        description: t("privacy:commitment_protecting"),
                  },
                  {
                        img: "/images/privacy/enhancing_trust_and_protecting_privacy_in_the_ai_era.avif",
                        title: t("privacy:building_trust_protecting"),
                        description: t("privacy:privacy_commitment_applies"),
                  },
                  {
                        img: "/images/privacy/eu_data_boundary_blog_image_small.avif",
                        title: t("privacy:enables_customers_store"),
                        description: t("privacy:eu_data_border_enables_customers"),
                  }
               ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 shadow-md rounded-xl flex flex-col">
                        <div className="flex-grow flex flex-col">
                           <img src={item.img} alt={`Description ${index + 1}`} className="w-full h-auto rounded-t-xl" />
                           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 p-4">{item.title}</h2>
                           <p className="p-4 flex-grow text-sm sm:text-base">{item.description}</p>
                           <div className="pb-6 group">
                              <Link to={`${languagePrefix}/account/privacy`} className="flex items-center px-4 text-teal-500">
                                    <span className="mr-2 hover:underline">{t("privacy:read_more")}</span>
                                    <IoIosArrowForward size={22} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                           </div>
                        </div>
                  </div>
               ))}
            </div>
            <div className="pt-8 mb-20 px-4 md:px-8 lg:px-16 text-center text-left-860">
               <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">{t("privacy:contact_our_team")}</h1>
               <p className="text-md flex flex-col gap-6  max-w-4xl mx-auto leading-7">
                  <p>
                     {t("privacy:privacy_concerns")}{" "}
                     <a href="/concern/privacy" className="text-teal-500 underline hover:text-teal-700">
                        {t("privacy:contact_us")}
                     </a>
                  </p>
               </p>
            </div>
         </div>
      </div>
   );
}
