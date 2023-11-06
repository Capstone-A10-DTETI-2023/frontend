import { useState, useEffect } from 'react'
import { FetchResponse } from "@/types/Api"
import { AxiosError } from "axios";
import fetcher from '@/services/fetcher';

export const useFetch = <T>(url: string, options: { useSessionStorage: boolean }): FetchResponse<T> => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetcher.get(url);
                setData({ message: response.data.message, data: response.data.data });

                if (options.useSessionStorage && sessionStorage) {
                    sessionStorage.setItem(url, JSON.stringify(response.data.data))
                }
            }
            catch (error: AxiosError | any) {
                setError({ status: error?.response?.status, message: error?.message });
                console.log(error)
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