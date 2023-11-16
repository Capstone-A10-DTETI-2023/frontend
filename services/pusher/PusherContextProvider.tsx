import Pusher from 'pusher-js';
import { createContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import date from '@/utils/date';

const key = "916a2c79fe58f5ae3225";
const cluster = "ap1"
const pusher = new Pusher(key, {
    cluster: cluster,
});

export const PusherContext = createContext({ pusher, key, leakageNode: { id: 1 } });

type LatestLeakageNode = {
    id: number,
    timestamps: string
}

const PusherContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [leakageNode, setLeakageNode] = useState<LatestLeakageNode>({ id: -1, timestamps: '-' });
    const toast = useToast();
    useEffect(() => {
        const { dateQueryNow } = date.getTimestampNow();

        // Toast pusher state

        if (pusher.connection.state === 'connecting') {
            toast({
                title: 'Connecting WebSocket...',
                status: 'info',
                duration: 1000, // 45 s
                isClosable: true,
            })
        }

        if (pusher.connection.state === 'failed') {
            toast({
                title: 'WebSocket failed',
                description: `WebSocket is currently not supported with browser`,
                status: 'error',
                duration: 2000, // 45 s
                isClosable: true,
            })
        }

        const channelLeakage = pusher.subscribe('my-channel');
        channelLeakage.bind('leakage', (data: { node_leak: string }) => {
            setLeakageNode({ id: parseInt(data.node_leak), timestamps: dateQueryNow });
            sessionStorage.setItem('latestLeakageNode', JSON.stringify({ ...leakageNode }));
        });


        // Toast if leakaged
        if (leakageNode.id !== -1) {
            toast({
                title: 'Leakage!',
                description: `Latest leakage detected on node id: ${leakageNode.id} at ${dateQueryNow}`,
                status: 'error',
                duration: 20000, // 45 s
                isClosable: true,
            })
        };


        // if (leakageNode?.id === -1 && (JSON.parse(sessionStorage.getItem('latestLeakageNode')!) as LatestLeakageNode)?.id) {
        //     setLeakageNode(JSON.parse(sessionStorage.getItem('latestLeakageNode')!) as LatestLeakageNode);
        // }

        return () => { pusher.unsubscribe(key) }

    }, [leakageNode, pusher.connection.state]);

    return (
        <PusherContext.Provider value={{ pusher, key, leakageNode }}>
            {children}
        </PusherContext.Provider>
    );
}

export default PusherContextProvider;