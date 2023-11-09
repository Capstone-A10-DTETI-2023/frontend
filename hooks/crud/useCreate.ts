import { useState, useEffect } from 'react'
import { FetchResponse } from "@/types/Api"
import { AxiosError } from "axios";
import fetcher from '@/services/fetcher';

const useCreate = <T>(url: string, options?: { useLocalStorage?: boolean, useIndexedDB?: boolean }) => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Init local storage instance when component is ready;
    // Dont forget tu null-ing instance to put in the garbage collector

    const create = async <P>(payload: P) => {
        setIsLoading(true);
        try {
            const response = await fetcher.post(url, payload);
            setData({ message: response.data.message, data: response.data.data });

            // Mutate data to local
            if (response) {
                let storageInstance: Storage | null = localStorage;

                const data: Array<P> = JSON.parse(storageInstance?.getItem(url)!);
                const newData: Array<P> = [...data, response.data.data];
                storageInstance?.setItem(url, JSON.stringify(newData));

                storageInstance = null
            }
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return {
        data,
        error,
        isLoading,
        create
    }

}

export default useCreate;