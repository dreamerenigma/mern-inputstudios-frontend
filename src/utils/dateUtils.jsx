export const formatDate = (date, language) => {
   const formattedDate = new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(date));

   const dateParts = formattedDate.split(', ');
   const dateWithoutDot = dateParts[0].replace(/(\w{3})\./, '$1');
   const cleanDate = dateWithoutDot.replace(/(\s[а-я]{3})\./, '$1');
   const time = dateParts[1];

   return `${cleanDate} в ${time}`;
};
