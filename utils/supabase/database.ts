import { createClient } from "./server";
import { cookies } from "next/headers";

type getProductsType = {
    title?: string;
    ngoId?: string;
};

type getNGOsType = {
    name?: string;
    cause?: string;
    id?: string;
}

type getBlogsType = {
    title?: string;
}

const cookieStore = await cookies();
const supabase = createClient(cookieStore);

export async function getProducts({title, ngoId}: getProductsType = {}) {
    let query = supabase.from('products').select();
    
    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    if (ngoId) {
        query = query.eq('ngo_id', ngoId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getNGOs({name, cause, id}: getNGOsType = {}) {
    let query = supabase.from('ngos').select();

    if (name) {
        query = query.ilike('name', `%${name}%`);
    }

    if (cause) {
        query = query.eq('cause', cause);
    }

    if (id) {
        query = query.eq('id', id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getBlogs({title}: getBlogsType = {}) {
    let query = supabase.from('blogs').select();

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}

export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase.from('blogs').select().eq('slug', slug).single();

    if (error) throw error;

    return data;
}