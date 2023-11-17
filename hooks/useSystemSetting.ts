import { useState } from "react"
import { AxiosError } from "axios";

import { Actuator, ActuatorPayload } from "@/types/Actuator";
import { FetchResponse } from "@/types/Api";
import fetcher from "@/services/fetcher";
import { NodePrefPayload } from "@/types/Node";

const useSystemSettings = () => {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [error, setError] = useState<FetchResponse<Actuator>['error']>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setPressurePref = async (payload: NodePrefPayload, id: number) => {
        setIsLoading(true);
        try {
            await fetcher.put(`/api/v2/sys-setting/nodepref/${id}`, payload);
            await setData({ message: 'success' });
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
        setPressurePref
    };
};

export default useSystemSettings;