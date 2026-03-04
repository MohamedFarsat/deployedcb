# AOAI x Chat&Build Hackathon Submission Page

A modern web application for managing hackathon submissions, built with React, TypeScript, Vite, and Supabase.

## Features

- 🎯 Hackathon submission management
- 👤 User authentication (email/password)
- 🗳️ Voting system (one vote per user per submission)
- 👨‍💼 Admin dashboard for hackathon management
- 📱 Responsive design with Tailwind CSS
- 🔒 Row-level security with Supabase

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project:
   - Choose a project name
   - Set a strong database password
   - Select a region close to your users
   - Wait for the project to be provisioned (~2 minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_PROXY_SERVER_ACCESS_TOKEN=undefined
   ```

### 4. Set Up Database Schema

Run the following SQL scripts in your Supabase SQL Editor (in order):

#### Step 1: Create Base Tables
Go to **SQL Editor** → **New Query** and run:

```sql
-- Create hackathons table
create table if not exists public.hackathons (
  id text primary key,
  name text not null,
  logo_url text,
  accepting_submissions boolean not null default true,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- Create submissions table
create table if not exists public.submissions (
  id text primary key,
  created_at timestamptz not null default now(),
  participant_name text not null,
  app_name text not null,
  app_description text not null,
  problem_description text not null,
  app_link text not null,
  hackathon_id text not null references public.hackathons(id) on delete cascade,
  votes integer not null default 0,
  user_id uuid references auth.users(id) on delete set null
);

-- Enable RLS
alter table public.hackathons enable row level security;
alter table public.submissions enable row level security;

-- Hackathons policies (public read, admin write)
create policy "hackathons_public_read" on public.hackathons
for select using (true);

create policy "hackathons_admin_write" on public.hackathons
for all using (auth.uid() is not null);

-- Submissions policies
create policy "submissions_public_read" on public.submissions
for select using (true);

create policy "submissions_authenticated_insert" on public.submissions
for insert with check (auth.uid() is not null);

create policy "submissions_owner_update" on public.submissions
for update using (auth.uid() = user_id);

create policy "submissions_owner_delete" on public.submissions
for delete using (auth.uid() = user_id);

-- Indexes
create index if not exists submissions_hackathon_id_idx on public.submissions (hackathon_id);
create index if not exists submissions_user_id_idx on public.submissions (user_id);
```

#### Step 2: Set Up Authentication & Profiles
Run the SQL from `supabase/auth_profiles.sql` (already in your project)

#### Step 3: Set Up Voting System
Run the SQL from `supabase/voting.sql` (already in your project)

### 5. Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable email confirmation (for development):
   - Go to **Authentication** → **Settings**
   - Under "Email Auth", toggle off "Enable email confirmations"

### 6. Start Development

```bash
npm install
npm run dev
```

Your app should now be running with Supabase configured!

## Testing the Setup

1. **Create a hackathon** (requires authentication)
2. **Submit an entry** to the hackathon
3. **Vote on submissions** (one vote per user per submission)
4. **View admin dashboard** to manage hackathons

## Troubleshooting

### "Supabase is not configured" error
- Check that your `.env` file exists and has valid credentials
- Restart the dev server after adding environment variables

### Authentication not working
- Verify email provider is enabled in Supabase
- Check that email confirmation is disabled (for development)
- Ensure RLS policies are set up correctly

### Database errors
- Make sure all SQL scripts ran successfully
- Check the Supabase logs in the dashboard
- Verify table permissions and RLS policies

## Production Deployment

Before deploying to production:

1. Enable email confirmation in Supabase
2. Set up proper admin roles/permissions
3. Review and tighten RLS policies
4. Add rate limiting for API calls
5. Set up monitoring and error tracking

## Built with Chat&Build

This application was built using [Chat&Build](https://chatandbuild.com) - build apps just by describing them in any language, with no code required.

## License

MIT
