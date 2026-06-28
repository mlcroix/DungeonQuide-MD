import {
  mysqlTable,
  int,
  varchar,
  datetime,
  boolean,
  primaryKey,
  text,
} from 'drizzle-orm/mysql-core'
import { relations, sql } from 'drizzle-orm'

/* =========================================================
   USERS
========================================================= */
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

/* =========================================================
   CAMPAIGNS
========================================================= */
export const campaigns = mysqlTable('campaigns', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  dungeonMasterId: int('dungeon_master_id').notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

/* =========================================================
   CAMPAIGN PLAYERS (junction)
========================================================= */
export const campaignPlayers = mysqlTable(
  'campaign_players',
  {
    campaignId: int('campaign_id').notNull(),
    userId: int('user_id').notNull(),
    joinedAt: datetime('joined_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    characterName: varchar('character_name', { length: 255 }),
    role: varchar('role', { length: 50 }).default('player').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.campaignId, table.userId] }),
  })
);

/* =========================================================
   SESSIONS
========================================================= */
export const sessions = mysqlTable('sessions', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  campaignId: int('campaign_id').notNull(),
  startDate: datetime('start_date').notNull(),
  endDate: datetime('end_date').notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

/* =========================================================
   SESSION ATTENDEES (junction)
========================================================= */
export const sessionAttendees = mysqlTable(
  'session_attendees',
  {
    sessionId: int('session_id').notNull(),
    userId: int('user_id').notNull(),
    joinedAt: datetime('joined_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    attended: boolean('attended').default(true).notNull(),
    role: varchar('role', { length: 50 }).default('player').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sessionId, table.userId] }),
  })
);

/* =========================================================
   SESSION SUMMARY
========================================================= */
export const sessionSummaries = mysqlTable('session_summaries', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  sessionId: int('session_id').notNull().unique(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

/* =========================================================
   RELATIONS
========================================================= */
export const usersRelations = relations(users, ({ many }) => ({
  campaignsAsDM: many(campaigns),
  campaignPlayers: many(campaignPlayers),
  sessionAttendees: many(sessionAttendees),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  dungeonMaster: one(users, {
    fields: [campaigns.dungeonMasterId],
    references: [users.id],
  }),
  players: many(campaignPlayers),
  sessions: many(sessions),
}));

export const campaignPlayersRelations = relations(campaignPlayers, ({ one }) => ({
  user: one(users, {
    fields: [campaignPlayers.userId],
    references: [users.id],
  }),
  campaign: one(campaigns, {
    fields: [campaignPlayers.campaignId],
    references: [campaigns.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [sessions.campaignId],
    references: [campaigns.id],
  }),
  attendees: many(sessionAttendees),
  summary: one(sessionSummaries, {
    fields: [sessions.id],
    references: [sessionSummaries.sessionId],
  }),
}));

export const sessionAttendeesRelations = relations(sessionAttendees, ({ one }) => ({
  session: one(sessions, {
    fields: [sessionAttendees.sessionId],
    references: [sessions.id],
  }),
  user: one(users, {
    fields: [sessionAttendees.userId],
    references: [users.id],
  }),
}));

export const sessionSummariesRelations = relations(sessionSummaries, ({ one }) => ({
  session: one(sessions, {
    fields: [sessionSummaries.sessionId],
    references: [sessions.id],
  }),
}));