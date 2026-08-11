"use server";

import { updateTag } from "next/cache";

import { getSupabase, getUser } from "@/utils/supabase/database";
import type { TablesInsert } from "@/types/supabase";

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Admin writes go through here rather than straight from the browser, so that
 * (a) the session is re-checked server-side on every mutation and (b) there is
 * a place to invalidate the `use cache` entries that back the public pages.
 *
 * `updateTag` (rather than `revalidateTag`) so an admin sees their own write
 * immediately instead of one stale render later.
 */
async function withAdmin<T>(run: (supabase: Awaited<ReturnType<typeof getSupabase>>) => Promise<T>): Promise<ActionResult> {
    const user = await getUser();
    if (!user) return { ok: false, error: "Not signed in." };

    try {
        await run(await getSupabase());
        return { ok: true };
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : "Something went wrong." };
    }
}

function must({ error }: { error: { message: string } | null }) {
    if (error) throw new Error(error.message);
}

/* ── Products ──────────────────────────────────────────────────────────────── */

export type ProductPayload = TablesInsert<"products">;

export async function saveProduct(payload: ProductPayload, id?: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(id
            ? await supabase.from("products").update(payload).eq("id", id)
            : await supabase.from("products").insert(payload));
    });

    if (result.ok) updateTag("products");
    return result;
}

export async function deleteProduct(id: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(await supabase.from("products").delete().eq("id", id));
    });

    if (result.ok) updateTag("products");
    return result;
}

/* ── NGOs ──────────────────────────────────────────────────────────────────── */

export type NGOPayload = TablesInsert<"ngos">;

export async function saveNGO(payload: NGOPayload, id?: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(id
            ? await supabase.from("ngos").update(payload).eq("id", id)
            : await supabase.from("ngos").insert(payload));
    });

    // Products embed the NGO name and cause, so their cache entries go stale too.
    if (result.ok) {
        updateTag("ngos");
        updateTag("products");
    }
    return result;
}

export async function deleteNGO(id: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(await supabase.from("ngos").delete().eq("id", id));
    });

    if (result.ok) {
        updateTag("ngos");
        updateTag("products");
    }
    return result;
}

/* ── Blogs ─────────────────────────────────────────────────────────────────── */

export type BlogPayload = TablesInsert<"blogs">;

export async function saveBlog(payload: BlogPayload, id?: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(id
            ? await supabase.from("blogs").update(payload).eq("id", id)
            : await supabase.from("blogs").insert(payload));
    });

    if (result.ok) updateTag("blogs");
    return result;
}

export async function deleteBlog(id: string): Promise<ActionResult> {
    const result = await withAdmin(async (supabase) => {
        must(await supabase.from("blogs").delete().eq("id", id));
    });

    if (result.ok) updateTag("blogs");
    return result;
}
