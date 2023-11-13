import { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
    InputRightAddon,
    InputGroup,
    useToast,
    Select
} from '@chakra-ui/react'

import { Sensor, SensorPayload } from '@/types/Sensor';
import useUpdate from '@/hooks/crud/useUpdate';
import { Node } from '@/types/Node';
import getData from '@/services/localStorage/getData';
import SENSOR_TYPES from '@/utils/constants/sensorTypes';

const EditSensorModal = ({ isOpen, onClose, pastData, pastDataId }: { isOpen: boolean, onClose: () => void, pastData: SensorPayload, pastDataId: number }) => {

    // Dropdown from localStorage
    const [nodesDropdown, setNodesDropdown] = useState<Array<Node>>([]);
    useEffect(() => {
        setNodesDropdown(getData<Node>('/api/v2/nodes'));
    }, [])

    // Payload and Update
    const [payload, setPayload] = useState<SensorPayload>({ ...pastData });
    const { data: { message }, isLoading, error, update } = useUpdate<SensorPayload>('/api/v2/sensors', { useLocalStorage: true });
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await update<Sensor>(payload, pastDataId);

        if (!isLoading) {
            onClose();
        }

    }

    // Toast
    const toast = useToast();
    useEffect(() => {
        if (error?.message) {
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [error]);

    useEffect(() => {
        if (message === 'success') {
            toast({
                title: 'Success!',
                description: 'New node added!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [message]);

    return (
        <>
            {pastData && pastDataId &&
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay className='fixed top-0 bottom-0 left-0 right-0' />
                    <ModalContent>
                        <ModalHeader>Edit Sensor</ModalHeader>
                        <ModalCloseButton />
                        <form action="submit" onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(e);
                        }}>
                            <ModalBody pb={6}>
                                <div id="add-node-wrapper" className='flex flex-col gap-4'>
                                    <FormControl id="name" isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='Pressure'
                                            onChange={(e) => setPayload({ ...payload, Name: e.target.value })}
                                            defaultValue={pastData.Name}
                                            value={payload.Name}
                                        />
                                    </FormControl>
                                    <FormControl id="sensorType" isRequired>
                                        <FormLabel>Sensor Type</FormLabel>
                                        <Select
                                            placeholder='Choose your sensor type'
                                            onChange={(e) => setPayload({ ...payload, SensorType: parseInt(e.target.value) })}
                                            defaultValue={pastData.SensorType}
                                        >
                                            {SENSOR_TYPES && SENSOR_TYPES.map((sensorType) =>
                                                <option key={sensorType.id} value={sensorType.id}>{sensorType.name}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl id="unit" isRequired>
                                        <FormLabel>Unit</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='psi'
                                            defaultValue={pastData.Unit}
                                            onChange={(e) => setPayload({ ...payload, Unit: e.target.value })}
                                            value={payload.Unit}
                                        />
                                    </FormControl>
                                    <FormControl id="interval" isRequired>
                                        <FormLabel>Interval</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                step={1}
                                                placeholder='30'
                                                onChange={(e) => setPayload({ ...payload, Interval: parseInt(e.target.value) })}
                                                defaultValue={pastData.Interval}
                                                value={payload.Interval}
                                            />
                                            <InputRightAddon children='seconds' />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="tolerance" isRequired>
                                        <FormLabel>Tolerance</FormLabel>
                                        <Input
                                            type="number"
                                            step={1}
                                            placeholder='5'
                                            onChange={(e) => setPayload({ ...payload, Tolerance: parseInt(e.target.value) })}
                                            defaultValue={pastData.Tolerance}
                                            value={payload.Tolerance}
                                        />
                                    </FormControl>
                                    <FormControl id="alarm">
                                        <Checkbox
                                            isChecked={payload.Alarm}
                                            size={'md'}
                                            onChange={(e) => setPayload({ ...payload, Alarm: !payload.Alarm })}
                                        >
                                            Use Alarm?
                                        </Checkbox>
                                    </FormControl>
                                    <FormControl id="correspendingNode" isRequired>
                                        <FormLabel>Corresponding Node</FormLabel>
                                        <Select
                                            placeholder='Choose correspending node'
                                            onChange={(e) => setPayload({ ...payload, NodeID: parseInt(e.target.value) })}
                                            defaultValue={pastData.NodeID}
                                        >
                                            {nodesDropdown && nodesDropdown.map((node) =>
                                                <option key={node.id} value={node.id}>{node.name}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>

                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme='blue'
                                    mr={4}
                                    type='submit'
                                    isLoading={isLoading}
                                    loadingText='Saving..'
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={onClose}
                                    isLoading={isLoading}
                                >Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            }
        </>
    );
}

export default EditSensorModal;