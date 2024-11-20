import { Link } from "react-router-dom";
import CustomButton from "../../components/buttons/CustomButton";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function BrowserWave() {
   const { t } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="relative text-center">
         <Helmet>
            <title>{t("browser:browser_title")}</title>
         </Helmet>
         <div className="relative min-h-screen items-center justify-center ье-">
            <img
               src="/images/apps/wave/bg_wave.jpg"
               alt="WaveBrowser"
               className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col items-center mt-[60px]">
               <p 
                  className="text-white p-4 mt-8 rounded text-3xl sm:text-3xl md:text-4xl lg:text-4xl leading-normal font-semibold text-center"
                  dangerouslySetInnerHTML={{ __html: t("browser:browser_with_more")}}
               >
               </p>
               <img
                  src="/images/apps/wave/WebBrowser.png"
                  alt="WebBrowser"
                  className="sm:w-[750px] md:w-[750px] lg:w-[700px] xl:w-[700px] 2xl:w-1/2 mt-8 rounded-xl md:mb-16 px-6 mb-8"
               />
            </div>
         </div>
         <div className="flex flex-col items-center justify-center px-4 browser">
            <div className="max-w-3xl text-center">
               <span className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl block">
                  {t("browser:has_stylish_design")}
               </span>
               <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-8 block">
                  {t("browser:discover_web")}
               </span>
               <CustomButton className="text-lg font-bold focus:outline-none mt-10 px-8 py-3">
                  {t("browser:learn_more")}
               </CustomButton>
            </div>
         </div>
         <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mx-20 my-20 items-start import browser">
         <img src="/images/apps/wave/wave_import.png" alt="" className="w-24 mr-6" />
         <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between w-full">
               <div className="flex flex-col text-left">
               <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">
                  {t("browser:make_your_own")}
               </span>
               <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-1">
                  {t("browser:add_favorites")}
               </span>
               </div>
               <CustomButton className="ml-4 mr-20 px-8 custom-button">{t("browser:import")}</CustomButton>
            </div>
         </div>
         </div>
         <div className="mx-20 my-10 theme-container browser">
         <div className="flex flex-row w-full">
            <div className="flex flex-col w-2/5 text-left text-container">
               <div className="text-sm bg-teal-500 rounded-md p-1 mb-4 inline-block max-w-max">
               <p className="text-white">{t("browser:new_features")}</p>
               </div>
               <span className="text-3xl mt-2">{t("browser:new_browser_themes")}</span>
               <span className="text-xl mt-4">
                  {t("browser:dive_into_exciting_world")}
               </span>
               <div className="inline-block mt-10">
               <CustomButton>{t("browser:explore_themes")}</CustomButton>
               </div>
            </div>
            <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
               <img
               src="/images/apps/wave/themes.png"
               alt="ThemesBrowser"
               className="w-500 h-300 object-cover rounded-2xl"
               />
            </div>
         </div>
         </div>
         <div className="flex flex-row bg-gray-200 dark:bg-gray-800 rounded-lg p-10 mx-20 import items-center text-center browser">
         <div className="flex-shrink-0 text-center md:text-left">
            <div className="flex justify-center items-center md:justify-start">
               <img
               src="/images/apps/wave/security.png"
               alt="SecurityBrowser"
               className="w-24 mr-14"
               />
            </div>
         </div>
         <div className="flex flex-col w-full max-w-5xl">
            <div className="flex flex-row justify-between w-full items-center">
               <div className="flex flex-col text-left my-2 flex-1 md:ml-0">
               <span className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl">
                  {t("browser:become_safer_online")}
               </span>
               <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mt-1">{t("browser:comes_online_safety")}
               </span>
               </div>
               <div className="flex flex-shrink-0 items-center">
               <CustomButton className="px-8 custom-button items-center">{t("browser:learn_more")}</CustomButton>
               </div>
            </div>
            <div className="flex flex-col text-left max-w-xl">
               <span className="font-bold my-2">___________</span>
               <span>
                  {t("browser:helps_you_stay_protected")}
               </span>
            </div>
         </div>
         </div>
         <div className="mx-20 theme-container browser">
         <div className="flex flex-row w-full">
            <div className="flex flex-col w-2/5 text-left text-container">
               <span className="text-3xl mt-2 sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl">
                  {t("browser:be_more_productive")}
               </span>
               <span className="text-xl mt-4">
                  {t("browser:stay_focused")}
               </span>
               <div className="inline-block mt-10">
               <CustomButton>{t("browser:learn_more")}</CustomButton>
               </div>
               <div className="productivity-work flex flex-row bg-gray-200 dark:bg-gray-800 rounded-xl p-10 mt-16 items-center justify-center">
                  <span className="text-center">
                     {t("browser:get_an_average")}
                  </span>
               </div>
            </div>
            <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
               <img
               src="/images/apps/wave/productivity.jpg"
               alt="ProductivityWork"
               className="w-500 h-300 object-cover rounded-2xl"
               />
            </div>
         </div>
         </div>
         <div className="mx-20 theme-container browser bg-gray-200 dark:bg-gray-800 rounded-xl p-10">
         <div className="flex flex-row w-full">
            <div className="flex flex-col justify-end items-start w-2/4 h-1/4 mr-auto image">
               <img
               src="/images/apps/wave/games.png"
               alt="BusinessBrowser"
               className="w-500 h-300 object-cover rounded-2xl"
               />
            </div>
            <div className="flex flex-col w-2/5 text-left text-container order-last">
               <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">{t("browser:browser_for_gaming")}</span>
               <span className="text-xl mt-4">
                  {t("browser:cloud_gaming_optimizations")}
               </span>
               <div className="inline-block mt-10">
               <CustomButton>{t("browser:learn_more")}</CustomButton>
               </div>
            </div>
         </div>
         </div>
         <div className="mx-20 theme-container browser">
         <div className="flex flex-row w-full">
            <div className="flex flex-col w-2/5 text-left text-container">
               <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">{t("browser:explore_browser_for_business")}</span>
               <span className="text-xl mt-4">
                  {t("browser:looking_for_fast")}
               </span>
               <div className="inline-block mt-10">
               <CustomButton>{t("browser:learn_more")}</CustomButton>
               </div>
            </div>
            <div className="flex flex-col justify-end items-end w-2/4 h-1/4 ml-auto image">
               <img
               src="/images/apps/wave/business.jpg"
               alt="BusinessBrowser"
               className="w-500 h-300 object-cover rounded-2xl"
               />
            </div>
         </div>
         </div>
         <div className="mx-20 theme-container browser">
            <div className="flex flex-col md:flex-row w-full">
               <div className="flex flex-col order-first md:order-first w-full md:w-2/5 text-left text-container">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                     {t("browser:browse_web_devices")}
                  </span>
                  <span className="text-xl mt-4">
                     {t("browser:easily_sync_your_passwords")}
                  </span>
                  <div className="inline-block mt-10">
                     <Link to={`${languagePrefix}/wave/download`}>
                        <CustomButton>{t("browser:download_for_your_device")}</CustomButton>
                     </Link>
                  </div>
               </div>
               <div className="flex flex-col order-last md:order-last w-full md:w-3/5 justify-end items-end mt-6 md:mt-0 h-1/4 ml-auto">
                  <div className="grid grid-cols-3 gap-6 w-full justify-end md:w-auto">
                     <img
                        src="../images/apps/wave/notebook.jpg"
                        alt="Image 1"
                        className="image-devices rounded-lg mt-6 w-full transition-all duration-500"
                     />
                     <img
                        src="../images/apps/wave/smartphone.jpg"
                        alt="Image 2"
                        className="image-devices rounded-lg mt-6 w-full transition-all duration-500"
                     />
                     <img
                        src="../images/apps/wave/tablet.jpg"
                        alt="Image 3"
                        className="image-devices rounded-lg mt-6 w-full transition-all duration-500"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full bg-gray-700 px-20 py-6 text-left">
            <p className="text-base mb-2">
               <span className="align-text-top text-xs">1</span>
                  {" "}{t("browser:view_the")} {" "}
               <Link to={`${languagePrefix}/privacy/privacystatement`} className="underline hover:text-gray-400">
                  {t("browser:company_privacy_statement")}
               </Link> 
            </p>
            <p className="text-base mb-2">
               <span className="align-text-top text-xs pr-2">2</span>{t("browser:battery_life_varies")}
            </p>
            <p className="text-base mb-2">
               <span className="align-text-top text-xs pr-2">3</span>{t("browser:requires_internet_access")}
            </p>
            <p className="text-base">
               <span className="align-text-top text-xs pr-2">*</span>{t("browser:feature_availability")}
            </p>
            <p className="text-base">
               <span className="align-text-top text-xs pr-2">*</span>{t("browser:content_this_page")}
            </p>
         </div>
      </div>
   );
}
