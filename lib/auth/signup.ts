import 'server-only';

import { SignupResult, SignupInput } from '@/types';
import { UserRepository } from '../repositories/user.repository';

const userRepository = new UserRepository();

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswordStrength(password: string): boolean {
    // Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function validateSignupInput(input: SignupInput): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    if (!input.username || !input.email || !input.password) {
        return { valid: false, errors: { ...errors, general: 'All fields are required' } };
    }

    if (input.username.length < 3) {
        return { valid: false, errors: { ...errors, username: 'Username must be at least 3 characters' } };
    }

    if (!validateEmail(input.email)) {
        return { valid: false, errors: { ...errors, email: 'Invalid email format' } };
    }

    if (!validatePasswordStrength(input.password)) {
        return { valid: false, errors: { ...errors, password: 'Password must be at least 8 characters with uppercase, lowercase, and numbers' } };
    }

    return { valid: true, errors: {} };
}

export async function signup(input: SignupInput): Promise<SignupResult> {
    // Validate
    const validation = validateSignupInput(input);
    if (!validation.valid) {
        return { 
            success: false, 
            message: 'Validation failed', 
            errors: validation.errors 
        };
    }

    // // Check if user exists
    const existingUsers = await userRepository.findByUsernameOrEmail(input.username, input.email);

    const existingUser = existingUsers[0] || null;
    if (existingUser) {
        return { 
            success: false, 
            message: 'Username or email already exists' 
        };
    }

    // // Hash password
    // const hashedPassword = await hash(input.password);

    const createdUser = await userRepository.createUser(input);

    return { 
        success: true, 
        message: 'User created successfully' 
    };
}