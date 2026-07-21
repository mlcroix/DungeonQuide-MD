import { hash, verify } from 'argon2';

export async function hashPassword(password: string) {
    return await hash(password);
}

export async function verifyPassword(hash: string, password: string) {
    return await verify(hash, password);
}
