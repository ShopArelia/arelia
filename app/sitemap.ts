import type { MetadataRoute } from "next";

import { getBlogs, getNGOs } from "@/utils/supabase/database";
import { SITE_URL, NGO_PAGE_SIZE } from "@/data/site";

/**
 * Replaces a hand-written sitemap that listed ~180 faceted /shop?filter=…&merch=…
 * permutations (duplicate content) and no detail pages at all.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [{ data: blogs }, { data: ngos }] = await Promise.all([
        getBlogs(),
        getNGOs(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
        { url: `${SITE_URL}/nonprofits`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    ];

    const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    // The directory paginates rather than giving each NGO its own route, so link
    // the pages that actually exist.
    const ngoPages = Math.ceil((ngos?.length ?? 0) / NGO_PAGE_SIZE);
    const ngoRoutes: MetadataRoute.Sitemap = Array.from({ length: Math.max(0, ngoPages - 1) }, (_, i) => ({
        url: `${SITE_URL}/nonprofits?page=${i + 2}`,
        changeFrequency: "weekly",
        priority: 0.4,
    }));

    return [...staticRoutes, ...blogRoutes, ...ngoRoutes];
}
