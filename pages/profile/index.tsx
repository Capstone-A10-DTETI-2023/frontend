import { Avatar } from "@chakra-ui/react";

import Breadcrumb from "@/components/templates/Breadcrumb";
import useUser from "@/hooks/useUser";

const Profile = () => {

    const { user } = useUser();

    return (
        <>
            <div className="breadcrumbs mb-6">
                <Breadcrumb />
            </div>
            <h3 className="font-bold text-3xl text-sky-700 mb-6">Profile</h3>
            <div id="profile-container" className="flex flex-col gap-4">
                <Avatar size={'xl'} name={user?.name} />
                <p className="font-bold text-2xl">{user?.name}</p>
                <div id="child-profile">
                    <p>Email: {user?.email}</p>
                    <p>Role: {user?.role_name}</p>
                    <p>Phone Number: {user?.phone_num}</p>
                </div>
            </div>
        </>
    );
}

export default Profile;