# Private Messaging Implementation

## Goal
Create a secure, local-first messaging system where users can chat 1-on-1.

## 1. Database Model (Already Created)
- `messages` table in SQLite (`senderId`, `receiverId`, `content`, `createdAt`).

## 2. Route Structure
- `/messages`: Inbox showing list of active conversations.
- `/messages/[userId]`: Chat view with a specific user.

## 3. Server Actions (`messages/+page.server.ts`)
- `send`: POST action to insert a new message into SQLite.
- `load`: Fetch recent conversations map (grouped by partner).

## 4. UI Components
- **InboxList**: Sidebar showing users you have chatted with.
- **ChatWindow**: Scrollable area with message bubbles (Right=Me, Left=Them).
- **MessageInput**: Text area + Send button.

## 5. Security
- Verify `session` exists locally.
- Ensure `senderId` matches the logged-in user (Server-side check).
