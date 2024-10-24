import { Button, Modal } from 'flowbite-react';
import { IoIosArrowForward } from "react-icons/io";
import { months } from '../redux/months';
import { countries } from '../redux/countries';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

export default function AccountInfo() {
   const { t } = useTranslation();
   const { theme } = useSelector((state) => state.theme);
   const [showModalEditBirth, setShowModalEditBirth] = useState(false);
   const [selectedMonth, setSelectedMonth] = useState(months[0].value);
   const [days, setDays] = useState(months[0].days);
   const years = Array.from({ length: 2024 - 1903 + 1 }, (_, i) => 1903 + i);
   const [isChanged, setIsChanged] = useState(false);
   const [userId, setUserId] = useState('');

   const handleChange = () => {
      setIsChanged(true);
   };

   const handleBirthShowModal = (state) => {
      setShowModalEditBirth(state);
   };

   const handleEditBirthClick = () => {
      setShowModalEditBirth(true);
      console.log('Div clicked!');
   };

   const handleMonthChange = (event) => {
      const month = event.target.value;
      const monthData = months.find(m => m.value === month);
      setSelectedMonth(month);
      setDays(monthData.days);
      handleChange();
   };

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
         setUserId(user.uid);
      }
      });
      return () => unsubscribe();
   }, []);

   return (
      <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
         <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
            <div className="flex items-center">
               <div className="flex flex-row items-center justify-between w-full pl-4 pt-3">
                  <div>
                     <span>{t("profile:account_info")}</span>
                  </div>
                  <div className="ml-auto">
                     <p className="text-right mr-4 cursor-pointer text-teal-500 hover:text-teal-700 hover:underline">{t("profile:edit_account_info")}</p>
                  </div>
               </div>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div
               className={`flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4 cursor-pointer ${
               theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'}`}
               onClick={handleEditBirthClick}
            >
               <span>{t("profile:date_birth")}</span>
               <span>31/03/1991</span>
               <span className="mx-2">{t("profile:date_birth_account_safety")}</span>
               <span className="ml-auto pr-2">
                  <IoIosArrowForward />
               </span>
            </div>
            <Modal
               show={showModalEditBirth}
               onClose={() => handleBirthShowModal(false)}
               popup
               size="lg"
            >
               <Modal.Header />
               <Modal.Body>
                  <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-semibold text-gray-700 dark:text-gray-200">{t("profile:edit_profile_info")}</p>
                  <div className="text-left mb-5 mt-6">
                     <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">{t("profile:date_birth")}</p>
                     <div className="text-left mb-5">
                        <div className="flex space-x-4">
                           <select 
                              value={selectedMonth} 
                              onChange={handleMonthChange}
                              className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md p-2 w-full mt-1`}
                           >
                              {months.map((month) => (
                                 <option key={month.value} value={month.value}>
                                    {month.label}
                                 </option>
                              ))}
                           </select>
                           <select className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md p-2 w-full mt-1`}>
                              {[...Array(days).keys()].map(day => (
                                 <option key={day + 1} value={day + 1}>
                                    {day + 1}
                                 </option>
                              ))}
                           </select>
                           <select className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md p-2 w-full mt-1`}>
                              {years.map(year => (
                                 <option key={year} value={year}>
                                 {year}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <p className="text-18 mt-8 font-semibold text-gray-700 dark:text-gray-200">{t("profile:country_or_region")}</p>
                           <select className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md p-2 w-full mt-1`}>
                              {countries.map(country => (
                              <option key={country.value} value={country.value}>
                                 {country.label}
                              </option>
                           ))}
                        </select>
                     </div>
                     <p className="text-18 mt-8 font-semibold text-gray-700 dark:text-gray-200">{t("profile:unique_id")}</p>
                     <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">{userId}</p>
                  </div>
                  <div className="text-center">
                     <div className="flex justify-end gap-2">
                     <Button 
                        color={isChanged ? 'rgb(73, 149, 199)' : 'gray'} 
                        onClick={() => handleBirthShowModal(false)}
                        disabled={!isChanged}
                     >
                        {t("profile:save")}
                     </Button>
                     <Button color="gray" onClick={() => handleBirthShowModal(false)}>
                        {t("profile:cancel")}
                     </Button>
                     </div>
                  </div>
               </Modal.Body>
            </Modal>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4">
               <span>{t("profile:country_or_region")}</span>
               <span>{t("profile:country")}</span>
               <span className="mx-2">{t("profile:your_country_region_privacy_settings")}</span>
               <span className="ml-auto pr-2">
               <IoIosArrowForward />
               </span>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4">
               <span>{t("profile:language")}</span>
               <span>{t("profile:select_language")}<br />({t("profile:country")})</span>
               <span className="mx-2">{t("profile:ask_before_translating")}</span>
               <span className="ml-auto pr-2">
               <IoIosArrowForward />
               </span>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4">
               <span>{t("profile:date_birth")}</span>
               <span>31/03/1991</span>
               <span className="mx-2">({t("profile:date_birth_account_safety")})</span>
               <span className="ml-auto pr-2">
               <IoIosArrowForward />
               </span>
            </div>
            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 mb-4 space-x-4">
               <span>{t("profile:date_birth")}</span>
               <span>31/03/1991</span>
               <span className="mx-2">({t("profile:date_birth_account_safety")})</span>
               <span className="ml-auto pr-2">
               <IoIosArrowForward />
               </span>
            </div>
         </div>
      </div>
   );
}
