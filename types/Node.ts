export type Node = {
    id: number | string;
    coordinate: Array<number>;
    name: string;
    calc_leakage: boolean;
    leakage_sens: number;
}

export type NodePayload = {
    name: string,
    Latitude: string,
    Longitude: string,
    LeakageSens: number,
    CalcLeakage: boolean
}