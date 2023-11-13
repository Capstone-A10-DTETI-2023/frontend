import { useState } from "react"
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
    Skeleton
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import useFetch from "@/hooks/crud/useFetch";
import { User } from "@/types/User";
import AddUserModal from "@/components/templates/superadmin/manage-user/AddUserModal";
import Search from "@/components/templates/Search";
import Alert from "@/components/templates/Alert";

const ManageUser = () => {

    const { data: users, isLoading, error: fetchError } = useFetch<User>('/api/v2/users', { earlyFetch: true });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
                >Add User</Button>
            </div>
            <AddUserModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} />
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Manage User</h3>
            <Search placeholder="Search user here.." />
            {!!fetchError?.message && <Alert.Error>{fetchError.message}</Alert.Error>}
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
                                    {Array.from({ length: 8 }).map(() =>
                                        <Td><Skeleton>...</Skeleton></Td>
                                    )}
                                </Tr>
                            }
                            {!isLoading && users.data instanceof Array && users.data.map((user) =>
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.role_id}</Td>
                                    <Td>{user.role_name}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.phone_num}</Td>
                                    <Td><Button variant={'solid'} colorScheme='teal' className='w-full'>Edit</Button></Td>
                                    <Td><Button variant={'outline'} colorScheme='red' className='w-fit'>Delete</Button></Td>
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