import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from "next/router";

import Breadcrumb from "@/components/templates/Breadcrumb";
import LineChart from '@/components/templates/charts/LineChart';
import Alert from '@/components/templates/Alert';
import Bar from '@/components/templates/Bar';
import getNodeDetail from '@/services/localStorage/getNodeDetail';
import { Node } from '@/types/Node';
import { Sensor } from '@/types/Sensor';

const NodeDetails = () => {
    const [node, setNode] = useState<Node | null>(null);
    const router = useRouter();

    const nodeId = router.query.node_id;
    const sensors: Array<Sensor> = [
        {
            id: 1,
            node_id: 1,
            name: "Pressure",
            unit: "psi",
            interval: 30,
            tolerance: 5,
            alarm: true,
            alarm_type: 1,
            alarm_low: 30,
            alarm_high: 90
        },
        {
            id: 2,
            node_id: 1,
            name: "Temperature",
            unit: "psi",
            interval: 30,
            tolerance: 5,
            alarm: true,
            alarm_type: 1,
            alarm_low: 30,
            alarm_high: 90
        },
    ];
    const sensorStats: Array<{ id: string, label: string, value: number, unit: string }> = [
        {
            id: 'last-value',
            label: 'Last Value',
            value: 20,
            unit: 'psi'
        },
        {
            id: 'max-value',
            label: 'Max Value',
            value: 28.2,
            unit: 'psi'
        },
        {
            id: 'min-value',
            label: 'Min Value',
            value: 20.1,
            unit: 'psi'
        },
        {
            id: 'avg-value',
            label: 'Avg Value',
            value: 23.7,
            unit: 'psi'
        },
    ]
    const isLeakage: boolean = true; // Fetch from backend

    const [selectedSensor, setSelectedSensor] = useState<string>(sensors[0].name);
    const [selectedLimit, setSelectedLimit] = useState<number>();
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>, setState: Dispatch<SetStateAction<any>>) => {
        setState(e.target.value);
    }



    useEffect(() => {
        setNode(getNodeDetail(nodeId!));
    }, [nodeId]);

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 id='node-details-title' className="font-semibold text-3xl text-sky-700 mb-6">PNU <span className='font-bold'>{node?.name}</span></h3>
            <div id="alert-leakage" className='mb-6'>
                {isLeakage &&
                    <Alert.LeakageDetected>
                        {`A leakage on ${node?.name} detected around 10.03 GMT+7, 11/09/2023`}
                    </Alert.LeakageDetected>
                }
            </div>
            <div id="node-details-information" className='w-full bg-white outline outline-1 outline-gray-200 shadow-md h-96 mb-6 rounded-md'>
                <div id="node-details-information-wrapper" className='p-6'>
                    <div id="control-bar" className='mb-8'>
                        <div id="top-content-wrapper" className="flex flex-row justify-between w-full mb-4">
                            <Bar.SelectSensor onChange={(e) => handleSelect(e, setSelectedSensor)} value={selectedSensor!}>
                                {sensors && sensors.map((sensor) =>
                                    <option className='text-black' key={sensor.id} value={sensor?.name}>{sensor.name}</option>
                                )}
                            </Bar.SelectSensor>
                            <div id="top-right-content-wrapper">
                                <Bar.SelectDateRange />
                            </div>
                        </div>
                        <div id="bottom-content-wrapper" className="flex flex-row justify-between w-full mb-4">
                            <Bar.SelectLimit onChange={(e) => handleSelect(e, setSelectedLimit)} value={selectedLimit!}>
                                <option value="1">1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                            </Bar.SelectLimit>
                            <div id="bottom-right-content-wrapper">
                                <Bar.Buttons />
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <LineChart height={200} />
                    </div>
                </div>
            </div>
            <div id="sensor-values" className='w-full flex flex-row gap-4'>
                {sensorStats && sensorStats.map((sensorStat) =>
                    <div id="last-value" className='flex-1 bg-white outline outline-1 outline-gray-200 shadow-md p-6 flex flex-col justify-center items-center rounded-md'>
                        <p className='font-bold text-teal-600 text-6xl'>{sensorStat.value}</p>
                        <p id="unit" className="text-gray-400 mb-2">{sensorStat.unit}</p>
                        <h6 className='font-semibold text-lg' >{sensorStat.label}</h6>
                    </div>
                )}
            </div>
        </>
    );
}

export default NodeDetails;