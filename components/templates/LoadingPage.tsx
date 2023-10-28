import { Spinner } from '@chakra-ui/react'

const LoadingPage = () => {
    return (
        <>
            <section className='h-screen flex flex-col space-y-4 items-center justify-center'>
                <h1 className='text-center animate-bounce text-4xl font-extrabold text-blue-400'>{'Wait a minute..'}</h1>
                <p className='text-center font-semibold text-gray-300'>Copyright 2023 - Capstone A10</p>
            </section>
        </>
    );
}

export default LoadingPage;