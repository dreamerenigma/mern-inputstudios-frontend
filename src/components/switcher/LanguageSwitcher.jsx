import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../redux/language/languageSlice';

export default function LanguageSwitcher() {
   const dispatch = useDispatch();
   const { i18n } = useTranslation();
   const currentLanguage = useSelector((state) => state.language.currentLanguage);

   const handleLanguageChange = () => {
      const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
      dispatch(changeLanguage(newLanguage));
   };

   useEffect(() => {
      i18n.changeLanguage(currentLanguage);
   }, [currentLanguage, i18n]);

   return (
      <div className="relative flex items-center">
         <Switch
            className="relative"
            checked={currentLanguage === 'en'}
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
            {currentLanguage === 'en' ? 'English' : 'Русский'}
         </span>
      </div>
   );
}
