import { Campaign } from "./Campaign";
import { User } from "./User";

export type Session = {
    id: number;
    name: string;
    campaign: Campaign;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    updatedAt: Date;
};

export type SessionAttendee = {
    id: number;
    user: User;
    session: Session;
    attended: boolean;
    role: string;
    joinedAt: Date;
    updatedAt: Date;
};

export type SessionSummary = {
    id: number;
    title: string;
    content: string;
    session: Session;
    createdAt: Date;
    updatedAt: Date;
};