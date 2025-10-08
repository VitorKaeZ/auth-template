import { IUserRepository } from '../../../domain/repositories/user/IUserRepository'

import bcrypt from 'bcryptjs'
import { RegisterUserOnDatabase } from './register-user-on-database'
import { UserDTO } from '../../dtos/user/user.dto'
import { EmailAlreadyExistsError } from '../errors/email-exists-error'
import { InvalidNameError } from '../../../domain/entities/user/errors/invalid.name'
import { InvalidEmailError } from '../../../domain/entities/user/errors/invalid.email'
import { InvalidPasswordError } from '../../../domain/entities/user/errors/invalid.password'

jest.mock('bcryptjs')

describe('RegisterUserOnDatabase UseCase', () => {
    let userRepository: jest.Mocked<IUserRepository>
    let registerUser: RegisterUserOnDatabase

    beforeEach(() => {
        userRepository = {
            exists: jest.fn(),
            create: jest.fn(),
            findAllUsers: jest.fn(),
            findUserByEmail: jest.fn(),
            updatePassword: jest.fn(),
            findUserByGoogleId: jest.fn(),
            count: jest.fn(), // Add count mock
        }

        registerUser = new RegisterUserOnDatabase(userRepository)
    })

    it('should create the first user as ADMIN if no other users exist', async () => {
        const userData: UserDTO = { firstname: 'Admin', lastname: 'User', email: 'admin@example.com', password: 'ValidPassword123' };
        const hashedUserData = { ...userData, password: 'hashed_password' };
        delete hashedUserData.roles; // Ensure roles property is not in the object passed to create

        userRepository.count.mockResolvedValue(0); // No users exist
        userRepository.exists.mockResolvedValue(false);
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

        const result = await registerUser.registerUserOnDatabase(userData);

        expect(result.isRight()).toBe(true);
        expect(userRepository.count).toHaveBeenCalledTimes(1);
        expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({ email: 'admin@example.com' }), 'ADMIN');
    });

    it('should create a subsequent user as USER if other users already exist', async () => {
        const userData: UserDTO = { firstname: 'Normal', lastname: 'User', email: 'user@example.com', password: 'ValidPassword123' };
        const hashedUserData = { ...userData, password: 'hashed_password' };
        delete hashedUserData.roles; // Ensure roles property is not in the object passed to create

        userRepository.count.mockResolvedValue(1); // One user already exists
        userRepository.exists.mockResolvedValue(false);
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

        const result = await registerUser.registerUserOnDatabase(userData);

        expect(result.isRight()).toBe(true);
        expect(userRepository.count).toHaveBeenCalledTimes(1);
        expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({ email: 'user@example.com' }));
        // Note: We are not checking for the second argument, which means it should be undefined (the default)
    });

    it('should return an error when trying to register a user with an existing email', async () => {
        const userData: UserDTO = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'ValidPassword123',
        }


        userRepository.exists.mockResolvedValue(true)


        const result = await registerUser.registerUserOnDatabase(userData)

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(EmailAlreadyExistsError)
    })

    it('should return invalid name validation error', async () => {
        const invalidUserData: UserDTO = {
            firstname: 'J',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'ValidPassword123'
        }


        const result = await registerUser.registerUserOnDatabase(invalidUserData)


        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidNameError)
    })

it('should return invalid email validation error', async () => {
        const invalidUserData: UserDTO = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'invalid-email',
            password: 'ValidPassword123'
        }


        const result = await registerUser.registerUserOnDatabase(invalidUserData)

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidEmailError)
    })

    it('should return invalid password validation error', async () => {
        const invalidUserData: UserDTO = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: '123'
        }

        const result = await registerUser.registerUserOnDatabase(invalidUserData)

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidPasswordError)
    })
})