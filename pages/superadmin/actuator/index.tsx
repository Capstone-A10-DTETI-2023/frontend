import { useState, useEffect } from "react";
import {
    Button,
    Badge,
    Slider,
    SliderMark,
    Tooltip,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    useToast
} from "@chakra-ui/react";

import { Node } from "@/types/Node";
import { ActuatorPayload } from "@/types/Actuator";
import AlertDialog from "@/components/templates/AlertDialog";
import Breadcrumb from "@/components/templates/Breadcrumb";
import getData from "@/services/localStorage/getData";
import getDataById from "@/services/localStorage/getNodeDetail";
import useFetch from "@/hooks/crud/useFetch";
import useActuator from "@/hooks/useActuator";
import ACTUATOR_ACTION from "@/utils/constants/actuatorAction";

const Actuator = () => {
    const [node, setNode] = useState<Node | null>(null);
    const { fetchData: fetchNodes, isLoading: IsNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true });
    const { data, error: actuatorError, isLoading: isActuatorLoading, actuatePump } = useActuator();

    const [currentPressure, setCurrentPressure] = useState<number>(0);
    const [payload, setPayload] = useState<ActuatorPayload>({
        node_id: "1",
        actuator_id: "1",
        action: ACTUATOR_ACTION.off,
        value: 0
    });
    const [showCurrentPressure, setShowCurrentPressure] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleSetPressure = () => {
        setPayload({ ...payload, action: ACTUATOR_ACTION.on, value: currentPressure });
    }

    const handleActuate = async () => {
        await actuatePump(payload);
    }

    const generateNode = async () => {
        const nodes = getData<Node>('/api/v2/nodes');
        if (nodes) {
            setNode(getDataById<Node>('1', '/api/v2/nodes'));
        }
        else {
            await fetchNodes();
            await setNode(getDataById<Node>('1', '/api/v2/nodes'));
        }
    };

    useEffect(() => {
        // Fetch when localStorage is empty
        generateNode();
    }, []);

    // Toast 
    const toast = useToast();

    useEffect(() => {
        if (data?.message === 'success') {
            toast({
                title: 'Success!',
                description: `Set pressure pump pressure to ${payload.value}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        };
    }, [data]);

    useEffect(() => {
        if (payload.action === 'on') {
            toast({
                title: 'Info',
                description: `Pressure pump value changed to ${payload.value}`,
                status: 'info',
                duration: 5000,
                isClosable: true,
            });
        };
    }, [payload]);


    // Generat Random Actual Pressure
    const [randomPayload, setRandomPayload] = useState<number>(payload.value);
    const generateRandomPressure = () => {
        const randomPressure = payload.value + Math.random() * 1.0;
        payload.value === 0 ? setRandomPayload(payload.value) : setRandomPayload(randomPressure)
    }
    useEffect(() => {
        const timer = setInterval(() => {
            generateRandomPressure();
        }, 1000)

        return () => clearInterval(timer)
    })

    return (
        <>
            <AlertDialog
                title="Set Pump"
                description="Are you sure want to set pump? This action can cancelled"
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onClick={handleActuate}
                isLoading={isActuatorLoading}
            />
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Control Valve</h3>
            <div id="node-container" className="mx-auto bg-white outline outline-1 rounded-md outline-gray-200 p-4">
                <div id="node-wrapper" className="flex flex-row justify-between items-center">
                    <div id="content-left" className="flex items-center gap-4">
                        <h6 id="node-title" className="font-bold text-lg">{node?.name}</h6>
                        <Badge colorScheme={payload.value === 0 ? 'red' : 'green'} fontSize={12} className="h-fit">{payload.value === 0 ? 'Deactivated' : 'Activated'}</Badge>
                        <div id="pressures" className="flex flex-col gap-1">
                            <p>Current Pressure Setting: <span className="font-bold">{payload.value}</span></p>
                            {/* <p>Actual Pressure: <span className="font-bold">{randomPayload.toFixed(2)}</span></p> */}
                        </div>
                    </div>
                    <div id="content-right" className="flex flex-row gap-4 items-center">
                        <div id="slider" className="w-96 px-4">
                            <Slider
                                size={'lg'}
                                aria-label='Slider Leakage'
                                defaultValue={currentPressure}
                                min={0}
                                max={50}
                                step={0.01}
                                onChange={(val) => {
                                    setCurrentPressure(val);
                                }}
                                onMouseEnter={() => setShowCurrentPressure(true)}
                                onMouseLeave={() => setShowCurrentPressure(false)}
                            >
                                <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                                    0
                                </SliderMark>
                                <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                                    25
                                </SliderMark>
                                <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                    50
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg='teal.500'
                                    color='white'
                                    placement='top'
                                    isOpen={showCurrentPressure}
                                    label={`${currentPressure}`}
                                >
                                    <SliderThumb boxSize={6} />
                                </Tooltip>
                            </Slider>
                        </div>
                        <Button
                            colorScheme="teal"
                            className="w-fit"
                            loadingText={'...'}
                            isLoading={isActuatorLoading}
                            onClick={handleSetPressure}
                        >Set Pressure</Button>
                        <Tooltip
                            hasArrow
                            bg='teal.500'
                            color='white'
                            placement='top'
                            isOpen={showTooltip}
                            label={'If you want to set pump pressure, set the pump pressure first'}
                        >
                            <Button
                                colorScheme="blue"
                                className="w-fit"
                                loadingText={'Changing pump state...'}
                                isLoading={isActuatorLoading}
                                onClick={() => {
                                    setIsDialogOpen(true);
                                }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >Set Pump</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Actuator;