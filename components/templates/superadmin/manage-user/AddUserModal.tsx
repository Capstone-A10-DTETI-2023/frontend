import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    InputRightElement,
    IconButton,
    InputGroup,
    useToast,
    Select
} from '@chakra-ui/react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useCreate from '@/hooks/crud/useCreate';
import { UserPayload } from '@/types/User';
import ROLES from '@/utils/constants/roles';

const AddUserModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Payload and Create
    const [payload, setPayload] = useState<UserPayload>({
        Name: "",
        RoleID: 2,
        Email: "",
        Phone_Num: "",
        Password: ""
    });
    const { data: { message }, isLoading, error, create } = useCreate<UserPayload>('/api/v2/sensors');
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await create(payload);

        if (!isLoading) {
            onClose();
        }

    }

    // Toast
    const toast = useToast();
    useEffect(() => {
        if (error?.message) {
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [error]);

    useEffect(() => {
        if (message === 'success') {
            toast({
                title: 'Success!',
                description: 'New node added!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [message])


    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className='fixed top-0 bottom-0 left-0 right-0' />
                <ModalContent>
                    <ModalHeader>Add New Sensor</ModalHeader>
                    <ModalCloseButton />
                    <form action="submit" onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd(e);
                    }}>
                        <ModalBody pb={6}>
                            <div id="add-node-wrapper" className='flex flex-col gap-4'>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder='Name'
                                        onChange={(e) => setPayload({ ...payload, Name: e.target.value })}
                                        value={payload.Name}
                                    />
                                </FormControl>
                                <FormControl id="role" isRequired>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onChange={(e) => setPayload({ ...payload, RoleID: parseInt(e.target.value) })}
                                    >
                                        {ROLES && ROLES.map((role) =>
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder='user@mail.com'
                                        onChange={(e) => setPayload({ ...payload, Email: e.target.value })}
                                        value={payload.Email}
                                    />
                                </FormControl>
                                <FormControl id="phoneNumber" isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="tel"
                                        placeholder='081393789949'
                                        onChange={(e) => setPayload({ ...payload, Phone_Num: e.target.value })}
                                        value={payload.Phone_Num}
                                    />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => { setPayload({ ...payload, Password: e.target.value }) }}
                                        />
                                        <InputRightElement h={'full'}>
                                            <IconButton
                                                aria-label='Toggle Password'
                                                icon={showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                                variant={'outline'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            </IconButton>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </div>

                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                mr={4}
                                type='submit'
                                isLoading={isLoading}
                                loadingText='Saving..'
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onClose}
                                isLoading={isLoading}
                            >Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddUserModal;