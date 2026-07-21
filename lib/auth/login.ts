import 'server-only';
import { LoginInput, LoginResult } from '@/types/api';
import { UserRepository } from '../repositories/user.repository';
import { verifyPassword } from '../password';
import { AuthUser } from '@/types/User';

const userRepository = new UserRepository();

export async function login(input: LoginInput): Promise<LoginResult> {
    const existingUser = await userRepository.findByUsername(input.username, true) as AuthUser;

    // check if user exist
    if (existingUser) {
        // verify password
        const $correctPassword = await verifyPassword(existingUser.password, input.password);
        if ($correctPassword) {
            return { 
                success: true, 
                message: 'successful login',
                user: existingUser
            };
        }
    }

    return {
        success: false,
        message: 'incorrect username or password',
        user: null
    }
}
