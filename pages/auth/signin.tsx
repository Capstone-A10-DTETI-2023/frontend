import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    IconButton,
    Text,
    Link,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const SignIn = () => {
    const [isLoading, setLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <section className="container h-screen mx-auto flex flex-col items-center justify-center space-y-8">
            <div className="head-text">
                <h1 className='text-center font-extrabold text-4xl'>Sign in to your account!</h1>
            </div>
            <div className="form-box outline outline-1 outline-gray-200 rounded-lg shadow-lg p-8 w-96 md:w-[32rem] mx-auto" >
                <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} />
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
                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            isLoading={isLoading}
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign up
                        </Button>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Already a user? <Link color={'blue.400'}>Login</Link>
                        </Text>
                    </Stack>
                </Stack>
            </div>


        </section>
    )
}

export default SignIn;