import { useState, useEffect } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Checkbox,
    Button,
    SlideFade,
    useToast
} from "@chakra-ui/react";

import useUser from "@/hooks/useUser";
import useNotification from '@/hooks/useNotification';
import { Notification } from '@/types/Notification';

const MenuNotification = ({ children }: { children: JSX.Element }) => {

    const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
    const { user } = useUser();
    const { isLoading, error, updateNotifPref } = useNotification();
    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [error])

    const [payload, setPayload] = useState<Notification>(
        {
            email: false,
            whatsapp: false,
            firebase: false
        }
    );

    const firstPayload: Notification = { ...user?.notificationPref! } // copying value instead of referencing it

    // Check equality of first payload and payload every payload re-renders
    useEffect(() => {
        JSON.stringify(firstPayload) === JSON.stringify(payload) ? setIsValueChanged(false) : setIsValueChanged(true);
    }, [payload])

    // Set payload every user.notificationPref has got data from the server
    useEffect(() => {
        setPayload(
            {
                email: user?.notificationPref.email ?? false,
                whatsapp: user?.notificationPref.whatsapp ?? false,
                firebase: user?.notificationPref.firebase ?? false
            }
        );
    }, [user?.notificationPref.email, user?.notificationPref.firebase, user?.notificationPref.whatsapp]);

    const handleChangeNotifPrefs = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        await updateNotifPref({ payload, id: user?.id! });
    }

    return (
        <>
            <Menu>
                <MenuButton>
                    {children}
                </MenuButton>
                <MenuList px={2}>
                    <MenuItem _hover={{ bgColor: 'white' }} _focus={{ bgColor: 'white' }}>
                        <form onSubmit={handleChangeNotifPrefs}>
                            <div className="notification-menu-wrapper space-y-3 text-base" onClick={e => e.stopPropagation()}>
                                <h6 className="font-semibold text-lg">Notification Preferences</h6>
                                <div id="email" className='flex flex-row gap-2'>
                                    <Checkbox
                                        size={'lg'}
                                        isChecked={payload.email}
                                        onChange={(e) => {
                                            setPayload({ ...payload, email: !payload.email });
                                        }}
                                    />
                                    <p>Email: {user?.notificationPref.email}</p>
                                </div>
                                <div id="whatsapp" className='flex flex-row gap-2'>
                                    <Checkbox
                                        size={'lg'}
                                        isChecked={payload.whatsapp}
                                        onChange={(e) => {
                                            setPayload({ ...payload, whatsapp: !payload.whatsapp });
                                        }}
                                    />
                                    <p>WhatsApp: {user?.notificationPref.whatsapp}</p>
                                </div>
                                <div id="firebase" className='flex flex-row gap-2'>
                                    <Checkbox
                                        size={'lg'}
                                        isChecked={payload.firebase}
                                        onChange={(e) => {
                                            setPayload({ ...payload, firebase: !payload.firebase });
                                        }}
                                    />
                                    <p>Firebase: {user?.notificationPref.firebase}</p>
                                </div>
                                {isValueChanged &&
                                    <SlideFade in={isValueChanged} offsetY='-20px'>
                                        <div id="button-change-wrapper" className='space-x-1'>
                                            <Button
                                                bgColor={'blue.400'}
                                                color={'white'}
                                                loadingText="Saving.."
                                                isLoading={isLoading}
                                                type='submit'
                                                size={'sm'}
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                isLoading={isLoading}
                                                type='button'
                                                size={'sm'}
                                                variant={'outline'}
                                                onClick={(e) => {
                                                    setPayload({ ...firstPayload });
                                                    // setIsValueChanged(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </SlideFade>
                                }
                            </div>
                        </form>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}

export default MenuNotification;