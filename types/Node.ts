import { LatLngExpression } from "leaflet";

export type Node = {
    id: number | string;
    coordinate: LatLngExpression;
    name: string;
    calc_leakage: boolean;
    leakage_sens: number;
}