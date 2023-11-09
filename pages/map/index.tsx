import dynamic from "next/dynamic";
import LoadingPage from "@/components/templates/LoadingPage";
import { useRouter } from "next/router";
import { useState } from "react";
const MapComponent = dynamic(
    () => { return import("@/components/templates/map/Map") },
    {
        loading: () => <LoadingPage>Load the map..</LoadingPage>,
        ssr: false
    }
)


const Map = () => {

    const router = useRouter();

    // setCenter([parseFloat(router.query.lat as string), parseFloat(router.query.lng as string)])

    return (
        <>
            <section className="container">
                <section id="map-wrapper">
                    {router.query.lat && router.query.lng ?
                        <MapComponent center={[parseFloat(router.query.lat as string), parseFloat(router.query.lng as string)]} /> // from node's component redirect
                        :
                        <MapComponent /> // access to navbar
                    }
                </section>
            </section>
        </>
    );
}

export default Map;