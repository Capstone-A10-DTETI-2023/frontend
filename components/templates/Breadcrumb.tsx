import {
    Breadcrumb as ChakraUIBreadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Icon
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { MdOutlineKeyboardArrowRight, MdHome } from 'react-icons/md';
import getBreadcrumbPaths from '@/utils/getBreadcrumbPaths';

const Breadcrumb = () => {
    const router = useRouter();
    const currentUrl = router.pathname;
    const breadcrumbs = getBreadcrumbPaths(
        !!router.query.node_id ? currentUrl.replace('[node_id]', `${router.query.node_id}`) : currentUrl // to check whether it is dynamic link or not
    );

    return (
        <>
            <ChakraUIBreadcrumb spacing='8px' separator={<MdOutlineKeyboardArrowRight className='text-gray-400' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'><div className="icon-wrapper h-full flex justify-end"><Icon boxSize={6} as={MdHome} /></div></BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs && breadcrumbs.map((breadcrumb) =>
                    <BreadcrumbItem key={breadcrumb.url}>
                        <BreadcrumbLink href={breadcrumb?.url}>{breadcrumb?.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </ChakraUIBreadcrumb>
        </>
    );
}

export default Breadcrumb;