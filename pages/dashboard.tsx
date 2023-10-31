import { useState } from 'react';
import getConfig from 'next/config';

import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;


const Dashboard = () => {

    const [text, setText] = useState('Dark Mode');

    const toggleDarkMode = (): void => {
        const body = document?.querySelector('body') as HTMLBodyElement;
        body?.classList.toggle('dark');
        body?.classList.contains('dark') ? setText('Light Mode') : setText('Dark Mode');
    }

    return (
        <section className="h-screen flex items-center bg-white dark:bg-gray-800 transition-all">
            <div className="container mx-auto prose prose-base w-full px-8">
                <h1 className='text-center animate-bounce dark:text-white'>{'Capstone A10' || name}</h1>
                <p className='text-center dark:text-gray-400'>This is dashboard</p>
                <div className='text-center w-full flex flex-row space-x-3 justify-center'>
                    <button onClick={toggleDarkMode} className='bg-slate-700 dark:bg-white dark:text-slate-800 text-white px-4 py-1 rounded-md'>{text}</button>
                </div>
                <hr />
                <Alert status='info' variant={'solid'} flexDirection={'column'} rounded={'lg'}>
                    <AlertIcon />
                    This is alert test
                </Alert>
            </div>
        </section>
    );
};

export default Dashboard;