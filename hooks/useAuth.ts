import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios";
import { User, SignInPayload, SignUpPayload } from "types/User"
import { FetchResponse } from "@/types/Api"


const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<FetchResponse<User>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetcher = axios.create({ headers: { "Content-Type": "application/json" } });

    const signIn = async (payload: SignInPayload) => {
        setIsLoading(true);
        try {
            /*
                response = Sign In
                response2 = User information
            */

            const response = await fetcher.post('/api/v2/auth/login', payload);
            const response2 = await fetcher.get(`/api/v2/users/${response.data.data.id}`);
            await setUser(response2.data.data);
            await sessionStorage.setItem('user', JSON.stringify(response2.data.data));
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const signUp = async (payload: SignUpPayload) => {
        setIsLoading(true);
        try {
            await fetcher.post('/api/v2/auth/register', payload);
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

    useEffect(() => {
        const data = sessionStorage.getItem('user');
        const user = JSON.parse(data!) as User | null;

        setUser(user);
    }, [])

    return {
        isLoading,
        user,
        error,
        signIn,
        signOut,
        signUp
    }
}

export default useAuth;