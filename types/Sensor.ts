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
    id_node: string,
    id_sensor: string,
    sensor_data: Array<{ timestamp: string, value: string }>
}

export type SensorDataPayload = {
    timestamp: string,
    node_id: string,
    sensor_id: string,
    value: string
}

export type SensorPayload = {
    Name: string,
    SensorType: number,
    Unit: string,
    Interval: number,
    Tolerance: number,
    Alarm: boolean,
    AlarmType: number,
    AlarmLow: number,
    AlarmHigh: number,
    NodeID: number
}