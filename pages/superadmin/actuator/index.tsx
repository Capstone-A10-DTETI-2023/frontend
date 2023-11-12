import { useState, useEffect } from "react";
import {
    Button,
    Badge
} from "@chakra-ui/react";

import { Node } from "@/types/Node";
import Breadcrumb from "@/components/templates/Breadcrumb";
import getData from "@/services/localStorage/getData";
import getDataById from "@/services/localStorage/getNodeDetail";
import useFetch from "@/hooks/crud/useFetch";

const Actuator = () => {
    const [node, setNode] = useState<Node | null>(null);
    const [isValveActive, setIsValveActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { fetchData: fetchNodes, isLoading: IsNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true });

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

    const handleActivate = () => {
        setIsLoading(true);
        setIsValveActive(!isValveActive);
        setIsLoading(false);
    }

    useEffect(() => {
        // Fetch when localStorage is empty
        generateNode();
    }, []);

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
                        <Badge colorScheme={!isValveActive ? 'green' : 'red'} fontSize={12} className="h-fit">{!isValveActive ? 'Activated' : 'Deactivated'}</Badge>
                    </div>
                    <Button
                        colorScheme="teal"
                        className="w-fit"
                        loadingText={isValveActive ? 'Turning off..' : 'Turning on..'}
                        isLoading={isLoading}
                        onClick={handleActivate}>{isValveActive ? 'Turn On Valve' : 'Turn Off Valve'}</Button>
                </div>
            </div>
        </>
    );
}

export default Actuator;