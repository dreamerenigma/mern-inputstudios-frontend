import { useTranslation } from "react-i18next";

export default function DashSignOut() {
   const { t } = useTranslation();

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)] pb-20">
         <div className="gap-4 overview flex flex-col max-w-5xl w-full h-auto md:mt-8 mx-auto px-4">
            <div className="flex flex-col items-center justify-center h-screen">
               <img 
                  src="/images/profile/sign_out.png"
                  alt={t("sign_out")}
                  className="mb-4 w-96"
               />
               <p>Вы уже уходите?</p>
            </div>
         </div>
      </div>
   );
}
