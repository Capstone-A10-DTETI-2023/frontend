import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useFetch from "@/hooks/crud/useFetch";
import { Node } from "@/types/Node";
const MapComponent = dynamic(
    () => { return import("@/components/templates/map/Map") },
    {
        loading: () => <LoadingPage>Load the map..</LoadingPage>,
        ssr: false
    }
);
import Alert from "@/components/templates/Alert";
import LoadingPage from "@/components/templates/LoadingPage";
import { SensorData } from "@/types/Sensor";
import date from "@/utils/date";


const Map = () => {

    const router = useRouter();
    const { data: nodes, error, isLoading: isNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true, earlyFetch: true });

    return (
        <>
            <section className="container">
                <section id="map-wrapper">
                    {!!error?.message &&
                        <Alert.Error>{error.message}</Alert.Error>
                    }
                    {!isNodesLoading && !nodes.data &&
                        <>You have no nodes</>
                    }
                    {isNodesLoading &&
                        <LoadingPage>Load nodes..</LoadingPage>
                    }
                    {!!nodes.data && !isNodesLoading && (nodes.data instanceof Array) && (router.query.lat && router.query.lng ?
                        <MapComponent nodes={nodes.data} center={[parseFloat(router.query.lat as string), parseFloat(router.query.lng as string)]} /> // from node's component redirect
                        :
                        <MapComponent nodes={nodes.data} center={nodes.data[0].coordinate} /> // access to navbar
                    )
                    }
                </section>
            </section>
        </>
    );
}

export default Map;