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
}

type getNGOsType = {
    name?: string;
    cause?: string;
    id?: string;
    limit?: number;
}

type getBlogsType = {
    title?: string;
    limit?: number;
}

async function getSupabase() {
    const cookieStore = await cookies();
    return createClient(cookieStore);
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

export async function getProductsByRange({from, to, filterVal, column, ascending}: getProductsByRangeType) {
    const supabase = await getSupabase();
    let query = supabase.from('products').select(`*, ngo:ngo_id!inner (id, name, cause)`, { count: "exact" });

    if (column) {
        query = query.order(column, {ascending});
    }

    query = query.range(from, to);

    if (filterVal !== 'all') {
        query = query.eq("ngo.cause", filterVal);
    }
    
    const { data, count, error } = await query;

    if (error) throw error;

    return { data, count };
}

export async function getNGOs({name, cause, limit}: getNGOsType = {}) {
    const supabase = await getSupabase();
    let query = supabase.from('ngos').select();

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    if (cause) {
        query = query.eq('cause', cause);
    }

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getNGOsByID(id: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('ngos').select().eq('id', id).single();

    if (error) throw error;

    return data;
}

export async function getBlogs({title, limit}: getBlogsType = {}) {
    const supabase = await getSupabase();
    let query = supabase.from('blogs').select();

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (limit) {
        query = query.limit(limit);
    }
    
    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getBlogBySlug(slug: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.from('blogs').select().eq('slug', slug).single();

    if (error) throw error;

    return data;
}
