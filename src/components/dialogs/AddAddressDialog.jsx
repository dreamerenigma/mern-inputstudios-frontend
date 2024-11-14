import PropTypes from 'prop-types';
import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { getCountries } from '../../redux/countries';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AddAddressDialog ({ isOpen, onClose }) {
   const [isChecked, setIsChecked] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

   const [formData, setFormData] = useState({
      country: '',
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
   });

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   const countries = getCountries('ru');
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={handleOverlayClick}>
         <div className="relative border border-gray-700 bg-white dark:bg-gray-800 rounded-lg w-[500px] shadow-md">
            <div className="flex justify-between items-center ">
               <div className="flex-1">
                  <h2 className="text-xl font-semibold px-6 py-4">Добавить новый адрес</h2>
               </div>
               <div className="flex-none mb-6">
                  <button onClick={onClose} className="p-4">
                     <RiCloseLine size={24} className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600" />
                  </button>
               </div>
            </div>
            <div className="px-6 custom-scrollbar">
               <div className="mb-4">
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Страна или регион</label>
                  <select
                     id="country"
                     name="country"
                     value={formData.country}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                     {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                           {country.label}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="mb-4">
                  <label htmlFor="field1" className="block text-sm font-medium mb-1">Имя {" "}<span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     id="field1"
                     name="field1"
                     value={formData.field1}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field2" className="block text-sm font-medium mb-1">Фамилия {" "}<span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     id="field2"
                     name="field2"
                     value={formData.field2}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field3" className="block text-sm font-medium mb-1">Адрес {" "}<span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     id="field3"
                     name="field3"
                     value={formData.field3}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field4" className="block text-sm font-medium  mb-1">Строка адреса 2 (необязательно) {" "}<span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     id="field4"
                     name="field4"
                     value={formData.field4}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field5" className="block text-sm font-medium mb-1">Город {" "}<span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     id="field5"
                     name="field5"
                     value={formData.field5}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field6" className="block text-sm font-medium mb-1">Область (необязательно) {" "}<span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     id="field6"
                     name="field6"
                     value={formData.field6}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="field7" className="block text-sm font-medium mb-1">Почтовый индекс {" "}<span className="text-red-500">*</span></label>
                  <input
                     type="text"
                     id="field7"
                     name="field7"
                     value={formData.field7}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div>
                  <label htmlFor="field8" className="block text-sm font-medium mb-1">Ваш номер телефона <span className="text-red-500">*</span></label>
                  <input
                     type="tel"
                     id="field8"
                     name="field8"
                     value={formData.field8}
                     onChange={handleChange}
                     className="block w-full p-2 border border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
               </div>
               <div>
                  <p className="mb-4">Input Studios уважает вашу конфиденциальность. См. наше {" "}
                     <Link to={`${languagePrefix}/privacy/privacystatement`} className="text-teal-500 hover:text-teal-700 underline">заявление о конфиденциальности</Link>.
                  </p>
                  <div className="flex items-start space-x-2 group">
                     <input
                        type="checkbox"
                        id="change-password"
                        className="appearance-none h-5 w-5 mt-1 border border-white rounded-sm bg-white text-teal-500 checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
                        onChange={handleCheckboxChange}
                     />
                     <label
                        htmlFor="change-password"
                        className="text-gray-700 dark:text-gray-200 hover:text-teal-500 group-hover:text-teal-500"
                     >
                        Сделать основным адресом для доставки и выставления счетов
                     </label>
                  </div>
               </div>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-2">
               <button
                  disabled={!Object.values(formData).every((value) => value !== '')}
                  className={`px-4 py-2 font-semibold rounded-md transition-colors shadow-md ${
                     Object.values(formData).every((value) => value !== '')
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-700 text-gray-600'
                  }`}
               >
                  Отправить
               </button>
               <button
                  onClick={onClose}
                  className="bg-transparent border border-gray-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-700"
               >
                  Отмена
               </button>
            </div>
         </div>
      </div>
   );
}

AddAddressDialog.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
};
