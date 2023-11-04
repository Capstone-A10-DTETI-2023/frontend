import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

import useAuth from '@/hooks/useAuth';
import { pathIsTechnicianOnly, pathIsAdminOnly, pathIsForAuth } from '@/utils/urlChecker';
import LoadingPage from '../templates/LoadingPage';

const ProtectedRouteProvider = (props: { children: ReactElement, protectedRoutes: Array<string> }) => {
    const router = useRouter();
    const { isLoading, getRole } = useAuth();
    const userRole = getRole();

    // Match url string
    const pathIsProtected = props.protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('user');

        if (!isLoading && !isAuthenticated && pathIsProtected) {
            router.push('/auth/signin');
        }

        if (!isLoading && isAuthenticated && pathIsForAuth(router.pathname)) {
            router.push('/dashboard');
        }

        if ((!(userRole === 'admin') && pathIsAdminOnly(router.pathname)) || (!(userRole === 'technician') && pathIsTechnicianOnly(router.pathname))) {
            router.push('/access-denied');
        }

    }, [isLoading, pathIsProtected, pathIsForAuth, pathIsAdminOnly(router.pathname), pathIsTechnicianOnly(router.pathname)]);

    return (
        <>
            {isLoading && pathIsProtected && <LoadingPage>Loading Page..</LoadingPage>}
            {props.children}
        </>
    );
}

export default ProtectedRouteProvider;