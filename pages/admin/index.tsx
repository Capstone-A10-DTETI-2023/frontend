import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = () => {
    const router = useRouter();

    useEffect(() => { router.push('/dashboard') }, []);

    return (
        <>
            Redirecting to dashboard..
        </>
    );
}

export default Admin;