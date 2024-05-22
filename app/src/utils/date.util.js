export function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
        return 'No data';
    }
    const formattedDateString = parsedDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(',', '');
    return formattedDateString;
}
