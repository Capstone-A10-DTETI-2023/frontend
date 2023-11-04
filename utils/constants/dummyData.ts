import { Node } from "@/types/Node";

const nodes: Node[] = [
    {
        id: '1',
        coordinate: [-7.766373977737371, 110.37312759986223],
        name: 'Node1 - DTNTF'
    },
    {
        id: '2',
        coordinate: [-7.765760581978385, 110.37137545686188],
        name: 'Node2 - DTMI'
    },
    {
        id: '3',
        coordinate: [-7.7639640348042045, 110.37159539603437],
        name: 'Node3 - DTAP'
    },
    {
        id: '4',
        coordinate: [-7.764607173843711, 110.37381626685878],
        name: 'Node4 - DTSL'
    },
];

const getNodes = () => {
    return nodes;
}

export {
    getNodes
};