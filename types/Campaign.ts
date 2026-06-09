import { User } from "./User";

export type Campaign = {
    id: number;
    name: string;
    dungeonMaster: User;
    createdAt: Date;
    updatedAt: Date;
};

export type CampaignPlayer = {
    id: number;
    campaign: Campaign;
    user: User;
    characterName: string | null; 
    role: string;
    joinedAt: Date;
    updatedAt: Date;
};