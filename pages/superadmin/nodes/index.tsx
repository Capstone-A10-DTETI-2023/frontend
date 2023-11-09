import { useEffect, useState } from 'react';
import {
    useToast,
    Button
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import Link from 'next/link';

import useFetch from '@/hooks/crud/useFetch';
import { Node as NodeType } from '@/types/Node';
import Node from '@/components/templates/Node';
import LoadingPage from '@/components/templates/LoadingPage';
import Alert from '@/components/templates/Alert';
import Breadcrumb from '@/components/templates/Breadcrumb';
import AddNodeModal from '@/components/templates/superadmin/nodes/AddNodeModal';
import Search from '@/components/templates/Search';



const AdminNodes = () => {

    const toast = useToast();
    const { data: nodes, error, isLoading: isNodesLoading } = useFetch<NodeType>('/api/v2/nodes', { useLocalStorage: true });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <div id="fab-add-node" className='fixed right-24 bottom-20 z-10'>
                <Button
                    size={'lg'}
                    variant='solid'
                    colorScheme='blue'
                    aria-label='Add'
                    fontSize={'20px'}
                    leftIcon={<MdAdd />}
                    className='shadow-xl rounded-full'
                    onClick={() => setIsModalOpen(true)}
                >Add Node</Button>
            </div>
            <AddNodeModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} />
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Pipe Node Unit (PNU)</h3>
            <Search />
            <div id="nodes" className="flex flex-col gap-4">
                {!!error && <Alert.Error>{error.message}</Alert.Error>}
                {!isNodesLoading && !nodes.data && <>You have no nodes</>}
                {isNodesLoading && <LoadingPage>Load nodes..</LoadingPage>}
                {!!nodes.data && !isNodesLoading && (nodes.data instanceof Array) && nodes.data.map((node, i) =>
                    <Node.Container key={i} variant='normal'>
                        <Node.Title>{node.name}</Node.Title>
                        <Node.Body>
                            <>
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
                            </>
                        </Node.Body>
                        <Node.Button href={`/superadmin/nodes/${node.id}`} />
                    </Node.Container>
                )}
            </div>
        </>
    );
}

export default AdminNodes;