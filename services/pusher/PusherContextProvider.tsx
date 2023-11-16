import Pusher from 'pusher-js';
import { createContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import date from '@/utils/date';

const key = "916a2c79fe58f5ae3225";
const cluster = "ap1"
const pusher = new Pusher(key, {
    cluster: cluster,
});
const { dateQueryNow } = date.getTimestampNow()

export const PusherContext = createContext({ pusher, key, leakageNode: { id: 1 } });

type LatestLeakageNode = {
    id: number,
    timestamps: string
}

const PusherContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [leakageNode, setLeakageNode] = useState<{ id: number }>({ id: -1 });
    const toast = useToast();
    useEffect(() => {
        const channelLeakage = pusher.subscribe('my-channel');
        channelLeakage.bind('leakage', (data: { node_leak: string }) => {
            setLeakageNode({ id: parseInt(data.node_leak) });
            sessionStorage.setItem('latestLeakageNode', JSON.stringify({ ...leakageNode, timestamps: dateQueryNow }));
        });

        if (leakageNode.id === -1 && (JSON.parse(sessionStorage.getItem('latestLeakageNode')!) as LatestLeakageNode).id) {
            setLeakageNode(JSON.parse(sessionStorage.getItem('latestLeakageNode')!) as LatestLeakageNode);
        }

        // Toast if leakaged
        if (leakageNode.id !== -1) {
            toast({
                title: 'Leakage!',
                description: `Latest leakage detected on node id: ${leakageNode.id} at ${dateQueryNow}`,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
        };

        // return () => { pusher.unsubscribe(key) }
    }, [leakageNode]);

    return (
        <PusherContext.Provider value={{ pusher, key, leakageNode }}>
            {children}
        </PusherContext.Provider>
    );
}

export default PusherContextProvider;