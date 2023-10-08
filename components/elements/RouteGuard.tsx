import { useRouter } from "next/router";
import { useState, type ReactNode, useEffect, Children } from "react";

import useAuth from "@/hooks/useAuth";

const RouteGuard = (props: { children: ReactNode }) => {

    const PUBLIC_URLS: Array<string> = ['/home', '/auth/signin'];

    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();

    const authChecker = (currentUrl: string) => {
        if (!isAuthenticated() && !PUBLIC_URLS.includes(currentUrl)) {
            setAuthorized(false);
            router.push('/auth/signin');
        }
        else {
            setAuthorized(true);
        }
    }

    const preventAccess = () => setAuthorized(false);

    useEffect(() => {

        authChecker(router.pathname);

        router.events.on('routeChangeStart', preventAccess);
        router.events.on('routeChangeComplete', authChecker);

        return () => {
            router.events.off('routeChangeStart', preventAccess);
            router.events.off('routeChangeComplete', authChecker);

        }
    }, [])

    return (
        <>
            {authorized && props.children}
        </>
    );
}

export default RouteGuard;