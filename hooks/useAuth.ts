import { useEffect, useState } from "react"
import { AxiosError } from "axios";

import { User, SignInPayload, SignUpPayload, ResetPasswordPayload } from "@/types/User"
import { FetchResponse } from "@/types/Api";
import fetcher from "@/services/fetcher";
import useNotification from "@/hooks/useNotification";
import useUser from "@/hooks/useUser";


const useAuth = () => {
    const { user, setUser, getMe } = useUser();
    const [error, setError] = useState<FetchResponse<User | Notification>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getNotifPref } = useNotification();

    const signIn = async (payload: SignInPayload) => {
        setIsLoading(true);
        try {

            const response = await fetcher.post('/api/v2/auth/login', payload);

            const me = await getMe({ id: response.data.data.id });
            const notifPrefs = await getNotifPref({ id: response.data.data.id });

            const newUser: User = await {
                ...me,
                notificationPref: {
                    email: notifPrefs?.email,
                    whatsapp: notifPrefs?.whatsapp,
                    firebase: notifPrefs?.firebase
                }
            };

            await setUser(newUser);
            await sessionStorage.setItem('user', JSON.stringify(newUser));
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


    return {
        isLoading,
        error,
        setUser,
        resetPassword,
        signIn,
        signOut,
        signUp,
        getMe
    }
}

export default useAuth;