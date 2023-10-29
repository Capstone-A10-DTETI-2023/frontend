import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

import useAuth from '@/hooks/useAuth';
import LoadingPage from '../templates/LoadingPage';

const ProtectedRouteProvider = (props: { children: ReactElement, protectedRoutes: Array<string> }) => {
    const router = useRouter();
    const { isAuthenticated, isLoading, getRole } = useAuth();
    const userRole = getRole();

    // Match url string
    const pathIsProtected = props.protectedRoutes.indexOf(router.pathname) !== -1;
    const pathIsTechnicianOnly = /\/technician/.test(router.pathname);
    const pathIsAdminOnly = /\/admin/.test(router.pathname);
    const pathIsForAuth = /\/auth/.test(router.pathname);

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathIsProtected) {
            router.push('/auth/signin');
        }

        if (!isLoading && isAuthenticated && pathIsForAuth) {
            router.push('/dashboard');
        }

        if ((!(userRole === 'admin') && pathIsAdminOnly) || (!(userRole === 'technician') && pathIsTechnicianOnly)) {
            router.push('/access-denied');
        }

    }, [isLoading, isAuthenticated, pathIsProtected, pathIsForAuth, pathIsAdminOnly, pathIsTechnicianOnly]);



    return (
        <>
            {(isLoading || !isAuthenticated) && pathIsProtected && <LoadingPage />}
            {props.children}
        </>
    );
}

export default ProtectedRouteProvider;