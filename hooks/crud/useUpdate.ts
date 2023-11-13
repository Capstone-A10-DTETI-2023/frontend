import { useState } from 'react'
import { FetchResponse } from "@/types/Api"
import { AxiosError } from "axios";
import fetcher from '@/services/fetcher';

interface WithId {
    id: number
}

const useUpdate = <T>(url: string, options?: { useLocalStorage?: boolean, useIndexedDB?: boolean, localStorageKey?: string }) => {
    const [data, setData] = useState<FetchResponse<T>['data']>({ message: '', data: null });
    const [error, setError] = useState<FetchResponse<T>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const update = async <P extends WithId>(payload: T, id: number, baseurl: string = url) => {
        setIsLoading(true);
        try {
            const response = await fetcher.put(`${url}/${id}`, payload);
            setData({ message: response.data.message, data: response.data.data });

            // Mutate data to local
            if (response && options?.useLocalStorage) {
                let storageInstance: Storage | null = localStorage;

                const data: Array<P> = JSON.parse(storageInstance.getItem(options.localStorageKey || baseurl)!);
                console.log(response.data);
                const editedData: Array<P> = data.map((item) => { return id !== item.id ? item : response.data.data })

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
        update
    }

}

export default useUpdate;