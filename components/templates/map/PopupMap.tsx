
import { memo } from 'react';
import LineChart from '@/components/templates/charts/LineChart';
import {
    Button as ChakraUIButton,
    Alert as ChakraUIAlert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

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

const Alert = () => {
    return (
        <>
            <ChakraUIAlert status='error'>
                <AlertIcon />
                <div id="alert-box">
                    <AlertTitle>Leakage Detected!</AlertTitle>
                    <AlertDescription>
                        A leakage detected in Node_4, Tap to see more details.
                    </AlertDescription>
                </div>
            </ChakraUIAlert>
        </>
    )
}

const Chart = () => {
    return (
        <>
            <div id="chart-wrapper" className='w-full'>
                <LineChart />
            </div>
        </>
    )
}

const Information = () => {
    return (
        <>
            <div id="popup-map-information" className='w-full flex flex-col space-y-3'>
                <Chart />
                <div id="sensor-information" className='flex gap-3 mx-auto'>
                    <p>pH: {0}</p>
                    <p>turbidity: {0}</p>
                    <p>temp: {0}</p>
                    <p>waterflow: {0}</p>
                </div>
            </div>
        </>
    )
}

const Button = () => {
    return (
        <>
            <ChakraUIButton width={'full'} paddingX={12} colorScheme='blue'>
                See Details
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