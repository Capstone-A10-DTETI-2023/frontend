import { useState } from 'react'
import { FetchResponse } from "@/types/Api"
import { AxiosError } from "axios";
import fetcher from '@/services/fetcher';

interface WithId {
    id: number
}

const useRemove = <T>(url: string, options?: { useLocalStorage?: boolean, useIndexedDB?: boolean, localStorageKey?: string }) => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const remove = async <P extends WithId>(id: number, baseurl: string = url) => {
        setIsLoading(true);
        try {
            const response = await fetcher.delete(`${url}/${id}`);
            setData({ message: response.data.message, data: response.data.data });

            console.log(response);

            // Mutate data to local
            if (response && options?.useLocalStorage) {
                let storageInstance: Storage | null = localStorage;

                const data: Array<P> = JSON.parse(storageInstance.getItem(options.localStorageKey || baseurl)!);
                const editedData: Array<P> = data.filter((item) => { return id !== item.id })

                storageInstance?.setItem(url, JSON.stringify(editedData));

                storageInstance = null
            }
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.response?.data });
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
        remove
    }

}

export default useRemove;