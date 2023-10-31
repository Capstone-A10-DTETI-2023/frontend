import { NextRouter } from "next/router";

export const pathIsTechnicianOnly = (url: string) => /\/technician/.test(url);
export const pathIsAdminOnly = (url: string) => /\/admin/.test(url);
export const pathIsForAuth = (url: string) => /\/auth/.test(url);