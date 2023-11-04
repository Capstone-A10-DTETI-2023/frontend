import { useRouter } from "next/router";
import Breadcrumb from "@/components/templates/Breadcrumb";

const NodeDetails = () => {
    const router = useRouter();
    const nodeId = router.query.node_id;

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">PNU {nodeId}</h3>
        </>
    );
}

export default NodeDetails;