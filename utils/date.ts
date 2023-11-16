const getTimestampNow = (): Record<string, string> => {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateInputDayAgo = `${year}-${month}-${day}T00:00`;
    const dateInputNow = `${year}-${month}-${day}T${hours}:${minutes}`;

    const dateQueryLastWeek = `${lastWeek.toISOString().slice(0, 10)} 00:00:00`;
    const dateQueryLastDay = `${year}-${month}-${day} 00:00:00`;
    const dateQueryNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return {
        dateInputDayAgo,
        dateInputNow,
        dateQueryLastWeek,
        dateQueryLastDay,
        dateQueryNow
    };

}

const formatQueryToInput = (date: string): string => {
    const splittedDate = date.split(' ');
    return `${splittedDate[0]}T${splittedDate[1].slice(0, -3)}`; // remove :, second, and Z.
}

const formatInputToQuery = (date: string): string => {
    const splittedDate = date.split('T');
    return `${splittedDate[0]} ${splittedDate[1]}:00`;
}

export default {
    getTimestampNow,
    formatInputToQuery,
    formatQueryToInput
}