import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { IoIosArrowForward } from "react-icons/io";
import { Footer } from "flowbite-react";
import { SlSocialVkontakte } from "react-icons/sl";
import { BiLogoFigma } from "react-icons/bi";
import { BsDribbble, BsGithub, BsYoutube } from "react-icons/bs";

export default function AboutCompany() {
  const { t } = useTranslation();
  const path = useLocation().pathname;

  const columnData = [
    {
      title1: t("our_company"),
      title2: t("stay_informed"),
      title3: t("explore_world"),
    },
    {
      title1: t("who_we_are"),
      title2: t("get_to_know_our_people"),
      title3: t("meet_people"),
    },
    {
      title1: t("what_we_value"),
      title2: t("utilize_technology"),
      title3: t("learn_about_values"),
    },
    {
      title1: t("contact_us"),
      title2: t("get_in_touch"),
      title3: t("get_support"),
    },
  ];

  const imageColumnData = [
    {
      imgSrc: "/images/about/sustainability.png",
      title1: t("sustainability_by_the_numbers"),
      title2: t("carbon_negative_by_2030"),
      title3: t("explore_by_the_numbers"),
    },
    {
      imgSrc: "/images/about/explore.png",
      title1: t("corporate_social_responsibility"),
      title2: t("technology_for_good"),
      title3: t("learn_about_our_approach"),
    },
    {
      imgSrc: "/images/about/stories.png",
      title1: t("stories"),
      title2: t("inspired_by_people"),
      title3: t("view_their_stories"),
    },
    {
      imgSrc: "/images/about/nature.png",
      title1: t("input_studios_ai"),
      title2: t("ai_with_people_at_center"),
      title3: t("explore_input_studios_ai"),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{t("about_company_title")}</title>
      </Helmet>
      <div className="relative mb-12 mx-20">
        <img src="/images/about/about_company.png" alt={t("about_company_image_alt")} className="w-full max-h-[600px] h-auto"/>
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 p-4 text-white rounded-lg">
          <h1 className="text-5xl font-bold mb-6">{t("about_company_heading")}</h1>
          <p className="text-lg font-bold max-w-3xl">{t("about_company_heading_title")}</p>
        </div>
      </div>
      <div className="flex flex-wrap  mx-16">
        {columnData.map((col, colIndex) => (
          <div key={colIndex} className="w-1/4 p-4">
            <div className="justify-start">
              <p className="text-xl font-bold mb-2">{col.title1}</p>
              <p className="text-md mb-4 mr-12">{col.title2}</p>
              <div className="flex items-center group">
                <a href="#" 
                  className={`flex items-center pb-0.2 border-b-2 text-md text-teal-500 hover:text-teal-700 ${path === "/" ? "border-current" : "border-transparent"} hover:border-current`}
                >
                  {col.title3}
                </a>
                <IoIosArrowForward className="mt-1 ml-2 text-teal-500 hover:text-teal-700 transition-transform duration-200 transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-28 mb-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold">{t("featured_programs")}</h2>
        </div>
      </div>
      <div className="flex flex-wrap mx-12 p-4">
        {imageColumnData.map((col, colIndex) => (
          <div key={colIndex} className="w-1/4 p-4">
            <div>
              <img 
                src={col.imgSrc}
                alt={`Image ${colIndex + 1}`}
                className="mb-2 rounded"
              />
              <p className="text-xl font-bold mb-2 mt-10">{col.title1}</p>
              <p className="text-md mb-4">{col.title2}</p>
              <div className="flex items-center group">
                <a href="#" 
                  className={`flex items-center pb-0.2 border-b-2 text-md text-teal-500 hover:text-teal-700 ${path === "/" ? "border-current" : "border-transparent"} hover:border-current`}
                >
                  {col.title3}
                </a>
                <IoIosArrowForward className="mt-1 ml-2 text-teal-500 hover:text-teal-700 transition-transform duration-200 transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-10 mb-10 mx-20">
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
