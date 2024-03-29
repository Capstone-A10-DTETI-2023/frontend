import {
    AlertDialog as ChakraUIAlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'
import { useRef } from 'react';

const AlertDialog = ({ title, description, isOpen, setIsOpen, isLoading, onClick }: { title: string, description: string, isOpen: boolean, setIsOpen: any, isLoading: boolean, onClick: any }) => {

    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <ChakraUIAlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
                motionPreset='slideInBottom'
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {description}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                isLoading={isLoading}
                                bgColor={'red.400'}
                                color={'white'}
                                _hover={{
                                    bgColor: 'red.500',
                                    color: 'white'
                                }}
                                onClick={() => {
                                    onClick();
                                    setIsOpen(false);
                                }}
                                ml={3}>
                                {title}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </ChakraUIAlertDialog>
        </>
    );
}

export default AlertDialog;