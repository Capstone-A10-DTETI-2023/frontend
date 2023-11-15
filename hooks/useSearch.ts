import { useState, useEffect } from "react";

interface HasName {
    name: string
}

const useSearch = <T extends HasName>(data: any) => {
    // Searching 
    const [searchText, setSearchText] = useState<string>('')
    const [filteredData, setFilteredData] = useState<any>();
    useEffect(() => setFilteredData(data), [data])

    const filter = (value: string) => {
        const filtered = data?.filter((item: any) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        filtered[0] ? setFilteredData(filtered) : setFilteredData([]);
    }

    return {
        searchText,
        setSearchText,
        filteredData,
        filter
    };
}

export default useSearch;