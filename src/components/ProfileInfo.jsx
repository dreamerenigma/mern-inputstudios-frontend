import { IoIosArrowForward } from "react-icons/io";
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { getCountries } from '../redux/countries';
import { getMonths } from '../redux/months';
import LanguageSettingsModal from "../pages/profile/dialogs/LanguageSettingsModal";
import ChangeRegionalFormatModal from "../pages/profile/dialogs/ChangeRegionalFormatModal";
import { RiCloseLine } from "react-icons/ri";

export default function ProfileInfo() {
   const { t } = useTranslation();
   const language = 'ru';
   const countries = getCountries(language);
   const months = getMonths(language);
   const years = Array.from({ length: 2024 - 1903 + 1 }, (_, i) => 1903 + i);
   const { theme } = useSelector((state) => state.theme);
   const [showModalEditBirth, setShowModalEditBirth] = useState(false);
   const [selectedMonth, setSelectedMonth] = useState(months[0].value);
   const [selectedDay, setSelectedDay] = useState(1);
   const [selectedYear, setSelectedYear] = useState(years[0]);
   const [selectedCountry, setSelectedCountry] = useState('');
   const [days, setDays] = useState(months[0].days);
   const [isChanged, setIsChanged] = useState(false);
   const [userId, setUserId] = useState('');
   const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
   const [isChangeRegionalFormatOpen, setIsChangeRegionalFormatOpen] = useState(false);
   const [userLanguage, setUserLanguage] = useState(localStorage.getItem('selectedLanguage') || 'русский (Россия)');
   const [userDateFormat, setUserDateFormat] = useState(localStorage.getItem('selectedDateFormat') || '31.08.2000');
   const [userTimeFormat, setUserTimeFormat] = useState(localStorage.getItem('selectedTimeFormat') || '1:01 - 23:59');
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const handleChange = () => {
      setIsChanged(true);
   };

   const handleSaveClick = () => {
      setIsChanged(false);
      handleBirthShowModal(false);
      localStorage.setItem('selectedMonth', selectedMonth);
      localStorage.setItem('selectedDay', selectedDay);
      localStorage.setItem('selectedYear', selectedYear);
      localStorage.setItem('selectedCountry', selectedCountry);
   };

   const handleBirthShowModal = (state) => {
      setShowModalEditBirth(state);
   };

   const handleEditBirthClick = () => {
      setShowModalEditBirth(true);
   };

   const handleMonthChange = (event) => {
      const month = event.target.value;
      const monthData = months.find(m => m.value === month);
      setSelectedMonth(month);
      setDays(monthData.days);
      handleChange();
   };

   const handleDayChange = (event) => {
      const day = parseInt(event.target.value, 10); 
      setSelectedDay(day);
      handleChange();
   };

   const handleYearChange = (event) => {
      const year = parseInt(event.target.value, 10); 
      setSelectedYear(year);
      handleChange();
   };

   const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
      handleChange();
   };

   const handleLanguageSettings = () => {
      setIsLanguageSettingsOpen(true);
   };

   const handleClose = () => {
      setIsLanguageSettingsOpen(false);
   };

   const handleChangeRegionalFormat = () => {
      setIsChangeRegionalFormatOpen(true);
   };

   const handleCloseModal = () => {
      setIsChangeRegionalFormatOpen(false);
   };

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
         setUserId(user.uid);
      }
      });
      return () => unsubscribe();
   }, []);

   useEffect(() => {
      const savedMonth = localStorage.getItem('selectedMonth');
      const savedDay = localStorage.getItem('selectedDay');
      const savedYear = localStorage.getItem('selectedYear');
      const savedCountry = localStorage.getItem('selectedCountry');
      
      if (savedMonth) setSelectedMonth(savedMonth);
      if (savedDay) setSelectedDay(parseInt(savedDay, 10));
      if (savedYear) setSelectedYear(parseInt(savedYear, 10));
      if (savedCountry) setSelectedCountry(savedCountry);
   }, []);

   return (
      <div className="w-full md:w-3/2 mx-auto max-w-5xl flex items-center">
         <div className="w-full rounded-lg shadow-md transition-colors duration-300 bg-white dark:bg-gray-800">
            <div className="flex items-center">
               <div className="flex flex-row items-center justify-between w-full pl-4 pt-3">
                  <div>
                     <span className="text-md font-semibold">{t("profile:profile_info")}</span>
                  </div>
                  <div className="ml-auto">
                     <div 
                        onClick={handleEditBirthClick}
                        className="text-right mr-4 cursor-pointer text-teal-500 hover:text-teal-700 hover:underline"
                     >
                        {t("profile:edit_profile_info")}
                     </div>
                  </div>
               </div>
            </div>
            <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
            <div 
               className={`grid grid-cols-3 items-center w-full pl-4 cursor-pointer px-4 py-2 ${
                  theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'
               }`}
               onClick={handleEditBirthClick}
            >
               <span className="whitespace-nowrap">{t("profile:date_birth")}</span>
               <span className="whitespace-nowrap">31/03/1991</span>
               <div className="flex items-center justify-end space-x-2">
                  <span className="whitespace-normal">{t("profile:date_birth_account_safety")}</span>
                  <span className="flex-shrink-0">
                     <IoIosArrowForward />
                  </span>
               </div>
            </div>
            {showModalEditBirth && (
               <div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={(e) => {
                     if (e.target === e.currentTarget) {
                        handleBirthShowModal(false);
                     }
                  }}
               >
                  <div className="bg-white dark:bg-gray-800 border border-gray-700 rounded-lg p-8 w-full max-w-xl relative">
                     <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-semibold text-gray-700 dark:text-gray-200">{t("profile:edit_profile_info")}</p>
                     <div className="text-left mb-5 mt-12">
                        <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">{t("profile:date_birth")}</p>
                        <div className="text-left mb-5">
                           <div className="flex space-x-4">
                              <select
                                 value={selectedMonth}
                                 onChange={handleMonthChange}
                                 className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              >
                                 {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                       {month.label}
                                    </option>
                                 ))}
                              </select>
                              <select
                                 value={selectedDay}
                                 onChange={handleDayChange}
                                 className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              >
                                 {[...Array(days).keys()].map(day => (
                                    <option key={day + 1} value={day + 1}>
                                       {day + 1}
                                    </option>
                                 ))}
                              </select>
                              <select 
                                 value={selectedYear}
                                 onChange={handleYearChange}
                                 className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              >
                                 {years.map(year => (
                                    <option key={year} value={year}>
                                       {year}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <p className="text-18 mt-8 font-semibold text-gray-700 dark:text-gray-200">{t("profile:country_or_region")}</p>
                           <select 
                              className={`border ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                              value={selectedCountry}
                              onChange={handleCountryChange}
                           >
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
                           <button
                              className={`px-4 py-2 rounded-md border ${
                                 isChanged
                                    ? 'bg-transparent text-white hover:bg-gray-700 cursor-pointer border-gray-600'
                                    : 'bg-transparent text-gray-600  border-gray-600'
                              }`}
                              onClick={handleSaveClick}
                              disabled={!isChanged}
                           >
                              {t("profile:save")}
                           </button>
                           <button
                              className="px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-100 hover:bg-gray-700"
                              onClick={() => handleBirthShowModal(false)}
                           >
                              {t("profile:cancel")}
                           </button>
                        </div>
                     </div>
                     <button  
                        className="py-3 absolute top-2 right-4 text-3xl rounded text-gray-500 dark:text-gray-300 transition-transform transform hover:translate-y-[-4px]"
                        onClick={() => handleBirthShowModal(false)}
                     >
                        <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600"/>
                     </button>
                  </div>
               </div>
            )}
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div 
               className={`grid grid-cols-3 items-center w-full pl-4 cursor-pointer px-4 py-2 ${
                  theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'
               }`}
               onClick={handleEditBirthClick}
            >
               <span className="whitespace-nowrap">{t("profile:country_or_region")}</span>
               <span className="whitespace-nowrap">{t("profile:country")}</span>
               <div className="flex items-center justify-end space-x-2">
                  <span className="whitespace-normal">{t("profile:your_country_region_privacy_settings")}</span>
                  <span className="flex-shrink-0">
                     <IoIosArrowForward />
                  </span>
               </div>
            </div>
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div
               className={`grid grid-cols-3 items-center w-full pl-4 cursor-pointer px-4 py-4 ${
                  theme === 'dark'
                     ? 'hover:bg-gray-700/60 focus:bg-gray-300'
                     : 'hover:bg-gray-200 focus:bg-gray-300'
               }`}
               onClick={handleLanguageSettings}
            >
               <span>Язык</span>
               <span>Выберите язык</span>
               <div className="flex items-center justify-between w-full">
                  <span>Запрос перед переводом</span>
                  <IoIosArrowForward className="ml-auto" />
               </div>
            </div>
            <LanguageSettingsModal isOpen={isLanguageSettingsOpen} onClose={handleClose} />
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div 
               className={`grid grid-cols-3 items-center w-full pl-4 cursor-pointer px-4 py-5 ${
                  theme === 'dark' ? 'hover:bg-gray-700/60 focus:bg-gray-300' : 'hover:bg-gray-200 focus:bg-gray-300'
               }`}
               onClick={handleChangeRegionalFormat}
            >
               <span>{t("profile:regional_formats")}</span>
               <span>{t("profile:language_and_date")}</span>
               <div className="flex items-center justify-end">
                  <IoIosArrowForward />
               </div>
            </div>
            <ChangeRegionalFormatModal
               isOpen={isChangeRegionalFormatOpen}
               onClose={handleCloseModal}
               initialLanguage={userLanguage}
               initialDateFormat={userDateFormat}
               initialTimeFormat={userTimeFormat}
            />
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 space-x-4 p-5">
               <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                     <span>{t("profile:related")}</span>
                     <Link to={`${languagePrefix}/dashboard?tab=addresses`} className="pl-5  text-teal-500 hover:underline hover:text-teal-700">
                        {t("profile:billing_shipping_addresses")}
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
