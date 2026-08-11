-- Arelia — schema, index and RLS hardening
--
-- REVIEW BEFORE RUNNING. This has NOT been applied to the live project
-- (zgfnkfcznoexpmxtvtuy). Run it in sections, top to bottom.
--
-- Section 4 changes who can write to the catalog and needs your admin user's
-- UUID filled in first — read the comments there before running it.


-- ═══════════════════════════════════════════════════════════════════════════
-- 1. Indexes
--
-- The database currently has NO indexes beyond primary keys and blogs.slug.
-- At 100 products this is not the bottleneck, but every filter and sort is a
-- sequential scan today, and products.ngo_id is flagged by the Supabase
-- performance advisor (unindexed_foreign_keys) because it backs every join.
--
-- `concurrently` avoids locking; it cannot run inside a transaction block, so
-- run these as individual statements (the SQL editor does this by default).
-- ═══════════════════════════════════════════════════════════════════════════

create index concurrently if not exists products_ngo_id_idx     on public.products (ngo_id);
create index concurrently if not exists products_merch_type_idx on public.products (merch_type);
create index concurrently if not exists products_created_at_idx on public.products (created_at desc);
create index concurrently if not exists products_price_idx      on public.products (price);
create index concurrently if not exists ngos_cause_idx          on public.ngos (cause);

-- Trigram indexes back the `ilike '%…%'` search on /shop, /nonprofits and
-- /blogs. A leading wildcard cannot use a btree index at all, so these are the
-- only thing that will keep search off a seq scan as the catalog grows.
create extension if not exists pg_trgm;

create index concurrently if not exists products_title_trgm_idx on public.products using gin (title gin_trgm_ops);
create index concurrently if not exists ngos_name_trgm_idx      on public.ngos     using gin (name  gin_trgm_ops);
create index concurrently if not exists blogs_title_trgm_idx    on public.blogs    using gin (title gin_trgm_ops);


-- ═══════════════════════════════════════════════════════════════════════════
-- 2. Schema fix
--
-- products.ngo_id defaults to gen_random_uuid() — a random default on a foreign
-- key. An insert that omits ngo_id gets a random UUID that fails the FK with a
-- confusing error, instead of a clear not-null violation.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.products alter column ngo_id drop default;


-- ═══════════════════════════════════════════════════════════════════════════
-- 3. Lock down the SECURITY DEFINER function
--
-- public.rls_auto_enable() is callable by the `anon` role over
-- /rest/v1/rpc/rls_auto_enable. Flagged by the Supabase security advisor
-- (anon_security_definer_function_executable).
-- ═══════════════════════════════════════════════════════════════════════════

revoke execute on function public.rls_auto_enable() from anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════════
-- 4. Restrict catalog writes to admins
--
-- Today every policy on products/ngos/blogs is:
--     for insert/update/delete to authenticated using (true) with check (true)
--
-- That means ANY authenticated user can rewrite or delete the entire catalog.
-- If signup is enabled on the project, anyone who registers gets that access.
--
-- BEFORE RUNNING: find your admin user's UUID and uncomment the insert below,
-- otherwise the admins table will be empty and you will lock yourself out of
-- writing (reads and the app's public pages are unaffected).
--
--     select id, email from auth.users;
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Nobody reads this table through the API; only is_admin() touches it, and that
-- is SECURITY DEFINER so it bypasses RLS. No policies = no direct access.

-- >>> FILL THIS IN AND UNCOMMENT BEFORE RUNNING THE POLICY CHANGES BELOW <<<
-- insert into public.admins (user_id) values ('00000000-0000-0000-0000-000000000000');

create or replace function public.is_admin() returns boolean
    language sql
    security definer
    stable
    set search_path = public
    as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

revoke execute on function public.is_admin() from anon;

-- Products
drop policy if exists "Auth inserts Products" on public.products;
drop policy if exists "Auth updates Products" on public.products;
drop policy if exists "Auth deletes Products" on public.products;

create policy "Admins insert Products" on public.products
    for insert to authenticated with check (public.is_admin());
create policy "Admins update Products" on public.products
    for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete Products" on public.products
    for delete to authenticated using (public.is_admin());

-- NGOs
drop policy if exists "Auth inserts NGOs" on public.ngos;
drop policy if exists "Auth updates NGOs" on public.ngos;
drop policy if exists "Auth deletes NGOs" on public.ngos;

create policy "Admins insert NGOs" on public.ngos
    for insert to authenticated with check (public.is_admin());
create policy "Admins update NGOs" on public.ngos
    for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete NGOs" on public.ngos
    for delete to authenticated using (public.is_admin());

-- Blogs
drop policy if exists "Auth inserts Blogs" on public.blogs;
drop policy if exists "Auth updates Blogs" on public.blogs;
drop policy if exists "Auth deletes Blogs" on public.blogs;

create policy "Admins insert Blogs" on public.blogs
    for insert to authenticated with check (public.is_admin());
create policy "Admins update Blogs" on public.blogs
    for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete Blogs" on public.blogs
    for delete to authenticated using (public.is_admin());

-- Contact submissions stay admin-readable.
drop policy if exists "Auth reads Forms" on public.forms;
create policy "Admins read Forms" on public.forms
    for select to authenticated using (public.is_admin());


-- ═══════════════════════════════════════════════════════════════════════════
-- 5. Bound the public contact-form insert
--
-- `forms` has `for insert to public with check (true)`, so anyone can POST rows
-- straight to PostgREST, bypassing /api/contact entirely. The route now
-- validates and length-caps its input; this makes the database agree, so the
-- direct path can't be used to write unbounded data.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.forms add constraint forms_len_chk check (
    length(name)    between 1 and 200
    and length(email)   between 3 and 320
    and length(reason)  between 1 and 100
    and length(message) between 1 and 5000
);


-- ═══════════════════════════════════════════════════════════════════════════
-- 6. Data cleanup — review the rows first, then run
-- ═══════════════════════════════════════════════════════════════════════════

-- Two products share the title "Recycled Cotton Tote Bag". Check whether
-- they're genuinely different listings before deleting either:
--
--     select id, title, ngo_id, price, external_link, created_at
--     from public.products
--     where title = 'Recycled Cotton Tote Bag'
--     order by created_at;


-- ═══════════════════════════════════════════════════════════════════════════
-- 7. Dashboard settings (not SQL — do these in the Supabase console)
-- ═══════════════════════════════════════════════════════════════════════════
--
--   * Authentication → Policies: enable "Leaked password protection"
--     (flagged by the security advisor).
--
--   * Authentication → Sign In / Providers: disable public email signups
--     unless you actually need them. With section 4 applied a new signup can no
--     longer write, but there is no reason to accept them at all.
