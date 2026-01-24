-- PART 1: Profiles (Already exists, commented out)
-- create table public.profiles ( ... );

-- PART 2: New Subscriptions Table (RUN THIS)
create table if not exists public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  app_name text not null, -- Identifier: 'ai-pitches', 'chat-app', etc.
  credits integer default 0,
  status text default 'active', -- active, past_due, canceled
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, app_name)
);

-- RLS Policies for Subscriptions
alter table public.user_subscriptions enable row level security;

-- Policy to allow users to view their own subscriptions
-- We drop it first to avoid "policy already exists" error if re-run
drop policy if exists "Users can view own subscriptions." on user_subscriptions;
create policy "Users can view own subscriptions."
  on user_subscriptions for select
  using ( auth.uid() = user_id );
