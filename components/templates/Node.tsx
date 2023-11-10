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
                <div id='node-container' className={`hover:shadow-lg hover:outline-4  transition-all p-4 w-full shadow-md outline outline-1 bg-white rounded-lg text-black ${variant === 'normal' ? `outline-gray-200 hover:outline-teal-500` : `outline-red-400 bg-red-100 outline-2`}`
                }>
                    <div className='flex flex-row justify-between items-center space-x-4 w-full h-full'>
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
            <div id="node-title" className='basis-1/6 flex justify-start space-x-2 rounded-md'>
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

const Body = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <>
            <div id="node-body" className="flex flex-row gap-4 basis-5/6">
                <div id="sensor-body" className='outline-gray-300 bg-white outline outline-1 rounded-md p-4 basis-1/3'>
                    <h6 className='font-semibold mb-2 text-lg' >Node Information:</h6>
                    <div id="body">
                        {children}
                    </div>
                </div>
                <div id="chart-wrapper" className='p-4 basis-2/3 rounded-md outline outline-1 bg-white outline-gray-300'>
                    <h6 className='font-semibold mb-2 text-lg' >Pressure Value:</h6>
                    <LineChart height={100} />
                </div>
            </div>
        </>
    )
}

const Button = ({ href }: { href: string }) => {

    const variant = useContext(VariantContext)

    return (
        <>
            <div id="button-wrapper" className='basis-1/6 flex justify-center'>
                <Link href={href}>
                    <IconButton className='shadow-md' aria-label='Node details' colorScheme={variant === 'normal' ? 'teal' : 'red'} size={'lg'} fontSize={24} icon={<MdArrowCircleRight />} />
                </Link>
            </div>
        </>
    )
}

export default {
    Container: memo(Container),
    Title: memo(Title),
    Body: memo(Body),
    Button: memo(Button)
};

