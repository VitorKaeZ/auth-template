export interface UserData {
    id?: string,
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface UserDataLoginRequest {
    email: string;
    password: string
}
export interface UserDataLoginResponse {
    id: string | undefined,
    email: string;
    firstname: string;
    lastname: string;
    token: string;
}
export interface UserDataCreateResponse {
    email: string;
    firstname: string;
    lastname: string;
}