export const pathIsTechnicianOnly = (url: string) => /\/technician/.test(url);
export const pathIsAdminOnly = (url: string) => /\/superadmin/.test(url);
export const pathIsForAuth = (url: string) => /\/auth/.test(url);