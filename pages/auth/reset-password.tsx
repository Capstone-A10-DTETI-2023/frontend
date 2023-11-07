import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    IconButton,
    Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useRouter } from 'next/router'
import Link from 'next/link'

import useAuth from '@/hooks/useAuth'
import Alert from '@/components/templates/Alert'
import { ResetPasswordPayload } from '@/types/User'

const ResetPassword = () => {
    const [payload, setPayload] = useState<ResetPasswordPayload>(
        { username: '', phone_num: '' }
    );

    const router = useRouter();

    const { isLoading, error, resetPassword } = useAuth();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await resetPassword(payload);
        await router.push('/auth/signin');
    }

    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center space-y-8">
            <div className="head-text">
                <h1 className='text-center font-extrabold text-4xl'>Reset your Password!</h1>
            </div>
            <div className="form-box outline outline-1 outline-gray-200 rounded-lg shadow-lg p-8 w-96 md:w-[32rem] mx-auto" >
                <Stack spacing={4}>
                    <form onSubmit={handleSignIn}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="tel"
                                placeholder='John Doe'
                                onChange={(e) => { setPayload({ ...payload, username: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl id="phone_num" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                type="tel"
                                placeholder='0812345678900'
                                onChange={(e) => { setPayload({ ...payload, phone_num: e.target.value }) }}
                            />
                        </FormControl>
                        <p className='text-sm text-gray-500 my-2' >*Your new password is automatically generated and sent via WhatsApp</p>
                        <Stack spacing={10} pt={2}>
                            {!!error && <Alert.Error>{error.message}</Alert.Error>}
                            <Button
                                loadingText="Signing in.."
                                type='submit'
                                isLoading={isLoading}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Reset Password
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Dont have account yet? <Link href={'/auth/signup'} className='text-sm text-blue-500 my-2'>Sign Up</Link>
                            </Text>
                        </Stack>
                    </form>
                </Stack>
            </div>
        </section>
    )
}

export default ResetPassword;