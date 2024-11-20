import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsDribbble } from "react-icons/bs";
import { RxDiscordLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFigma } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

export default function IntellectualProperty() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const items = [
      {
         image: "/images/legal/legal_trademarks_1.avif",
         title: t("legal:patents"),
         subtitle: t("legal:intellectual_property_management"),
         link: t("legal:learn_about_our_patent_portfolio"),
      },
      {
         image: "/images/legal/legal_trademarks_2.avif",
         title: t("legal:copyrights"),
         subtitle: t("legal:products_and_services_including"),
         link: t("legal:read_our_copyright_requirements"),
      },
      {
         image: "/images/legal/legal_trademarks_3.avif",
         title: t("legal:trademarks"),
         subtitle: t("legal:grateful_for_trust"),
         link: t("legal:review_our_guidelines"),
      },
      {
         image: "/images/legal/legal_trademarks_4.avif",
         title: t("legal:open_source"),
         subtitle: t("legal:all_in_on_open_source"),
         link: t("legal:learn_more_about_open_source"),
      },
      {
         image: "/images/legal/legal_trademarks_5.avif",
         title: t("legal:ip_licensing"),
         subtitle: t("legal:our_investments_research"),
         link: t("legal:explore_our_programs"),
      },
      {
         image: "/images/legal/legal_trademarks_6.avif",
         title: t("legal:open_data_campaign"),
         subtitle: t("legal:through_our_open_data_campaign"),
         link: t("legal:learn_about_campaign"),
      },
   ];

   return (
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-[60px]">
         <Helmet>
            <title>{t("legal:legal_title")}</title>
         </Helmet>
         <div className="relative sm:px-6 lg:px-6">
            <Link to={`${languagePrefix}/search`} className="block w-full mx-auto mb-0 md:mb-8">
               <img className="w-full h-auto" src="/images/brands/trademark_lawyers.avif_1600x600.avif" alt="privacy" />
            </Link>
            <div className="md:absolute mx-20-1080 md:top-1/2 md:left-12 transform md:-translate-y-1/2 bg-white p-4 border border-black w-full max-w-[650px] min-w-[300px]">
               <h2 className="py-2 px-4 md:p-10 text-2xl md:text-3xl font-bold text-black break-words">
                  {t("legal:intellectual_property_and_open_innovation")}
               </h2>
            </div>
         </div>
         <div className="pt-2 sm:px-6  md:px-8 lg:px-16 text-center text-left-860">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">
               {t("legal:investing_innovation_worldwide")}
            </h1>
            <p className="text-md flex flex-col gap-6 mx-auto leading-7">
               {t("legal:among_top_investors_innovation_worldwide")}
            </p>
         </div>
         <div className="mx-4 my-8 md:mx-16">
            <div className="flex flex-wrap justify-between">
               {items.map((item, index) => (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/3 sm:p-3">
                  <div className="rounded-lg overflow-hidden">
                     <img
                        src={item.image}
                        alt={item.title}
                        className="w-full object-cover rounded-lg"
                     />
                     <div className="py-4">
                        <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                        <p className="mt-2 mb-2 text-sm md:text-base">{item.subtitle}</p>
                        <Link
                           to={`${languagePrefix}/legal/intellectualproperty`}
                           className="text-teal-500 font-semibold flex items-center group mt-4 md:mt-6"
                        >
                        <span className="group-hover:underline">{item.link}</span>
                        <IoIosArrowForward className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1" />
                        </Link>
                     </div>
                  </div>
                  </div>
               ))}
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
