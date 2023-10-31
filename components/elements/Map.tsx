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

import { NodeLocation } from "@/types/NodeLocation";
import { LatLngExpression } from "leaflet";

const Map = () => {

    const nodes: Array<NodeLocation> = [
        {
            id: '1',
            position: [-7.766373977737371, 110.37312759986223],
            name: 'Node1 - DTNTF'
        },
        {
            id: '2',
            position: [-7.765760581978385, 110.37137545686188],
            name: 'Node2 - DTMI'
        },
        {
            id: '3',
            position: [-7.7639640348042045, 110.37159539603437],
            name: 'Node3 - DTAP'
        },
        {
            id: '4',
            position: [-7.764607173843711, 110.37381626685878],
            name: 'Node4 - DTSL'
        },
    ];

    const polylineNodes: Array<LatLngExpression> = nodes?.map((node, i) => {
        return node?.position;
    });
    polylineNodes?.push(nodes[0]?.position);

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
                center={nodes[0]?.position}
                zoom={16}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <Polyline pathOptions={{ color: 'blue' }} positions={polylineNodes} />
                {nodes && nodes?.map((node) =>
                    <Marker position={node?.position}>
                        <Popup>
                            {node?.name}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    );
}

export default Map;