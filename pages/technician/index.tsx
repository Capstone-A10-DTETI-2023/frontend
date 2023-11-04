import { useRouter } from "next/router";
import { useEffect } from "react";

const Technician = () => {
    const router = useRouter();

    useEffect(() => { router.push('/dashboard') }, []);

    return (
        <>
            Redirecting to dashboard..
        </>
    );
}

export default Technician;