export type Node = {
    id: number;
    coordinate: Array<number>;
    name: string;
    calc_leakage: boolean;
    leakage_sens: number;
    non_leak_sens: number
}

export type CheckedNode = Node & {
    isChecked: boolean
}

export type NodePayload = {
    name: string,
    Latitude: string,
    Longitude: string,
    LeakageSens: number,
    NonLeakageSens: number,
    CalcLeakage: boolean
}