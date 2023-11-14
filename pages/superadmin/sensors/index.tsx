import { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    Button,
    Skeleton,
    useToast
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import Breadcrumb from "@/components/templates/Breadcrumb";
import Alert from '@/components/templates/Alert';
import Search from '@/components/templates/Search';
import AlertDialog from '@/components/templates/AlertDialog';
import AddSensorModal from '@/components/templates/superadmin/sensors/AddSensorModal';
import EditSensorModal from '@/components/templates/superadmin/sensors/EditSensorModal';
import { Sensor } from "@/types/Sensor";
import { SensorPayload } from '@/types/Sensor';
import useFetch from "@/hooks/crud/useFetch";
import useRemove from '@/hooks/crud/useRemove';

const AdminSensors = () => {

    const { data: sensors, error: fetchError, isLoading: isSensorLoading } = useFetch<Sensor>('/api/v2/sensors', { useLocalStorage: true, earlyFetch: true });
    const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedData, setSelectedData] = useState<SensorPayload | null>(null);

    // Delete Sensor
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { data: { message: removeMessage }, isLoading: isRemoveLoading, error: removeError, remove } = useRemove<SensorPayload>('/api/v2/sensors', { useLocalStorage: true });
    const handleRemove = async () => {
        await remove<Sensor>(selectedId!);

        if (!isRemoveLoading) {
            setIsDialogOpen(false);

            // Cleanup temp state
            setSelectedId(null);
            setSelectedData(null);
        }

    }

    // Update Sensor
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);

    // Toast
    const toast = useToast();
    useEffect(() => {
        if (removeError?.message) {
            toast({
                title: 'Error!',
                description: 'Error when removing sensor',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if (fetchError?.message) {
            toast({
                title: 'Error!',
                description: 'Error when fetching sensor data',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [fetchError, removeError]);

    useEffect(() => {
        if (removeMessage === 'success') {
            toast({
                title: 'Success!',
                description: 'Successfully remove sensor',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [removeMessage]);

    return (
        <>
            <AlertDialog
                title="Delete"
                description="Are you sure want delete?"
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onClick={handleRemove}
                isLoading={isRemoveLoading}
            />
            <div id="fab-add-node" className='fixed right-24 bottom-20 z-10'>
                <Button
                    size={'lg'}
                    variant='solid'
                    colorScheme='blue'
                    aria-label='Add'
                    fontSize={'20px'}
                    leftIcon={<MdAdd />}
                    className='shadow-xl rounded-full'
                    onClick={() => setIsModalCreateOpen(true)}
                >Add Node</Button>
            </div>
            <AddSensorModal
                isOpen={isModalCreateOpen}
                onClose={() => { setIsModalCreateOpen(false) }} />
            <EditSensorModal
                pastDataId={selectedId!}
                pastData={selectedData!}
                isOpen={isModalUpdateOpen}
                onClose={() => { setIsModalUpdateOpen(false) }} />
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Sensors</h3>
            <Search placeholder='Search node sensor here..' />
            {!!fetchError?.message && <Alert.Error>{fetchError.message}</Alert.Error>}
            {!!removeError?.message && <Alert.Error>{removeError.message}</Alert.Error>}
            {!isSensorLoading && !sensors.data && <>You have no sensors</>}
            <div id="sensor-table-wrapper" className='rounded-lg outline outline-1 outline-gray-200 shadow'>
                <TableContainer>
                    <Table size='md' variant={'striped'} colorScheme='gray'>
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>Node ID</Th>
                                <Th>Name</Th>
                                <Th>Unit</Th>
                                <Th>Interval</Th>
                                <Th>Tolerance</Th>
                                <Th>Alarm</Th>
                                <Th>Alarm Type</Th>
                                <Th>Alarm Low</Th>
                                <Th>Alarm High</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isSensorLoading &&
                                <Tr>
                                    {Array.from({ length: 12 }).map((_, i) =>
                                        <Td key={i}><Skeleton>...</Skeleton></Td>
                                    )}
                                </Tr>
                            }
                            {!isSensorLoading && (sensors.data instanceof Array) && sensors.data.map((sensor) =>
                                <Tr key={sensor?.id}>
                                    <Td>{sensor?.id}</Td>
                                    <Td>{sensor?.node_id}</Td>
                                    <Td>{sensor?.name}</Td>
                                    <Td>{sensor?.unit}</Td>
                                    <Td>{sensor?.interval}</Td>
                                    <Td>{sensor?.tolerance}</Td>
                                    <Td>{sensor?.alarm ? <Badge colorScheme='green'>Activated</Badge> : <Badge colorScheme='red'>Deactivated</Badge>}</Td>
                                    <Td>{sensor?.alarm_type}</Td>
                                    <Td>{sensor?.alarm_low}</Td>
                                    <Td>{sensor?.alarm_high}</Td>
                                    <Td>
                                        <Button
                                            isLoading={isRemoveLoading}
                                            loadingText='...'
                                            onClick={(e) => {
                                                setSelectedData({
                                                    NodeID: sensor?.node_id,
                                                    Name: sensor?.name,
                                                    SensorType: 1,
                                                    Unit: sensor?.unit,
                                                    Interval: sensor?.interval,
                                                    Tolerance: sensor?.tolerance,
                                                    Alarm: sensor?.alarm,
                                                    AlarmType: sensor?.alarm_type,
                                                    AlarmLow: sensor?.alarm_low,
                                                    AlarmHigh: sensor?.alarm_high
                                                });
                                                setSelectedId(sensor?.id)
                                                setIsModalUpdateOpen(true);
                                            }}
                                            variant={'solid'}
                                            colorScheme='teal'
                                            className='w-full'>
                                            Edit
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            isLoading={isRemoveLoading}
                                            loadingText='...'
                                            onClick={(e) => {
                                                setSelectedId(sensor?.id);
                                                setIsDialogOpen(true);
                                            }}
                                            variant={'outline'}
                                            colorScheme='red'
                                            className='w-fit'>
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody >
                    </Table>
                </TableContainer>
            </div >
        </>
    );
}

export default AdminSensors;