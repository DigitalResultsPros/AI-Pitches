# AI-Pitches Specification

## 1. Overview
...

## 4. Key Features

### Public Zone
- **Modular Landing Page**:
    - **V1 (Classic)**: Standard hero section with Threlte Starfield background.
    - **V2 (Futuristic)**: High-impact glassmorphic design with Floating Geometric Crystal 3D background.
    - User/Dev can toggle between versions via UI Switcher.
- **Blog**:
    - Markdown-based content rendering (using `marked` + Tailwind Typography).
    - Database-driven (`posts` table in Supabase).

### Authentication
- **Supabase Auth**: Email/Password login.
- **Role-Based Access**:
    - `founder`: Can create pitches (future).
    - `funder`: Can view pitches (future).
- **Profile Management**: `profiles` table automatically synced via Triggers.

### Dashboard & Asset Control
- **Core Operations**: Centralized HUD for identity and neural match telemetry.
- **Asset Control (Admin)**: Restricted interface for manual node credit adjustment (`/admin/credits`).
- **Persistent Ledger**: Credits stored in local SQLite; synchronized with platform actions.

### Identity Registry
- **Modify Registry**: High-tech form suite for updating full names, sector roles, and aliases.
- **Dual-Registry Sync**: Atomic updates to Supabase Cloud and Local SQLite layers.

### Community & Comms
- **The Nexus**: Categorized discussion channels with glowing class-panel UI.
- **Comms Deck**: High-bandwidth P2P transmission HUD (TX/RX tags).
- **Admin Uplink**: Permanent direct-to-admin support channel.

## 5. System Architecture
- **Auth Provider**: Supabase (Remote).
- **Core Engine**: SvelteKit 2 (Svelte 5 Runes).
- **Primary Data Layer**: Drizzle ORM + Local SQLite.
- **23rd-Century UI Suite**: HUD-inspired aesthetics, glassmorphism, and 'Space Grotesk' technical typography.
- **User Synchronization**: Automated bridge in `hooks.server.ts` or page loaders to mirror Supabase user IDs locally.

## 6. Database Schema (Local SQLite)
- `users`: Mirror of Supabase Auth (id, email, role).
- `user_credits`: Local ledger (balance, last_updated).
- `messages`: Private DMs (sender_id, receiver_id, content, created_at).
- `forum_categories`: Board metadata (name, slug).
- `forum_posts`: Post registry (author_id, category_id, title, content).

## 7. Technical Stack
- **Framework**: SvelteKit (Svelte 5 Runes).
- **Styling**: TailwindCSS 4.0.
- **3D Graphics**: Threlte 8 + Three.js.
## 7. Launch Protocol (Deployment)
- **Deployment Engine**: Docker + Docker Compose.
- **Persistence Strategy**: Host-mounted volume for `local.db`.
- **Initialization Command**:
  ```bash
  docker-compose up --build -d
  ```
- **Environment Mapping**: Requires `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` defined in the host shell or `.env` file.
