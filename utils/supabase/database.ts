import { createClient } from "./server";
import { cookies } from "next/headers";

type getProductsType = {
    title?: string;
    ngoId?: string;
    limit?: number;
};

type getNGOsType = {
    name?: string;
    cause?: string;
    id?: string;
    limit?: number;
}

type getBlogsType = {
    title?: string;
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

export async function getBlogs({title}: getBlogsType = {}) {
    const supabase = await getSupabase();
    let query = supabase.from('blogs').select();

    if (title) {
        query = query.ilike('title', `%${title}%`);
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