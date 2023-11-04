type Paths = {
    id: string,
    url: string;
    name: string,
    roles: Array<string>,
    authOnly: boolean,
    forNavbar: boolean
}

const PATHS: Array<Paths> =
    [
        {
            id: 'dashboard',
            url: '/dashboard',
            name: 'Dashboard',
            roles: ['user', 'technician', 'admin'],
            authOnly: true,
            forNavbar: true
        },
        {
            id: 'map',
            url: '/map',
            name: 'Map View',
            roles: ['user', 'technician', 'admin'],
            authOnly: false,
            forNavbar: true
        },
        {
            id: 'controls',
            url: '/technician/nodes',
            name: 'Nodes',
            roles: ['technician'],
            authOnly: true,
            forNavbar: true
        },
        {
            id: 'manageNodes',
            url: '/admin/nodes',
            name: 'Nodes',
            roles: ['admin'],
            authOnly: true,
            forNavbar: true
        },
        {
            id: 'manageUser',
            url: '/admin/manage-user',
            name: 'Manage User',
            roles: ['admin'],
            authOnly: true,
            forNavbar: true
        },
        {
            id: 'profile',
            url: '/profile',
            name: 'Profile',
            roles: ['user', 'technician', 'admin'],
            authOnly: true,
            forNavbar: false
        },
        {
            id: 'manageUser',
            url: '/notification',
            name: 'Manage User',
            roles: ['admin'],
            authOnly: true,
            forNavbar: false
        },

    ]