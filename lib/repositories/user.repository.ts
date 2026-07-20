import { getDb } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, or, and } from 'drizzle-orm';

const db = getDb();

export class UserRepository {
    async findByUsernameOrEmail(username: string, email: string) {
        const existingUsers = await db.select()
            .from(users)
            .where(
                or(
                    eq(users.username, username),
                    eq(users.email, email)
                )
            )
            .limit(1);

        return existingUsers[0] || null;
    }

    async findByUsernameAndPassword(username: string, password: string) {
        const existingUsers = await db.select()
            .from(users)
            .where(
                and(
                    eq(users.username, username),
                    eq(users.password, password)
                )
            )
            .limit(1);
            
        return existingUsers[0] || null;
    }

    async createUser(input: { username: string; email: string; password: string }) {
        const createdUser = await db.insert(users)
            .values(input);
            
        return createdUser;
    }
}
