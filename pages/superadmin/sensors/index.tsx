import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    Button
} from '@chakra-ui/react'

import Breadcrumb from "@/components/templates/Breadcrumb";
import LoadingPage from '@/components/templates/LoadingPage';
import Alert from '@/components/templates/Alert';
import Search from '@/components/templates/Search';
import { Sensor } from "@/types/Sensor";
import useFetch from "@/hooks/crud/useFetch";

const AdminSensors = () => {

    const { data: sensors, error, isLoading: isSensorLoading } = useFetch<Sensor>('/api/v2/sensors', { useLocalStorage: true });

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Sensors</h3>
            <Search />
            {!!error && <Alert.Error>{error.message}</Alert.Error>}
            {!isSensorLoading && !sensors.data && <>You have no sensors</>}
            {isSensorLoading && <LoadingPage>Load sensors..</LoadingPage>}
            {!!sensors.data && !isSensorLoading &&
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
                                {(sensors.data instanceof Array) && sensors.data.map((sensor) =>
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
                                        <Td><Button variant={'solid'} colorScheme='blue' className='w-full'>Add</Button></Td>
                                        <Td><Button variant={'outline'} colorScheme='red' className='w-fit'>Delete</Button></Td>
                                    </Tr>
                                )}
                            </Tbody >
                        </Table>
                    </TableContainer>
                </div>
            }
        </>
    );
}

export default AdminSensors;