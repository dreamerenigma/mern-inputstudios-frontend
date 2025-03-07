import PropTypes from 'prop-types';
import { RiCloseLine } from 'react-icons/ri';

export default function EditBirthModal ({ 
      showModalEditBirth, 
      handleBirthShowModal, 
      t, 
      theme, 
      months, 
      days, 
      years, 
      countries, 
      selectedMonth, 
      selectedDay,
      selectedYear, 
      selectedCountry, 
      handleMonthChange, 
      handleDayChange, 
      handleYearChange, 
      handleCountryChange, 
      userId, 
      isChanged, 
      handleSaveClick 
   }) {
   if (!showModalEditBirth) return null;

   return (
      <div
         className="px-4 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
                  value={countries.find(country => country.label === selectedCountry)?.value || ""}
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
                  className={`px-4 py-2 rounded-md border ${isChanged
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
            <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
         </button>
         </div>
      </div>
   );
}

EditBirthModal.propTypes = {
   showModalEditBirth: PropTypes.bool.isRequired,
   handleBirthShowModal: PropTypes.func.isRequired,
   t: PropTypes.func.isRequired,
   theme: PropTypes.string.isRequired,
   months: PropTypes.arrayOf(PropTypes.object).isRequired,
   days: PropTypes.number.isRequired,
   years: PropTypes.arrayOf(PropTypes.number).isRequired,
   countries: PropTypes.arrayOf(PropTypes.object).isRequired,
   selectedMonth: PropTypes.string.isRequired,
   selectedDay: PropTypes.number.isRequired,
   selectedYear: PropTypes.number.isRequired,
   selectedCountry: PropTypes.string.isRequired,
   handleMonthChange: PropTypes.func.isRequired,
   handleDayChange: PropTypes.func.isRequired,
   handleYearChange: PropTypes.func.isRequired,
   handleCountryChange: PropTypes.func.isRequired,
   userId: PropTypes.string.isRequired,
   isChanged: PropTypes.bool.isRequired,
   handleSaveClick: PropTypes.func.isRequired
};
