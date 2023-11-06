import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
    Polyline
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import { Node } from "@/types/Node";
import PopupMap from "@/components/templates/map/PopupMap";
import useAuth from "@/hooks/useAuth";


const Map = () => {

    const { user } = useAuth();
    const userRolePath = user?.role_name.toLowerCase();

    const nodes: Array<Node> = [
        {
            id: '1',
            coordinate: [-7.766373977737371, 110.37312759986223],
            name: 'Node1 - DTNTF',
            calc_leakage: true,
            leakage_sens: 0.8
        },
        {
            id: '2',
            coordinate: [-7.765760581978385, 110.37137545686188],
            name: 'Node2 - DTMI',
            calc_leakage: true,
            leakage_sens: 0.8
        },
        {
            id: '3',
            coordinate: [-7.7639640348042045, 110.37159539603437],
            name: 'Node3 - DTAP',
            calc_leakage: true,
            leakage_sens: 0.8
        },
        {
            id: '4',
            coordinate: [-7.764607173843711, 110.37381626685878],
            name: 'Node4 - DTSL',
            calc_leakage: true,
            leakage_sens: 0.8
        },
    ];

    const polylineNodes: Array<Node['coordinate']> = nodes?.map((node, i) => {
        return node?.coordinate;
    });
    polylineNodes?.push(nodes[0]?.coordinate);

    return (
        <>
            <MapContainer
                style={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    position: 'fixed'
                }}
                center={nodes[0]?.coordinate}
                zoom={16}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <Polyline pathOptions={{ color: 'blue' }} positions={polylineNodes} />
                {nodes && nodes?.map((node) =>
                    <Marker key={node?.id} position={node?.coordinate}>
                        <Popup className="rounded-sm">
                            <PopupMap.Container>
                                <PopupMap.Title>{node?.name}</PopupMap.Title>
                                <PopupMap.Alert />
                                <PopupMap.Information />
                                <PopupMap.Button href={`/${userRolePath}/nodes/${node?.id}`} />
                            </PopupMap.Container>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    );
}

export default Map;