import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/headers";
import { connection } from "next/server";

import { createClient } from "./server";
import { publicClient } from "./public";

type getProductsType = {
    title?: string;
    ngoId?: string;
    limit?: number;
};

type getProductsByRangeType = {
    from: number;
    to: number;
    filterVal: string;
    merchVal: string;
    column?: string;
    ascending?: boolean;
    searchVal?: string;
}

type getNGOsType = {
    name?: string;
    cause?: string;
    id?: string;
    limit?: number;
    from?: number;
    to?: number;
}

type getBlogsType = {
    title?: string;
    limit?: number;
    from?: number;
    to?: number;
}

/** Products joined to their NGO — the shape every listing needs. */
const PRODUCT_WITH_NGO = `*, ngo:ngo_id!inner (id, name, cause)`;

/* ── Authenticated (cookie-backed) access — /admin and auth only ───────────── */

export async function getSupabase() {
    // Excludes every caller from prerendering. Without this the admin pages get
    // prerendered at build time — the anon key still satisfies the `Public read`
    // policies, so real dashboard markup would be baked into the static shell
    // and served to unauthenticated visitors before the auth gate redirects.
    await connection();

    const cookieStore = await cookies();
    return createClient(cookieStore);
}

export async function getUser() {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/* ── Public reads ──────────────────────────────────────────────────────────────
 * All of these are `use cache`d and tagged, so they're served from the cache
 * until an admin write calls revalidateTag (see app/admin/actions.ts).
 * None may read cookies — that's why they use `publicClient`.
 * ─────────────────────────────────────────────────────────────────────────── */

export async function getProducts({title, ngoId, limit}: getProductsType = {}) {
    "use cache";
    cacheTag("products");
    cacheLife("hours");

    let query = publicClient.from('products').select(PRODUCT_WITH_NGO);

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (ngoId) {
        query = query.eq('ngo_id', ngoId);
    }

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getProductsByRange({from, to, filterVal, merchVal, column, ascending, searchVal}: getProductsByRangeType) {
    "use cache";
    cacheTag("products");
    cacheLife("hours");

    let query = publicClient.from('products').select(PRODUCT_WITH_NGO, { count: "exact" });

    if (column) {
        query = query.order(column, {ascending});
    }

    if (filterVal !== 'all') {
        query = query.eq("ngo.cause", filterVal);
    }

    if (merchVal !== 'all') {
        query = query.eq("merch_type", merchVal);
    }

    if (searchVal) {
        query = query.ilike("title", `%${searchVal}%`);
    }

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getNGOs({name, cause, limit, from, to}: getNGOsType = {}) {
    "use cache";
    cacheTag("ngos");
    cacheLife("hours");

    let query = publicClient.from('ngos').select(`*, products(count)`, { count: "exact" });

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    if (cause) {
        query = query.eq('cause', cause);
    }

    if (limit) {
        query = query.limit(limit);
    }

    // `from` is 0 on page 1, so this must be an explicit undefined check.
    if (from !== undefined && to !== undefined) {
        query = query.range(from, to);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getNGOsByID(id: string) {
    "use cache";
    cacheTag("ngos");
    cacheLife("hours");

    const { data, error } = await publicClient.from('ngos').select().eq('id', id).single();

    if (error) throw error;

    return data;
}

export async function getBlogs({title, limit, from, to}: getBlogsType = {}) {
    "use cache";
    cacheTag("blogs");
    cacheLife("hours");

    let query = publicClient.from('blogs').select("*", { count: "exact" }).order("updated_at", { ascending: false });

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (limit) {
        query = query.limit(limit);
    }

    if (from !== undefined && to !== undefined) {
        query = query.range(from, to);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getBlogBySlug(slug: string) {
    "use cache";
    cacheTag("blogs");
    cacheLife("hours");

    const { data, error } = await publicClient.from('blogs').select().eq('slug', slug).single();

    if (error) return null;

    return data;
}

/**
 * Headline counts for the hero sections. Three parallel `head: true` counts —
 * this used to pull every NGO row (with a nested products aggregate) just to
 * size a Set of causes.
 */
export async function getAllCounts() {
    "use cache";
    cacheTag("products", "ngos");
    cacheLife("hours");

    const [
        { count: ngoCount },
        { count: productCount },
        { data: causes },
    ] = await Promise.all([
        publicClient.from("ngos").select("*", { count: "exact", head: true }),
        publicClient.from("products").select("*", { count: "exact", head: true }),
        publicClient.from("ngos").select("cause").not("cause", "is", null).neq("cause", ""),
    ]);

    return {
        ngoCount,
        productCount,
        causeCount: new Set(causes?.map((n) => n.cause)).size,
    };
}
