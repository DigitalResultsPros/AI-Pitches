import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 1. Users Sync (Mirrors Supabase Auth locally for Referencing)
export const users = sqliteTable('users', {
    id: text('id').primaryKey(), // UUID from Supabase
    email: text('email').notNull(),
    username: text('username'),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    role: text('role').default('member'), // founder, funder, member
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// 2. Credits Ledger
export const userCredits = sqliteTable('user_credits', {
    userId: text('user_id').references(() => users.id).primaryKey(),
    balance: integer('balance').default(0).notNull(),
    lastUpdated: integer('last_updated', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// 3. Private Messages
export const messages = sqliteTable('messages', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    senderId: text('sender_id').references(() => users.id).notNull(),
    receiverId: text('receiver_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    readAt: integer('read_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// 4. Forum Categories
export const forumCategories = sqliteTable('forum_categories', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    isAdminOnly: integer('is_admin_only', { mode: 'boolean' }).default(false),
});

// 5. Forum Posts
export const forumPosts = sqliteTable('forum_posts', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    categoryId: text('category_id').references(() => forumCategories.id).notNull(),
    authorId: text('author_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(), // Markdown
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});
