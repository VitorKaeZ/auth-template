export interface UserDTO {
    id?: string,
    email: string,
    firstname: string,
    lastname: string ,
    password?: string | null,
    googleId?: string | null,
}
