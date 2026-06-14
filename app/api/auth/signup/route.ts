import { NextResponse } from 'next/server';
import { signupUser } from '@/lib/auth/signup';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  const result = await signupUser({ username, email, password });

  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'User created' }, { status: 201 });
}