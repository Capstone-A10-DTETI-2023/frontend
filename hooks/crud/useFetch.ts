import { useState, useEffect } from 'react'
import { FetchResponse } from "@/types/Api"
import { AxiosError } from "axios";
import fetcher from '@/services/fetcher';
import indexedDb from '@/services/indexedDB/indexedDb';

const useFetch = <T>(url: string, options?: { useLocalStorage?: boolean, useIndexedDB?: boolean }): FetchResponse<T> => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetcher.get(url);
                setData({ message: response.data.message, data: response.data.data });

                if (options?.useLocalStorage && localStorage) {
                    localStorage.setItem(url, JSON.stringify(response.data.data));
                }

                if (options?.useIndexedDB) {
                    const db = await indexedDb.init();
                    await indexedDb.save<T>(response.data.data, url);
                    db.close();
                }
            }
            catch (error: AxiosError | any) {
                setError({ status: error?.response?.status, message: error?.message });
                console.log(error.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url])

    return {
        data,
        error,
        isLoading
    }

    
}

export default useFetch;