import { Footer } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";
import { BiLogoFigma } from "react-icons/bi";
import { Helmet } from "react-helmet";

export default function TermsOfUse() {
   const { t } = useTranslation();

   return (
      <div className="mb-12 pt-20 px-12">
         <Helmet>
            <title>{t("terms:title_terms_of_use")}</title>
         </Helmet>
         <h1 className="text-4xl font-semibold">{t("terms:terms_of_use")}</h1> 
         <p className="mt-8 text-base">{t("terms:last_updated")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:acceptance_terms")}</h1>
         <p className="mt-6 text-base">{t("terms:services_provides")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:description_services")}</h1>
         <p className="mt-6 text-base">{t("terms:network_web_properties")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:non_commercial_use_limitation")}</h1>
         <p className="mt-6 text-base">{t("terms:unless_otherwise_specified")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:privacy_protection")}</h1>
         <p className="mt-8 text-base">{t("terms:see_privacy_statement")}<a href="https://inputstudios.ru/legal/intellectualproperty/infringement" className="text-blue-500 underline">{t("terms:privacy_statement")}</a>{t("terms:disclosures_relating")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:content")}</h1>
         <p className="mt-8 text-base">{t("terms:content_included")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:software")}</h1>
         <p className="mt-8 text-base">{t("terms:software_made_available")}</p>
         <p className="mt-4 text-base">{t("terms:available_download_solely")}</p>
         <p className="mt-8 text-base font-bold">{t("terms:limiting_foregoing")}</p>
         <p className="mt-8 text-base" dangerouslySetInnerHTML={{ __html: t('terms:limiting_foregoing') }} />
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:documents")}</h1>
         <p className="mt-8 text-base">{t("terms:permission_use_documents")}</p>
         <p className="mt-8 text-base">{t("terms:documents_specified_above")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:representations_warranties")}</h1>
         <p className="mt-8 text-base">{t("terms:software_warranted")}</p>
         <p className="mt-8 text-base font-bold">{t("terms:suppliers_make_no_representations")}</p>
         <p className="mt-8 text-base">{t("terms:documents_related_graphics")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:limitation_liability")}</h1>
         <p className="mt-8 text-base font-bold">{t("terms:in_no_event_shall")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:member_account")}</h1>
         <p className="mt-8 text-base">{t("terms:services_requires")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:unlawful_prohibited_use")}</h1>
         <p className="mt-8 text-base">{t("terms:condition_your_use_Services")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:use_services")}</h1>
         <p className="mt-8 text-base">{t("terms:services_may_contain_services")}</p>
         <ul className="ml-4 mt-4 list-disc list-outside pl-6 text-base">
            <li>{t("terms:use_communication_services")}</li>
            <li className="mt-4">{t("terms:defame_abuse_harass_stalk")}</li>
            <li className="mt-4">{t("terms:publish_post_upload")}</li>
            <li className="mt-4">{t("terms:upload_otherwise_make_available")}</li>
            <li className="mt-4">{t("terms:use_material_information")}</li>
            <li className="mt-4">{t("terms:upload_files_contain_viruses")}</li>
            <li className="mt-4">{t("terms:advertise_offer_sell")}</li>
            <li className="mt-4">{t("terms:download_file_posted")}</li>
            <li className="mt-4">{t("terms:falsify_or_delete")}</li>
            <li className="mt-4">{t("terms:restrict_inhibit")}</li>
            <li className="mt-4">{t("terms:violate_code_conduct")}</li>
            <li className="mt-4">{t("terms:harvest_otherwise")}</li>
            <li className="mt-4">{t("terms:violate_applicable")}</li>
            <li className="mt-4">{t("terms:create_false_identity")}</li>
            <li className="mt-4">{t("terms:use_download_otherwise_copy")}</li>
         </ul>
         <p className="mt-6 text-base">{t("terms:obligation_monitor")}</p>
         <p className="mt-6 text-base">{t("terms:disclose_information")}</p>
         <p className="mt-6 text-base">{t("terms:personally_identifiable_information")}</p>
         <p className="mt-6 text-base">{t("terms:materials_uploaded_communication_services")}</p>
         <p className="mt-6 text-base font-bold">{t("terms:ai_services")}</p>
         <p className="mt-6 text-base">{t("terms:labeled_described")}</p>
         <ul className="ml-4 mt-4 list-disc list-outside pl-6 text-base">
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("terms:reverse_engineering") }} />
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("terms:extracting_data") }} />
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("terms:limits_use_data") }} />
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("terms:use_your_content") }} />
         </ul>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:materials_provided")}</h1>
         <p className="mt-6 text-base">{t("terms:not_claim_ownership")}</p>
         <p className="mt-6 text-base">{t("terms:no_compensation")}</p>
         <p className="mt-6 text-base">{t("terms:posting_submission")}</p>
         <p className="mt-6 text-base">{t("terms:addition_warranty_representation")}</p>
         <h1 className="mt-8 text-3xl font-semibold">{t("terms:notices_procedure")}</h1>
         <p className="mt-6 text-base">{t("terms:pursuant_title")}</p>
         <p className="mt-6 text-base">{t("terms:see_notice_procedure")}{t("terms:see")}<a href="https://inputstudios.ru/legal/intellectualproperty/infringement" className="text-blue-500 underline"></a>{t("terms:see_notice_procedure")}</p>
         <h1 className="mt-8 text-4xl font-semibold">{t("terms:links_third_party_sites")}</h1>
         <p className="mt-6 text-base">{t("terms:links_in_area_leave")}</p>
         <h1 className="mt-8 text-4xl font-semibold">{t("terms:unsolicited_idea")}</h1> 
         <p className="mt-6 text-base">{t("terms:employees_not_accept")}</p>
         <div className="flex flex-wrap gap-4 mt-20">
            <p>{t("home_subscribe_news")}</p>
            <div className="flex flex-wrap gap-4">
               <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
               <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={BsYoutube} />
               <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={BiLogoFigma} />
               <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={BsGithub} />
               <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
            </div>
         </div>
      </div>
   );
}
