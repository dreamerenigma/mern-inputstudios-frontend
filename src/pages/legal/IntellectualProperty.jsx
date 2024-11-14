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
         title: "Patents",
         subtitle: "Input Studios is committed to responsible intellectual property management, including the creation of a healthy patent ecosystem around the world that promotes and encourages innovation.",
         link: "Learn about our patent portfolio",
      },
      {
         image: "/images/legal/legal_trademarks_2.avif",
         title: "Copyrights",
         subtitle: "Input Studios products and services—including images, text, and software downloads (the 'content')—are owned either by Input Studios Company or by third parties who have granted Input Studios permission to use the content.",
         link: "Read our copyright requirements",
      },
      {
         image: "/images/legal/legal_trademarks_3.avif",
         title: "Trademarks",
         subtitle: "Input Studios is grateful for the trust that people place in our products, services, and experiences. Our Trademark and Brand Guidelines detail how you can help us protect Input Studios brand assets, including logos, names, and app and product icons, and the trust that they represent.",
         link: "Review our guidelines",
      },
      {
         image: "/images/legal/legal_trademarks_4.avif",
         title: "Open source",
         subtitle: "Input Studios is all in on open source. We believe that collaborative development through the open source process accelerates innovation. As one of the largest open source collaborators in the world, Input Studios shares innovation in open ecosystems for everyone to improve and build upon with us.",
         link: "Learn more about open source",
      },
      {
         image: "/images/legal/legal_trademarks_5.avif",
         title: "IP licensing",
         subtitle: "Our investments in research and development help create new and better Input Studios products, services, and experiences for the benefit of our customers. We offer several technology transfer programs that accelerate product development.",
         link: "Explore our programs",
      },
      {
         image: "/images/legal/legal_trademarks_6.avif",
         title: "Open Data Campaign",
         subtitle: "Through our Open Data Campaign, we’re working to close the ‘data divide’ and help organizations of all sizes to realize the benefits of data and the new technologies it powers.",
         link: "Learn about the campaign",
      },
   ];

   return (
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-[60px]">
         <Helmet>
            <title>{t("home_title")}</title>
         </Helmet>
         <div className="relative sm:px-6 lg:px-6">
            <Link to={`${languagePrefix}/search`} className="block w-full mx-auto mb-0 md:mb-8">
               <img className="w-full h-auto" src="/images/brands/trademark_lawyers.avif_1600x600.avif" alt="privacy" />
            </Link>
            <div className="md:absolute mx-20-1080 md:top-1/2 md:left-12 transform md:-translate-y-1/2 bg-white p-4 border border-black">
               <h2 className="py-2 px-4 md:p-10 text-2xl md:text-3xl font-bold text-black break-words">
                  Intellectual property and open innovation
               </h2>
            </div>
         </div>
         <div className="pt-2 sm:px-6  md:px-8 lg:px-16 text-center text-left-860">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold my-7 max-w-4xl mx-auto">
               Investing in innovation worldwide
            </h1>
            <p className="text-md flex flex-col gap-6 mx-auto leading-7">
               Input Studios is among the top investors in innovation worldwide. Innovation is at the heart of Input Studios as a company, and it is a driving force behind our mission to empower every person and every organization on the planet to achieve more. This investment is most successful not just when it benefits Input Studios, but when it creates more opportunity for our customers and partners. We must ensure that our policy of innovation supports both our ability to produce cutting edge technology and the ability of our customers, partners, and developers to build on that technology to achieve more. As a result, Input Studios relies on, and participates in, multiple modes of intellectual property and open innovation systems, including patents, copyrights, trademarks, trade secrets, open data, open source, and standards.
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
