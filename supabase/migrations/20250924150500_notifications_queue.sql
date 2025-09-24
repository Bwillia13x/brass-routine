-- Notifications queue schema and triggers for booking/contact submissions

create schema if not exists notifications;

create table if not exists notifications.queue (
    id uuid primary key default gen_random_uuid(),
    table_name text not null,
    record_id uuid not null,
    payload jsonb not null,
    status text not null default 'pending',
    attempt_count integer not null default 0,
    last_error text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists notifications.failures (
    id uuid primary key default gen_random_uuid(),
    queue_id uuid references notifications.queue(id) on delete cascade,
    error_message text not null,
    created_at timestamptz not null default now()
);

create or replace function notifications.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create trigger notifications_queue_set_updated_at
before update on notifications.queue
for each row
execute function notifications.set_updated_at();

create or replace function notifications.enqueue_submission()
returns trigger
language plpgsql
security definer
set search_path = public, notifications
as $$
begin
    insert into notifications.queue (table_name, record_id, payload)
    values (TG_TABLE_NAME, new.id, to_jsonb(new));
    return new;
end;
$$;

create trigger notify_on_appointments_insert
after insert on public.appointments
for each row
execute function notifications.enqueue_submission();

create trigger notify_on_contact_messages_insert
after insert on public.contact_messages
for each row
execute function notifications.enqueue_submission();

alter table notifications.queue enable row level security;
alter table notifications.failures enable row level security;

drop policy if exists "allow service role queue access" on notifications.queue;
create policy "allow service role queue access"
    on notifications.queue
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

drop policy if exists "allow service role failure access" on notifications.failures;
create policy "allow service role failure access"
    on notifications.failures
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');
