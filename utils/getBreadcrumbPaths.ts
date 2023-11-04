const getBreadcrumbPaths = (currentUrl: string) => {

    const segments = currentUrl.split('/').filter(Boolean);
    const breadcrumbs: Array<{ label: string, url: string }> = [];

    segments.reduce((accumulator, segment) => {
        const url = `${accumulator}/${segment}`;
        breadcrumbs.push({ label: segment, url });
        return url;
    }, '');

    return breadcrumbs;

}

export default getBreadcrumbPaths;