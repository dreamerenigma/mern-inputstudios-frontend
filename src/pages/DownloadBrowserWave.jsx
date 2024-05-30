import { Button } from "flowbite-react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaWindows } from "react-icons/fa";
import CallToDownload from "../components/CallToDownload";

export default function DownloadBrowserWave() {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { theme } = useSelector((state) => state.theme);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <div className="mb-8 mt-12">
            <img src="/images/ic_wave.png" alt="InputStudiosWave" className="w-24" />
         </div>
         <h1 className="text-5xl font-bold mb-4 w-[50%] text-center">
            Просматривайте веб-страницы с помощью Input Studios Wave на ПК устройствах
         </h1>
         <div className="flex items-center justify-center mt-16">
            <img src="/images/computer.png" alt="Computer" className="max-w-[25%]" />
            <div className="ml-12 text-left">
               <p className="text-3xl">Windows</p>
               <p className="text-lg mb-4 overflow-wrap">
                  Input Studios — лучший <br />браузер для Windows
               </p>
               <div className="relative inline-block">
               <Button
                  className={`relative bg-teal-500 text-white w-56 rounded-lg hover:bg-teal-700 ${
                     dropdownOpen ? "bg-teal-500" : ""
                  }`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
               >
                  <span className="flex items-center">
                     <span>Загрузки <br />для Windows11 / 10</span>
                     <span className="mx-2 ml-8 h-8 w-px bg-gray-400"></span>
                     <span className="inline-block">
                        <IoIosArrowDown
                           className={`inline-block h-4 w-4 ${
                           dropdownOpen ? "transform rotate-180" : ""
                           }`}
                        />
                     </span>
                  </span>
               </Button>
               {dropdownOpen && (
                  <ul className={`absolute border border-gray-200 mt-2 w-56 rounded-lg shadow-lg ${
                     theme ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                     <span className="flex justify-center py-2">Также доступно для </span>
                     <li className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer">
                        <FaWindows className="mr-2" />Windows 8.1 / 8 / 7
                     </li>
                     <li className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer">
                        <FaWindows className="mr-2" />Windows Server
                     </li>
                  </ul>
                  )}
               </div>
            </div>
         </div>
         <div className="p-3 mx-10 custom-margin mt-20 mb-20 rounded-lg bg-gray-200 dark:bg-slate-700 shadow-md">
            <CallToDownload />
         </div>
         <div className="flex p-6 bg-gray-700 w-full">
            <span>* Доступность и возможности функций зависят от типа устройства, рынка и версии браузера.</span>
         </div>
      </div>
   );
}
