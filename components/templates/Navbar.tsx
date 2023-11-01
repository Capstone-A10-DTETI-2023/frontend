import Link from "next/link";
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

type NavbarItem = { id: string, url: string; name: string, roles: Array<string> }

const Navbar = () => {

    const { isLoading, getRole } = useAuth();
    const role = getRole();

    const navbarItems: Array<NavbarItem> = [
        {
            id: 'dashboard',
            url: '/dashboard',
            name: 'Dashboard',
            roles: ['user', 'technician', 'admin']
        },
        {
            id: 'map',
            url: '/map',
            name: 'Map View',
            roles: ['user', 'technician', 'admin']
        },
        {
            id: 'controls',
            url: '/technician/controls',
            name: 'Controls',
            roles: ['technician']
        },
        {
            id: 'adminControls',
            url: '/admin/admin-controls',
            name: 'Controls',
            roles: ['admin']
        },
        {
            id: 'manageNodes',
            url: '/admin/manage-nodes',
            name: 'Manage Nodes',
            roles: ['admin']
        },
        {
            id: 'manageUser',
            url: '/admin/manage-user',
            name: 'Manage User',
            roles: ['admin']
        },

    ];
    return (
        <>
            <div className="w-full fixed z-[99999999999] top-0 left-0 right-0 bg-white p-4 shadow">
                <ul className="w-full container mx-auto flex flex-row font-semibold text-sm justify-between items-center">
                    <li className="text-lg font-extrabold" >
                        <Link href={'/'}>A10</Link>
                    </li>
                    <li className="flex items-center space-x-8">
                        {navbarItems && navbarItems
                            ?.filter((navbarItem) => navbarItem.roles.includes(role ?? 'user'))
                            ?.map((navbarItem) =>
                                <Link className="text-gray-800 text-center min-w-max" key={navbarItem?.id} href={navbarItem?.url}>{navbarItem?.name}</Link>
                            )}
                        <InputGroup>
                            <Input placeholder='Search your node here..' />
                            <InputRightElement>
                                <Icon as={MdSearch} />
                            </InputRightElement>
                        </InputGroup>

                        <Button width={'fit-content'} paddingX={12} colorScheme='blue'>Search</Button>

                        <div className="notification-wrapper">
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

                        <div className="profile-wrapper">
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