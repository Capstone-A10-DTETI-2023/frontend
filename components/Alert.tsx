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
                <AlertTitle>There was an error processing your request</AlertTitle>
                <AlertDescription>{children}</AlertDescription>
            </Alert>
        </>
    );
}

export default {
    Error: memo(Error)
};