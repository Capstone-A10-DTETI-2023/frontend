import { useState, useEffect } from 'react';
import {
    useMapEvents,
    MapContainer,
    TileLayer,
    Marker,
} from "react-leaflet";
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Button
} from '@chakra-ui/react'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { LatLngExpression } from 'leaflet';

const MapInputModal = ({ coordinate, setCoordinate, isOpen, onClose }: {
    coordinate: LatLngExpression,
    setCoordinate: (lat: number, lng: number) => void,
    isOpen: boolean,
    onClose: () => void
}) => {

    const [center, setCenter] = useState<LatLngExpression>([0, 0]);
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                // Set map center by user geo location
                setCenter([coords.latitude, coords.longitude]);
            })
        }
    }, []);

    const ChooseLocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                setCoordinate(e.latlng.lat, e.latlng.lng);
                setCenter([e.latlng.lat, e.latlng.lng]);
            }
        })

        return (
            <>
                <Marker position={coordinate}>
                </Marker>
            </>
        )
    }



    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Choose node position</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div id="modal-map-wrapper" className='flex flex-col gap-4 '>
                            <div id="map-input-wrapper" className="w-full h-96">
                                <MapContainer
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    center={center}
                                    zoom={16}
                                    scrollWheelZoom={true}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <ChooseLocationMarker />
                                </MapContainer>
                            </div>
                            <div id="button-modal-map" className='self-end'>
                                <Button colorScheme='teal' className='w-fit mr-4' onClick={onClose}>Set Coordinate</Button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>


        </>
    );
}

export default MapInputModal;