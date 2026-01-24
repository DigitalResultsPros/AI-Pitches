# AI-Pitches

The premier community connecting visionary Founders with forward-thinking Funders.

## 🚀 Mission: The 23rd-Century Funding Portal

AI-Pitches is a high-performance, high-bandwidth communication platform connecting visionary Founders with elite Resource Providers (Funders). Built with a clinical, HUD-inspired aesthetic, it provides a seamless interface for capital allocation in the deep-tech sector.

### 🌌 Advanced Features

*   **23rd-Century UI Suite**: A full-platform aesthetic overhaul featuring glassmorphism, glowing micro-borders, and clinical **Space Grotesk** geometric typography.
*   **The Nexus (Community)**: Visual-first forum channels with technical corner indicators and high-tech card architecture.
*   **Comms Deck (Secure Messaging)**: P2P transmission logs with RX/TX telemetry and encrypted session identifiers.
*   **Asset Control (Admin)**: Restricted administrative interface for manual node credit synchronization and resource management.
*   **Identity Registry**: A high-tech recalibration suite for managing platform metadata across Cloud and Local database layers.

### 🛠️ Core Technology

*   **Engine**: SvelteKit 2 + Svelte 5 (Runes).
*   **Styling**: TailwindCSS 4.0 (Neo-Cyber dynamic theme).
*   **Visualization**: Threlte 8 + Three.js for immersive 3D grid-atmospheres.
*   **Registry**: Supabase Auth + Drizzle ORM + Local SQLite (Hybrid Sync Architecture).

## Developer Guide

### Setup
1.  Clone repo.
2.  `npm install`
3.  Copy `.env.example` to `.env` and add Supabase keys.
4.  Run `npm run dev`.

### Sync
*   **Global Auth**: Managed by Supabase Cloud.
*   **Local State**: `local.db` (SQLite) stores messages, forum posts, and credit ledgers.
*   **Sync**: Users are automatically synced from Supabase to local SQLite upon their first dashboard visit.

## 🛰️ Launch Protocol (Deployment)

Initialize the platform using the following coordinated command:

```bash
docker-compose up --build -d
```

**Pre-requisites**: Ensure your shell environment (or `.env` file) contains valid Supabase coordinates:
*   `PUBLIC_SUPABASE_URL`
*   `PUBLIC_SUPABASE_ANON_KEY`

The platform will initialize at `http://localhost:3000`. `local.db` will persist across all container resets via host volume mapping.
