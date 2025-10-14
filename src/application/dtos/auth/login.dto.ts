export interface LoginRequestDTO {
    email: string,
    password: string
}

export interface LoginResponseDTO {
    message: string,
    token: string,
}
