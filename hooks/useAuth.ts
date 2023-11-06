import { useEffect, useState } from "react"
import { AxiosError } from "axios";

import { User, SignInPayload, SignUpPayload, ResetPasswordPayload } from "@/types/User"
import { FetchResponse } from "@/types/Api"
import fetcher from "@/services/fetcher";


const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<FetchResponse<User>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signIn = async (payload: SignInPayload) => {
        setIsLoading(true);
        try {
            /*
                response = Sign In
                response2 = User information
                response3 = Notif Preferences
            */

            const response = await fetcher.post('/api/v2/auth/login', payload);

            const response2 = await fetcher.get(`/api/v2/users/${response.data.data.id}`);
            const response3 = await fetcher.get(`/api/v2/notif/user/${response.data.data.id}`);


            const user: User = await {
                ...response2.data.data,
                notificationPref: {
                    email: response3.data.data.email,
                    whatsapp: response3.data.data.whatsapp,
                    firebase: response3.data.data.firebase
                }
            }

            await setUser(user);
            await sessionStorage.setItem('user', JSON.stringify(user));
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const resetPassword = async (payload: ResetPasswordPayload) => {
        setIsLoading(true);
        try {
            await fetcher.post('/api/v2/auth/reset-password', payload);
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error.message);
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
            console.log(error.message);
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
            console.log(error.message);
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
        resetPassword,
        signIn,
        signOut,
        signUp
    }
}

export default useAuth;