import { memo } from 'react'
import { MdArrowCircleRight, MdLocationPin } from "react-icons/md";
import Link from 'next/link';
import LineChart from "@/components/templates/charts/LineChart";
import { IconButton, Icon } from '@chakra-ui/react'

const Container = ({ children, variant }: { children: JSX.Element | Array<JSX.Element>, variant: string }) => {

    /* 
    variant - normal/warning -> menggunakan context
    */

    return (
        <>
            <div id='node-container' className={`flex flex-row justify-between items-center space-x-4 p-4 w-full shadow outline outline-1 rounded-lg ${variant === 'normal' ? `outline-gray-200 bg-white text-black` : `outline-red-500 bg-red-400 text-white`}`
            }>
                {children}
            </div>
        </>
    );
}

const Title = ({ children }: { children: string }) => {
    return (
        <>
            <div id="icon-wrapper">
                <Icon fontSize={24} as={MdLocationPin} />
            </div>
            <p className="font-bold text-lg w-fit">
                {children}
            </p>
        </>
    )
}

const Information = ({ children }: { children: string }) => {
    return (
        <>
            <div id="node-information" className="flex flex-row gap-4">
                {children}
                <div id="chart-wrapper" className='w-[40vw]'>
                    <LineChart height={100} />
                </div>
            </div>
        </>
    )
}

const Button = ({ href }: { href: string }) => {
    return (
        <>
            <div id="button-wrapper" >
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

