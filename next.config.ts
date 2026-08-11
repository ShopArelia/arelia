import type { NextConfig } from "next";

// Product and NGO images are hosted on the nonprofits' own storefronts, so the
// optimizer needs each origin allowlisted. Adding an NGO on a new host means
// adding it here — a wildcard would let anyone proxy arbitrary URLs through
// /_next/image.
const imageHosts = [
  "app.fulfillengine.com",
  "assetly.ordermygear.com",
  "c.bonfireassets.com",
  "carsonscrusadersfoundation.org",
  "cdn.prod.website-files.com",
  "dynamic.bonfireassets.com",
  "flyingfur.org",
  "fosteringseeds.org",
  "givebutter.s3.amazonaws.com",
  "images.squarespace-cdn.com",
  "img1.wsimg.com",
  "le-cdn.hibuwebsites.com",
  "lotcarolinas.com",
  "savethegreatsouthbay.org",
  "shop.flyingfur.org",
  "static.wixstatic.com",
  "ynausa.org",
];

const nextConfig: NextConfig = {
  // Public catalog reads are cached via `use cache` + `cacheTag` in
  // utils/supabase/database.ts, and invalidated by the admin Server Actions.
  cacheComponents: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default nextConfig;
