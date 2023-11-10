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