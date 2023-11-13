export type User = {
    id: number;
    role_id: number;
    role_name: string;
    email: string;
    name: string;
    phone_num: string;
    accessToken: string;
    notificationPref: {
        email: boolean;
        whatsapp: boolean;
        firebase: boolean;
    }
}

export type SignInPayload = {
    email: string;
    password: string;
}

export type SignUpPayload = {
    name: string;
    email: string;
    phone_num: string;
}

export type ResetPasswordPayload = {
    username: string;
    phone_num: string;
}

export type UserPayload = {
    Name: string,
    RoleID: number,
    Email: string,
    Phone_Num: string,
    Password: string
}
