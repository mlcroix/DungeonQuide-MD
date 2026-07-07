import 'server-only';
import { LoginInput, LoginResult } from '@/types/api';
import { getDb } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const db = getDb();

export async function login(input: LoginInput): Promise<LoginResult> {
    // // Check if user exists
    const existingUsers = await db.select()
                                .from(users)
                                .where(
                                    and(
                                        eq(users.username, input.username),
                                        eq(users.password, input.password)
                                    )
                                )
                                .limit(1);

    const existingUser = existingUsers[0] || null;
    if (existingUser) {
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