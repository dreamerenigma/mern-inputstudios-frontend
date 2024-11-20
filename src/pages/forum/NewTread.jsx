import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import CustomCheckbox from "./checkboxes/CustomCheckbox";
import CustomInputWithToolbar from "./textinputs/CustomInputWithToolbar";
import { Dialog } from "@mui/material";

export default function NewTread() {
   const { t } = useTranslation();
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const [showDialog, setShowDialog] = useState(false);
   const [inputValue, setInputValue] = useState("Выберите");

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   useEffect(() => {
      const handleBeforeUnload = (event) => {
         event.preventDefault();
         setShowDialog(true);
         event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, []);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleSelect = (value) => {
      setInputValue(value);
      setIsOpen(false);
   };

   const handleConfirmLeave = () => {
      setShowDialog(false);
      window.location.reload();
   };

   return (
      <div className="relative mt-[60px] flex flex-col md:flex-row min-h-screen">
         <Helmet>
            <title>{t("forum:home_title")}</title>
         </Helmet>
         <div className="mx-10 py-8 md:py-16 flex flex-col md:flex-row custom-mx-32 custom-mx-10">
            <div className="flex-1 mr-6">
               <h1 className="text-left text-3xl md:text-4xl font-semibold mb-6">{t("forum:ask_question")}</h1>
               <p className="text-left mb-4">
                  {t("forum:help_with_technical_question")}
               </p>
               <div className="md:hidden">
                  <p className="text-left text-3xl md:text-4xl font-semibold my-6 break-words">
                     {t("forum:or_start_discussion")}
                  </p>
                  <p className="text-left mb-2 break-words">
                     {t("forum:discuss_new_products")}
                  </p>
                  <div className="flex items-center text-lg text-teal-500 underline py-2 rounded-md shadow-md group mb-6">
                     {t("forum:start_discussion")}
                     <IoIosArrowForward className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1" />
                  </div>
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mb-2">{t("forum:question")}<span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     className="w-full mt-2 mb-6 p-2 border border-gray-600 dark:bg-gray-800 rounded focus:outline-none focus:ring-0 focus:border-teal-500"
                     placeholder={t("forum:enter_your_question")}
                  />
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mb-2">{t("forum:details")}<span className="text-red-500">*</span></label>
               </div>
               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mt-2">
                  <div className="hidden md:flex justify-between">
                     <div className="flex-1">
                        <p className="mb-2 font-semibold">{t("forum:ask_good_questions")}</p>
                        <div className="flex">
                           <ul className="list-disc ml-5 w-1/2">
                              <li>{t("forum:describe_situation_in_detail")}</li>
                              <li>{t("forum:summarize_problem")}</li>
                              <li>{t("forum:insert_error_message")}</li>
                           </ul>
                           <ul className="list-disc ml-12 w-1/2">
                              <li>{t("forum:add_system_information")}</li>
                              <li>{t("forum:tell_us_what")}</li>
                              <li>{t("forum:add_images")}</li>
                           </ul>
                        </div>
                     </div>
                     <div className="border-l-2 border-gray-300 dark:border-gray-600 mx-4"></div>
                     <div className="flex-1">
                        <p className="mb-2 font-semibold">{t("forum:avoid_posting_personal_information")}</p>
                        <div className="flex">
                           <ul className="list-disc ml-5 w-1/2">
                              <li>{t("forum:email_address")}</li>
                              <li>{t("forum:phone_number")}</li>
                              <li>{t("forum:product_key")}</li>
                           </ul>
                           <ul className="list-disc ml-12 w-1/2">
                              <li>{t("forum:password")}</li>
                              <li>{t("forum:credit_card_number")}</li>
                              <li>{t("forum:product_serial_number")}</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="md:hidden">
                     <p className="font-bold">{t("forum:dont")}</p>
                     <p>{t("forum:post_personal_information")}</p>
                  </div>
               </div>
               <div className="App mt-6">
                  <CustomInputWithToolbar />
               </div>
               <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mt-8">
                  <p className="text-left">
                     {t("forum:below_most_relevant_product")}
                  </p>
               </div>
               <div className="flex flex-col md:flex-col">
                  <label className="text-left mt-6">{t("forum:products")}<span className="text-red-500">*</span></label>
               </div>
               <div className="relative flex max-w-md mt-4 shadow-md" ref={dropdownRef}>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-1 flex items-center">
                     <div className="flex-grow">
                        <input
                           type="text"
                           className="w-full p-2 bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-transparent rounded-l-md"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           placeholder={t("forum:choose")}
                        />
                     </div>
                     <div>
                        <button
                           onClick={handleToggle}
                           className="bg-gray-700 p-2 rounded-md flex items-center justify-center ml-2"
                        >
                           {isOpen ? <IoIosArrowUp className="text-white" /> : <IoIosArrowDown className="text-white" />}
                        </button>
                     </div>
                  </div>
                  {isOpen && (
                     <div className="absolute z-10 bg-white dark:bg-gray-700 rounded-md mt-1 w-full shadow-lg">
                        <ul className="space-y-0 text-sm">
                           {["Input Studios Workspace", "Input Studios Wave", "Chatify", "Quantum Engine", t("forum:community_center")].map((item, index, arr) => (
                              <li
                                 key={item}
                                 className={`px-4 py-2 cursor-pointer hover:bg-gray-500 hover:bg-opacity-70 transition duration-200 ${index === 0 ? 'rounded-t-md' : ''} ${index === arr.length - 1 ? 'rounded-b-md' : ''}`}
                                 onClick={() => handleSelect(item)}
                              >
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
               <div className="py-4 mt-4">
                  <div className="flex items-center space-x-4">
                     <CustomCheckbox
                        id="exampleCheckbox"
                        label={t("forum:notify_me_when_replies")}
                        className="flex-none w-auto"
                     />
                  </div>
                  <div className="">
                     <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-md mr-6">
                        {t("forum:cancel")}
                     </button>
                     <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-6 rounded-md">
                        {t("forum:submit")}
                     </button>
                  </div>
               </div>
            </div>
            <div>
               <div className="hidden md:block bg-white dark:bg-gray-700 rounded-md p-4 sm:p-6 md:p-8 mx-4 w-full sm:w-[320px] md:w-[190px] lg:w-[320px] xl:w-[320px]">
                  <p className="text-left text-lg font-semibold mb-2 break-words">
                     {t("forum:or_start_discussion")}
                  </p>
                  <p className="text-left mb-4 break-words">
                     {t("forum:discuss_new_products")}
                  </p>
                  <button className="flex flex-col xl:flex-row items-center bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-md shadow-md group text-xs sm:text-sm md:text-base">
                     <span>{t("forum:start_discussion")}</span>
                     <span className="ml-2 mt-2 md:mt-0 transition-transform duration-200 transform group-hover:translate-x-1">
                        <IoIosArrowForward />
                     </span>
                  </button>
               </div>
               <div className="ml-12 mt-12 md:w-[150px] lg:w-[280px] xl:w-[280px] hidden md:block">
                  <p className="text-2xl font-bold break-words">
                     {t("forum:other_tips_asking_questions")}
                  </p>
                  <ul className="list-disc ml-5 mt-1">
                     <li>{t("forum:keep_eye_on_your_email")}<a href="/profile" className="text-teal-500 hover:underline">{t("forum:profile")}</a>.</li>
                     <li>{t("forum:be_prepared_try_suggested")}</li>
                     <li>{t("forum:help_other_community_members")}</li>
                  </ul>
               </div>
            </div>
         </div>
         <Dialog open={showDialog} onClose={handleConfirmLeave} sx={{backdrop: 'none', '& .MuiBackdrop-root': { backgroundColor: 'transparent' }}}></Dialog>
      </div>
   );
}
