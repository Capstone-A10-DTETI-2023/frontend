import { Sensor } from "@/types/Sensor";

const getSensorByNodeId = (node_id: string | string[]): Array<Sensor> => {
    const key = '/api/v2/sensors'
    const sensors = JSON.parse(localStorage.getItem(key)!) as Array<Sensor>;

    const filteredSensors = sensors.filter((sensor) => {
        return sensor.node_id.toString() === node_id;
    })!;

    return filteredSensors;
}

export default getSensorByNodeId;