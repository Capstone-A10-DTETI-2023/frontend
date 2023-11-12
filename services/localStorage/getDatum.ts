const getDatum = <T>(key: string): T => {
    const data = JSON.parse(localStorage.getItem(key)!) as T;
    return data;
}

export default getDatum;