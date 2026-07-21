import { User } from "./User";

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string>;
}

export interface SignupResponse {
    user?: {
        id: number;
        username: string;
        email: string;
        createdAt: Date;
    };
}

export interface SignupInput {
    username: string;
    email: string;
    password: string;
}

export interface SignupResult {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
    data?: {
        user: {
            id: number;
            username: string;
            email: string;
            createdAt: Date;
        };
    };
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginResult {
    success: boolean;
    message: string;
    user: User | null;
    errors?: Record<string, string>;
}