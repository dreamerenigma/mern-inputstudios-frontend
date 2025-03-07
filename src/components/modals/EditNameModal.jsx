import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { RiCloseLine } from 'react-icons/ri';

export default function EditNameModal({ showModal, handleShowModal, t, formData, handleFirstNameChange, handleLastNameChange, handleCaptchaChange, captchaValue, hasChanges, handleSave }) {

   if (!showModal) return null;

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
         onClick={(e) => {
            if (e.target === e.currentTarget) {
               handleShowModal(false);
            }
         }}
      >
         <div className="bg-white dark:bg-gray-800 border border-gray-700 rounded-lg w-full md:w-[450px] p-6 relative">
         <button
            className="absolute text-3xl top-4 right-4 text-gray-600 dark:text-gray-200 hover:translate-y-[-4px] transition-all"
            onClick={() => handleShowModal(false)}
         >
            <RiCloseLine
               size={24}
               className="rounded-md hover:translate-y-[-3px] transition-transform duration-200 hover:bg-gray-600"
            />
         </button>
         <p className="absolute ml-6 mt-4 top-0 left-0 text-xl font-bold text-gray-700 dark:text-gray-200">
            {t('profile:edit_name')}
         </p>
         <div className="text-left mb-5 mt-12">
            <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
               {t('profile:first_name')}
            </p>
            <input
               type="text"
               placeholder={t('profile:first_name')}
               className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
               autoComplete="off"
               value={formData.firstName || ''}
               onChange={handleFirstNameChange}
            />
         </div>
         <div className="text-left mb-5 mt-8">
            <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
               {t('profile:last_name')}
            </p>
            <input
               type="text"
               placeholder={t('profile:last_name')}
               className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
               autoComplete="off"
               value={formData.lastName || ''}
               onChange={handleLastNameChange}
            />
         </div>
         <div className="text-left mb-5 mt-6">
            <p className="text-18 font-semibold text-gray-700 dark:text-gray-200">
               {t('profile:captcha')}
            </p>
            <div className="mt-4">
               <ReCAPTCHA
               sitekey="6Lcn5uYpAAAAAM2rTG-jWtWRMeDoh6GT4xFcY0cS"
               onChange={handleCaptchaChange}
               />
            </div>
            {captchaValue && <p>{t('profile:captcha')}</p>}
            <input
               type="text"
               placeholder={t('profile:enter_characters_you_see')}
               className="border border-gray-600 rounded-md p-2 w-full mt-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-teal-500"
               autoComplete="off"
            />
         </div>
         <div className="text-center">
            <div className="flex justify-end gap-4">
               <button
                  className={`px-4 py-2 rounded-md border ${
                     hasChanges
                        ? 'bg-transparent text-white hover:bg-gray-700 cursor-pointer border-gray-600'
                        : 'bg-transparent text-gray-600 border-gray-600'
                  }`}
                  onClick={handleSave}
                  disabled={!hasChanges}
               >
                  {t('profile:save')}
               </button>
               <button
                  onClick={() => handleShowModal(false)}
                  className="border border-gray-600 bg-transparent text-white py-2 px-4 rounded-md hover:bg-gray-700"
               >
                  {t('profile:cancel')}
               </button>
            </div>
         </div>
         </div>
      </div>
   );
}

EditNameModal.propTypes = {
   showModal: PropTypes.bool.isRequired,
   handleShowModal: PropTypes.func.isRequired,
   t: PropTypes.func.isRequired,
   formData: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
   }).isRequired,
   handleFirstNameChange: PropTypes.func.isRequired,
   handleLastNameChange: PropTypes.func.isRequired,
   handleCaptchaChange: PropTypes.func.isRequired,
   captchaValue: PropTypes.string,
   hasChanges: PropTypes.bool.isRequired,
   handleSave: PropTypes.func.isRequired,
};
