import { useState } from "react";
import { useSelector } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { IoKeyOutline } from 'react-icons/io5';
import { IoIosArrowDown } from "react-icons/io";
import accountData from "../data/accountData";
import DeleteUserModal from "../components/modals/DeleteUserModal";
import { useTranslation } from "react-i18next";
import securityData from "../data/securityData";

export default function DashSecurity() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const [visibleContainers, setVisibleContainers] = useState(Array(accountData.length).fill(false));
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const { currentUser, error } = useSelector((state) => state.user);

   const handleContainerClick = (index) => {
      setVisibleContainers(prevState => {
         const updatedVisibleContainers = [...prevState];
         updatedVisibleContainers[index] = !updatedVisibleContainers[index];
         return updatedVisibleContainers;
      });
   };

   return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
         <div className="gap-4 overview flex flex-col max-w-5xl w-full h-auto mt-8 mx-auto px-4">
            <div className="flex justify-between items-center my-7">
               <h1 className="font-semibold text-3xl">{t("profile:security")}</h1>
               <Link
                  to="/password/change"
                  className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white group"
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
               {securityData.map((container, index) => (
                  <div key={container.id} className={`w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800 ${visibleContainers[index] ? 'rounded-lg' : 'rounded-t-lg'}`}>
                     <div
                        className={`flex flex-row items-center justify-between w-full px-4 py-2 space-x-4 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'} ${visibleContainers[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                        onClick={() => handleContainerClick(index)}
                     >
                        <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                           {container.icon}
                           <span className="pl-2">{container.title}</span>
                        </div>
                        <span className="pl-9 text-xs">{container.description}</span>
                        </div>
                        <div className="flex items-center space-x-2">
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
