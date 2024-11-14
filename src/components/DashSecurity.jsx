import { useState } from "react";
import { useSelector } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { IoKeyOutline } from 'react-icons/io5';
import { IoIosArrowDown } from "react-icons/io";
import DeleteUserModal from "../components/modals/DeleteUserModal";
import { useTranslation } from "react-i18next";
import { Button } from "flowbite-react";
import { GoPasskeyFill } from "react-icons/go";
import { AiOutlineDatabase } from "react-icons/ai";
import { PiDevices } from "react-icons/pi";

export default function DashSecurity() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const { currentUser, error } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

const securityData = [
      {
         id: 0,
         icon: <GoPasskeyFill  className="text-xl" />,
         title: "Учетная запись",
         description: "Улучшите возможности входа в систему, помимо надежного пароля",
         content: (
            <>
               
            </>
         ),
         link: "Изменить способ входа",
         relatedLinks: [
            { text: "Schedule a repair", url: "/devices" },
            { text: "Find my device", url: "/find-my-device" },
            { text: "Online support", url: "/online-support" },
         ]
      },
      {
         id: 1,
         icon: <AiOutlineDatabase className="text-xl" />,
         title: "Данные",
         description: "Защитите файлы, чтобы ничего не потерять",
         content: (
            <>
               <p className="font-semibold text-xl mb-4">Privacy dashboard</p>
               <p className="mb-4">
                  The privacy dashboard is where you can manage your data that Input Studios saves to the cloud
                  as well as your settings for the Input Studios products and services you use.
               </p>
               <Button
                  className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
                  style={{ width: "160px" }}
                  onClick={() => alert("Privacy button clicked")}
               >
                  Privacy dashboard
               </Button>
            </>
         ),
         link: "Перейти к безопасности данных",
         relatedLinks: [
            { text: "Privacy Statement", url: "/privacystatement" },
            { text: "Apps and services that can access your data", url: "/consent/manage" }
         ],
         imageSrc: "/images/privacy.svg"
      },
      {
         id: 2,
         icon: <PiDevices className="text-xl" />,
         title: "Устройства",
         description: "Обеспечьте безопасность всех устройств",
         content: (
            <>
               <p className="font-semibold text-xl mb-4">Privacy dashboard</p>
               <p className="mb-4">
                  The privacy dashboard is where you can manage your data that Input Studios saves to the cloud
                  as well as your settings for the Input Studios products and services you use.
               </p>
               <Button
                  className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
                  style={{ width: "170px" }}
                  onClick={() => alert("Privacy button clicked")}
               >
                  Security dashboard
               </Button>
            </>
         ),
         link: "Просмотреть мои устройства",
         relatedLinks: [
            { text: "Stay secure with Windows", url: "/proofs/manage/additional" },
            { text: "Learn more about digital security", url: "/security" }
         ],
         imageSrc: "/images/security.svg"
      },
   ];

   const [visibleContainers, setVisibleContainers] = useState(Array(securityData.length).fill(false));

   const handleContainerClick = (index) => {
      setVisibleContainers(prevState => {
         const updatedVisibleContainers = [...prevState];
         updatedVisibleContainers[index] = !updatedVisibleContainers[index];
         return updatedVisibleContainers;
      });
   };

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)]">
         <div className="gap-4 overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto px-4">
            <div className="flex justify-between items-center my-7 custom-flex-1030">
               <h1 className="font-semibold text-3xl">{t("profile:security")}</h1>
               <Link
                  to={`/${languagePrefix}/password/change`}
                  className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white group mt-4 sm:mt-0"
               >
                  <div className="flex items-center gap-2">
                     <div className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 w-10 h-10 group-hover:bg-[#0E7490] transition-colors duration-200">
                        <IoKeyOutline className="text-center font-semibold text-2xl group-hover:text-white dark:group-hover:text-gray-300"/>
                     </div>
                     <span className="text-sm font-semibold group-hover:text-[#0E7490] transition-colors duration-200">{t("profile:change_password")}</span>
                  </div>
               </Link>
            </div>
            <div>
               <p className="text-xl font-semibold">Input Studios помогает вам поддерживать защиту в Интернете</p>
               <p className="my-6">Способ входа в систему, устройства, на которых вы входите, и файлы, которые вы сохраняете в облаке, — все это важные элементы веб-безопасности учетной записи.</p>
            </div>
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex flex-col space-y-4 items-center">
               {securityData.map((container, index) => (
                  <div key={container.id} className={`w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 ${visibleContainers[index] ? 'rounded-lg' : 'rounded-t-lg'}`}>
                     <div
                        className={`flex items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'} ${visibleContainers[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                        onClick={() => handleContainerClick(index)}
                     >
                        <div className="flex-1 flex flex-col">
                           <div className="flex items-center space-x-2">
                              {container.icon}
                              <span className="pl-2 font-semibold">{container.title}</span>
                           </div>
                           <span className="pl-9 text-xs truncate max-w-[200px] sm:max-w-sm lg:max-w-none whitespace-nowrap overflow-hidden">{container.description}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                           <p className="text-base mr-6 text-teal-500">{container.link}</p>
                           <IoIosArrowDown className={`transform transition-transform duration-300 ${visibleContainers[index] ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                     </div>
                  </div>
               ))}
               <DeleteUserModal
                  currentUser={currentUser} 
                  error={error}
                  setShowModal={setShowDeleteModal}
                  showModal={showDeleteModal}
               />
            </div>
         </div>
      </div>
   );
}
