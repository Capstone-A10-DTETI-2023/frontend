import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

import useAuth from '@/hooks/useAuth';
import LoadingPage from '../templates/LoadingPage';

const PrivateRoute = (props: { children: ReactElement, protectedRoutes: Array<string> }) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    // Match url string
    const pathIsProtected = props.protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathIsProtected) {
            // Redirect route, you can point this to /login
            router.push('/auth/signin');
        }

        if (!isLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isLoading, isAuthenticated, pathIsProtected]);

    if ((isLoading || !isAuthenticated) && pathIsProtected) {
        return <LoadingPage />;
    }

    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;