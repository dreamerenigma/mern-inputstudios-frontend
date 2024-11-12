const countryTranslations = {
  en: [
    { value: 'ru', label: 'Russia' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'cn', label: 'China' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'za', label: 'South Africa' },
  ],
  ru: [
    { value: 'ru', label: 'Россия' },
    { value: 'us', label: 'Соединенные Штаты' },
    { value: 'ca', label: 'Канада' },
    { value: 'mx', label: 'Мексика' },
    { value: 'gb', label: 'Великобритания' },
    { value: 'de', label: 'Германия' },
    { value: 'fr', label: 'Франция' },
    { value: 'it', label: 'Италия' },
    { value: 'es', label: 'Испания' },
    { value: 'cn', label: 'Китай' },
    { value: 'jp', label: 'Япония' },
    { value: 'in', label: 'Индия' },
    { value: 'br', label: 'Бразилия' },
    { value: 'za', label: 'Южная Африка' },
  ],
};

export const getCountries = (language = 'ru') => {
  return countryTranslations[language] || countryTranslations['ru'];
};
