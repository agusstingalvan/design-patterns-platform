import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://agustingalvan.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/generator`, lastModified: new Date() },
  ];
}
