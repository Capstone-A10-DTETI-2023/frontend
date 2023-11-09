import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import useFetch from '@/hooks/crud/useFetch';
import { Node as NodeType } from '@/types/Node';
import Node from '@/components/templates/Node';
import LoadingPage from '@/components/templates/LoadingPage';
import Alert from '@/components/templates/Alert';
import Breadcrumb from '@/components/templates/Breadcrumb';


const TechnicianNodes = () => {

    const toast = useToast();
    const { data: nodes, error, isLoading: isNodesLoading } = useFetch<NodeType>('/api/v2/nodes', { useLocalStorage: true });

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
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Pipe Node Unit (PNU)</h3>
            <div id="nodes" className="flex flex-col gap-4">
                {!!error && <Alert.Error>{error.message}</Alert.Error>}
                {!isNodesLoading && !nodes.data && <>You have no nodes</>}
                {isNodesLoading && <LoadingPage>Load nodes..</LoadingPage>}
                {!!nodes.data && !isNodesLoading && (nodes.data instanceof Array) && nodes.data.map((node, i) =>
                    <Node.Container key={i} variant='normal'>
                        <Node.Title>{node.name}</Node.Title>
                        <Node.Information>Information</Node.Information>
                        <Node.Button href={`/technician/nodes/${node.id}`} />
                    </Node.Container>
                )}
            </div>
        </>
    );
}

export default TechnicianNodes;