import { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from "@chakra-ui/react";
import {
    MdLogout
} from 'react-icons/md'
import { useRouter } from "next/router";

import AlertDialog from "@/components/templates/AlertDialog";
import useAuth from "@/hooks/useAuth";

const MenuProfile = ({ children }: { children: JSX.Element }) => {

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const router = useRouter();
    const { user, isLoading, signOut } = useAuth();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await signOut();
        await router.push('/auth/signin');
    }

    return (
        <>
            <Menu isLazy>
                <AlertDialog
                    title="Sign Out"
                    description="Are you sure want to sign out?"
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    onClick={handleSignOut}
                    isLoading={isLoading}
                />
                <MenuButton>
                    {children}
                </MenuButton>
                <MenuList px={2}>
                    <MenuItem onClick={() => router.push('/profile')}>
                        <div className="profile-menu-wrapper space-y-1">
                            <h6 className="font-semibold text-lg">Profile</h6>
                            <p>Name: {user?.name}</p>
                            <p>Role: {user?.role_name}</p>
                            <p>Email: {user?.email}</p>
                            <p>Phone Number: {user?.phone_num}</p>
                        </div>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem borderRadius={200} _hover={{ bgColor: 'red.500' }} bgColor={'red.400'} color={'white'} onClick={() => setIsDialogOpen(true)} icon={<MdLogout />}>
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}

export default MenuProfile;