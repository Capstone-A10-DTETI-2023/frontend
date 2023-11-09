import { memo, createContext, useContext } from 'react'
import { MdArrowCircleRight, MdLocationPin, MdWarning } from "react-icons/md";
import Link from 'next/link';
import LineChart from "@/components/templates/charts/LineChart";
import { IconButton, Icon } from '@chakra-ui/react'

const VariantContext = createContext('');

const Container = ({ children, variant }: { children: JSX.Element | Array<JSX.Element>, variant: string }) => {

    /* 
    variant - normal/warning -> menggunakan context
    */

    return (
        <>
            <VariantContext.Provider value={variant}>
                <div id='node-container' className={` p-4 w-full shadow outline outline-1 bg-white rounded-lg text-black ${variant === 'normal' ? `outline-gray-200 ` : `outline-red-200 bg-red-100`}`
                }>
                    <div className='flex flex-row justify-between items-center space-x-4 w-full'>
                        {children}
                    </div>
                </div>
            </VariantContext.Provider>
        </>
    );
}

const Title = ({ children }: { children: string }) => {

    const variant = useContext(VariantContext);

    return (
        <>
            <div id="node-title" className='basis-1/6 flex justify-start space-x-2 w-full'>
                <div id="icon-wrapper">
                    {variant === 'normal' ?
                        <Icon fontSize={24} as={MdLocationPin} color={'teal.400'} />
                        :
                        <Icon fontSize={24} as={MdWarning} color={'red.400'} />
                    }
                </div>
                <p className="font-bold text-lg w-fit">
                    {children}
                </p>
            </div>
        </>
    )
}

const Information = ({ children }: { children: string }) => {
    return (
        <>
            <div id="node-information" className="flex flex-row gap-4 basis-5/6">
                <div id="sensor-information" className='outline-gray-300 outline outline-1 rounded-md p-4'>
                    <h6 className='font-semibold mb-2' >Sensor Data:</h6>
                    <div id="sensor-data" className='bg-teal-500 rounded-md p-2 text-white'>
                        {children}
                    </div>
                </div>
                <div id="chart-wrapper" className='p-4 w-full rounded-md'>
                    <LineChart height={100} />
                </div>
            </div>
        </>
    )
}

const Button = ({ href }: { href: string }) => {
    return (
        <>
            <div id="button-wrapper" className='basis-1/6 flex justify-center'>
                <Link href={href}>
                    <IconButton aria-label='Node details' size={'lg'} fontSize={24} icon={<MdArrowCircleRight />} />
                </Link>
            </div>
        </>
    )
}

export default {
    Container: memo(Container),
    Title: memo(Title),
    Information: memo(Information),
    Button: memo(Button)
};

