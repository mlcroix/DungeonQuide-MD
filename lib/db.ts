import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

let db: any = null;

export function getDb() {
    if (!db) {
        const connection = mysql.createPool(process.env.DATABASE_URL!);
        db = drizzle(connection);
    }
    return db;
}