import { useState } from "react"
import { AxiosError, AxiosResponse } from "axios";

import { FetchResponse } from "@/types/Api";
import { Notification, NotificationPayload } from "@/types/Notification";
import { User } from '@/types/User'
import fetcher from "@/services/fetcher";
import useUser from "@/hooks/useUser";


const useNotification = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [error, setError] = useState<FetchResponse<Notification>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useUser();

    const getNotifPref = async ({ id }: { id: User['id'] }) => {
        setIsLoading(true);
        try {
            const response = await fetcher.get('/api/v2/notif/user/' + id);
            return {
                email: response.data.data.email ?? false,
                whatsapp: response.data.data.whatsapp ?? false,
                firebase: response.data.data.firebase ?? false
            }
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.message });
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const updateNotifPref = async ({ payload, id }: { payload: NotificationPayload, id: User['id'] }) => {
        setIsLoading(true);
        try {
            const response = await fetcher.put('/api/v2/notif/user/' + id, payload);

            await sessionStorage.setItem('user', JSON.stringify(
                {
                    ...user,
                    notificationPref: {
                        email: response.data.data.Email ?? false,
                        whatsapp: response.data.data.Whatsapp ?? false,
                        firebase: response.data.data.Firebase ?? false
                    }
                }
            ));

            setNotification({
                email: response.data.data.Email ?? false,
                whatsapp: response.data.data.Whatsapp ?? false,
                firebase: response.data.data.Firebase ?? false
            });


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
        notification,
        isLoading,
        error,
        updateNotifPref,
        getNotifPref
    }
}

export default useNotification;