import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import useAuth from "@/hooks/useAuth";
import NotificationPrefTag from "@/components/templates/notification/NotificationPrefTag";
const MenuNotification = ({ children }: { children: JSX.Element }) => {

    const router = useRouter();
    const { user } = useAuth();

    return (
        <>
            <Menu>
                <MenuButton>
                    {children}
                </MenuButton>
                <MenuList px={2}>
                    <MenuItem onClick={() => router.push('/notification')}>
                        <div className="notification-menu-wrapper space-y-3">
                            <h6 className="font-semibold text-lg">Notification Preferences</h6>
                            <p>Email: {user?.notificationPref.email ? <NotificationPrefTag variant="active" /> : <NotificationPrefTag variant="deactive" />}</p>
                            <p>WhatsApp: {user?.notificationPref.whatsapp ? <NotificationPrefTag variant="active" /> : <NotificationPrefTag variant="deactive" />}</p>
                            <p>Firebase: {user?.notificationPref.firebase ? <NotificationPrefTag variant="active" /> : <NotificationPrefTag variant="deactive" />}</p>
                        </div>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}

export default MenuNotification;