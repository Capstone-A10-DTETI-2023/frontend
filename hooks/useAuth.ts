import { useState } from "react"
import axios, { AxiosError } from "axios";
import { User, UserPayload } from "types/User"
import { FetchResponse } from "@/types/Api"
import { useRouter } from "next/router";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<FetchResponse<User>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetcher = axios.create({ headers: { "Content-Type": "application/json" } });

    const signIn = async (payload: UserPayload) => {
        setIsLoading(true);
        try {
            const response = await fetcher.post('/api/v2/auth/login', payload);
            await setUser(response.data.data);
            sessionStorage.setItem('user', JSON.stringify(response.data.data));
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const signOut = async () => {
        setIsLoading(true);
        try {
            await fetcher.post('/api/v2/auth/logout', '');
            await setUser(null);
            sessionStorage.removeItem('user');
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getRole = () => {
        return 'technician';
    }

    return {
        getRole,
        isLoading,
        user,
        error,
        signIn,
        signOut
    }
}

export default useAuth;