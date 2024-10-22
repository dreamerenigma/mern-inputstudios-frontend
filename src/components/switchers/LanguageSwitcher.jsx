import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../redux/language/languageSlice';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from '../buttons/ScrollToTopButton';

export default function LanguageSwitcher() {
   const dispatch = useDispatch();
   const { i18n } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const navigate = useNavigate();
   const [languageChanged, setLanguageChanged] = useState(false);
   const scrollPositionRef = useRef(0);

   const handleLanguageChange = () => {
      scrollPositionRef.current = window.scrollY;

      const newLanguage = currentLanguage === 'en-us' ? 'ru-ru' : 'en-us';
      dispatch(changeLanguage(newLanguage));

      const currentPath = window.location.pathname;
      const pathWithoutLanguage = currentPath.replace(/^\/(ru-ru|en-us)(\/|$)/, '/');
      const newPath = `/${newLanguage}${pathWithoutLanguage}`;

      setLanguageChanged(true);
      navigate(newPath, { replace: true });
   };

   useEffect(() => {
      i18n.changeLanguage(currentLanguage);
   }, [currentLanguage, i18n]);

   return (
      <div>
         <div className="relative flex items-center">
            <Switch
               className="relative"
               checked={currentLanguage === 'en-us'}
               onChange={handleLanguageChange}
               sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                     '& .flag-image': {
                        backgroundImage: 'url(https://i.ibb.co/LtPNm0n/US.png)',
                     },
                  },
                  '& .MuiSwitch-switchBase': {
                     '& .flag-image': {
                        backgroundImage: 'url(https://i.ibb.co/489wXn1/RU.png)',
                     },
                  },
               }}
            />
            <span className="flag-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full overflow-hidden"></span>
            <span className="w-16 text-center">
               {currentLanguage === 'en-us' ? 'English' : 'Русский'}
            </span>
         </div>
         <ScrollToTopButton
            languageChanged={languageChanged}
            setLanguageChanged={setLanguageChanged}
            scrollPositionRef={scrollPositionRef}
         />
      </div>
   );
}
