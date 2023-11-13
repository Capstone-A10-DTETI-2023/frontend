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

import { SensorPayload } from '@/types/Sensor';
import useCreate from '@/hooks/crud/useCreate';
import { Node } from '@/types/Node';
import getData from '@/services/localStorage/getData';
import SENSOR_TYPES from '@/utils/constants/sensorTypes';

const AddSensorModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    // Dropdown from localStorage
    const [nodesDropdown, setNodesDropdown] = useState<Array<Node>>([]);

    // Payload and Create
    const [payload, setPayload] = useState<SensorPayload>({
        Name: "",
        SensorType: 1,
        Unit: "",
        Interval: 0,
        Tolerance: 0,
        Alarm: false,
        AlarmType: 1,
        AlarmLow: 30,
        AlarmHigh: 90,
        NodeID: 0
    });
    const { data: { message }, isLoading, error, create } = useCreate<SensorPayload>('/api/v2/sensors', { useLocalStorage: true });
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await create(payload);

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

    useEffect(() => {
        setNodesDropdown(getData<Node>('/api/v2/nodes'));
    }, [])


    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className='fixed top-0 bottom-0 left-0 right-0' />
                <ModalContent>
                    <ModalHeader>Add New Sensor</ModalHeader>
                    <ModalCloseButton />
                    <form action="submit" onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd(e);
                    }}>
                        <ModalBody pb={6}>
                            <div id="add-node-wrapper" className='flex flex-col gap-4'>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder='Pressure'
                                        onChange={(e) => setPayload({ ...payload, Name: e.target.value })}
                                        value={payload.Name}
                                    />
                                </FormControl>
                                <FormControl id="sensorType" isRequired>
                                    <FormLabel>Sensor Type</FormLabel>
                                    <Select
                                        placeholder='Choose your sensor type'
                                        onChange={(e) => setPayload({ ...payload, SensorType: parseInt(e.target.value) })}
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
        </>
    );
}

export default AddSensorModal;