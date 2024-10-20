import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function CookieManagementModal({ showModal, handleCloseModal }) {
  const { t } = useTranslation();
  const { theme } = useSelector((state) => state.theme);
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';

  const [analyticalCookie, setAnalyticalCookie] = useState('');
  const [socialMediaCookies, setSocialMediaCookies] = useState('');
  const [advertisingCookies, setAdvertisingCookies] = useState('');

  if (!showModal) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const useCookiesTranslation = t("use_cookies").replace(
    '/privacy-statement',
    `${languagePrefix}/privacy-statement`
  );

  const resetPreferences = () => {
    setAnalyticalCookie('');
    setSocialMediaCookies('');
    setAdvertisingCookies('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={handleBackdropClick}
      ></div>
      <div className="relative bg-white dark:bg-gray-800 border border-black p-8 w-11/12 sm:w-3/4 md:w-[40%] lg:w-[40%] max-h-[90vh] overflow-hidden rounded-lg sm:min-w-[600px] md:min-w-[650px] lg:min-w-[650px]">
        <button 
          onClick={handleCloseModal} 
          className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl`}
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h1 className="text-xl font-bold mb-4">{t("manage_cookie_preferences")}</h1>
        <div className="custom-scrollbar overflow-y-auto max-h-[60vh]">
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: useCookiesTranslation }}></p>
          <h1 className="text-xl font-bold mb-2 mt-10">{t("mandatory_cookie")}</h1>
          <p className="mb-4">{t("use_necessary_cookies")}</p>
          <h1 className="text-xl font-bold mb-2 mt-10">{t("analytical_cookie")}</h1>
          <p className="mb-4">{t("use_analytical_cookies")}</p>
          <div className="mb-4 flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="analytical_cookie" value="accept" className="mr-2 ml-2" checked={analyticalCookie === 'accept'} onChange={() => setAnalyticalCookie('accept')}/>
              {t("accept")}
            </label>
            <label className="flex items-center px-10">
              <input type="radio" name="analytical_cookie" value="decline" className="mr-2" checked={analyticalCookie === 'decline'} onChange={() => setAnalyticalCookie('decline')}/>
              {t("decline")}
            </label>
          </div>
          <h1 className="text-xl font-bold mb-2 mt-10">{t("social_media")}</h1>
          <p className="mb-4">{t("use_cookies_social_networks")}</p>
          <div className="mb-4 flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="social_media_cookies" value="accept" className="mr-2 ml-2" checked={socialMediaCookies === 'accept'} onChange={() => setSocialMediaCookies('accept')}/>
              {t("accept")}
            </label>
            <label className="flex items-center px-10">
              <input type="radio" name="social_media_cookies" value="decline" className="mr-2" checked={socialMediaCookies === 'decline'} onChange={() => setSocialMediaCookies('decline')}/>
              {t("decline")}
            </label>
          </div>
          <h1 className="text-xl font-bold mb-2 mt-10">{t("advertising")}</h1>
          <p className="mb-4">{t("use_advertising_cookies")}</p>
          <div className="mb-4 flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="advertising_cookies" value="accept" className="mr-2 ml-2" checked={advertisingCookies === 'accept'} onChange={() => setAdvertisingCookies('accept')}/>
              {t("accept")}
            </label>
            <label className="flex items-center px-10">
              <input type="radio" name="advertising_cookies" value="decline" className="mr-2" checked={advertisingCookies === 'decline'} onChange={() => setAdvertisingCookies('decline')}/>
              {t("decline")}
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-2">
          <button 
            className="flex-1 px-4 py-2 bg-gray-200 border border-black hover:bg-gray-300 text-black"
            onClick={resetPreferences}
          >
            {t("reset_everything")}
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-gray-200 border border-black hover:bg-gray-300 text-black"
            onClick={handleCloseModal}
          >
            {t("save_changes")}
          </button>
        </div>
      </div>
    </div>
  );
}
