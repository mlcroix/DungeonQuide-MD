import 'server-only';
import { LoginInput, LoginResult } from '@/types/api';
import { UserRepository } from '../repositories/user.repository';

const userRepository = new UserRepository();

export async function login(input: LoginInput): Promise<LoginResult> {
    // // Check if user exists
    const existingUser = await userRepository.findByUsernameAndPassword(input.username, input.password);

    if (existingUser) {
        return { 
            success: true, 
            message: 'successful login' 
        };
    } else {
        return {
            success: false,
            message: 'incorrect username or password'
        }
    }
}
