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
import useUser from "@/hooks/useUser";
import { LatLngExpression } from "leaflet";


const Map = ({ nodes, center }: { nodes: Array<Node>, center?: Array<number> }) => {

    const { user } = useUser();
    const userRolePath = user?.role_name.toLowerCase();

    // Create connection between nodes
    const polylineNodes: Array<Node['coordinate']> = nodes?.map((node, i) => {
        return node?.coordinate;
    });
    polylineNodes?.push(nodes[0]?.coordinate);

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
                <Polyline pathOptions={{ color: 'blue' }} positions={polylineNodes as LatLngExpression[]} />
                {nodes && nodes?.map((node) =>
                    <Marker key={node?.id} position={node?.coordinate as LatLngExpression}>
                        <Popup className="rounded-sm">
                            <PopupMap.Container>
                                <PopupMap.Title>{node?.name}</PopupMap.Title>
                                <PopupMap.Alert>
                                    <>
                                        A leakage detected in {node?.name}, Press See Details to get more detail about this accident.
                                    </>
                                </PopupMap.Alert>
                                <PopupMap.Information />
                                <PopupMap.Button href={userRolePath === 'USER' || !userRolePath ? `/send` : `/${userRolePath}/nodes/${node?.id}`} />
                            </PopupMap.Container>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        }
        </>
    );
}

export default Map;