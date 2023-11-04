import { useState, useEffect } from 'react'
import { FetchResponse } from "@/types/Api"
import axios, { AxiosError } from "axios";

const fetcher = axios.create({
    withCredentials: true
});


export const useFetch = <T>(url: string): FetchResponse<T> => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetcher.get(url);
                setData({ message: response.data.message, data: response.data.data });
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