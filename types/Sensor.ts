export type Sensor = {
    id: number,
    node_id: number,
    name: string,
    unit: string,
    interval: number,
    tolerance: number,
    alarm: boolean,
    alarm_type: number,
    alarm_low: number,
    alarm_high: number
}

export type SensorData = {
    
}