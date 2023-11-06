import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import { memo } from "react";

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
                        Contact technician for any further mitigation
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