import { useState, useEffect } from 'react';
import {
    useToast,
    Button
} from '@chakra-ui/react';
import Link from 'next/link';

import useFetch from '@/hooks/crud/useFetch';
import useSearch from '@/hooks/useSearch';
import Node from '@/components/templates/Node';
import LoadingPage from '@/components/templates/LoadingPage';
import Alert from '@/components/templates/Alert';
import Breadcrumb from '@/components/templates/Breadcrumb';
import Search from '@/components/templates/Search';
import { Node as NodeType } from '@/types/Node';
import { SensorData } from '@/types/Sensor';
import date from '@/utils/date';
import { usePusherContext } from '@/services/pusher/usePusherContext';

const AdminNodes = () => {

    const { dateQueryLastWeek, dateQueryNow } = date.getTimestampNow()

    const toast = useToast();
    const { data: nodes, error: nodeError, isLoading: isNodesLoading } = useFetch<NodeType>('/api/v2/nodes', { useLocalStorage: true, earlyFetch: true });

    const { data: pressureNode1, error: pressureNode1Error, isLoading: isPressureNode1Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=1&sensor_id=1&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=ASC&limit=10`, { earlyFetch: true });
    const { data: pressureNode2, error: pressureNode2Error, isLoading: isPressureNode2Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=2&sensor_id=2&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=ASC&limit=10`, { earlyFetch: true });
    const { data: pressureNode3, error: pressureNode3Error, isLoading: isPressureNode3Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=3&sensor_id=3&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=ASC&limit=10`, { earlyFetch: true });
    const { data: pressureNode4, error: pressureNode4Error, isLoading: isPressureNode4Loading } = useFetch<SensorData>(`/api/v2/tsdata/sensor?node_id=4&sensor_id=4&from=${dateQueryLastWeek}&to=${dateQueryNow}&order_by=ASC&limit=10`, { earlyFetch: true });

    const sensorData = [
        pressureNode1.data as SensorData,
        pressureNode2.data as SensorData,
        pressureNode3.data as SensorData,
        pressureNode4.data as SensorData
    ]

    useEffect(() => {
        if (nodeError) {
            toast({
                title: 'Error!',
                description: nodeError.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if (pressureNode1Error || pressureNode2Error || pressureNode3Error || pressureNode4Error) {
            toast({
                title: 'Error!',
                description: 'Error when fetching sensor data',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [nodeError, pressureNode1Error, pressureNode2Error, pressureNode3Error, pressureNode4Error])

    // Search
    const { searchText, setSearchText, filteredData: filteredNodes, filter } = useSearch<any>(nodes?.data);

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Pipe Node Unit (PNU)</h3>
            <Search
                searchText={searchText}
                setSearchText={setSearchText}
                filter={filter}
                placeholder='Search node here..'
            />
            <div id="nodes" className="flex flex-col gap-4">
                {!!nodeError?.message && <Alert.Error>{nodeError.message}</Alert.Error>}
                {(pressureNode1Error?.message || pressureNode2Error?.message || pressureNode3Error?.message || pressureNode4Error?.message) && <Alert.Error>{'Error when fetching sensor data'}</Alert.Error>}
                {!isNodesLoading && !nodes.data && <>You have no nodes</>}
                {isNodesLoading && <LoadingPage>Load nodes..</LoadingPage>}
                {(filteredNodes instanceof Array) && !filteredNodes.length && <>{searchText} is not found</>}
                {!!nodes.data && !isNodesLoading && (filteredNodes instanceof Array) && filteredNodes?.map((node, i) =>
                    <Node.Container key={node.id} variant={node.id !== 1 ? 'normal' : 'warning'}>
                        <Node.Title>{node.name}</Node.Title>
                        {(isPressureNode1Loading || isPressureNode2Loading || isPressureNode3Loading || isPressureNode4Loading) ?
                            <LoadingPage>Load sensor data...</LoadingPage>
                            :
                            <Node.Body chartData={sensorData?.find(data => `${data?.id_node}` === `${node.id}`)!} >
                                <div className="flex-col flex gap-2">
                                    <div id="lat-lng">
                                        <p>Latitude: {Number(node.coordinate[0]).toFixed(3)}</p>
                                        <p>Latitude: {Number(node.coordinate[1]).toFixed(3)}</p>
                                    </div>
                                    <Button>
                                        <Link href={`/map?lat=${node.coordinate[0]}&lng=${node.coordinate[1]}`}>
                                            See on Map
                                        </Link>
                                    </Button>
                                </div>
                            </Node.Body>
                        }
                        <Node.Button href={`/superadmin/nodes/${node.id}`} />
                    </Node.Container>
                )}
            </div>
        </>
    );
}

export default AdminNodes;