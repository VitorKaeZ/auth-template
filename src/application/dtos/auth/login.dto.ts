export interface LoginRequestDTO {
    email: string,
    password: string
}

export interface LoginResponseDTO {
    id: string | undefined,
    email: string,
    firstname: string,
    lastname: string,
    token: string,
}
