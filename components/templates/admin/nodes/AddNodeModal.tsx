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
    InputGroup,
    useToast
} from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import LoadingPage from '@/components/templates/LoadingPage';
import { NodePayload } from '@/types/Node';
import { LatLngExpression } from 'leaflet';
import useCreate from '@/hooks/crud/useCreate';

const MapInputModal = dynamic(
    () => { return import('@/components/templates/admin/nodes/MapInputModal') },
    {
        loading: () => <LoadingPage>Load the map..</LoadingPage>,
        ssr: false
    }
)


const AddNodeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {


    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [payload, setPayload] = useState<NodePayload>({
        name: '',
        Latitude: '0',
        Longitude: '0',
        LeakageSens: 0,
        CalcLeakage: true
    });
    const toast = useToast();

    const coordinate: LatLngExpression = [parseFloat(payload.Latitude), parseFloat(payload.Longitude)];
    const setCoordinate = (lat: number, lng: number) => {
        setPayload({
            ...payload,
            Latitude: `${lat}`,
            Longitude: `${lng}`
        })
    }

    const { isLoading, error, create } = useCreate<NodePayload>('/api/v2/nodes', { useLocalStorage: true });
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await create(payload);
    }

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [error])


    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <MapInputModal
                    coordinate={coordinate}
                    setCoordinate={setCoordinate}
                    isOpen={isMapOpen}
                    onClose={() => { setIsMapOpen(false) }}
                />
                <ModalOverlay className='fixed top-0 bottom-0 left-0 right-0' />
                <ModalContent>
                    <ModalHeader>Add New Node</ModalHeader>
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
                                        placeholder='Node1 - DTETI'
                                        onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                                        value={payload.name}
                                    />
                                </FormControl>
                                <InputGroup id="coordinate-input-group" className='flex flex-row w-full gap-2'>
                                    <FormControl id="latitude" isRequired>
                                        <FormLabel>Latitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='-7.765557'
                                            onChange={(e) => setPayload({ ...payload, Latitude: e.target.value })}
                                            value={payload.Latitude}
                                        />
                                    </FormControl>
                                    <FormControl id="longitude" isRequired>
                                        <FormLabel>Longitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='110.371794'
                                            onChange={(e) => setPayload({ ...payload, Longitude: e.target.value })}
                                            value={payload.Longitude}
                                        />
                                    </FormControl>
                                </InputGroup>
                                <Button colorScheme='teal' onClick={() => { setIsMapOpen(true) }}>Open Map</Button>
                                <FormControl id="leakageSens" isRequired>
                                    <FormLabel>Leakage Sensitivity</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder='0,8'
                                        step={'0.001'}
                                        onChange={(e) => setPayload({ ...payload, LeakageSens: parseFloat(e.target.value) })}
                                        value={payload.LeakageSens.toString()}
                                    />
                                </FormControl>
                                <FormControl id="calculateLeakage">
                                    <Checkbox
                                        isChecked={payload.CalcLeakage}
                                        size={'md'}
                                        onChange={(e) => setPayload({ ...payload, CalcLeakage: !payload.CalcLeakage })}
                                    >
                                        Calculate Leakage
                                    </Checkbox>
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

export default AddNodeModal;