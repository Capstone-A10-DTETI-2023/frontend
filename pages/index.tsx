import { useState, useEffect } from 'react';
import getConfig from 'next/config';

import Pusher from 'pusher-js';
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {

  const [text, setText] = useState('Dark Mode');

  const toggleDarkMode = (): void => {
    const body = document?.querySelector('body') as HTMLBodyElement;
    body?.classList.toggle('dark');
    body?.classList.contains('dark') ? setText('Light Mode') : setText('Dark Mode');
  };

  // WebSocket
  const [data, setData] = useState<any>();
  const pusher = new Pusher("916a2c79fe58f5ae3225", {
    cluster: "ap1",
  });

  useEffect(() => {
    console.log(123);
    const channel = pusher.subscribe('sensordata');
    channel.bind('new-sensor-data', (data: any) => {
      console.log(data);
    })
  }, [data])

  return (
    <section className="h-screen flex items-center bg-white dark:bg-gray-800 transition-all">
      <div className="container mx-auto prose prose-base w-full px-8">
        <h1 className='text-center animate-bounce dark:text-white'>{'Capstone A10' || name}</h1>
        <p className='text-center dark:text-gray-400'>Coming very soon</p>
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

export default Home;
