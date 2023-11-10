const getData = <T>(key: string): T[] => {
    const data = JSON.parse(localStorage.getItem(key)!) as Array<T>;
    return data;
}

export default getData;