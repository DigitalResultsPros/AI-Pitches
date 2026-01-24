-- BLOG POSTS TABLE
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text, -- Markdown or HTML
  published boolean default false,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS for Posts
alter table public.posts enable row level security;

-- Everyone can read published posts
create policy "Public can view published posts."
  on posts for select
  using ( published = true );

-- Authors (Founders/Funders) can create posts (Optional: restrict to admins later)
create policy "Authenticated users can create posts."
  on posts for insert
  with check ( auth.role() = 'authenticated' );

-- Authors can update their own posts
create policy "Authors can update own posts."
  on posts for update
  using ( auth.uid() = author_id );
