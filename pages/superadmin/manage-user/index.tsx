import { useState, useEffect } from "react"
import Breadcrumb from "@/components/templates/Breadcrumb";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableCaption,
    Button,
    Skeleton,
    useToast
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import { User, UserPayload } from "@/types/User";
import AddUserModal from "@/components/templates/superadmin/manage-user/AddUserModal";
import Search from "@/components/templates/Search";
import Alert from "@/components/templates/Alert";
import AlertDialog from "@/components/templates/AlertDialog";
import EditUserModal from "@/components/templates/superadmin/manage-user/EditUserModal";

import useSearch from "@/hooks/useSearch";
import useFetch from "@/hooks/crud/useFetch";
import useRemove from "@/hooks/crud/useRemove";

const ManageUser = () => {

    const { data: users, isLoading, error: fetchError } = useFetch<User>('/api/v2/users', { earlyFetch: true });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedData, setSelectedData] = useState<UserPayload | null>(null);

    // Delete User
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { data: { message: removeMessage }, isLoading: isRemoveLoading, error: removeError, remove } = useRemove<UserPayload>('/api/v2/sensors', { useLocalStorage: true });
    const handleRemove = async () => {
        await remove<User>(selectedId!);

        if (!isRemoveLoading) {
            setIsDialogOpen(false);

            // Cleanup temp state
            setSelectedId(null);
            setSelectedData(null);
        }

    }

    // Update User
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);

    // Toast
    const toast = useToast();
    useEffect(() => {
        if (removeError?.message) {
            toast({
                title: 'Error!',
                description: 'Error when removing sensor',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if (fetchError?.message) {
            toast({
                title: 'Error!',
                description: 'Error when fetching sensor data',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [fetchError, removeError]);

    useEffect(() => {
        if (removeMessage === 'success') {
            toast({
                title: 'Success!',
                description: 'Successfully remove sensor',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [removeMessage]);

    // Searching
    const { searchText, setSearchText, filteredData: filteredUsers, filter } = useSearch<any>(users?.data);

    return (
        <>
            <AlertDialog
                title="Delete"
                description="Are you sure want delete?"
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onClick={handleRemove}
                isLoading={isRemoveLoading}
            />
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
                >Add User</Button>
            </div>
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }} />
            <EditUserModal
                pastDataId={selectedId!}
                pastData={selectedData!}
                isOpen={isModalUpdateOpen}
                onClose={() => { setIsModalUpdateOpen(false) }} />
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage User</h3>
            <Search
                searchText={searchText}
                setSearchText={setSearchText}
                filter={filter}
                placeholder='Search user here..'
            />

            {!isLoading && !users.data && <>You have no users</>}
            {!!fetchError?.message && <Alert.Error>{fetchError.message}</Alert.Error>}
            {(filteredUsers instanceof Array) && !filteredUsers.length && <>{searchText} is not found</>}

            <div id="user-table-wrapper" className='rounded-lg outline outline-1 outline-gray-200 shadow'>
                <TableContainer>
                    <Table size='md' variant={'striped'} colorScheme='gray'>
                        <TableCaption>Users is only accessed by Admin</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Role ID</Th>
                                <Th>Role Name</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Phone Number</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading &&
                                <Tr>
                                    {Array.from({ length: 8 }).map((_, i) =>
                                        <Td key={i}><Skeleton>...</Skeleton></Td>
                                    )}
                                </Tr>
                            }
                            {!!users.data && !isLoading && (filteredUsers instanceof Array) && filteredUsers?.map((user) =>
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.role_id}</Td>
                                    <Td>{user.role_name}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.phone_num}</Td>
                                    <Td>
                                        <Button variant={'solid'} colorScheme='teal' className='w-full'>
                                            Edit
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            isLoading={isRemoveLoading}
                                            loadingText='...'
                                            onClick={(e) => {
                                                setSelectedId(user?.id);
                                                setIsDialogOpen(true);
                                            }}
                                            variant={'outline'}
                                            colorScheme='red'
                                            className='w-fit'>
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                            }
                        </Tbody >
                    </Table>
                </TableContainer>
            </div >
        </>
    );
}

export default ManageUser;