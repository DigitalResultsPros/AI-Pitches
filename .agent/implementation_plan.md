# Deployment Deployment (Dockerization) Implementation Plan

## Goal
Containerize the AI-Pitches platform for production-ready deployment, ensuring the local SQLite data persists across container restarts.

## 1. Adapter Shift
- Switch SvelteKit to use `@sveltejs/adapter-node` (currently likely on `adapter-auto`).
- Update `svelte.config.js`.

## 2. Docker Architecture
- **Dockerfile**: 
    - Multi-stage build (Build -> Run).
    - Alpine-based Node image for minimal footprint.
    - Installation of `better-sqlite3` dependencies (python3, make, g++).
- **Docker Compose**:
    - Orchestrate the app container.
    - Define a persistent volume for the root directory or specific `data/` folder containing `local.db`.

## 3. Environment Config
- Map `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
- Handle `DATABASE_URL` for the internal SQLite path.

## 4. Execution Order
1. Install `@sveltejs/adapter-node`.
2. Update `svelte.config.js`.
3. Create `Dockerfile`.
4. Create `docker-compose.yml`.
5. Update documentation with "Launch Protocol" instructions.

---
## Verification
- Can I build the image locally?
- Does the container start and connect to Supabase?
- Does `local.db` persist if the container is removed and recreated?
