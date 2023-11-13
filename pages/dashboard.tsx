import { useState } from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;


const Dashboard = () => {

    return (
        <section className="h-[70vh] flex items-center bg-white dark:bg-gray-800 transition-all">
            <div className="container mx-auto prose prose-base w-full px-8">
                <h1 className='text-center animate-bounce dark:text-white'>{'Hello!'}</h1>
                <p className='text-center dark:text-gray-400'>Welcome to Capstone A10 Dashboard</p>
            </div>
        </section>
    );
};

export default Dashboard;
