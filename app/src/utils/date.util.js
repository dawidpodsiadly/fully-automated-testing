export function dateTimeFormat(dateString, includeTime = false) {
  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate)) {
    return 'No data';
  }

  // YYYY-MM-DD
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  let formattedDateString = `${year}-${month}-${day}`;

  // HH:MM:SS
  if (includeTime) {
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
    formattedDateString += ` ${hours}:${minutes}:${seconds}`;
  }

  return formattedDateString;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
};