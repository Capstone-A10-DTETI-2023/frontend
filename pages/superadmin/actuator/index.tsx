import { useState, useEffect } from "react";
import {
    Button,
    Badge,
    Slider,
    SliderMark,
    Tooltip,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from "@chakra-ui/react";

import { Node, NodePayload } from "@/types/Node";
import Breadcrumb from "@/components/templates/Breadcrumb";
import getData from "@/services/localStorage/getData";
import getDataById from "@/services/localStorage/getNodeDetail";
import useFetch from "@/hooks/crud/useFetch";

const Actuator = () => {
    const [node, setNode] = useState<Node | null>(null);
    const [isValveActive, setIsValveActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { fetchData: fetchNodes, isLoading: IsNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true });

    const [payload, setPayload] = useState<number>(0);
    const [randomPayload, setRandomPayload] = useState<number>(payload);
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

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

    const generateRandomPressure = () => {
        const randomPressure = payload + Math.random() * 1.0;
        payload === 0 ? setRandomPayload(payload) : setRandomPayload(randomPressure)
    }

    const handleActivate = () => {
        setIsLoading(true);
        setIsValveActive(!isValveActive);
        setIsLoading(false);
    }

    useEffect(() => {
        // Fetch when localStorage is empty
        generateNode();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            generateRandomPressure();
        }, 500)

        return () => clearInterval(timer)
    })

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Control Valve</h3>
            <div id="node-container" className="mx-auto bg-white outline outline-1 rounded-md outline-gray-200 p-4">
                <div id="node-wrapper" className="flex flex-row justify-between items-center">
                    <div id="content-left" className="flex items-center gap-4">
                        <h6 id="node-title" className="font-bold text-lg">{node?.name}</h6>
                        <Badge colorScheme={(isValveActive || payload === 0) ? 'red' : 'green'} fontSize={12} className="h-fit">{(isValveActive || payload === 0) ? 'Deactivated' : 'Activated'}</Badge>
                        <p>Current Pressure: <span className="font-bold">{randomPayload.toFixed(2)}</span></p>
                    </div>
                    <div id="content-right" className="flex flex-row gap-4 items-center">
                        <div id="slider" className="w-96 px-4">
                            <Slider
                                size={'lg'}
                                aria-label='Slider Leakage'
                                defaultValue={payload}
                                min={0}
                                max={50}
                                step={0.01}
                                onChange={(val) => setPayload(val)}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
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
                                    isOpen={showTooltip}
                                    label={`${payload}`}
                                >
                                    <SliderThumb boxSize={6} />
                                </Tooltip>
                            </Slider>
                        </div>
                        {/* <Button
                            colorScheme="teal"
                            className="w-fit"
                            loadingText={isValveActive ? 'Turning off..' : 'Turning on..'}
                            isLoading={isLoading}
                            onClick={handleActivate}>{(isValveActive || payload === 0) ? 'Turn On Valve' : 'Turn Off Valve'}</Button> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Actuator;