const countryIndex = {
  en: [
    { value: '+7', label: 'Russia' },
    { value: '+1-UnitedStates', label: 'United States' },
    { value: '+1-Canada', label: 'Canada' },
    { value: '+52', label: 'Mexico' },
    { value: '+44', label: 'United Kingdom' },
    { value: '+49', label: 'Germany' },
    { value: '+33', label: 'France' },
    { value: '+39', label: 'Italy' },
    { value: '+34', label: 'Spain' },
    { value: '+86', label: 'China' },
    { value: '+81', label: 'Japan' },
    { value: '+91', label: 'India' },
    { value: '+55', label: 'Brazil' },
    { value: '+27', label: 'South Africa' },
    { value: '+61', label: 'Australia' },
    { value: '+43', label: 'Austria' },
  ],
  ru: [
    { value: '+7', label: 'Россия' },
    { value: '+1', label: 'Соединенные Штаты' },
    { value: '+1', label: 'Канада' },
    { value: '+52', label: 'Мексика' },
    { value: '+44', label: 'Великобритания' },
    { value: '+49', label: 'Германия' },
    { value: '+33', label: 'Франция' },
    { value: '+39', label: 'Италия' },
    { value: '+34', label: 'Испания' },
    { value: '+86', label: 'Китай' },
    { value: '+81', label: 'Япония' },
    { value: '+91', label: 'Индия' },
    { value: '+55', label: 'Бразилия' },
    { value: '+27', label: 'Южная Африка' },
    { value: '+61', label: 'Австралия' },
    { value: '+43', label: 'Австрия' },
  ],
};

export const getCountriesIndex = (language = 'ru') => {
  if (!countryIndex[language]) {
    console.warn(`Язык ${language} не найден. Возвращаю данные для 'ru'.`);
    return countryIndex['ru'];
  }
  return countryIndex[language];
};
