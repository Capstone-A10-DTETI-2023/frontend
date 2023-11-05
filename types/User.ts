export type User = {
    id: number;
    role_id: number;
    role_name: string;
    email: string;
    name: string;
    phone_num: string;
    accessToken: string;
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

// export type User = {
//     id: number;
//     role_id: number;
//     name: string;
//     email: string;
//     phone_num: string;
// }
