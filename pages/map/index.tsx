import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Checkbox,
    Icon
} from '@chakra-ui/react'
import { MdArrowRight } from "react-icons/md";

import useFetch from "@/hooks/crud/useFetch";
import { Node } from "@/types/Node";
const MapComponent = dynamic(
    () => { return import("@/components/templates/map/Map") },
    {
        loading: () => <LoadingPage>Load the map..</LoadingPage>,
        ssr: false
    }
);
import Alert from "@/components/templates/Alert";
import LoadingPage from "@/components/templates/LoadingPage";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

const Map = () => {

    const router = useRouter();
    const { data: nodes, error, isLoading: isNodesLoading } = useFetch<Node>('/api/v2/nodes', { useLocalStorage: true, earlyFetch: true });

    // Checkbox
    const [checkedNodes, setCheckedNodes] = useState<Array<boolean>>([]);
    const allChecked = checkedNodes?.every(Boolean)
    const isIndeterminate = checkedNodes?.some(Boolean)! && !allChecked

    useEffect(() => {
        if (nodes.data instanceof Array) {
            setCheckedNodes(nodes.data.map(() => true));
        }
    }, [nodes]);

    // Filter Node
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const btnRef = useRef<any>();
    const [filteredNodes, setFilteredNodes] = useState<Array<Node & { isChecked: boolean }> | null>(null);
    const filterNode = () => {

    }


    return (
        <>
            <section id="map-container" className="container">
                <section id="drawer">
                    <div id="button-wrapper" className="fixed -left-1 z-30 w-fit shadow-xl">
                        <Button ref={btnRef} size={'lg'} colorScheme='teal' onClick={() => setIsDrawerOpen(true)}>
                            <Icon fontSize={36} as={MdArrowRight} />
                        </Button>
                    </div>
                    <Drawer
                        isOpen={isDrawerOpen}
                        placement='left'
                        onClose={() => setIsDrawerOpen(false)}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Filter Node</DrawerHeader>

                            <DrawerBody>
                                <div id="filter-node-wrapper" className="flex flex-col gap-2">
                                    <Checkbox
                                        size={'lg'}
                                        onChange={(e) => setCheckedNodes([...checkedNodes.map(() => e.target.checked)])}
                                        isChecked={allChecked}
                                        isIndeterminate={isIndeterminate}
                                    >
                                        All Nodes
                                    </Checkbox>
                                    <div id="child-checkbox">
                                        {!isNodesLoading && nodes.data instanceof Array && nodes.data.map((node, i, arr) =>
                                            <Checkbox
                                                pl={6} mt={1}
                                                key={node.id}
                                                size={'lg'}
                                                isChecked={checkedNodes[i]!}
                                                onChange={(e) => {
                                                    const newArr = [...checkedNodes];
                                                    newArr[i] = e.target.checked;
                                                    setCheckedNodes([...newArr]);
                                                }}
                                            >
                                                {node.name}
                                            </Checkbox>
                                        )}
                                    </div>
                                </div>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={() => setIsDrawerOpen(false)}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue'>Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </section>
                <div id="map-wrapper">
                    {!!error?.message &&
                        <Alert.Error>{error.message}</Alert.Error>
                    }
                    {!isNodesLoading && !nodes.data &&
                        <>You have no nodes</>
                    }
                    {isNodesLoading &&
                        <LoadingPage>Load nodes..</LoadingPage>
                    }
                    {!!nodes.data && !isNodesLoading && (nodes.data instanceof Array) && (router.query.lat && router.query.lng ?
                        <MapComponent nodes={nodes.data} center={[parseFloat(router.query.lat as string), parseFloat(router.query.lng as string)]} /> // from node's component redirect
                        :
                        <MapComponent nodes={nodes.data} center={nodes.data[0].coordinate} /> // access to navbar
                    )
                    }
                </div>
            </section>
        </>
    );
}

export default Map;