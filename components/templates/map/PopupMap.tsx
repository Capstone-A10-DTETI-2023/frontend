
import { memo } from 'react';
import Link from 'next/link';
import {
    Button as ChakraUIButton,
    Alert as ChakraUIAlert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { SensorData } from '@/types/Sensor';

import LineChart from '@/components/templates/charts/LineChart';

const Container = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    return (
        <>
            <div id='popup-map-container' className="flex flex-col space-y-4 min-w-fit w-72">
                {children}
            </div>
        </>
    );
}

const Title = ({ children }: { children: string }) => {
    return (
        <>
            <p className="font-bold text-lg">
                {children}
            </p>
        </>
    )
}

const Alert = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <>
            <ChakraUIAlert status='error'>
                <AlertIcon />
                <div id="alert-box">
                    <AlertTitle>Leakage Detected!</AlertTitle>
                    <AlertDescription>
                        {children}
                    </AlertDescription>
                </div>
            </ChakraUIAlert>
        </>
    )
}

const Information = ({ chartData }: { chartData: SensorData }) => {
    return (
        <>
            <div id="popup-map-information" className='w-full flex flex-col space-y-3'>
                <div id="chart-wrapper" className='w-full mx-auto'>
                    <LineChart height={200} width='100%' name='Pressure' data={chartData} />
                </div>
                <div id="sensor-information" className='flex gap-3 mx-auto'>
                    -
                </div>
            </div>
        </>
    )
}

const Button = ({ href }: { href: string }) => {
    return (
        <>
            <ChakraUIButton width={'full'} paddingX={12} colorScheme='blue'>
                <Link href={href}>
                    <p className='text-white'>See Details</p>
                </Link>
            </ChakraUIButton>
        </>
    )
}

export default {
    Container: memo(Container),
    Title: memo(Title),
    Alert: memo(Alert),
    Information: memo(Information),
    Button: memo(Button)
};