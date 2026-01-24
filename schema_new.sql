-- ==========================================
-- AI-PITCHES COMPLETE SCHEMA
-- ==========================================

-- 1. PROFILES TABLE
-- Existing users are automatically handled via trigger (see below)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('founder', 'funder')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. USER HANDLER TRIGGER
-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. SUBSCRIPTIONS / MULTI-APP DATA
create table public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  app_name text not null, -- Identifier for which app this subscription belongs to
  credits integer default 0,
  status text default 'active', -- active, past_due, canceled
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, app_name) -- Ensure one record per app per user
);

-- RLS for Subscriptions
alter table public.user_subscriptions enable row level security;

create policy "Users can view own subscriptions."
  on user_subscriptions for select
  using ( auth.uid() = user_id );

-- 4. BLOG POSTS
create table public.posts (
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

create policy "Public can view published posts."
  on posts for select
  using ( published = true );

create policy "Authenticated users can create posts."
  on posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authors can update own posts."
  on posts for update
  using ( auth.uid() = author_id );
