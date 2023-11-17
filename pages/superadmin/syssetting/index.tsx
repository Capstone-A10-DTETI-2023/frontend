import {
    FormControl,
    Select,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    Button,
    TableContainer,
    Thead,
    Tr,
    Th,
    Td,
    Table,
    Tbody,
    useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/crud/useFetch";
import useSystemSettings from "@/hooks/useSystemSetting";
import { Node, NodePref, NodePrefPayload } from "@/types/Node";
import Breadcrumb from "@/components/templates/Breadcrumb";


const SystemSetting = () => {

    const [payload, setPayload] = useState<NodePrefPayload>({
        pressure: 0
    });
    const [selectedNode, setSelectedNode] = useState({ id: 0, name: '-' });
    const { data: nodes, error: nodeError, isLoading: isNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true, earlyFetch: true });
    const { data: pressurePrefs, error: prefError, isLoading: isPrefLoading } = useFetch<NodePref>('/api/v2/sys-setting/nodepref', { earlyFetch: true });
    const { data: pressurePrefSet, error: prefSetError, isLoading: isSetPrefLoading, setPressurePref } = useSystemSettings();
    const [localError, setLocalError] = useState<{ message: string } | null>(null);


    const handleSetSetting = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!selectedNode.id) {
            setLocalError({ message: "Node ID can't be empty" });
        }
        else {
            await setPressurePref(payload, selectedNode.id);
        }

    };

    // Toast
    const toast = useToast();
    useEffect(() => {
        if (nodeError?.message) {
            toast({
                title: 'Error!',
                description: 'Error fetching node id',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if (prefError?.message) {
            toast({
                title: 'Error!',
                description: 'Error fetching sensor',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [nodeError, prefError]);

    useEffect(() => {
        if (prefSetError?.message) {
            toast({
                title: 'Error!',
                description: 'Error set pressure preference',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [prefSetError]);

    useEffect(() => {
        if (localError?.message) {
            toast({
                title: 'Error!',
                description: `${localError?.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [localError]);

    useEffect(() => {
        if (pressurePrefSet?.message === 'success') {
            toast({
                title: 'Success!',
                description: `Successfully set pressure preference (${selectedNode?.name})`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [pressurePrefSet]);

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">System Setting</h3>
            <form action="submit">
                <section id="sys-setting" className="flex flex-row gap-12 items-end">
                    <FormControl id="correspendingNode">
                        <FormLabel>Corresponding Node</FormLabel>
                        <Select
                            placeholder='Choose correspending node'
                            onChange={(e) => {
                                setSelectedNode({ id: parseInt(e.target.value), name: e.target[e.target.selectedIndex].innerText })
                            }}
                        >
                            {nodes?.data && nodes.data instanceof Array && nodes?.data.map((node) =>
                                <option key={node.id} value={node.id}>{node.name}</option>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl id="node-pressure-pref" isRequired>
                        <FormLabel>Node Pressure Preference</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                step={0.01}
                                placeholder='30'
                                onChange={(e) => setPayload({ pressure: parseInt(e.target.value) })}
                                value={payload.pressure.toString()}
                                className="w-fit"
                            />
                            <InputRightAddon children='psi' />
                        </InputGroup>
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        loadingText={'Saving...'}
                        isLoading={isSetPrefLoading}
                        onClick={(e) => handleSetSetting(e)}
                        type="submit"
                        width={'container.sm'}
                    >Set Pressure</Button>
                </section>
            </form>
            <section id="node-pref-info">
                <h6 className="font-semibold mt-4 text-lg">Current Pressure Preferences (All Nodes)</h6>
                <div id="sensor-table-wrapper" className='rounded-lg outline outline-1 outline-gray-200 shadow mt-4'>
                    <TableContainer>
                        <Table size='md' variant={'striped'} colorScheme='gray'>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Node ID</Th>
                                    <Th>Pressure (psi)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {pressurePrefs.data && pressurePrefs.data instanceof Array && pressurePrefs.data.map((pressurePref) =>
                                    <Tr key={pressurePref?.id}>
                                        <Td>{pressurePref?.id}</Td>
                                        <Td>{pressurePref?.node_id}</Td>
                                        <Td>{pressurePref?.pressure}</Td>
                                    </Tr>
                                )}
                            </Tbody >
                        </Table>
                    </TableContainer>
                </div >
            </section>
        </>
    );
}

export default SystemSetting;