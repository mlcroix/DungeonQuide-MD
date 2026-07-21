import { getDb } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, or, getTableColumns } from 'drizzle-orm';
import { User } from '@/types';
import { AuthUser } from '@/types/User';

const db = getDb();

function getSafeColumns() {
  const { password, ...safeColumns } = getTableColumns(users);
  return safeColumns;
}

export class UserRepository {
    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        const existingUsers = await db.select(getSafeColumns())
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

    async findByUsername(username: string, getPassword: boolean = false): Promise<User | AuthUser | null> {
        const columns = (getPassword) ? getTableColumns(users) : getSafeColumns();
        const existingUser = await db.select(columns)
            .from(users)
            .where(
                eq(users.username, username)
            )
            .limit(1);
            
        return existingUser[0] || null;
    }

    async createUser(input: { username: string; email: string; password: string }): Promise<User> {
        const createdUser = await db.insert(users)
            .values(input);
            
        return createdUser;
    }
}
