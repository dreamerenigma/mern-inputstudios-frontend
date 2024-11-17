import { PiArrowSquareOutLight } from "react-icons/pi";

export default function ProfileServices() {

   return (
      <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
         <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 border border-gray-700 mb-20">
            <div className="flex items-center">
               <div className="flex flex-row items-center justify-between w-full pl-4 pt-3">
                  <div>
                     <span className="text-md font-semibold">Ваши профили</span>
                  </div>
               </div>
            </div>
            <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 hover:bg-gray-700/60 px-4 py-3 cursor-pointer">
               <div className="flex items-center space-x-2">
                  <img src="/images/apps/gamebox/gamebox_logo.png" alt="Logo Chatify" className="w-6 mr-3" />
                  <span>Профиль Gamebox</span>
               </div>
               <span className="ml-auto pr-2 text-teal-500 hover:text-teal-700 hover:underline cursor-pointer">
                  <PiArrowSquareOutLight size={24} className="ml-2 text-teal-500" />
               </span>
            </div>
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 rounded-b-md hover:bg-gray-700/60 px-4 py-3 cursor-pointer">
               <div className="flex items-center space-x-2">
                  <img src="/images/apps/chatify/chatify_logo.png" alt="Logo Chatify" className="w-6 mr-3" />
                  <span>Профиль Chatify</span>
               </div>
               <span className="ml-auto pr-2 text-teal-500 hover:text-teal-700 hover:underline cursor-pointer">
                  <PiArrowSquareOutLight size={24} className="text-teal-500" />
               </span>
            </div>
         </div>
      </div>
   );
}
