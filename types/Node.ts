import { LatLngExpression } from "leaflet";

export type Node = {
    id: number | string;
    coordinate: LatLngExpression;
    name: string;
}

export type Sensor = {
    id: number | string;
    node_id: number | string;
    name: string;
    unit: string;
}

export type SensorData = {
    id: number | string;
    node_id: number | string;
    sensor_id: number | string;
    value: string;
    unit: string;
    timestamp: string;
}