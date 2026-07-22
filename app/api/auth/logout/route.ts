import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
    await clearAuthCookies();

    return NextResponse.json(
        { message: "User has been logged out" },
        { status: 200 }
    );
}