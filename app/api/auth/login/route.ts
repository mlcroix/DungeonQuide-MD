import { login } from '@/lib/auth/login';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { generateSessionCookie, generateUserCookie } from '@/lib/cookies';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;
        const result = await login({ username, password });

        if (!result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: 400 }
            );
        }

        if (result.user) {
            await generateSessionCookie(result.user);
            await generateUserCookie(result.user);    
        } else {
            throw new Error('User data is missing in the login result.');
        }

        return NextResponse.json(
            { message: result.message },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
