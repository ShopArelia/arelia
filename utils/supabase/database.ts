import { createClient } from "./server";
import { cookies } from "next/headers";

type getProductsType = {
    title?: string;
    ngoId?: string;
    limit?: number;
};

type getProductsByRangeType = {
    from: number;
    to: number;
    filterVal: string;
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

async function getSupabase() {
    const cookieStore = await cookies();
    return createClient(cookieStore);
}

export async function getUser() {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getProducts({title, ngoId, limit}: getProductsType = {}) {
    const supabase = await getSupabase();
    let query = supabase.from('products').select();
    
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

export async function getProductsByRange({from, to, filterVal, column, ascending, searchVal}: getProductsByRangeType) {
    const supabase = await getSupabase();
    let query = supabase.from('products').select(`*, ngo:ngo_id!inner (id, name, cause)`, { count: "exact" });

    if (column) {
        query = query.order(column, {ascending});
    }

    query = query.range(from, to);

    if (filterVal !== 'all') {
        query = query.eq("ngo.cause", filterVal);
    }

    if (searchVal) {
        query = query.ilike("title", `%${searchVal}%`);
    }
    
    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getNGOs({name, cause, limit, from, to}: getNGOsType) {
    const supabase = await getSupabase();
    let query = supabase.from('ngos').select(`*, products(count)`,{ count: "exact" });

    if (from && to) {
        query = query.range(from, to);
    }

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    if (cause) {
        query = query.eq('cause', cause);
    }

    if (limit) {
        query = query.limit(limit);
    }

    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getNGOsByID(id: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('ngos').select().eq('id', id).single();

    if (error) throw error;

    return data;
}

export async function getBlogs({title, limit, from, to}: getBlogsType = {}) {
    const supabase = await getSupabase();
    let query = supabase.from('blogs').select("*", { count: "exact" });

    if (from && to) {
        query = query.range(from, to);
    }

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (limit) {
        query = query.limit(limit);
    }
    
    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getBlogBySlug(slug: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('blogs').select().eq('slug', slug).single();

    if (error) return null;

    return data;
}

export async function getAllCounts() {
    const supabase = await getSupabase();

    const ngos = await getNGOs({});

    const [
        { count: ngoCount },
        { count: productCount },
    ] = await Promise.all([
        supabase.from("ngos").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
    ])

    const causeCount = new Set(ngos.data?.map(n => n.cause).filter(Boolean)).size;

    return {
        ngoCount: ngoCount,
        productCount: productCount,
        causeCount: causeCount,
    }
}
