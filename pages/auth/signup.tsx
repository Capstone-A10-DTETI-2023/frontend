import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Button,
    Text,
    Link,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdPhone } from 'react-icons/md'
import { useRouter } from 'next/router'

import useAuth from '@/hooks/useAuth'
import Alert from '@/components/templates/Alert'
import { SignUpPayload } from '@/types/User'

const SignUp = () => {
    const [payload, setPayload] = useState<SignUpPayload>(
        { name: '', email: '', phone_num: '' }
    );
    const router = useRouter();

    const { isLoading, error, signUp } = useAuth();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await signUp(payload);
        await router.push('/auth/signup');
    }

    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center space-y-8">
            <div className="head-text">
                <h1 className='text-center font-extrabold text-4xl'>Sign up as User!</h1>
            </div>
            <div className="form-box outline outline-1 outline-gray-200 rounded-lg shadow-lg p-8 w-96 md:w-[32rem] mx-auto" >
                <Stack spacing={4}>
                    <form onSubmit={handleSignUp}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                placeholder='John Doe'
                                onChange={(e) => { setPayload({ ...payload, name: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                placeholder='john@doe.com'
                                onChange={(e) => { setPayload({ ...payload, email: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl id="phone_num" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <MdPhone color='gray.300' />
                                </InputLeftElement>
                                <Input
                                    type='tel'
                                    placeholder='081234568900'
                                    onChange={(e) => { setPayload({ ...payload, phone_num: e.target.value }) }}
                                />
                            </InputGroup>
                            <p className='text-sm text-gray-500 my-2' >*Your password is automatically generated and sent via WhatsApp</p>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            {!!error && <Alert.Error>{error.message}</Alert.Error>}
                            <Button
                                loadingText="Signing Up.."
                                type='submit'
                                isLoading={isLoading}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign Up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Have an account? <Link href='/auth/signin' color={'blue.400'}>Sign In</Link>
                            </Text>
                        </Stack>
                    </form>
                </Stack>
            </div>
        </section>
    );
}

export default SignUp;