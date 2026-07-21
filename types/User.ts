export type User = {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type AuthUser = User & {
    password: string;
}