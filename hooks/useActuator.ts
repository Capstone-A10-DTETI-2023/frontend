import { useState } from "react"
import { AxiosError } from "axios";

import { Actuator, ActuatorPayload } from "@/types/Actuator";
import { FetchResponse } from "@/types/Api";
import fetcher from "@/services/fetcher";

const useActuator = () => {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [error, setError] = useState<FetchResponse<Actuator>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const delay = async (ms: number) => {
        await new Promise((res) => {
            setTimeout(res, ms);
        });
    };

    const actuatePump = async (payload: ActuatorPayload) => {
        setIsLoading(true);
        try {
            await delay(1000);
            await console.log(payload);
            await setData({ message: 'success' });
            // await fetcher.post('/api/v2/tsdata/actuator', payload);
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.response?.data });
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        error,
        isLoading,
        actuatePump
    };
};

export default useActuator;