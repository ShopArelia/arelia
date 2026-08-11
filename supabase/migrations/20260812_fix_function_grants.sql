-- Follow-up to 20260811_hardening.sql — fixes a bug in that file's section 3.
--
-- REVIEW BEFORE RUNNING. Not applied.
--
-- The problem: Postgres grants EXECUTE on new functions to PUBLIC by default,
-- and `anon` / `authenticated` inherit from PUBLIC. So
--
--     revoke execute on function ... from anon, authenticated;
--
-- removes only the *explicit* grants and leaves the PUBLIC one intact — the
-- function stays callable. Confirmed against the live ACLs, where `=X/postgres`
-- (empty grantee = PUBLIC) is still present on both functions:
--
--     is_admin:         =X/postgres, authenticated=X/postgres, service_role=X/...
--     rls_auto_enable:  =X/postgres, service_role=X/...
--
-- Supabase's advisor still reports both as callable via /rest/v1/rpc/.
-- The fix is to revoke from PUBLIC, then grant back only what is needed.


-- ── rls_auto_enable() ──────────────────────────────────────────────────────
-- Nothing in the application calls this. It should not be reachable over the
-- REST API by anyone.

revoke execute on function public.rls_auto_enable() from public;
revoke execute on function public.rls_auto_enable() from anon, authenticated;


-- ── is_admin() ─────────────────────────────────────────────────────────────
-- This one is called from the RLS policies on products / ngos / blogs / forms,
-- which are evaluated with the querying role's privileges — so `authenticated`
-- must keep EXECUTE or every admin write will fail with "permission denied for
-- function is_admin".
--
-- Revoking PUBLIC removes `anon`'s access (the part that matters) while the
-- explicit `authenticated` grant, which already exists, keeps the policies
-- working. The grant below is written out to make that dependency obvious and
-- to keep this file idempotent.

revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant  execute on function public.is_admin() to authenticated;


-- ── Verify ─────────────────────────────────────────────────────────────────
-- Don't read the raw ACL for this — it's easy to misread. Each entry is
-- `grantee=privileges/grantor`, and the `/postgres` grantor suffix appears on
-- EVERY line, so the rows all look alike. PUBLIC is the one with an *empty*
-- grantee, i.e. a line beginning with `=`:
--
--     =X/postgres               <- PUBLIC          (what we're removing)
--     postgres=X/postgres       <- the owner role  (normal, leave it)
--     authenticated=X/postgres  <- needed by RLS   (leave it)
--     service_role=X/postgres   <- server-side key (normal, leave it)
--
-- Use the explicit privilege check instead, which has no such ambiguity.
-- Expected after running: anon false for both, authenticated true only for
-- is_admin.
--
--     select p.proname,
--            has_function_privilege('anon',          p.oid, 'EXECUTE') as anon_can_exec,
--            has_function_privilege('authenticated', p.oid, 'EXECUTE') as auth_can_exec
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--     where n.nspname = 'public' and p.proname in ('is_admin','rls_auto_enable');
--
-- Supabase's security advisor is the other confirmation: both
-- `anon_security_definer_function_executable` lints should disappear. The
-- remaining `authenticated ... is_admin` WARN is expected and intended.
--
-- Then sign in to /admin and save a product. If that succeeds, the policies
-- still have the access they need.
