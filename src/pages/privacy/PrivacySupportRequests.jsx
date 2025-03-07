import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import links from "../../data/privacyLinksData.jsx";

export default function PrivacySupportRequests() {
   const { t } = useTranslation();
   const [isWorkStudyOpen, setIsWorkStudyOpen] = useState(false);
   const [isTeenPrivacyOpen, setIsTeenPrivacyOpen] = useState(false);
   const [isAdvertisementsOpen, setIsAdvertisementsOpen] = useState(false);
   const [isRequestDataOpen, setIsRequestDataOpen] = useState(false);
   const [isPrivacyTeamOpen, setIsPrivacyTeamOpen] = useState(false);
   const [isAccountHelpOpen, setIsAccountHelpOpen] = useState(false);
   const toggleWorkStudy = () => setIsWorkStudyOpen(prevState => !prevState);
   const toggleTeenPrivacy = () => setIsTeenPrivacyOpen(prevState => !prevState);
   const toggleAdvertisements = () => setIsAdvertisementsOpen(prevState => !prevState);
   const toggleRequestData = () => setIsRequestDataOpen(prevState => !prevState);
   const togglePrivacyTeam = () => setIsPrivacyTeamOpen(prevState => !prevState);
   const toggleAccountHelp = () => setIsAccountHelpOpen(prevState => !prevState);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   const linksList = links(languagePrefix);

   return (
      <div className="mx-28 mt-[60px] mb-20">
         <Helmet>
            <title>{t("privacy:privacy_support_and_inquiries")}</title>
         </Helmet>
         <p className="text-4xl pt-14 font-semibold w-[850px]">
            {t("privacy:privacy_support_and_inquiries")}
         </p>
         <p className="mt-8 mb-14">
            {t("privacy:offer_you_various_options")}{" "}
            <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
               {t("privacy:privacy_faqs")}
            </Link>
            .
         </p>
         <div className="border-t border-gray-300 mb-4"></div> 
         <div className="flex flex-col">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleWorkStudy}>
               <span className={`transform transition-transform duration-300 ${isWorkStudyOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">{t("privacy:work_school_account")}</p>
         </div>
         {isWorkStudyOpen && (
            <ul className="ml-8 pl-6">
               <li>
                  {t("privacy:in_most_cases")}{" "}
                  <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">{t("privacy:privacy_statements")}</Link>
               </li>
               <li className="mt-6">
                  {t("privacy:it_administrator_an_organization")}{" "}
                  <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">{t("privacy:submit_support_request")}</Link>
                  {" "}{t("privacy:admin_portal_for_further_assistance")}
               </li>
               <ul className="list-disc pl-12 mt-4 mb-6">
                  {linksList.map((link, index) => (
                     <li key={index}>
                        <Link to={link.url} className="text-teal-500 underline">
                           {t(link.textUrl)}
                        </Link>
                           {t(link.text)}
                     </li>
                  ))}
                  <li>
                     {t("privacy:customer_contact_organizations")} {" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">     
                        {t("privacy:submit_request")}
                     </Link>
                     {" "}{t("privacy:about_your_personal_data")}
                  </li>
               </ul>
            </ul>
         )}
         </div>
         <div className="border-t border-gray-300 my-4"></div> 
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleTeenPrivacy}>
            <span className={`transform transition-transform duration-300 ${isTeenPrivacyOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
               </span>
               <p className="text-lg font-semibold">{t("privacy:protecting_teen_privacy")}</p>
            </div>
            {isTeenPrivacyOpen && (
               <ul className="pl-6 ml-8">
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:learn_about_privacy_practices")}
                     </Link>
                     {t("privacy:and_learn_how_use_our_products")}</li>
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:managing_parental_consent")}
                     </Link>
                  </li>
                  <li className="py-2">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                     {t("privacy:family_safety_page")}
                     </Link>
                     {t("privacy:filter_certain_content")}</li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:log_in_your_account")}
                     </Link>, {t("privacy:manage_data_privacy_settings")}</li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div> 
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleAdvertisements}>
            <span className={`transform transition-transform duration-300 ${isAdvertisementsOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">{t("privacy:advertisements_marketing_emails")}</p>
            </div>
            {isAdvertisementsOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:manage_your_communication_permissions")}
                     </Link>
                     {t("privacy:marketing_emails_newsletters")}</li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:personalize_advertising")}
                     </Link>
                     {t("privacy:relevant_you")}
                  </li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleRequestData}>
               <span className={`transform transition-transform duration-300 ${isRequestDataOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
                  <IoIosArrowForward className="mx-4 text-xl" />
               </span>
               <p className="text-lg font-semibold">{t("privacy:request_your_personal_data")}</p>
            </div>
            {isRequestDataOpen && (
               <ul className="pl-6 ml-8">
                  <p className="mt-8">
                     {t("privacy:we_believe_that_privacy")}{" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:privacy_dashboard")}{" "}
                     </Link>
                     {t("privacy:view_and_delete_data")}
                  </p>
                  <p className="mt-6">
                     {t("privacy:want_view_and_update_your_profile")}{" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:company_account")}
                     </Link>
                     .
                  </p>
                  <p className="mt-6 mb-4">
                     {t("privacy:you_have_personal_content")}
                  </p>
                  <ul className="list-disc pl-6 ml-8">
                     <li className="">
                        <strong>{t("privacy:search_history")}{" "}</strong>
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           {t("privacy:privacy_dashboards")}
                        </Link>
                        {" "}{t("privacy:or_in")}{" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           {t("privacy:clever_settings")}
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>FlareDrive</strong>. {t("privacy:view_and_download_files")}{" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           FlareDrive
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>Outlook.com</strong>. {t("privacy:export_your_emails")}{" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           Outlook.com
                        </Link>
                        {" "}{t("privacy:settings")} &gt; {t("privacy:general")} &gt; {t("privacy:privacy_data")}.
                        {" "}{t("privacy:learn_more")}{" "}
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           {t("privacy:import_and_export_email_client")}
                        </Link>
                     </li>
                     <li className="py-2">
                        <strong>Chatify</strong>.{" "} 
                        <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                           {t("privacy:export_you_chatify_chat_history")}
                        </Link>
                     </li>
                  </ul>
                  <p className="mt-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:create_request_associated")}
                     </Link>
                     .
                  </p>
                  <p className="mt-6 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:request_not_associated_with_personal")}
                     </Link>
                     .
                  </p>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={togglePrivacyTeam}>
            <span className={`transform transition-transform duration-300 ${isPrivacyTeamOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">{t("privacy:contact_privacy_team_data_protection_officer")}</p>
            </div>
            {isPrivacyTeamOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:create_request_associated_personal_account")}
                     </Link>
                  </li>
                  <li className="py-2 mb-6">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:create_request_not_associated_personal_account")}
                     </Link>
                  </li>
               </ul>
            )}
         </div>
         <div className="border-t border-gray-300 my-4"></div>
         <div className="flex flex-col mt-4">
            <div className="cursor-pointer flex items-center mb-2" onClick={toggleAccountHelp}>
            <span className={`transform transition-transform duration-300 ${isAccountHelpOpen ? 'rotate-90' : 'rotate-0'} hover:translate-x-1`}>
               <IoIosArrowForward className="mx-4 text-xl" />
            </span>
            <p className="text-lg font-semibold">{t("privacy:get_help_with_your")}</p>
            </div>
            {isAccountHelpOpen && (
               <ul className="pl-6 ml-8">
                  <li className="pt-8">
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 underline">
                        {t("privacy:get_help_with_your")}
                     </Link>
                     {" "}{t("privacy:help_with_sign_ins")}
                  </li>
               </ul>
            )}
         </div>
      </div>
   );
}
