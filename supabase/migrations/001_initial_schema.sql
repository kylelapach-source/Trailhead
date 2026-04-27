-- ============================================================
-- Trailhead — Initial Schema Migration
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type domain_type as enum (
  'literacy',
  'math_readiness',
  'science_nature',
  'physical',
  'social_emotional',
  'creative_arts'
);

create type block_type as enum (
  'morning_circle',
  'focus_activity',
  'brain_break',
  'outdoor_play',
  'storytime',
  'snack',
  'rest',
  'reflection',
  'free_play'
);

create type zone_type as enum (
  'indoor_quiet',
  'indoor_active',
  'backyard',
  'front_yard',
  'kitchen',
  'garage_workshop',
  'community',
  'vehicle'
);

create type log_status as enum (
  'completed',
  'skipped',
  'in_progress',
  'partial'
);

-- ============================================================
-- TABLES
-- ============================================================

-- families
create table families (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  timezone    text not null default 'America/Chicago',
  locale      text not null default 'en-US',
  settings    jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

-- users (extends auth.users)
create table users (
  id           uuid primary key references auth.users(id) on delete cascade,
  family_id    uuid not null references families(id) on delete cascade,
  email        text not null,
  display_name text not null,
  role         text not null default 'parent' check (role in ('parent', 'guardian')),
  avatar_url   text,
  created_at   timestamptz not null default now()
);

-- children
create table children (
  id         uuid primary key default uuid_generate_v4(),
  family_id  uuid not null references families(id) on delete cascade,
  name       text not null,
  birthdate  date not null,
  avatar_url text,
  interests  text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- rhythms
create table rhythms (
  id          uuid primary key default uuid_generate_v4(),
  family_id   uuid not null references families(id) on delete cascade,
  name        text not null,
  description text,
  day_type    text not null default 'weekday',
  is_active   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- activities
create table activities (
  id              uuid primary key default uuid_generate_v4(),
  family_id       uuid references families(id) on delete cascade, -- null = global seed
  title           text not null,
  description     text not null,
  domain          domain_type not null,
  age_tags        text[] not null default '{}',
  supply_list     text[] not null default '{}',
  zone_suggestion zone_type not null default 'indoor_quiet',
  is_seed_data    boolean not null default false,
  difficulty      text not null default 'easy' check (difficulty in ('easy', 'medium', 'hard')),
  tulsa_location  jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- rhythm_blocks
create table rhythm_blocks (
  id               uuid primary key default uuid_generate_v4(),
  rhythm_id        uuid not null references rhythms(id) on delete cascade,
  activity_id      uuid references activities(id) on delete set null,
  block_type       block_type not null,
  label            text not null,
  duration_minutes integer not null default 20 check (duration_minutes > 0),
  position         integer not null default 0,
  color_hex        text not null default '#2D6A4F',
  domain           domain_type not null default 'literacy',
  zone             zone_type not null default 'indoor_quiet',
  is_optional      boolean not null default false,
  created_at       timestamptz not null default now()
);

-- logs
create table logs (
  id                     uuid primary key default uuid_generate_v4(),
  family_id              uuid not null references families(id) on delete cascade,
  child_id               uuid not null references children(id) on delete cascade,
  rhythm_block_id        uuid references rhythm_blocks(id) on delete set null,
  activity_id            uuid references activities(id) on delete set null,
  logged_by              uuid not null references users(id),
  log_date               date not null,
  status                 log_status not null default 'completed',
  note_text              text,
  photo_urls             text[] not null default '{}',
  audio_url              text,
  duration_actual_minutes integer,
  mood_tags              jsonb not null default '{}',
  created_at             timestamptz not null default now()
);

-- media_items
create table media_items (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  youtube_id       text not null unique,
  category         text not null,
  duration_seconds integer not null default 0,
  age_tags         text[] not null default '{}',
  is_curated       boolean not null default true,
  play_count       integer not null default 0,
  created_at       timestamptz not null default now()
);

-- reflections
create table reflections (
  id               uuid primary key default uuid_generate_v4(),
  family_id        uuid not null references families(id) on delete cascade,
  child_id         uuid not null references children(id) on delete cascade,
  logged_by        uuid not null references users(id),
  reflection_date  date not null,
  prompt_text      text not null,
  parent_note      text,
  child_audio_url  text,
  child_transcript text,
  created_at       timestamptz not null default now()
);

-- sync_conflicts
create table sync_conflicts (
  id             uuid primary key default uuid_generate_v4(),
  family_id      uuid not null references families(id) on delete cascade,
  table_name     text not null,
  record_id      uuid not null,
  local_version  jsonb not null,
  server_version jsonb not null,
  resolved       boolean not null default false,
  occurred_at    timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_users_family_id         on users(family_id);
create index idx_children_family_id      on children(family_id);
create index idx_rhythms_family_id       on rhythms(family_id);
create index idx_rhythm_blocks_rhythm_id on rhythm_blocks(rhythm_id);
create index idx_activities_family_id    on activities(family_id);
create index idx_activities_seed         on activities(is_seed_data) where is_seed_data = true;
create index idx_logs_family_date        on logs(family_id, log_date desc);
create index idx_logs_child_id          on logs(child_id);
create index idx_reflections_family_date on reflections(family_id, reflection_date desc);
create index idx_media_category          on media_items(category);
create index idx_sync_conflicts_family   on sync_conflicts(family_id, resolved);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rhythms_updated_at   before update on rhythms   for each row execute procedure update_updated_at();
create trigger activities_updated_at before update on activities for each row execute procedure update_updated_at();

-- Auto-cleanup old resolved conflicts after 30 days
create or replace function cleanup_old_conflicts() returns void language plpgsql as $$
begin
  delete from sync_conflicts
  where resolved = true and occurred_at < now() - interval '30 days';
end;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table families       enable row level security;
alter table users          enable row level security;
alter table children       enable row level security;
alter table rhythms        enable row level security;
alter table rhythm_blocks  enable row level security;
alter table activities     enable row level security;
alter table logs           enable row level security;
alter table media_items    enable row level security;
alter table reflections    enable row level security;
alter table sync_conflicts enable row level security;

-- Helper: get the family_id for the authenticated user
create or replace function auth_family_id() returns uuid language sql stable as $$
  select family_id from users where id = auth.uid()
$$;

-- families: members of the family can read/update their own family record
create policy "family_read"   on families for select using (id = auth_family_id());
create policy "family_update" on families for update using (id = auth_family_id());

-- users: family members can read each other; own record only for write
create policy "users_read"   on users for select using (family_id = auth_family_id());
create policy "users_insert" on users for insert with check (id = auth.uid());
create policy "users_update" on users for update using (id = auth.uid());

-- children: own family only
create policy "children_read"   on children for select using (family_id = auth_family_id());
create policy "children_write"  on children for insert with check (family_id = auth_family_id());
create policy "children_update" on children for update using (family_id = auth_family_id());
create policy "children_delete" on children for delete using (family_id = auth_family_id());

-- rhythms: own family only
create policy "rhythms_read"   on rhythms for select using (family_id = auth_family_id());
create policy "rhythms_insert" on rhythms for insert with check (family_id = auth_family_id());
create policy "rhythms_update" on rhythms for update using (family_id = auth_family_id());
create policy "rhythms_delete" on rhythms for delete using (family_id = auth_family_id());

-- rhythm_blocks: accessible if user owns the parent rhythm
create policy "rhythm_blocks_read" on rhythm_blocks for select
  using (exists (select 1 from rhythms r where r.id = rhythm_id and r.family_id = auth_family_id()));
create policy "rhythm_blocks_write" on rhythm_blocks for insert
  with check (exists (select 1 from rhythms r where r.id = rhythm_id and r.family_id = auth_family_id()));
create policy "rhythm_blocks_update" on rhythm_blocks for update
  using (exists (select 1 from rhythms r where r.id = rhythm_id and r.family_id = auth_family_id()));
create policy "rhythm_blocks_delete" on rhythm_blocks for delete
  using (exists (select 1 from rhythms r where r.id = rhythm_id and r.family_id = auth_family_id()));

-- activities: read seed data + own family; write own family only
create policy "activities_read_seed"   on activities for select using (is_seed_data = true);
create policy "activities_read_family" on activities for select using (family_id = auth_family_id());
create policy "activities_insert"      on activities for insert with check (family_id = auth_family_id());
create policy "activities_update"      on activities for update using (family_id = auth_family_id());
create policy "activities_delete"      on activities for delete using (family_id = auth_family_id());

-- logs: own family only
create policy "logs_read"   on logs for select using (family_id = auth_family_id());
create policy "logs_insert" on logs for insert with check (family_id = auth_family_id());
create policy "logs_update" on logs for update using (family_id = auth_family_id());
create policy "logs_delete" on logs for delete using (family_id = auth_family_id());

-- media_items: public read, no family scoping
create policy "media_read" on media_items for select using (true);

-- reflections: own family only
create policy "reflections_read"   on reflections for select using (family_id = auth_family_id());
create policy "reflections_insert" on reflections for insert with check (family_id = auth_family_id());
create policy "reflections_update" on reflections for update using (family_id = auth_family_id());
create policy "reflections_delete" on reflections for delete using (family_id = auth_family_id());

-- sync_conflicts: own family only
create policy "conflicts_read"   on sync_conflicts for select using (family_id = auth_family_id());
create policy "conflicts_insert" on sync_conflicts for insert with check (family_id = auth_family_id());
create policy "conflicts_update" on sync_conflicts for update using (family_id = auth_family_id());
