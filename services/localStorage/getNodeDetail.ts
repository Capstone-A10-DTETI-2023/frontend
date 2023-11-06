import { Node } from "@/types/Node";

const getNodeDetail = (nodeId: string | string[]): Node => {
    const key = '/api/v2/nodes';

    const nodes = JSON.parse(localStorage.getItem('/api/v2/nodes')!) as Array<Node>;
    
    const node = nodes.find((node) => {
        return node.id.toString() === nodeId;
    })!;

    return node;

}

export default getNodeDetail;