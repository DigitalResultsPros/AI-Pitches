# Project Tasks & Roadmap

## Phase 1: Setup & Tests
- [x] **Project Initialization**
    - [x] Initialize SvelteKit app (`npm create svelte@latest`).
    - [x] Install TailwindCSS, PostCSS, Autoprefixer.
    - [x] Install Threlte (`@threlte/core`, `@threlte/extras`, `three`).
    - [x] Configure `vite.config.ts` for aliases if needed.
    - [x] *Test:* Run `npm run dev` and verify "Welcome to SvelteKit" page loads.

- [x] **Supabase Integration**
    - [x] Set up Supabase project (Instructional).
    - [x] Install `@supabase/supabase-js`.
    - [x] Create `src/lib/supabaseClient.ts`.
    - [x] *Test:* Verify connection by logging a simple query result or auth state.

## Phase 2: Core Components & Layouts
- [x] **Design System**
    - [x] Configure Tailwind theme (colors, fonts) in `tailwind.config.js`.
    - [x] Create base CSS (reset, dark mode defaults).
- [x] **Layouts**
    - [x] Create `src/routes/+layout.svelte` (Main wrapper).
    - [x] Implement Navbar (Responsive).
    - [x] Implement Footer.
- [x] **3D Background**
    - [x] Create a reusable 3D background component using Threlte.
    - [x] Implement fallbacks for low-power devices.

## Phase 3: Public Pages
- [x] **Landing Page (`/`)**
    - [x] Hero Section with 3D element.
    - [x] "About" Section.
    - [x] "How it works" Section.
    - [x] Modular Design (V1 Classic / V2 Futuristic).
- [x] **Blog (`/blog`)**
    - [x] Create Mock Data for posts (or hook up to Supabase).
    - [x] Blog Index Page.
    - [x] Blog Post Individual Page (`/blog/[slug]`).

## Phase 4: Authentication & Hybrid Logic
- [x] **Auth Stability**
    - [x] Login Page with SSR sync (`data.supabase`).
    - [x] Layout Auth Listener (`onAuthStateChange`).
    - [x] Non-blocking server-side session validation.
- [x] **Local Data Bridge**
    - [x] Drizzle/SQLite Schema for users and credits.
    - [x] Lazy User Sync on first Dashboard visit.
    - [x] Persistent Credit system in SQLite.

## Phase 5: Community & Interactivity
- [x] **Public Board**
    - [x] Forum Categories (Pitches, General, etc).
    - [x] Category feeds with post rendering.
    - [x] Create Post action with credit deduction.
- [x] **Private Messaging**
    - [x] Inbox view grouped by conversation.
    - [x] User directory/search for new messages.
    - [x] Persistent message threads between users.

## Phase 6: Admin Protocols & Identity
- [x] **Asset Control (Credits)**
    - [x] Restricted Admin interface (`/admin/credits`).
    - [x] Manual resource adjustment (Atomic +10/-10 CR).
- [x] **Registry Management (Profile)**
    - [x] High-tech identity recalibration suite.
    - [x] Cloud (Supabase) + Local (SQLite) atomic sync.
- [x] **Admin Comms Channel**
    - [x] Dedicated Support Uplink in Comms Deck.

## Phase 7: Deployment & Finalization
- [x] **Dockerization**
    - [x] Container configuration with SQLite volume persistence.
- [x] **23rd Century UI Suite**
    - [x] HUD-style interface overhaul across all portals.
    - [x] Space Grotesk typography & high-bandwidth telemetry feel.
- [ ] Final Performance Audit.

## Phase 8: Test Suite Completion
- [x] **E2E Test Infrastructure**
    - [x] Install Playwright for end-to-end testing.
    - [x] Configure Playwright (`playwright.config.ts`).
    - [x] Create test helper utilities (auth, navigation, element, wait helpers).
- [x] **Authentication Flow Tests**
    - [x] User login successfully.
    - [x] User registration (founder role).
    - [x] User registration (funder role).
    - [x] Invalid credentials validation.
    - [x] Password mismatch validation.
    - [x] User logout.
    - [x] Protected route redirection.
- [x] **Landing Page Tests**
    - [x] Version toggle functionality.
    - [x] Feature sections verification.
- [x] **Blog Tests**
    - [x] Blog page loads posts.
    - [x] Blog post detail page loads.
- [x] **Test Results**
    - [x] All 11 E2E tests passing.
    - [x] Comprehensive coverage of authentication flows and key user journeys.
