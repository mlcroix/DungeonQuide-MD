

import * as jose from 'jose';
import { cookies } from 'next/headers';
import { User } from '@/types/User';

function generateSessionToken(userId: string): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
    const token = new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('14d') // Token valid for 14 days
        .sign(secret);

    return token;
}

export async function generateSessionCookie(user: User) {// 2. Generate a secure session token (JWT or random string)
    const cookieStore = await cookies();
    const token = await generateSessionToken(String(user.id)); // e.g., using `jose` or `crypto`

    // Set the login token (HttpOnly for security)
    cookieStore.set('auth_token', token, {
        httpOnly: true,   // Not accessible via JavaScript (prevents XSS)
        secure: process.env.NODE_ENV === 'production', // ✅ HTTPS only in production
        maxAge: 60 * 60 * 24 * 14, // 14 days
        path: '/',
        sameSite: 'lax',   // Protects against CSRF
    });
}

export async function generateUserCookie(user: User) {
    const cookieStore = await cookies();
    // Set the user data cookie (not HttpOnly so client can read it)
    cookieStore.set('user_data', JSON.stringify(user), {
        httpOnly: false,  // Accessible via JavaScript
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 14,
        path: '/',
        sameSite: 'lax',
    });
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    // Clear the login token cookie
    cookieStore.set('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
    });
    
    // Clear the user data cookie
    cookieStore.set('user_data', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
    });
}