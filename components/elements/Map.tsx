import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"


type MapInformation = {
    position: LatLngExpression;
    name: string;
}

const Map = () => {

    const mapInfo: MapInformation = {
        position: [-7.763917440686939, 110.37235232766994],
        name: 'Fakultas Teknik'
    }

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
                center={mapInfo?.position}
                zoom={12}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <Marker position={mapInfo?.position}>
                    <Popup>
                        {mapInfo?.name}
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
}

export default Map;