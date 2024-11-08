import colors from "../utils/colors";
import Divider from "../components/Divider";
import ListItem from "../components/lists/listItem";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleOutline } from '@fortawesome/free-regular-svg-icons';
import { Footer } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFigma } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

export default function Trademarks() {
   const { t } = useTranslation();
   const theme = useSelector((state) => state.theme.theme);
   const isDarkMode = theme === "dark";
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const products = [
      { id: 1, src: '../logos/input_studios_logo.avif', text: 'Input Studios', link:`${languagePrefix}/chatify/forum` },
      { id: 2, src: '../logos/logo_chatify.png', text: 'Chatify', link:`${languagePrefix}/chatify/forum` },
      { id: 3, src: '../logos/logo_easyshoppin.png', text: 'Easy Shoppin', link: `${languagePrefix}/easy-shoppin/forum` },
      { id: 4, src: '../logos/logo_quantum_engine.png', text: 'Quantum Engine', link: `${languagePrefix}/quantum-engine/forum` },
      { id: 5, src: '../logos/logo_wave.png', text: 'Wave', link: `${languagePrefix}/wave/forum` },
   ];

   return (
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-[60px]">
         <Helmet>
            <title>{t("trademarks:title")}</title>
         </Helmet>
         <div className="relative sm:px-6 lg:px-6">
            <img 
               className="w-full max-h-[550px] h-auto object-cover sm:max-h-[400px] md:max-h-[500px] lg:max-h-[550px]" 
               src="/images/brands/trademark.webp" 
               alt="trademarks" 
            />
            <div className="md:absolute mx-20-1080 md:top-1/2 md:left-12 transform md:-translate-y-1/2 bg-white p-4 border border-black">
               <h2 className="py-2 px-4 md:p-10 text-2xl md:text-3xl font-bold text-black break-words">
                  {t("trademarks:trademark_brand_guidelines")}
               </h2>
            </div>
         </div>
         <h1 className="mt-12 text-2xl md:text-4xl font-bold break-words sm:px-6 lg:px-6">{t("trademarks:helping_protect_trademarks")}</h1>
         <p className="mt-6 text-base sm:px-6 lg:px-6">{t("trademarks:people_place_products")}</p>
         <p className="mt-6 text-base sm:px-6 lg:px-6">{t("trademarks:brand_assets_including")}</p>
         <h1 className="mt-16 text-2xl md:text-4xl font-bold break-words sm:px-6 lg:px-6">{t("trademarks:examples_uses_governed")}</h1>
         <ul className="mt-4 list-disc list-outside pl-12 text-base">
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("trademarks:memorial_day_sale_featuring") }}></li>
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("trademarks:game_can_be_played") }}></li>
            <li className="mt-4" dangerouslySetInnerHTML={{ __html: t("trademarks:contoso_app_works") }}></li>
         </ul>
         <h1 className="mt-16 text-2xl md:text-4xl font-bold break-words sm:px-6 lg:px-6">{t("trademarks:examples_brand_assets")}</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-16">
            <div className="sm:px-6 lg:px-6">
            <img src={isDarkMode ? "../images/brands/trademarks_is_logo_dark.avif" : "../images/brands/trademarks_is_logo_light.avif"} alt="logo"/>
            <h1 className="font-bold text-2xl">{t("trademarks:logo")}</h1>
            <p className="mt-4">{t("trademarks:specific_brand_product")}</p>
         </div>
            <div className="sm:px-6 lg:px-6">
               <img src={isDarkMode ? "../images/brands/trademarks_is_platforms_dark.avif" : "../images/brands/trademarks_is_platforms_light.avif"} alt="logo"/>
               <h1 className="font-bold text-2xl">{t("trademarks:logo_lockups")}</h1>
               <p className="mt-4">{t("trademarks:logo_lockups_flagship")}</p>
            </div>
            <div className="sm:px-6 lg:px-6">
               <img src={isDarkMode ? "../images/brands/trademarks_is_workspace_dark.avif" : "../images/brands/trademarks_is_workspace_light.avif"} alt="logo"/>
               <h1 className="font-bold text-2xl">{t("trademarks:product_icons")}</h1>
               <p className="mt-4">{t("trademarks:include_app_icons_products")}</p>
            </div>
            <div className="sm:px-6 lg:px-6">
               <img src={isDarkMode ? "../images/brands/trademarks_is_badges_dark.avif" : "../images/brands/trademarks_is_badges_light.avif"} alt="logo"/>
               <h1 className="font-bold text-2xl">{t("trademarks:badges")}</h1>
               <p className="mt-4">{t("trademarks:includes_badges_designations")}</p>
            </div>
         </div>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl md:text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:dos_and_donts")}</h1>
         <p className="mt-2 sm:px-6 lg:px-6">{t("trademarks:help_you_understand")}</p>
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:dos")}</h1>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:wordmarks_names_software")}</p>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:solution_interoperable")}
               <ul className="mt-4 ml-6">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_headphones")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_app")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:solution_integrates_with_technology")}
               <ul className="mt-6 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_software_works")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_app_built")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:new_device__designed")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_integrated")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:truthfully_accurately")}
               <ul className="mt-2 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:three_dimensional_model_city_created")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:gaming_console")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:join_us_seminar")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:without_alteration_text")}
               <ul className="mt-2 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:mail_merge_letters")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:crm_easy")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:provides_enterprise_level")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:note_product_service")}
               <ul className="mt-2 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_case_met")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:title_news_articles")}
               <ul className="mt-2 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:releases_new_console")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:adding_new_features")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:new_ai_capabilities")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faCheck} size="2x">
               {t("trademarks:own_brand_company")}
               <ul className="mt-2 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:sublist_item_empty_circle")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:another_sublist_item_empty_circle")}
                  </ListItem>
               </ul>
            </ListItem>
         </ul>
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:donts")}</h1>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:license_express_permission")}</p>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:brand_assets")}
               <ul className="mt-4 ml-4 sm:ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_software")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_surface_headphones")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     <span className="break-all">www.azurevirtualmachine.com</span>
                  </ListItem>
               </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:icons_designs_manner")}
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:affiliation_endorsement_sponsorship")}
               <ul className="mt-6 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:builds_three_dimensional_models")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_offers_premium")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:certified_contoso")}
                  </ListItem>
               </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:alter_animate_distort")}
               <ul className="mt-6 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:wordsmithing_easy")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:powerful_platform")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:rest_azured_your_data")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_dynamics")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:contoso_excels")}
                  </ListItem>
               </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
            {t("trademarks:brand_assets_nouns")}
            <ul className="mt-6 ml-6 list-none">
               <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:you_can_excel")}
               </ListItem>
               <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:selling_new_surfaces")}
               </ListItem>
            </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
            {t("trademarks:brand_assets_entertainment_titles")}
            <ul className="mt-6 ml-6 list-none">
               <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:power_pointalism")}
               </ListItem>
               <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                  {t("trademarks:azure_daily")}
               </ListItem>
            </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:brand_assets_more_prominently")}
               <ul className="mt-6 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:input_studios_software")}
                     {t("trademarks:contoso_installs_input_studios_software")}
                  </ListItem>
               </ul>
            </ListItem>
         </ul>
         <ul className="mt-4 list-none text-base sm:px-6 lg:px-6">
            <ListItem icon={faClose} size="2x">
               {t("trademarks:brand_assets_name_user_group_fan_group")}
               <ul className="mt-6 ml-6 list-none">
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:dynamics_user_group")}
                  </ListItem>
                  <ListItem icon={faCircleOutline} iconClass="text-gray-500" bold={false} size="xs">
                     {t("trademarks:workspace_technology_group")}
                  </ListItem>
               </ul>
            </ListItem>
            <ListItem icon={faClose} size="2x">
               {t("trademarks:file_application_recordation")}
            </ListItem>
         </ul>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:app_guidelines")}</h1>
         <p className="mt-4 sm:px-6 lg:px-6">{t("trademarks:license_arrangement_input_studios")}</p>
         <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex-1 sm:px-6 lg:px-6">
               <h2 className="text-3xl font-bold">{t("trademarks:approved_app_details")}</h2>
               <ul className="mt-4 ml-10 list-disc list-outside">
                  <li>{t("trademarks:certified_contoso")}{t("trademarks:developer_contoso_developer")}</li>
                  <li className="mt-4">{t("trademarks:app_name_contoso_app")}</li>
                  <li className="mt-4">{t("trademarks:no_input_studios_content_featured")}</li>
                  <li className="mt-4">{t("trademarks:description")}</li>
               </ul>
            </div>
            <div className="flex-1">
               <h2 className="text-3xl font-bold">{t("trademarks:examples_unapproved_app_details")}</h2>
               <ul className="mt-4 ml-10 list-disc list-outside">
                  <li>{t("trademarks:developer_azure_development")}</li>
                  <li className="mt-4">{t("trademarks:app_name_azure_go")}</li>
                  <li className="mt-4">{t("trademarks:input_studios_logo_azure_app")}</li>
                  <li className="mt-4">{t("trademarks:azure_go_brings")}</li>
               </ul>
            </div>
         </div>
         <p className="mt-12 sm:px-6 lg:px-6">{t("trademarks:brand_assets_manner")}</p>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">Specific Brand and Product Guidelines</h1>
         <p className="mt-6 sm:px-6 lg:px-6">Certain Brand Assets have Specific Brand and Product Guidelines providing guidance on how to use them. Several of these Specific Brand and Product Guidelines are published below and others may be provided to you by your relevant Microsoft contact in the context of your relationship with Microsoft. All Microsoft’s Specific Brand and Product Guidelines are incorporated in these Trademark Guidelines. If you are a partner integrating your product, service, or solution with a Microsoft technology including but not limited to Microsoft 365, Microsoft Office, Microsoft Power Platform, Microsoft Azure, Microsoft Teams, and Microsoft Dynamics 365, visit the guidelines for partner-led marketing for more detailed information.</p>
         <div className={`grid my-12 mx-12 gap-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${products.length === 5 ? 'xl:grid-cols-4 2xl:grid-cols-5' : 'xl:grid-cols-5 2xl:grid-cols-6'}`}>
            {products.map(product => (
               <Link 
               to={product.link} 
               key={product.id} 
               className="group inline-flex relative"
            >
               <div className="inline-flex flex-col p-3 items-center flex-grow rounded-lg transition-colors duration-200 bg-transparent group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                  <img src={product.src} alt={product.text} className="w-20 h-20 mb-2" />
                  <div className="flex justify-center text-teal-500 underline">
                     <p className="text-center whitespace-nowrap">{product.text}</p>
                  </div>
               </div>
            </Link>
            ))}
         </div>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:copyrighted_content")}</h1>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:visit_use_input_studios_copyrighted_content")}</p>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:legal_notice")}</h1>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:brand_assets_inures_solely")}</p>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:input_studios_expressly_reserves")}</p>
         <Divider className="mt-8 mb-10" style={{ opacity: 0.5 }} lightColor={colors.black} darkColor={colors.white} />
         <h1 className="mt-8 text-4xl font-bold sm:px-6 lg:px-6">{t("trademarks:resources")}</h1>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:proposed_use_falls")}</p>
         <p className="mt-6 sm:px-6 lg:px-6">{t("trademarks:following_helpful")}</p>
         <ul className="mt-4 ml-10 list-disc list-outside sm:px-6 lg:px-6">
            <li><a href="https://support.inputstudios.ru/support-for-business" className="text-blue-500 underline">{t("trademarks:business_support")}</a></li>
            <li className="mt-4"><a href="https://news.inputstudios.ru/resourcespage" className="text-blue-500 underline">{t("trademarks:press_tool_kit")}</a></li>        
            <li className="mt-4"><a href="https://support.inputstudios.ru/support-for-business" className="text-blue-500 underline">{t("trademarks:partner_led_marketing_guidelines")}</a></li>
            <li className="mt-4"><a href="https://partner.inputstudios.ru/community/my-partner-hub/branding" className="text-blue-500 underline">{t("trademarks:input_studios_partner_brand_guidelines")}</a></li>
         </ul>
         <div className="flex flex-col md:flex-row items-stretch p-4 mt-16">
            <div className="flex-shrink-0 h-84">
               <img 
                  src="../images/brands/trademark_legal_document.avif" 
                  alt="Trademark Document" 
                  className="h-full w-auto object-cover"
               />
            </div>
            <div className="bg-blue-600 p-8 flex flex-col justify-center h-auto md:h-84 w-full md:w-auto md:mx-2">
               <h2 className="text-2xl font-bold mb-4 text-white">Intellectual Property</h2>
               <p className="mb-4 text-white">Innovation is at the heart of Input Studios as a company.</p>
               <Link to={`${languagePrefix}/legal/intellectualproperty`} className="text-white font-semibold flex items-center group">
                  <span className="group-hover:underline">Explore Input Studios IP</span>
                  <IoIosArrowForward
                     className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1"
                  />
               </Link>
            </div>
            <div className="h-84 mt-2 md:mt-0">
               <Link to={`${languagePrefix}/legal/intellectualproperty`}>
                  <img src="../images/brands/trademark_lawyers.avif" alt="Trademark Lawyers" className="h-full object-cover" />
               </Link>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 mt-16 mb-16 sm:px-6 lg:px-6">
            <p>{t("home_subscribe_news")}</p>
            <div className="flex flex-wrap gap-4">
               <Footer.Icon href="https://vk.com/inputstudios" target="_blank" icon={SlSocialVkontakte} />
               <Footer.Icon href="https://discord.com/inputstudios" target="_blank" icon={RxDiscordLogo} />
               <Footer.Icon href="https://www.youtube.com/@input.studios" target="_blank" icon={AiOutlineYoutube} />
               <Footer.Icon href="https://www.figma.com/team_invite/redeem/IHhVbYADhWDiftybuzpjBl" target="_blank" icon={FaFigma} />
               <Footer.Icon href="https://github.com/inputstudios" target="_blank" icon={FiGithub} />
               <Footer.Icon href="https://dribbble.com/inputstudios" target="_blank" icon={BsDribbble} />
            </div>
         </div>
      </div>
   );
}
