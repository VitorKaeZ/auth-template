export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface UserCreate {
    email: string;
    firstname: string;
    lastname: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
}