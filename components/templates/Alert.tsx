import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { memo } from "react";
import Link from 'next/link'

const Error = ({ children }: { children: string }) => {
    return (
        <>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{children}</AlertDescription>
            </Alert>
        </>
    );
}

const LeakageDetected = ({ children }: { children: string }) => {
    return (
        <>
            <Alert status='error' variant='top-accent'>
                <AlertIcon />
                <div className="flex flex-col">
                    <AlertTitle className="text-lg">Leakage Detected!</AlertTitle>
                    <AlertDescription>
                        {children}
                    </AlertDescription>
                    <AlertDescription>
                        <Link href={'/'}>Send notification to technician for any further mitigation</Link>
                    </AlertDescription>
                </div>
            </Alert>
        </>
    );
}

export default {
    Error: memo(Error),
    LeakageDetected: memo(LeakageDetected)
};