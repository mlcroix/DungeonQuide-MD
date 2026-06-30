import 'server-only';

import type { NextApiRequest, NextApiResponse } from 'next'
import { SignupResult } from '@/types';
import { getDb } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

const db = getDb();

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
    const existingUsers = await db.select()
                                .from(users)
                                .where(
                                    or(
                                        eq(users.username, input.username),
                                        eq(users.email, input.email)
                                    )
                                )
                                .limit(1);

    const existingUser = existingUsers[0] || null;
    if (existingUser) {
        return { 
            success: false, 
            message: 'Username or email already exists' 
        };
    }

    // // Hash password
    // const hashedPassword = await hash(input.password);

    const createdUser = await db.insert(users)
                                .values(input);

    return { 
        success: true, 
        message: 'User created successfully' 
    };
}