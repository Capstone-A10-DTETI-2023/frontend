import { useState } from 'react';
import getConfig from 'next/config';
import {
  Button
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {

  const [text, setText] = useState('Dark Mode');

  const toggleDarkMode = (): void => {
    const body = document?.querySelector('body') as HTMLBodyElement;
    body?.classList.toggle('dark');
    body?.classList.contains('dark') ? setText('Light Mode') : setText('Dark Mode');
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 transition-all">
      <div id="index-wrapper" className='h-full w-full mx-auto container flex items-center'>
        <div id="content-wrapper" className='flex flex-col gap-2'>
          <div id="title">
            <h1 className='dark:text-white font-extrabold text-4xl'>{'Smart Water Distribution System' || name}</h1>
            <h6 className=''>by Capstone A-10 DTETI FT UGM</h6>
          </div>
          <div id="get-started" className='mt-12'>
            <Link href={'/docs'}><Button colorScheme='teal'>Read the Docs</Button></Link>
          </div>
        </div>
        <Image className='fixed right-0 -bottom-20 md:-bottom-10 lg:bottom-48 lg:right-52 scale-[2] md:scale-[3] lg:scale-[3] xl:scale-[3.8] -z-10' height={300} width={300} src={'/images/landing-page-01.svg'} alt='landing-page' />
      </div>
    </section>
  );
};

export default Home;
