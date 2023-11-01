import { useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/templates/LoadingPage";
const MapComponent = dynamic(
    () => { return import("@/components/templates/map/Map") },
    {
        loading: () => <LoadingPage>Load the map..</LoadingPage>,
        ssr: false
    }
)


const Map = () => {
    return (
        <>
            <section className="container">
                <section id="map-wrapper">
                    <MapComponent />
                </section>
            </section>
        </>
    );
}

export default Map;