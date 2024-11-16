import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function CallToAction() {
   const { t } = useTranslation();

   return (
      <a href="https://github.com/InputStudios" target="_blank" rel="noopener noreferrer" className="block">
         <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center cursor-pointer">
            <div className="flex-1 justify-center flex flex-col">
               <h2 className="text-2xl">
                  {t("call_to_action")}
               </h2>
               <p className="text-gray-400 my-2">
                  {t("call_to_action_description")}
               </p>
               <Button className="rounded-tl-xl rounded-lg bg-gradient-to-l border-none from-teal-500 via-green-500 to-blue-500 hover:bg-gradient-to-l hover:from-blue-600 hover:via-green-600 hover:to-teal-600 transition-colors duration-300">
                  {t("call_to_action_button")}
               </Button>
            </div>
            <div className="p-7 flex-1">
               <img src="/images/bg_programmer.jpg" alt="JavaScript Image" className="rounded-tl-3xl rounded-br-3xl"/>
            </div>
         </div>
      </a>
   );
}
