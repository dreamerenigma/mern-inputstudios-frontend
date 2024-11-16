import { useState } from "react";
import { useSelector } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "flowbite-react";
import { BsCart4, BsShieldLockFill } from "react-icons/bs";
import { RiComputerFill, RiDeleteBin5Line } from "react-icons/ri";
import { TbShieldCheckeredFilled } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import DeleteUserModal from "../components/modals/DeleteUserModal";
import { CiLock } from "react-icons/ci";
import { GoPasskeyFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoKeyOutline, IoSettingsOutline } from "react-icons/io5";
import { BsWindowDesktop } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function DashProfile() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const { currentUser, error } = useSelector((state) => state.user);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleContainerClick = (index) => {
      setVisibleContainers(prevState => {
         const updatedVisibleContainers = [...prevState];
         updatedVisibleContainers[index] = !updatedVisibleContainers[index];
         return updatedVisibleContainers;
      });
   };

   const handleDeleteButtonClick = () => {
      setShowDeleteModal(true);
   };

   const accountData = [
      {
         id: 0,
         icon: <BsWindowDesktop className="text-xl" />,
         title: t("profile:services"),
         description: t("profile:premium_productivity_apps"),
         content: (
            <>
               <p className="font-semibold text-xl mb-4">{t("profile:need_card_or_code")}</p>
               <p className="mb-4">
                  {t("profile:prepaid_card_code")}
               </p>
               <Button
                  className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
                  onClick={() => (window.location.href = `${languagePrefix}/dashboard?tab=privacy`)}
               >
                  {t("profile:use")}
               </Button>
            </>
         ),
         relatedLinks: [
            { text: t("profile:get_billing_help"), url: "/account" },
            { text: t("profile:view_order_history"), url: "/billing/orders" }
         ],
         imageSrc: theme === "dark" ? "/images/apps_365_dark.png" : "/images/apps_365_light.png"
      },
      {
         id: 1,
         icon: <RiComputerFill className="text-xl" />,
         title: t("profile:device"),
         description: t("profile:find_repair_devices"),
         content: (
            <>
            </>
         ),
         relatedLinks: [
            { text: t("profile:schedule_repair"), url: "/devices" },
            { text: t("profile:find_my_device"), url: "/find-my-device" },
            { text: t("profile:online_support"), url: "/online-support" },
         ]
      },
      {
         id: 2,
         icon: <BsShieldLockFill className="text-xl" />,
         title: t("profile:privacy"),
         description: t("profile:manage_your_privacy"),
         content: (
            <>
               <p className="font-semibold text-xl mb-4">{t("profile:control_your_privacy")}</p>
               <p className="mb-4">
                  {t("profile:privacy_dashboard_you_can_manage")}
               </p>
               <Button
                  className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
                  onClick={() => (window.location.href = `${languagePrefix}/dashboard?tab=privacy`)}
               >
                  {t("profile:privacy_dashboard")}
               </Button>
            </>
         ),
         relatedLinks: [
            { text: t("profile:privacy_statement"), url: `${languagePrefix}/dashboard?tab=privacy` },
            { text: t("profile:apps_and_services"), url: "/consent/manage" }
         ],
         imageSrc: "/images/privacy.svg"
      },
      {
         id: 3,
         icon: <TbShieldCheckeredFilled className="text-xl" />,
         title: t("profile:security"),
         description: t("profile:tools_help_keep"),
         content: (
            <>
               <p className="font-semibold text-xl mb-4">{t("profile:account_protection")}</p>
               <p className="mb-4">
                  {t("profile:confirm_two_factor_verification")}
               </p>
               <Button
                  className="text-xs sm:text-sm font-bold focus:outline-none mb-10"
                  onClick={() => alert("Privacy button clicked")}
               >
                  {t("profile:security_dashboard")}
               </Button>
               
            </>
         ),
         relatedLinks: [
            { text: t("profile:stay_secure"), url: "/proofs/manage/additional" },
            { text: t("profile:about_digital_security"), url: "/security" }
         ],
         imageSrc: "/images/security.svg"
      },
      {
         id: 4,
         icon: <FaRegCreditCard className="text-xl" />,
         title: t("profile:payment_options"),
         description: t("profile:manage_pay_purchases"),
         content: (
            <>
               <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400 mb-4">{t("profile:payment_methods_not_available")}</p>
                  <a href="/your-link" className="text-base mb-4 text-right hover:underline text-teal-500">
                     {t("profile:adding_payment_method")}
                  </a>
               </div>
            </>
         ),
         relatedLinks: [
            { text: t("profile:view_transactions"), url: "/billing/payments" },
            { text: t("profile:view_notifications"), url: "/billing/payments" },
            { text: t("profile:research_expenses"), url: "/billing/payments" }
         ],
      },
      {
         id: 5,
         icon: <BsCart4 className="text-xl" />,
         title: t("profile:order_log"),
         description: t("profile:view_recent_purchases"),
         content: (
            <>
               <div className="flex justify-between items-center">
                  <p className="text-base text-gray-400 mb-4">{t("profile:no_purchases_made")}</p>
               </div>
            </>
         ),
         relatedLinks: [
            { text: t("profile:get_billing_help"), url: "/account" },
            { text: t("profile:view_order_history"), url: "/billing/orders" }
         ],
      },
      {
         id: 6,
         icon: <RiDeleteBin5Line className="text-xl text-red-600" />,
         title: <span className="text-red-600">Удалить аккаунт</span>,
         description: <span className="text-red-600">Управление удалением аккаунта и всех данных пользователя</span>,
         content: (
            <>
               <p className="font-semibold text-xl mb-4">Удалить аккаунт и все данные</p>
               <p className="mb-4">
                  При удалении аккаунта все ваши данные удаляються
               </p>
               <button
                  className="ml-0 text-white flex justify-between mb-6 bg-red-600 hover:bg-red-800 rounded-md p-2"
                  onClick={handleDeleteButtonClick}
               >
                  <span>{t("profile:delete_account")}</span>
               </button>
            </>
         ),
         relatedLinks: [
            { text: "Помощь при удалении аккаунта", url: "/account" },
            { text: "Сохранить данные", url: "/billing/orders" }
         ],
      },
   ];

   const [visibleContainers, setVisibleContainers] = useState(Array(accountData.length).fill(false));

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-[rgb(16,23,42)] mb-20">
         <div className="gap-4 overview flex flex-col max-w-5xl w-full h-auto md:mt-8 mx-auto px-4">
            <div className="flex justify-between items-center my-7 custom-flex-1030">
               <h1 className="font-semibold text-3xl">{t("profile:account")}</h1>
               <Link
                  to={`${languagePrefix}/password/change`}
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
            <div className="w-full md:w-3/2 mx-auto max-w-5xl flex flex-col space-y-4 items-center">
               {accountData.map((container, index) => (
                  <div key={container.id} className={`w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 ${visibleContainers[index] ? 'rounded-lg' : 'rounded-t-lg'}`}>
                     <div
                        className={`flex items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'} ${visibleContainers[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                        onClick={() => handleContainerClick(index)}
                     >
                        <div className="flex-1 flex flex-col">
                           <div className="flex items-center space-x-2">
                              {container.icon}
                              <span className="pl-2">{container.title}</span>
                           </div>
                           <span className="pl-9 text-xs truncate max-w-[200px] sm:max-w-sm lg:max-w-none whitespace-nowrap overflow-hidden">{container.description}</span>
                        </div>
                        <IoIosArrowDown className={`transform transition-transform duration-300 ${visibleContainers[index] ? 'rotate-180' : 'rotate-0'}`} />
                     </div>
                     {visibleContainers[index] && (
                        <>
                           <hr className="border-t border-gray-300 dark:border-gray-600" />
                           <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center mt-8">
                              <div 
                                 className={`grid gap-4 w-full transition-colors duration-300 bg-white dark:bg-gray-800 
                                    ${container.id === 4 ? 'md:grid-cols-2' : container.id === 5 ? 'md:grid-cols-1' : 'md:grid-cols-3'} rounded-b-lg`}
                              >
                                 <div className="col-span-2 pl-12 pr-10 justify-between">
                                    {container.content}
                                    {container.id === 6 && (
                                       <div className="flex flex-col items-start space-y-2"></div>
                                    )}
                                 </div>
                                 <div className="items-center justify-center">
                                    {container.imageSrc && (
                                       <img src={container.imageSrc} alt={container.title} className="w-full h-auto max-w-md" />
                                    )}
                                 </div>
                              </div>
                           </div>
                           {index === 2 && (
                              <>
                                 <hr className="border-t border-gray-300 dark:border-gray-600"/>
                                 <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/60 cursor-pointer">
                                    <div className="flex items-center">
                                       <span className="mr-4">
                                          <CiLock size={20} />
                                       </span>
                                       <span className="">Изменить пароль</span>
                                    </div>
                                    <span className="text-gray-500">
                                       <IoIosArrowForward size={20} />
                                    </span>
                                 </div>
                                 <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/60 cursor-pointer">
                                    <div className="flex items-center">
                                       <span className="mr-4">
                                          <GoPasskeyFill size={20} />
                                       </span>
                                       <span className="">Просмотреть сеансы входа в систему</span>
                                    </div>
                                    <span className="text-gray-500">
                                       <IoIosArrowForward size={20} />
                                    </span>
                                 </div>
                                 <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-700/60 cursor-pointer">
                                    <div className="flex items-center ">
                                       <span className="mr-4">
                                          <IoSettingsOutline size={20} />
                                       </span>
                                       <span className="">Дополнительные параметры безопасности</span>
                                    </div>
                                    <span className="text-gray-500">
                                       <IoIosArrowForward size={20} />
                                    </span>
                                 </div>
                              </>
                           )}
                           {container.id !== 0 && (
                              <>
                                 <hr className="border-t border-gray-300 dark:border-gray-600" />
                                 <div className="flex flex-row items-center justify-between w-full px-4 py-4">
                                    <div className="flex flex-col">
                                       <div className="flex items-center space-x-2">
                                          <span className="pl-2 text-sm">{t("profile:related")}</span>
                                          {container.relatedLinks.map((link, index) => (
                                             <a key={index} href={link.url} className="pl-5 text-sm text-teal-500 hover:underline hover:text-teal-700">
                                                {link.text}
                                             </a>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </>
                           )}
                        </>
                     )}
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
