import { useState } from "react"
import { AxiosError } from "axios";

import { Actuator, ActuatorPayload } from "@/types/Actuator";
import { FetchResponse } from "@/types/Api";
import fetcher from "@/services/fetcher";

const useActuator = () => {
    const [data, setData] = useState<{ lastPressureValue: string, message: string } | null>(null);
    const [error, setError] = useState<FetchResponse<Actuator>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const actuatePump = async (payload: ActuatorPayload) => {
        setIsLoading(true);
        try {
            await fetcher.post('/api/v2/tsdata/actuator', payload);
            const response = await fetcher.get('/api/v2/tsdata/actuator/last?node_id=1&actuator_id=2');
            await setData({ lastPressureValue: response?.data?.data.value as string, message: 'success' });
        }
        catch (error: AxiosError | any) {
            setError({ status: error?.response?.status, message: error?.response?.data });
            console.log(error);
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