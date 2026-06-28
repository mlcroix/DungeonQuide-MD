import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/lib/auth/signup';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await signup(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message, errors: result.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: result.message },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup route error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
