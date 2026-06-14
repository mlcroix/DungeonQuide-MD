import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export interface SignupInput {
    username: string;
    email: string;
    password: string;
}

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

export async function signupUser(input: SignupInput): Promise<{ success: boolean; message: string }> {
    const validation = validateSignupInput(input);
    if (!validation.valid) {
        return { success: false, message: Object.values(validation.errors).join(', ') };
    }

    // Check if the username or email already exists
    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { username: input.username },
                { email: input.email }
            ]
        }
    });

    if (existingUser) {
        return { success: false, message: 'Username or email already exists' };
    }

    // Create the new user
    await db.user.create({
        data: {
            username: input.username,
            email: input.email,
            password: input.password // In a real application, make sure to hash the password before storing it
        }
    });

    return { success: true, message: 'User created successfully' };
}