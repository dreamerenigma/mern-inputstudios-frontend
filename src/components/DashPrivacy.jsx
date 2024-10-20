import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { TbWorldSearch } from "react-icons/tb";
import { IoAppsSharp, IoPeopleOutline } from "react-icons/io5";
import { GoBook, GoShieldLock } from "react-icons/go";
import { BsPatchCheck } from "react-icons/bs";

export default function DashProfile() {
   const { theme } = useSelector((state) => state.theme);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
         <div className="overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto px-4">
            <h1 className="my-7 text-left font-semibold text-3xl">Privacy</h1>
            <p>
               Privacy starts with putting you in control of your data and giving you the tools and 
               information you <br />need to make choices you can feel good about. This website is where you can 
               manage your privacy <br />settings for the Microsoft products you use, and where you can view and 
               clear the data for your <br />Input Studios account activity.
            </p>
            <Link
               to={`${languagePrefix}/search`}
               className=" text-teal-500 hover:underline mt-4 hover:text-teal-700" 
            >
               Learn more about our commitment to Privacy
            </Link>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-8"> 
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
                  <div className="col-span-2 p-10 justify-between">
                     <p className="font-semibold text-xl mt-4 mb-4">Make sure you&apos;re safe and secure</p>
                     <p className="mb-4">Review your account safety settings to strengthen your online security.</p>
                     <Button 
                        className="text-xs sm:text-sm font-bold focus:outline-none"
                        style={{ width: '120px' }}
                     >
                        Get started
                     </Button>
                  </div>
                  <div className="p-10 flex items-center justify-center">
                     <img src="/images/img_safety_checker.webp" alt="JavaScript Image" className="w-full h-auto max-w-md" />
                  </div>
               </div>
            </div>
            <div>
               <h1 className="mt-14 py-2 text-left font-semibold text-2xl">Empower your productivity</h1>
               <p>
                  Your personal data can be used to improve your productivity across Input Studios <br />products. If you have a privacy 
                  question or <a href="/concern/privacy" className="text-teal-500 underline hover:text-teal-700">concern — contact our privacy team</a>.
               </p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-6">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-top-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <CiLocationOn className="text-2xl" />
                           <span className="pl-2">Location</span>
                        </div>
                        <span className="pl-10 text-xs">Give me directions and other info by using my location data</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">No data</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <TbWorldSearch className="text-2xl" />
                           <span className="pl-2">Browsing and search</span>
                        </div>
                        <span className="pl-10 text-xs">Show me more relevant suggestions and results by using my browsing and search history</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">Activities: 0</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoAppsSharp className="text-xl" />
                           <span className="pl-2">Browsing and search</span>
                        </div>
                        <span className="pl-9 text-xs">Show me more relevant suggestions and results by using my browsing and search history</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">Activities: 0</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <GoBook className="text-xl" />
                           <span className="pl-2">Spelling and text</span>
                        </div>
                        <span className="pl-9 text-xs">Improve typing suggestions and handwriting recognition by using my typing and handwriting info</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">Activities: 0</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <GoShieldLock className="text-xl" />
                           <span className="pl-2">App access</span>
                        </div>
                        <span className="pl-9 text-xs">Choose which apps and services can access my info</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="mr-2">Apps: 0</span>
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoPeopleOutline className="text-xl" />
                           <span className="pl-2">People suggestions</span>
                        </div>
                        <span className="pl-9 text-xs">Expand my suggestions by including people. I have contacted or who have contacted me</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <IoIosSearch className="text-xl" />
                           <span className="pl-2">Search and news personalization</span>
                        </div>
                        <span className="pl-9 text-xs">Set preferences for viewing search results and news feeds that reflect my interest</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-2">
               <p className="text-gray-600">Some data might not be displayed here or might not be available yet. <a href="/concern/privacy" className="text-teal-500 underline hover:text-teal-700">Learn more about viewing data on this page</a></p>
            </div>
            <div>
               <h1 className="mt-14 mb-2 text-left font-semibold text-2xl">Manage ads and promotional communications</h1>
               <p>View and change settings for personalized ads and promotional communications.</p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-6 mb-14">
               <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-top-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <BsPatchCheck className="text-xl" />
                           <span className="pl-2">Personalized ad settings</span>
                        </div>
                        <span className="pl-9 text-xs">Set preferences for viewing ads that more closely reflect my interest</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
                  <hr className="border-t border-gray-300 dark:border-gray-600" />
                  <div className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer rounded-bottom-only ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}>
                     <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           <CiMail className="text-xl" />
                           <span className="pl-2">Promotional communications</span>
                        </div>
                        <span className="pl-9 text-xs">Send promotional material to my email</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <IoIosArrowForward />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
