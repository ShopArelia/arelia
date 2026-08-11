export const SITE_URL = "https://www.shoparelia.com";

export const SITE_NAME = "Arelia";

export const SITE_DESCRIPTION =
    "A marketplace where every purchase supports a verified nonprofit. Shop with purpose.";

/**
 * Directory page size. Shared with app/sitemap.ts, which derives how many
 * /nonprofits?page=N URLs exist — if these drift, the sitemap advertises pages
 * that don't exist (or misses ones that do).
 */
export const NGO_PAGE_SIZE = 10;
