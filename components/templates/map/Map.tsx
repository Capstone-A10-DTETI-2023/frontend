import { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
    Polyline,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { CheckedNode } from "@/types/Node";
import PopupMap from "@/components/templates/map/PopupMap";
import useUser from "@/hooks/useUser";
import { SensorData } from "@/types/Sensor";
import useFetch from "@/hooks/crud/useFetch";
import date from "@/utils/date";


const Map = ({ nodes, center }: { nodes: Array<CheckedNode>, center?: Array<number> }) => {

    const { user } = useUser();
    const userRolePath = user?.role_name.toLowerCase();

    // Sensor Data
    const { dateQueryLastWeek, dateQueryNow } = date.getTimestampNow()
    const { data: pressureNode1, error: pressureNode1Error, isLoading: isPressureNode1Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=1&sensor_id=1&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=DESC&limit=10`, { earlyFetch: true });
    const { data: pressureNode2, error: pressureNode2Error, isLoading: isPressureNode2Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=2&sensor_id=2&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=DESC&limit=10`, { earlyFetch: true });
    const { data: pressureNode3, error: pressureNode3Error, isLoading: isPressureNode3Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=3&sensor_id=3&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=DESC&limit=10`, { earlyFetch: true });
    const { data: pressureNode4, error: pressureNode4Error, isLoading: isPressureNode4Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=4&sensor_id=4&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=DESC&limit=10`, { earlyFetch: true });

    const sensorData = [
        pressureNode1.data as SensorData,
        pressureNode2.data as SensorData,
        pressureNode3.data as SensorData,
        pressureNode4.data as SensorData
    ];

    // Fix map doenst re-render when nodes changes
    const [polyline, setPolyline] = useState<(CheckedNode['coordinate'])[]>();
    useEffect(() => {
        // Create connection between nodes
        setPolyline(() => [...nodes?.filter(node => node.isChecked).map(node => node?.coordinate)]);
        setPolyline((prev) => [...prev ?? [], prev?.[0] ?? []]);
    }, [nodes]);


    return (
        <>{center &&
            <MapContainer
                style={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    position: 'fixed'
                }}
                center={center as LatLngExpression || nodes[0]?.coordinate as LatLngExpression || [0, 0]}
                zoom={16}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                {!!polyline?.length &&
                    <Polyline pathOptions={{ color: 'blue' }} positions={polyline as LatLngExpression[]} />
                }
                {nodes && nodes?.map((node) => {
                    if (node.isChecked) {
                        return (
                            <Marker key={node?.id} position={node?.coordinate as LatLngExpression}>
                                <Popup className="rounded-sm">
                                    <PopupMap.Container>
                                        <PopupMap.Title>{node?.name}</PopupMap.Title>
                                        <PopupMap.Alert>
                                            <>
                                                A leakage detected in {node?.name}, Press See Details to get more detail about this accident.
                                            </>
                                        </PopupMap.Alert>
                                        <PopupMap.Information chartData={sensorData?.find(data => `${data?.id_node}` === `${node.id}`)!} />
                                        <PopupMap.Button href={userRolePath === 'USER' || !userRolePath ? `/send` : `/${userRolePath}/nodes/${node?.id}`} />
                                    </PopupMap.Container>
                                </Popup>
                            </Marker>
                        )
                    }
                }
                )}
            </MapContainer>
        }
        </>
    );
}

export default Map;