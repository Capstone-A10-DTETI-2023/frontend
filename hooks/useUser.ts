import { useEffect, useState } from "react"
import { AxiosError } from "axios";

import { User } from "@/types/User";
import { FetchResponse } from "@/types/Api"
import fetcher from "@/services/fetcher";

const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<FetchResponse<User>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getMe = async ({ id }: { id: User['id'] }) => {
        setIsLoading(true);
        try {
            const response = await fetcher.get('/api/v2/users/' + id);
            return response.data.data;
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.response?.data });
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    // Always run when useUser initialized, to get current logged in user from storage;
    const getCurrentUser = () => {
        useEffect(() => {
            setUser(JSON.parse(sessionStorage.getItem('user')!))
        }, []);
    }
    getCurrentUser();

    return {
        user,
        setUser,
        error,
        setError,
        isLoading,
        setIsLoading,
        getMe
    }
}

export default useUser;