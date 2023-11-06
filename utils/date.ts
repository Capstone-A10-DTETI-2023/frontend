const getTimestampNow = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedTimestamp;
}

const formatTimestamp = (date: string): string => {
    return date.slice(0, -4); // remove :, second, and Z.
}

export default {
    getTimestampNow,
    formatTimestamp
}