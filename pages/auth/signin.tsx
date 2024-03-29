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
import { SignInPayload } from '@/types/User'

const SignIn = () => {
    const [payload, setPayload] = useState<SignInPayload>(
        { email: '', password: '' }
    );
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const { isLoading, error, signIn } = useAuth();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const redirectTo = await signIn(payload);

        // Get user to redirect
        if (redirectTo) {
            router.push(redirectTo);
        }
    }

    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center space-y-8">
            <div className="head-text">
                <h1 className='text-center font-extrabold text-4xl'>Sign in to your account!</h1>
            </div>
            <div className="form-box outline outline-1 outline-gray-200 rounded-lg shadow-lg p-8 w-96 md:w-[32rem] mx-auto" >
                <Stack spacing={4}>
                    <form onSubmit={handleSignIn}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                placeholder='john@doe.com'
                                onChange={(e) => { setPayload({ ...payload, email: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => { setPayload({ ...payload, password: e.target.value }) }}
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
                            <div id="reset-password" className="w-full text-right my-2">
                                <Link href={'/auth/reset-password'} className='text-sm text-blue-500 my-2 text-center' >Forgot Password?</Link>
                            </div>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            {!!error?.message && <Alert.Error>{error.message}</Alert.Error>}
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
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Dont have account yet? <Link href={'/auth/signup'} className='text-sm text-blue-500 my-2' >Sign Up</Link>
                            </Text>
                        </Stack>
                    </form>
                </Stack>
            </div>
        </section>
    )
}

export default SignIn;