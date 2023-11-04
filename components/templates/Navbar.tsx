import Link from "next/link";
import { useRouter } from "next/router";
import {
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Button,
    IconButton
} from "@chakra-ui/react";
import {
    MdSearch,
    MdAccountCircle,
    MdNotifications
} from 'react-icons/md'

import useAuth from "@/hooks/useAuth";

type NavbarItem = { id: string, url: string; label: string, roles: Array<string> }

const Navbar = () => {

    const { isLoading, getRole } = useAuth();
    const router = useRouter();
    const role = getRole();

    const navbarItems: Array<NavbarItem> = [
        {
            id: 'dashboard',
            url: '/dashboard',
            label: 'Dashboard',
            roles: ['user', 'technician', 'admin']
        },
        {
            id: 'map',
            url: '/map',
            label: 'Map View',
            roles: ['user', 'technician', 'admin']
        },
        {
            id: 'controls',
            url: '/technician/nodes',
            label: 'Nodes',
            roles: ['technician']
        },
        {
            id: 'manageNodes',
            url: '/admin/nodes',
            label: 'Nodes',
            roles: ['admin']
        },
        {
            id: 'manageUser',
            url: '/admin/manage-user',
            label: 'Manage User',
            roles: ['admin']
        },

    ];
    return (
        <>
            <div className="transition-all w-full fixed z-[99999999999] top-0 left-0 right-0 bg-white shadow-md">
                <ul className="w-full container mx-auto flex flex-row font-semibold text-sm justify-between items-center">
                    <li className="text-lg font-extrabold py-4" >
                        <Link href={'/'}>A10</Link>
                    </li>
                    <li className="flex items-center space-x-8">
                        {navbarItems && navbarItems
                            ?.filter((navbarItem) => navbarItem.roles.includes(role ?? 'user'))
                            ?.map((navbarItem) =>
                                <Link className={`text-center py-4 h-full min-w-max ${navbarItem.url === router.pathname && 'font-bold text-sky-600 underline underline-offset-8'}`} key={navbarItem?.id} href={navbarItem?.url}>{navbarItem?.label}</Link>
                            )}
                        <InputGroup>
                            <Input placeholder='Search your node here..' />
                            <InputRightElement>
                                <Icon as={MdSearch} />
                            </InputRightElement>
                        </InputGroup>

                        <div id="button-wrapper" className="w-fit py-4">
                            <Button colorScheme='blue'>Search</Button>
                        </div>

                        <div className="notification-wrapper py-4">
                            <div className="relative cursor-pointer">
                                <div className="absolute top-0 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full outline outline-2 outline-white">
                                    <p className="text-white text-sm">{3}</p>
                                </div>
                                <IconButton
                                    className="relative -z-10"
                                    isRound={true}
                                    variant={'ghost'}
                                    colorScheme='blue'
                                    aria-label='Account'
                                    fontSize={32}
                                    icon={<MdNotifications />}
                                />
                            </div>
                        </div>

                        <div className="profile-wrapper py-4">
                            <IconButton
                                isRound={true}
                                variant={'ghost'}
                                colorScheme='blue'
                                aria-label='Account'
                                fontSize={36}
                                icon={<MdAccountCircle />}
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;