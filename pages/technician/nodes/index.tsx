import {
    Skeleton
} from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Node from '@/components/templates/Node';

const Breadcrumb = dynamic(
    () => { return import("@/components/templates/Breadcrumb") },
    {
        loading: () => <Skeleton height={5} />,
        ssr: false
    }
)


const TechnicianNodes = () => {

    const router = useRouter();

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage Pipe Node Unit (PNU)</h3>
            <div id="nodes" className="flex flex-col gap-4">
                {[1, 1, 1, 1].map((node, i) =>
                    <Node.Container key={i} variant='normal'>
                        <div id="left-content-wrapper" className='flex flex-row space-x-4 items-center'>
                            <Node.Title>Node1</Node.Title>
                            <Node.Information>Information</Node.Information>
                        </div>
                        <Node.Button href='/nodes/' />
                    </Node.Container>
                )}
            </div>
        </>
    );
}

export default TechnicianNodes;