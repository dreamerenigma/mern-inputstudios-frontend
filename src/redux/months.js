const monthTranslation = {
  en: [
    { value: '01', label: 'January', days: 31 },
    { value: '02', label: 'February', days: 29 },
    { value: '03', label: 'March', days: 31 },
    { value: '04', label: 'April', days: 30 },
    { value: '05', label: 'May', days: 31 },
    { value: '06', label: 'June', days: 30 },
    { value: '07', label: 'July', days: 31 },
    { value: '08', label: 'August', days: 31 },
    { value: '09', label: 'September', days: 30 },
    { value: '10', label: 'October', days: 31 },
    { value: '11', label: 'November', days: 30 },
    { value: '12', label: 'December', days: 31 },
  ],
  ru: [
    { value: '01', label: 'Январь', days: 31 },
    { value: '02', label: 'Февраль', days: 29 },
    { value: '03', label: 'Март', days: 31 },
    { value: '04', label: 'Апрель', days: 30 },
    { value: '05', label: 'Май', days: 31 },
    { value: '06', label: 'Июнь', days: 30 },
    { value: '07', label: 'Июль', days: 31 },
    { value: '08', label: 'Август', days: 31 },
    { value: '09', label: 'Сентябрь', days: 30 },
    { value: '10', label: 'Октябрь', days: 31 },
    { value: '11', label: 'Ноябрь', days: 30 },
    { value: '12', label: 'Декабрь', days: 31 },
  ],
};

export const getMonths = (language = 'ru') => {
  return monthTranslation[language] || monthTranslation['ru'];
};
