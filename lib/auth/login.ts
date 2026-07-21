import 'server-only';
import { LoginInput, LoginResult } from '@/types/api';
import { UserRepository } from '../repositories/user.repository';
import { verifyPassword } from '../password';

const userRepository = new UserRepository();

export async function login(input: LoginInput): Promise<LoginResult> {
    const existingUser = await userRepository.findByUsername(input.username);
    const $correctPassword = await verifyPassword(existingUser.password, input.password);

    if (existingUser && $correctPassword) {
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
