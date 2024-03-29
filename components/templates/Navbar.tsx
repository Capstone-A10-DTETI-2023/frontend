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
import { useEffect } from 'react'

import MenuProfile from "@/components/templates/auth/MenuProfile";
import MenuNotification from "@/components/templates/notification/MenuNotification";
import useUser from "@/hooks/useUser";

type NavbarItem = {
    id: string,
    url: string;
    label: string,
    roles: Array<string>,
    authOnly: boolean
}

const Navbar = () => {

    const router = useRouter();

    const { isLoading, user } = useUser();
    const userRole = user?.role_name

    const navbarItems: Array<NavbarItem> = [
        {
            id: 'dashboard',
            url: '/dashboard',
            label: 'Dashboard',
            roles: ['GENERAL USER', 'TEKNISI', 'SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'map',
            url: '/map',
            label: 'Map View',
            roles: ['GENERAL USER', 'TEKNISI', 'SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'controls',
            url: '/technician/nodes',
            label: 'Nodes',
            roles: ['TEKNISI'],
            authOnly: true
        },
        {
            id: 'manageNodes',
            url: '/superadmin/nodes',
            label: 'Nodes',
            roles: ['SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'manageSensor',
            url: '/superadmin/sensors',
            label: 'Sensors',
            roles: ['SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'manageUser',
            url: '/superadmin/manage-user',
            label: 'Manage User',
            roles: ['SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'actuatorAdmin',
            url: '/superadmin/actuator',
            label: 'Actuator',
            roles: ['SUPERADMIN'],
            authOnly: true
        },
        {
            id: 'actuatorTech',
            url: '/technician/actuator',
            label: 'Actuator',
            roles: ['TEKNISI'],
            authOnly: true
        },
        {
            id: 'syssettingAdmin',
            url: '/superadmin/syssetting',
            label: 'System Setting',
            roles: ['SUPERADMIN'],
            authOnly: true
        },
    ];

    return (
        <>
            {!isLoading &&
                <div className="transition-all w-full fixed z-[45] top-0 left-0 right-0 bg-white shadow-md">
                    <ul className="w-full container mx-auto flex flex-row font-semibold text-sm justify-between items-center">
                        <li className="text-lg font-extrabold py-4" >
                            <Link href={'/'}>HydroGuard</Link>
                        </li>
                        <li className="flex items-center space-x-8">
                            {navbarItems && navbarItems
                                ?.filter((navbarItem) => (navbarItem.authOnly && navbarItem.roles.includes(userRole ?? 'USER')))
                                ?.map((navbarItem) =>
                                    <Link className={`text-center py-4 h-full min-w-max ${router.pathname.includes(navbarItem.url) && 'font-bold text-sky-600 underline underline-offset-8'}`} key={navbarItem?.id} href={navbarItem?.url}>{navbarItem?.label}</Link>
                                )}

                            {user ?
                                <>
                                    <div className="notification py-4">
                                        <MenuNotification>
                                            <div className="relative cursor-pointer">
                                                <div className="absolute top-0 -right-2 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full outline outline-2 outline-white">
                                                    <p className="text-white text-sm">{3}</p>
                                                </div>
                                                <Icon color={'blue.600'} fontSize={32} as={MdNotifications} />
                                            </div>
                                        </MenuNotification>
                                    </div>
                                    <div className="profile relative py-4 ">
                                        <div className="icon-wrapper w-fit h-fit rounded-full active:outline outline-sky-300 transition-all">
                                            <MenuProfile>
                                                <Icon color={'blue.600'} fontSize={36} as={MdAccountCircle} />
                                            </MenuProfile>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <Link className={`text-center py-4 h-full min-w-max ${router.pathname.includes('docs') && 'font-bold text-sky-600 underline underline-offset-8'}`} href={'/docs'}>Docs</Link>
                                    <div id="button-wrapper" aria-label="To Sign In" className="w-fit py-4">
                                        <Button colorScheme='blue'><Link href={'/auth/signin'}>Sign In</Link></Button>
                                    </div>
                                </>
                            }
                        </li>
                    </ul>
                </div>
            }
        </>
    );
}

export default Navbar;