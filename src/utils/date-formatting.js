export default function dateFormatting(date, locale='ru-RU', optionsArg) {

   const newDate = new Date(date) 

   const optionsDefault = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
   }

   const options = optionsArg ? optionsArg : optionsDefault
   const formattingDate = newDate.toLocaleString(locale, options).replace(/г\./g, '')   

   return formattingDate

}