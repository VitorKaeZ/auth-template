export interface OAuthUserDTO {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    picture?: string;
    token?: string;
    googleId?: string;
}

export interface OAuthUserResponseDTO {
    id: string;
    googleId?: string | null
    email: string;
    firstname: string;
    lastname: string;
}
